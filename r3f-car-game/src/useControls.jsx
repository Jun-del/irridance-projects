import { useEffect, useState } from "react";

const useControls = (vehicleApi, chassisApi) => {
	let [controls, setControls] = useState({
		//
	});

	useEffect(() => {
		const keyDownPressHandler = (e) => {
			setControls((controls) => ({
				...controls,
				[e.key.toLowerCase()]: true,
			}));
		};

		const KeyUpPressHandler = (e) => {
			setControls((controls) => ({
				...controls,
				[e.key.toLowerCase()]: false,
			}));
		};

		window.addEventListener("keydown", keyDownPressHandler);
		window.addEventListener("keyup", KeyUpPressHandler);

		return () => {
			window.removeEventListener("keydown", keyDownPressHandler);
			window.removeEventListener("keyup", KeyUpPressHandler);
		};
	}, []);

	useEffect(() => {
		switch (true) {
			case controls["w"]:
				vehicleApi.applyEngineForce(150, 2);
				vehicleApi.applyEngineForce(150, 3);
				break;
			case controls["s"]:
				vehicleApi.applyEngineForce(-150, 2);
				vehicleApi.applyEngineForce(-150, 3);
				break;
			default:
				vehicleApi.applyEngineForce(0, 2);
				vehicleApi.applyEngineForce(0, 3);
		}

		switch (true) {
			case controls["a"]:
				vehicleApi.setSteeringValue(0.35, 2);
				vehicleApi.setSteeringValue(0.35, 3);
				vehicleApi.setSteeringValue(-0.1, 0);
				vehicleApi.setSteeringValue(-0.1, 1);
				break;
			case controls["d"]:
				// Steer right
				vehicleApi.setSteeringValue(-0.35, 2);
				vehicleApi.setSteeringValue(-0.35, 3);
				vehicleApi.setSteeringValue(0.1, 0);
				vehicleApi.setSteeringValue(0.1, 1);
				break;
			default:
				for (let i = 0; i < 4; i++) {
					vehicleApi.setSteeringValue(0, i);
				}
		}

		// Apply local impulse to the center of mass of the chassis, in both sides
		if (controls.arrowdown) {
			chassisApi.applyLocalImpulse([0, -3, 0], [0, 0, +0.5]);
		}
		if (controls.arrowup) {
			chassisApi.applyLocalImpulse([0, -3, 0], [0, 0, -0.5]);
		}
		if (controls.arrowleft) {
			chassisApi.applyLocalImpulse([0, -3, 0], [-0.5, 0, 0]);
		}
		if (controls.arrowright) {
			chassisApi.applyLocalImpulse([0, -3, 0], [+0.5, 0, 0]);
		}

		// Reset the car position and rotation to the initial position
		if (controls.r) {
			chassisApi.position.set(-1.5, 0.5, 3);
			chassisApi.velocity.set(0, 0, 0);
			chassisApi.angularVelocity.set(0, 0, 0);
			chassisApi.rotation.set(0, 0, 0);
		}
	}, [controls, vehicleApi, chassisApi]);

	return controls;
};

export default useControls;
