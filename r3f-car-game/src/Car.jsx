import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useLoader, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useWheels } from "./UseWheels";
import { WheelDebug } from "./WheelDebug";

export default function Car() {
	let model = useLoader(GLTFLoader, "/models/car.glb");
	let car = model.scene;

	const position = [-1.5, 0.5, 3];
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
			mass: 150,
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

	useEffect(() => {
		car.scale.set(0.0012, 0.0012, 0.0012);
		car.children[0].position.set(-365, -18, -67);
	}, [car]);

	return (
		<group ref={vehicle} name="vehicle">
			<mesh ref={chassisBody}>
				<meshBasicMaterial transparent={true} opacity={0.3} />
				<boxGeometry args={chassisBodyArgs} />
			</mesh>

			<WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
			<WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
		</group>
	);
}
