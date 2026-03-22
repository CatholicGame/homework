/**
 * 3D Shape Renderer using Three.js
 * Creates interactive, rotatable 3D shapes for the Shape Sorter game
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Color palette for shapes
const SHAPE_COLORS = {
  sphere:      { main: 0xFF6B9D, accent: 0xFFB3CC },
  cylinder:    { main: 0x60A5FA, accent: 0x93C5FD },
  cube:        { main: 0xC084FC, accent: 0xD8B4FE },
  rectangular: { main: 0x4ADE80, accent: 0x86EFAC },
};

/**
 * Create a 3D shape in a canvas element
 * @param {string} containerId - DOM element ID to render into
 * @param {string} shapeType - 'sphere' | 'cylinder' | 'cube' | 'rectangular'
 * @param {object} options - { width, height, autoRotate, interactive }
 * @returns {object} { scene, camera, renderer, controls, dispose }
 */
export function create3DShape(containerId, shapeType, options = {}) {
  const {
    width = 200,
    height = 200,
    autoRotate = true,
    interactive = true,
  } = options;

  const container = document.getElementById(containerId);
  if (!container) return null;

  // Scene
  const scene = new THREE.Scene();
  scene.background = null; // transparent

  // Camera — adjust distance for smaller previews
  const isSmall = width <= 100;
  const camera = new THREE.PerspectiveCamera(isSmall ? 45 : 40, width / height, 0.1, 100);
  camera.position.set(3, 2, 3);
  camera.lookAt(0, 0, 0);

  // Renderer — simpler for small previews
  const renderer = new THREE.WebGLRenderer({
    antialias: !isSmall, // skip AA for small to save perf
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  if (!isSmall) renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(3, 5, 3);
  if (!isSmall) dirLight.castShadow = true;
  scene.add(dirLight);

  const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
  backLight.position.set(-3, 2, -3);
  scene.add(backLight);

  // Create shape
  const colors = SHAPE_COLORS[shapeType] || SHAPE_COLORS.sphere;
  const segDetail = isSmall ? 16 : 32;
  const material = new THREE.MeshPhongMaterial({
    color: colors.main,
    specular: 0x444444,
    shininess: 60,
    transparent: true,
    opacity: 0.92,
  });

  let geometry;
  switch (shapeType) {
    case 'sphere':
      geometry = new THREE.SphereGeometry(1.2, segDetail, segDetail);
      break;
    case 'cylinder':
      geometry = new THREE.CylinderGeometry(0.8, 0.8, 1.8, segDetail);
      break;
    case 'cube':
      geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      break;
    case 'rectangular':
      geometry = new THREE.BoxGeometry(2, 1.2, 1.4);
      break;
    default:
      geometry = new THREE.SphereGeometry(1.2, segDetail, segDetail);
  }

  const mesh = new THREE.Mesh(geometry, material);
  if (!isSmall) { mesh.castShadow = true; mesh.receiveShadow = true; }
  scene.add(mesh);

  // Add wireframe overlay for educational clarity (skip for small)
  if (!isSmall) {
    const wireframe = new THREE.WireframeGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff, linewidth: 1, transparent: true, opacity: 0.15,
    });
    mesh.add(new THREE.LineSegments(wireframe, lineMaterial));
  }

  // Add edges for cube/rectangular
  if (shapeType === 'cube' || shapeType === 'rectangular') {
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x333333, linewidth: 2, transparent: true, opacity: 0.4,
    });
    mesh.add(new THREE.LineSegments(edges, edgeMaterial));
  }

  // Ground plane (only for larger views)
  if (!isSmall) {
    const groundGeo = new THREE.PlaneGeometry(6, 6);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.2;
    ground.receiveShadow = true;
    scene.add(ground);
  }

  // Controls (interactive mode only)
  let controls = null;
  if (interactive) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.5;
  }

  // Animation loop
  let animationId;
  let isDisposed = false;
  function animate() {
    if (isDisposed) return;
    animationId = requestAnimationFrame(animate);

    if (controls) {
      controls.update();
    } else if (autoRotate && mesh) {
      // Manual rotation for non-interactive previews
      mesh.rotation.y += 0.015;
    }

    renderer.render(scene, camera);
  }
  animate();

  // Dispose function
  function dispose() {
    isDisposed = true;
    cancelAnimationFrame(animationId);
    if (controls) controls.dispose();
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    if (container && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  }

  return { scene, camera, renderer, controls, mesh, dispose };
}

/**
 * Create a small 3D shape preview (for sort items or bins)
 */
export function create3DPreview(containerId, shapeType, size = 100) {
  return create3DShape(containerId, shapeType, {
    width: size,
    height: size,
    autoRotate: true,
    interactive: false,
  });
}

/**
 * Mapping from shape ID to Three.js shape type
 */
export const SHAPE_TYPE_MAP = {
  sphere: 'sphere',
  cylinder: 'cylinder',
  cube: 'cube',
  rectangular: 'rectangular',
};
