import * as THREE from "./three.js-dev/build/three.module.js"
import { GUI } from "./three.js-dev/examples/jsm/libs/dat.gui.module.js";

export function practical_task() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000)

  
    const renderer = new THREE.WebGLRenderer();
    const loader = new THREE.TextureLoader();

    renderer.setSize(window.innerWidth, window.innerHeight);

    //Geometry
    const geometry = new THREE.SphereGeometry;
    const material = new THREE.MeshPhongMaterial( {
        map: loader.load( "./practical.jpg"),
    });
    const sphere = new THREE.Mesh( geometry, material);
    sphere.position.z =-10
  
    scene.add(sphere);
  
    const point_light = new THREE.PointLight(0xfcba03, 1, 100);
    point_light.position.set(0,0,5);
    scene.add(point_light);

   
    const gui = new GUI();
    const gui_container = gui.addFolder("Control spins");
    let params = {
        x: 1,
        y: 1,
        z: 1,
    };
    let x1 = params.x;
    let y1 = params.y;
    let z1 = params.z;
    gui_container.add(params, "x", 1, 1000).step(1).onChange(function(value){
        console.log(value);
        x1 = value;
    });

    gui_container.add(params, "y", 1, 1000).step(1).onChange(function(value){
        console.log(value);
        y1 = value;
    });
    gui_container.add(params, "z", 1, 1000).step(1).onChange(function(value){
        console.log(value);
        z1 = value;
    });


    gui_container.open();

    let mesh;
    let mesh_arr = [];
    for(let this_x = -4; this_x < 0; this_x++ ){
        for (let this_y = -2; this_y < 0; this_y++){
            mesh = sphere.clone();
            mesh.position.set(this_x * 3, this_y *3, -20);
            scene.add(mesh);
            mesh_arr.push(mesh);
        }
    }

    renderer.setAnimationLoop(function(){
        sphere.rotation.x += Math.PI / x1;
        sphere.rotation.y += Math.PI / y1;
        sphere.rotation.z += Math.PI / z1;
        mesh_arr.forEach(function(mesh){
            mesh.rotation.x += Math.PI / 100;
        });
        renderer.render(scene, camera);
    });

    document.body.appendChild(renderer.domElement);
    }