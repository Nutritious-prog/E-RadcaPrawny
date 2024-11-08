import React, { Component, StrictMode } from "react";
import { AppRouter } from "./app/router/AppRouter";
import { GlobalStyles } from "./GlobalStyle";
import { AntdConfigProvider } from "./AntdConfigProvider";

export default class App extends Component {
    render() {
        return (
            <AntdConfigProvider>
                <GlobalStyles />
                <StrictMode>
                    <AppRouter />
                </StrictMode>
            </AntdConfigProvider>
        );
    }
}
