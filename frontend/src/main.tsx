import "./index.css";
import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ToastContainer} from "react-toastify";
import App from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
