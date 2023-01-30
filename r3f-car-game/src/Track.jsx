import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";

export default function Track() {
	const model = useLoader(GLTFLoader, "/models/track.glb");
	const colorMap = useLoader(TextureLoader, "/textures/track.png");

	useEffect(() => {
		colorMap.anisotropy = 16;
	}, [colorMap]);

	let track = model.scene.children[0].geometry;

	return (
		<mesh>
			{/* Same as doing: mesh.geometry = geometry */}
			<primitive object={track} attach={"geometry"} />
			<meshBasicMaterial toneMapped={false} map={colorMap} />
		</mesh>
	);
}
