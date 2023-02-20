import { useGLTF, useTexture } from "@react-three/drei";

export default function Scene() {
	const { nodes } = useGLTF("/models/scene.glb");

	const [ground] = useTexture(["/textures/ground.png"]);

	return (
		<>
			<mesh geometry={nodes.ground.geometry}>
				<meshBasicMaterial map={ground} />
			</mesh>
		</>
	);
}
