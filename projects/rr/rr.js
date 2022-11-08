// Import Maps are not widely supported yet (No FF ESR or FF Android)
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let scene, renderer, bluelight, purplelight, stats, object;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

init();
animate();

function init() {
  const container = document.getElementById( 'threedee-wrapper' );
  
  // https://stackoverflow.com/questions/54202461/how-to-fit-the-size-of-the-three-js-renderer-to-a-webpage-element
//   let mapDimensions = container.getBoundingClientRect();
  
  scene = new THREE.Scene();
//   scene.background = new THREE.Color( 0xbfe3dd );
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.2 );
  scene.add(ambientLight);

  const onProgress = function( xhr ) {
    if (xhr.lengthComputable) {
      const percentComplete = 100 * xhr.loaded / xhr.total;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  
  const loader = new OBJLoader();
  loader.load('/assets/threedee/craneo.obj', function (obj) {
    object = obj;
    object.scale.multiplyScalar(12);
    object.position.set(0, 0, 0);
    scene.add(object);
  } );
  
  const sphere = new THREE.SphereGeometry(0.5, 16, 8);
  
  bluelight = new THREE.PointLight(0x80ff80, 2, 70);
  bluelight.add( new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
  bluelight.position.set(-50, 50, 50);
  scene.add(bluelight);
  
  purplelight = new THREE.PointLight(0x74179c, 2, 70);
  purplelight.add( new THREE.Mesh(sphere, new THREE.MeshBasicMaterial( { color: 0x74179c } ) ) );
  purplelight.position.set(50, 50, 50);
  scene.add(purplelight);
  
  scene.add(new THREE.AxesHelper(40));
  
  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);
  
  stats = new Stats();
  container.appendChild( stats.dom );
  
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 0, 0.5, 0 );
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;
  
  window.addEventListener( 'resize', onWindowResize );
  document.addEventListener( 'mousemove', onDocumentMouseMove);

}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}

function render() {
  const time = Date.now() * 0.0005;
  const delta = clock.getDelta();
  
  let r = 50;
  let zeroIncl = 45;
  let zeroAzim = 90;
  
  let az = zeroAzim + mouseX * 0.0005;
  let il = zeroIncl - mouseY * 0.0005;
  
  
  camera.position.x = r * Math.sin(il) * Math.cos(az);
  camera.position.z = r * Math.sin(il) * Math.sin(az);
  camera.position.y = r * Math.cos(il);
  
  camera.lookAt(scene.position);
  
  renderer.render( scene, camera );
}
