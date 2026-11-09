/**
 * Cloudflare R2 (API S3) cho api/tts.js (giọng MC Đấu Trường Nhí): ghi mp3 lên bucket, đọc lại qua link công khai, liệt kê file. Chép từ kinh-thanh/api/_lib/r2.js (cùng bucket kinhthanh-audio);
 * file usage/<ngày>/<giọng>/… đếm ký tự đã dùng (trang admin của Kinh Thánh đọc được).
 * Env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY (token chỉ có quyền Object Read & Write của bucket),
 * R2_BUCKET, R2_PUBLIC_URL (link công khai của bucket, vd. https://pub-….r2.dev). Thiếu biến nào thì r2On() = false.
 */
import { createHash, createHmac } from 'node:crypto';

const env = () => ({
  account: process.env.R2_ACCOUNT_ID,
  keyId: process.env.R2_ACCESS_KEY_ID,
  secret: process.env.R2_SECRET_ACCESS_KEY,
  bucket: process.env.R2_BUCKET,
  pub: process.env.R2_PUBLIC_URL?.replace(/\/+$/, ''),
});

export const r2On = () => Object.values(env()).every(Boolean);

const sha = (data) => createHash('sha256').update(data).digest('hex');
const hmac = (key, data) => createHmac('sha256', key).update(data).digest();
const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);

/** Gọi API S3 của bucket, chữ ký AWS SigV4 (region "auto"); query: { tên: giá trị } (đã sắp xếp khi ký). */
async function s3(method, path, { query = {}, body = '', headers: extra = {} } = {}) {
  const { account, keyId, secret, bucket } = env();
  const host = `${account}.r2.cloudflarestorage.com`;
  const uri = `/${bucket}${path ? `/${path.split('/').map(encodeURIComponent).join('/')}` : ''}`;
  const qs = Object.keys(query).sort().map(k => `${enc(k)}=${enc(query[k])}`).join('&');
  const amzDate = new Date().toISOString().replace(/[-:]|\.\d{3}/g, '');
  const day = amzDate.slice(0, 8);
  const hash = sha(body);
  const headers = { ...extra, host, 'x-amz-content-sha256': hash, 'x-amz-date': amzDate };
  const names = Object.keys(headers).sort();
  const request = [method, uri, qs, ...names.map(n => `${n}:${headers[n]}`), '', names.join(';'), hash].join('\n');
  const scope = `${day}/auto/s3/aws4_request`;
  const toSign = ['AWS4-HMAC-SHA256', amzDate, scope, sha(request)].join('\n');
  const key = ['auto', 's3', 'aws4_request'].reduce(hmac, hmac(`AWS4${secret}`, day));
  const signature = createHmac('sha256', key).update(toSign).digest('hex');
  const { host: _, ...sent } = headers;
  return fetch(`https://${host}${uri}${qs ? `?${qs}` : ''}`, {
    method,
    headers: { ...sent, authorization: `AWS4-HMAC-SHA256 Credential=${keyId}/${scope}, SignedHeaders=${names.join(';')}, Signature=${signature}` },
    body: method === 'GET' ? undefined : body,
  });
}

/** Ghi một file lên bucket (mặc định không bao giờ đổi: CDN giữ một năm). */
export async function r2Put(path, body, contentType, cacheControl = 'public, max-age=31536000, immutable') {
  const r = await s3('PUT', path, { body, headers: { 'cache-control': cacheControl, 'content-type': contentType } });
  if (!r.ok) throw new Error(`r2 put ${r.status} ${(await r.text()).slice(0, 200)}`);
}

/** Đọc file thẳng từ bucket (API S3, không qua CDN: file hay đổi như đơn góp bánh); chưa có → null. */
export async function r2Read(path) {
  const r = await s3('GET', path);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`r2 read ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

/** Đọc file qua link công khai; chưa có → null. */
export async function r2Get(path) {
  const r = await fetch(`${env().pub}/${path}`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`r2 get ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

/** Tên mọi file bắt đầu bằng prefix (ListObjectsV2, 1000 file mỗi trang). */
export async function r2List(prefix) {
  const keys = [];
  let token = '';
  do {
    const query = { 'list-type': '2', prefix, ...(token ? { 'continuation-token': token } : {}) };
    const r = await s3('GET', '', { query });
    const xml = await r.text();
    if (!r.ok) throw new Error(`r2 list ${r.status} ${xml.slice(0, 200)}`);
    for (const m of xml.matchAll(/<Key>([^<]*)<\/Key>/g)) keys.push(m[1].replace(/&amp;/g, '&'));
    token = /<IsTruncated>true<\/IsTruncated>/.test(xml) ? (xml.match(/<NextContinuationToken>([^<]*)</)?.[1] || '') : '';
  } while (token);
  return keys;
}
