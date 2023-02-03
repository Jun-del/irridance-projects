import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 15, 50);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
// controls.dampingFactor = 0.05;
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
	alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Lights
 */
const sunLight = new THREE.DirectionalLight(new THREE.Color("#FFFFFF").convertSRGBToLinear(), 3.5);
sunLight.position.set(10, 20, 10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 512;
sunLight.shadow.mapSize.height = 512;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 100;
sunLight.shadow.camera.left = -10;
sunLight.shadow.camera.bottom = -10;
sunLight.shadow.camera.top = 10;
sunLight.shadow.camera.right = 10;
scene.add(sunLight);

/**
 * Async function that calls itself
 */
(async function () {
	let pmrem = new THREE.PMREMGenerator(renderer);
	// https://polyhaven.com/a/industrial_sunset_02_puresky
	let envMap = await new RGBELoader().setDataType(THREE.FloatType).loadAsync("/envmap.hdr");
	let envMapTexture = pmrem.fromEquirectangular(envMap).texture;

	let textureLoader = new THREE.TextureLoader();
	let textures = {
		bump: await textureLoader.loadAsync("/earth_bump.jpg"),
		specular: await textureLoader.loadAsync("/earth_specular.jpg"),
		map: await textureLoader.loadAsync("/earth_map.jpg"),
	};

	let sphere = new THREE.Mesh(
		new THREE.SphereGeometry(10, 70, 70),
		new THREE.MeshPhysicalMaterial({
			bumpMap: textures.bump,
			roughnessMap: textures.specular,
			map: textures.map,
			bumpScale: 0.1,

			envMap: envMapTexture,
			envMapIntensity: 0.4,

			sheen: 1,
			sheenRoughness: 0.5,
			sheenColor: new THREE.Color("#ff8a00").convertSRGBToLinear(),
			clearcoat: 0.5,
		}),
	);
	sphere.rotation.y += Math.PI;
	sphere.receiveShadow = true;
	scene.add(sphere);

	renderer.setAnimationLoop(() => {
		controls.update();
		renderer.render(scene, camera);
	});
})();