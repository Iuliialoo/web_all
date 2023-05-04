const div = document.querySelector('.threejs');

const type_selection = document.querySelector('.type-selection')
const color_selection = document.querySelector('.color-selection')
const size_selection = document.querySelector('.size-selection')

let size = 6;

color_selection.addEventListener('change', function(){  
    material_change.color.set(color_selection.value);
});

type_selection.addEventListener('change', function(){  
    if (type_selection.value == 'cube') {
        mesh_piramid.visible = false
        mesh_box.visible = true
        mesh_sphere.visible = false
    } else if (type_selection.value == 'sphere') {
        mesh_piramid.visible = false
        mesh_box.visible = false
        mesh_sphere.visible = true
    }
    else {
        mesh_piramid.visible = true
        mesh_box.visible = false
        mesh_sphere.visible = false
    }
});

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

camera.aspect = 540 / 300;
camera.updateProjectionMatrix();

renderer.setSize(540, 300);

}  

const material_change = new THREE.MeshPhongMaterial( { color: "green", flatShading: true } );

const scene = new THREE.Scene();
scene.background = new THREE.Color('gray');

const camera = new THREE.PerspectiveCamera(50, 540 / 300, 0.1, 100);
camera.position.set(0, 2, 20);
cameraTarget = new THREE.Vector3(5, 5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(540, 300);
div.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const geometry_box = new THREE.BoxGeometry( 6, 6, 6 );
const mesh_box = new THREE.Mesh( geometry_box, material_change );
mesh_box.position.set(0, 0, 0);
mesh_box.castShadow = true;
mesh_box.receiveShadow = true;
scene.add( mesh_box);

const geometry_sphere = new THREE.SphereGeometry( 6, 32, 16 ); 
const mesh_sphere = new THREE.Mesh( geometry_sphere, material_change ); 
mesh_sphere.position.set(0, 0, 0)
scene.add( mesh_sphere );


const geometry_piramid = new THREE.BufferGeometry();
const vertices = new Int8Array( [
    3, 0,  -3,
    3, 0, 3,
    -3, 0,  3, 

    -3, 0, -3, 
    3, 0,  -3,
    -3, 0,  3,

    3, 0, 3,
    3, 0,  -3,
    0, 5, 0,

    -3, 0,  3,
    3, 0, 3,
    0, 5, 0,

    -3, 0, -3, 
    -3, 0,  3,
    0, 5, 0,

    3, 0,  -3,
    -3, 0, -3, 
    0, 5, 0
] );

geometry_piramid.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
geometry_piramid.computeVertexNormals();
const mesh_piramid = new THREE.Mesh( geometry_piramid, material_change );
mesh_piramid.position.set(0, 0, 0);
mesh_piramid.castShadow = true;
mesh_piramid.receiveShadow = true;
scene.add( mesh_piramid);

mesh_box.visible = false
mesh_sphere.visible = false
// mesh_piramid.visible = false;

function animate() {
    requestAnimationFrame( animate );

    mesh_piramid.rotation.y += 0.01;
    mesh_piramid.rotation.x += 0.01;
    mesh_piramid.rotation.z += 0.01;

    mesh_box.rotation.y += 0.01;
    mesh_box.rotation.x += 0.01;
    mesh_box.rotation.z += 0.01;

    mesh_sphere.rotation.y += 0.01;
    mesh_sphere.rotation.x += 0.01;
    mesh_sphere.rotation.z += 0.01;

    renderer.render( scene, camera );
}
animate();
