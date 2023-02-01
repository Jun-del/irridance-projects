import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import ColliderBox from "./ColliderBox";
import Ramp from "./Ramp";

export default function Track() {
	const model = useLoader(GLTFLoader, "/models/track.glb");
	const colorMap = useLoader(TextureLoader, "/textures/track.png");

	// By setting anisotropy to 16, the texture will be filtered with a maximum degree of directional dependence of 16, meaning that the texture will appear more detailed and less blurry when viewed from certain angles.
	useEffect(() => {
		colorMap.anisotropy = 16;
	}, [colorMap]);

	let track = model.scene.children[0].geometry;

	return (
		<>
			<mesh geometry={track}>
				{/* Same as doing: mesh.geometry = geometry */}
				{/* <primitive object={track} attach={"geometry"} /> */}
				<meshBasicMaterial toneMapped={false} map={colorMap} />
			</mesh>

			{/* Trees */}
			<ColliderBox position={[1.75, 0, 0.5]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[2.5, 0, -1.4]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[0.6, 0, -3.8]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-1.95, 0, -5.18]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-5.55, 0, -3.05]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-4.4, 0, -1.77]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-7.03, 0, -0.76]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-4.75, 0, 2.73]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-3.05, 0, 3.4]} scale={[0.3, 1, 0.3]} />
			<ColliderBox position={[-0.83, 0, 3.2]} scale={[0.3, 1, 0.3]} />

			{/* Arc Stand */}
			<ColliderBox position={[-1.85, 0.24, 0.385]} scale={[0.05, 0.5, 0.13]} />
			<ColliderBox position={[-1.85, 0.24, -0.385]} scale={[0.05, 0.5, 0.13]} />
			<ColliderBox position={[-2.28, 0.24, 0.385]} scale={[0.05, 0.5, 0.13]} />
			<ColliderBox position={[-2.28, 0.24, -0.385]} scale={[0.05, 0.5, 0.13]} />
			<ColliderBox position={[-4.39, 0.24, 1.125]} scale={[0.13, 0.5, 0.13]} />
			<ColliderBox position={[-4.39, 0.24, 1.9]} scale={[0.13, 0.5, 0.13]} />

			{/* gazebo */}
			<ColliderBox position={[-2.86, 0.17, -0.9]} scale={[0.35, 0.45, 0.35]} />
			<ColliderBox position={[-3.33, 0.17, -0.9]} scale={[0.35, 0.45, 0.35]} />
			<ColliderBox position={[0.41, 0.17, 2]} scale={[0.35, 0.45, 0.35]} />

			{/* Seat */}
			<ColliderBox position={[-2.3, 0.23, -2.76]} scale={[1.414, 0.9, 1.075]} />

			{/* Road Sign */}
			<ColliderBox position={[-3.08, 0.07, 0.89]} scale={[0.36, 0.2, 0.03]} />
			<ColliderBox position={[-2.53, 0.07, 0.89]} scale={[0.36, 0.2, 0.03]} />

			{/* Turn Sign */}
			<ColliderBox position={[-4.515, 0, -0.64]} scale={[0.1, 0.5, 0.1]} />
			<ColliderBox position={[-4.15, 0, -0.67]} scale={[0.1, 0.5, 0.1]} />
			<ColliderBox position={[-4.89, 0, -0.56]} scale={[0.1, 0.5, 0.1]} />
			<ColliderBox position={[-0.3, 0, 1]} scale={[0.1, 0.5, 0.1]} />

			{/* Ramp */}
			<Ramp />
		</>
	);
}
