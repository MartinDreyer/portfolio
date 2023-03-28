import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let renderer, camera, scene, transformControl, textGeo, clock, controls,circleGeometry,planeMaterial,plane;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera)

    clock = new THREE.Clock()

    circleGeometry = new THREE.CircleGeometry(10,100)
    planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xFF0000,
        side: THREE.DoubleSide
    })

    plane = new THREE.Mesh(circleGeometry,planeMaterial);
    scene.add(plane)
    plane.rotation.x =  -0.5 * Math.PI;




    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.gammaOutput = true;

    transformControl = new TransformControls(camera, renderer.domElement);
    scene.add(transformControl);
    document.body.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional

    controls.target = new THREE.Vector3(0, 0.6, 0)
    camera.position.set(0, 5, 15)


    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    controls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 1;
    controls.maxDistance = 20;

    // controls.maxPolarAngle = Math.PI / 2;

    transformControl.addEventListener('dragging-changed', function (event) {

        controls.enabled = !event.value;

    });

}

window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};

let reverse = false


function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

    controls.update()
}
init()
animate()