import React, {Component, StrictMode} from "react";
import {Provider} from "react-redux";
import {AntdConfigProvider} from "./AntdConfigProvider";
import store from "./app/redux/store";
import {AppRouter} from "./app/router/AppRouter";
import {GlobalStyles} from "./GlobalStyle";

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<AntdConfigProvider>
					<GlobalStyles />
					<StrictMode>
						<AppRouter />
					</StrictMode>
				</AntdConfigProvider>
			</Provider>
		);
	}
}
