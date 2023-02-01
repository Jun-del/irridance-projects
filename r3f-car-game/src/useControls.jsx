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
	}, [controls, vehicleApi, chassisApi]);

	return controls;
};

export default useControls;
