import React, {Component, StrictMode} from "react";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
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
					<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
					/>
					<StrictMode>
						<AppRouter />
					</StrictMode>
				</AntdConfigProvider>
			</Provider>
		);
	}
}
