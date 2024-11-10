import React, {Component, StrictMode} from "react";
import {AppRouter} from "./app/router/AppRouter";
import {GlobalStyles} from "./GlobalStyle";

export default class App extends Component {
	render() {
		return (
			<>
				<GlobalStyles />
				<StrictMode>
					<AppRouter />
				</StrictMode>
			</>
		);
	}
}
