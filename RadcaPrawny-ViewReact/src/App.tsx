import React, { Component, StrictMode } from "react";
import { AppRouter } from "./app/router/AppRouter";

export default class App extends Component {
	render() {
		return (
			<StrictMode>
				<AppRouter />
			</StrictMode>
		);
	}
}
