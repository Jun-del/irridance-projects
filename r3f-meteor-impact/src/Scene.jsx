import { useGLTF, useTexture } from "@react-three/drei";

const meshData = [
  { geometry: "ground", texture: "ground" },
  { geometry: "ground2", texture: "ground2" },
  { geometry: "ground_debris", texture: "ground_debris" },
  { geometry: "pipes_and_rover", texture: "pipes_and_rover" },
  { geometry: "astronauts_white", texture: "astronauts_white" },
  { geometry: "astronauts_orange", texture: "astronauts_orange" },
  { geometry: "fragments", texture: "fragments" },
  { geometry: "debris", texture: "debris" },
];

function Mesh({ geometry, texture, nodes, textures }) {
  // find the index of the texture in the meshData array based on the geometry name
  const textureIndex = meshData.findIndex((x) => x.geometry === geometry);

  return (
    <mesh geometry={nodes[geometry].geometry}>
      {texture && <meshBasicMaterial map={textures[textureIndex]} />}
    </mesh>
  );
}

export default function Scene() {
  const { nodes } = useGLTF("/models/scene.glb", true);

  const textures = useTexture(meshData.map((data) => `/textures/${data.texture}.png`));

  return (
    <>
      {meshData.map((data) => (
        <Mesh
          key={data.geometry}
          geometry={data.geometry}
          texture={data.texture}
          nodes={nodes}
          textures={textures}
        />
      ))}

      <mesh geometry={nodes.astronauts_visors.geometry}>
        <meshStandardMaterial roughness={0} metalness={1} color={"#b68432"} />
      </mesh>
    </>
  );
}

/**
 * Irradiance
 * 
 import { useGLTF, useTexture } from "@react-three/drei";

export default function Scene() {
	const { nodes } = useGLTF("/models/scene.glb");

	const [
		ground,
		ground2,
		ground_debris,
		pipes_and_rover,
		astronauts_white,
		astronauts_orange,
		fragments,
		debris,
	] = useTexture([
		"/textures/ground.png",
		"/textures/ground2.png",
		"/textures/ground_debris.png",
		"/textures/pipes_and_rover.png",
		"/textures/astronauts_white.png",
		"/textures/astronauts_orange.png",
		"/textures/fragments.png",
		"/textures/debris.png",
	]);

	return (
		<>
			<mesh geometry={nodes.ground.geometry}>
				<meshBasicMaterial map={ground} />
			</mesh>

			<mesh geometry={nodes.ground2.geometry}>
				<meshBasicMaterial map={ground2} />
			</mesh>

			<mesh geometry={nodes.ground_debris.geometry}>
				<meshBasicMaterial map={ground_debris} />
			</mesh>

			<mesh geometry={nodes.pipes_and_rover.geometry}>
				<meshBasicMaterial map={pipes_and_rover} />
			</mesh>

			<mesh geometry={nodes.astronauts_white.geometry}>
				<meshBasicMaterial map={astronauts_white} />
			</mesh>

			<mesh geometry={nodes.astronauts_orange.geometry}>
				<meshBasicMaterial map={astronauts_orange} />
			</mesh>

			<mesh geometry={nodes.fragments.geometry}>
				<meshBasicMaterial map={fragments} />
			</mesh>

			<mesh geometry={nodes.debris.geometry}>
				<meshBasicMaterial map={debris} />
			</mesh>

			<mesh geometry={nodes.astronauts_visors.geometry}>
				<meshStandardMaterial roughness={0} metalness={1} color={"#b68432"} />
			</mesh>
		</>
	);
} 

 */
