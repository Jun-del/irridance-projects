import "./main.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import Experience from "./Experience";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
	<Canvas>
		<Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
			<Experience />
		</Physics>
	</Canvas>,
);
