@echo off
rem Bam dup de chieu video "Gioi thieu Toan Tieu Hoc": dev server app cong 5173 da chay thi mo trang luon, chua chay thi bat roi mo.
cd /d "%~dp0..\..\.."
set URL=http://localhost:5173/scripts/.tmp/video-gioi-thieu/

curl -s -o nul %URL% && (
  start "" "%URL%"
  exit /b
)
echo Dang bat dev server, trinh duyet se tu mo sau vai giay... (dong cua so nay de tat)
start "" /b cmd /c "timeout /t 6 >nul & start "" "%URL%""
npx vite --port 5173
pause
