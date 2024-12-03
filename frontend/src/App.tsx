import React, {Component, StrictMode} from "react";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import {PersistGate} from 'redux-persist/integration/react';
import {AntdConfigProvider} from "./AntdConfigProvider";
import store, {persistor} from "./app/redux/store";
import {AppRouter} from "./app/router/AppRouter";
import {GlobalStyles} from "./GlobalStyle";

export default class App extends Component {
	render() {
		return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
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
                </PersistGate>
            </Provider>
		);
	}
}
