import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

let renderer, camera, scene, transformControl, loader, controls, ambientlight, directionalLight, circle,square;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x160c40)
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 30)
    scene.add(camera)

    loader = new GLTFLoader();
    loader.load('round-island.glb', function (glb) {

        const root = glb.scene;
        root.scale.set(0.5,0.5,0.5)
        scene.add(root)
    }, undefined, function (error) {
        console.error(error);
    });

    console.log("hello")

    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set(10,10,0)
    directionalLight.castShadow = true
    scene.add( directionalLight );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.gammaOutput = true;

    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional
    controls.target = new THREE.Vector3(0, 0, 0)

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    controls.enablePan = false
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = 1;
    controls.maxPolarAngle = 1.5;
    controls.screenSpacePanning = false;
    controls.minDistance = 25;
    controls.maxDistance = 35;

    // controls.maxPolarAngle = Math.PI / 2;



}

window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};


function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    controls.update()
}
init()
animate()