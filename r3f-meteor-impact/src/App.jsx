import React, { Suspense, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import Scene from "./Scene";
import Meteor from "./Meteor";
import Beams from "./Beam";
import { NodeToyTick } from "@nodetoy/react-nodetoy";

function App() {
  const state = useThree();

  useEffect(() => {
    state.gl.toneMappingExposure = 5;
  }, [state.gl]);

  return (
    <>
      <Environment
        background={"only"}
        files={"/textures/envmap_blur.hdr"}
        gorund={{ height: 100, radius: 300 }}
      />

      <Environment background={false} files={"/textures/envmap.hdr"} />

      <PerspectiveCamera makeDefault fov={33} position={[-0.07, 16.41, -24.1]} />
      <OrbitControls target={[0.02, 0.806, 0.427]} maxPolarAngle={Math.PI * 0.45} />

      <NodeToyTick />

      <Suspense fallback={null}>
        <Scene />
        <Meteor />
        <Beams />
      </Suspense>
    </>
  );
}

export default App;
