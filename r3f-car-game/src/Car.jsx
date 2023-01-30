import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Car() {
	let model = useLoader(GLTFLoader, "/models/car.glb");
	let car = model.scene;

	useEffect(() => {
		car.scale.set(0.0012, 0.0012, 0.0012);
		car.children[0].position.set(-365, -18, -67);
	}, [car]);

	return <primitive object={car} rotation-y={Math.PI} />;
}
