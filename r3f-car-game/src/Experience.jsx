import { Circle, Environment, OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";

import Ground from "./Ground";
import Track from "./Track";
import Car from "./Car";

export default function Experience() {
	const [thirdPerson, setThirdPerson] = useState(false);
	const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

	useEffect(() => {
		function keydownHandler(e) {
			e.preventDefault();
			if (e.key == "Tab" || e.key == "Shift") {
				// random is necessary to trigger a state change
				if (thirdPerson) setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
				setThirdPerson(!thirdPerson);
			}
		}

		window.addEventListener("keydown", keydownHandler);
		return () => window.removeEventListener("keydown", keydownHandler);
	}, [thirdPerson]);

	return (
		<Suspense fallback={null}>
			<Environment files={"/textures/envmap.hdr"} background={"both"} />
			<PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
			{!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
			<OrbitControls target={[-2.64, -0.71, 0.03]} />

			{/* <Circle rotation={[-Math.PI / 2, 0, 0]} position={[-2.3, -0.2, -1.4]} args={[6, 10]} /> */}

			<Ground />
			<Track />
			<Car thirdPerson={thirdPerson} />
		</Suspense>
	);
}
