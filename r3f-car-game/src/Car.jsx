import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useWheels } from "./UseWheels";
import { WheelDebug } from "./WheelDebug";
import { Quaternion, Vector3 } from "three";
import useControls from "./useControls";

export default function Car({ thirdPerson }) {
	let model = useLoader(GLTFLoader, "/models/car.glb", (loader) => {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath("./draco/");
		loader.setDRACOLoader(dracoLoader);
	});
	let car = model.scene;

	const position = [-1.5, 0.1, 3];
	const width = 0.15;
	const height = 0.07;
	const front = 0.15;
	const wheelRadius = 0.05;

	/* This code is creating a box-shaped body for a physics engine. 
	The useBox() function takes two arguments: a function that sets the properties of the body, and a reference to the body. 
	The properties being set are the width, height, and front of the chassis (front * 2 because it is two-sided), 
	whether or not it can sleep (false), its mass (150), and its position.*/
	const chassisBodyArgs = [width, height, front * 2];
	const [chassisBody, chassisApi] = useBox(
		() => ({
			allowSleep: false,
			args: chassisBodyArgs,
			mass: 200,
			position,
		}),
		useRef(null),
	);

	const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

	const [vehicle, vehicleApi] = useRaycastVehicle(
		() => ({
			chassisBody,
			wheelInfos,
			wheels,
		}),
		useRef(null),
	);

	useControls(vehicleApi, chassisApi);

	useFrame((state) => {
		// Dont do anything if we are not in third person mode
		if (!thirdPerson) return;

		// Get the position and rotation of the chassis
		let position = new Vector3(0, 0, 0);
		position.setFromMatrixPosition(chassisBody.current.matrixWorld);

		let quaternion = new Quaternion(0, 0, 0, 0);
		quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

		// Calculate the direction the car is facing
		let wDir = new Vector3(0, 0, 1);
		wDir.applyQuaternion(quaternion);
		wDir.normalize();

		// Calculate the position of the camera
		let cameraPosition = position
			.clone()
			.add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

		// Set the camera position and rotation
		wDir.add(new Vector3(0, 0.2, 0));
		state.camera.position.copy(cameraPosition);
		state.camera.lookAt(position);
	});

	useEffect(() => {
		car.scale.set(0.0012, 0.0012, 0.0012);
		car.children[0].position.set(-365, -18, -67);
	}, [car]);

	return (
		<group ref={vehicle} name="vehicle">
			<group ref={chassisBody} name="chassisBody">
				<primitive object={car} rotation-y={Math.PI} position={[0, -0.09, 0]} />
			</group>

			{/* <mesh ref={chassisBody}>
				<meshBasicMaterial transparent={true} opacity={0.3} />
				<boxGeometry args={chassisBodyArgs} />
			</mesh> */}

			<WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
		</group>
	);
}
