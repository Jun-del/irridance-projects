import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";

import Ground from "./Ground";
import Track from "./Track";
import Car from "./Car";

export default function Experience() {
	return (
		<Suspense fallback={null}>
			<Environment files={"/textures/envmap5.hdr"} background={"both"} />
			<PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
			<OrbitControls target={[-2.64, -0.71, 0.03]} />

			<Ground />
			<Track />
			<Car />
		</Suspense>
	);
}
