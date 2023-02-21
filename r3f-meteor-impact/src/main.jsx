import { Canvas } from "@react-three/fiber";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Canvas className="webgl">
      <App />
    </Canvas>
  </React.StrictMode>
);
