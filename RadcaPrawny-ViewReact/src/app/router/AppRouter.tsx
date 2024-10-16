import {Chatbot} from "app/chatbot/Chatbot.component";
import {DocumentEditor} from "app/documentEditor/DocumentEditor.component";
import {LoginPage} from "app/login/LoginPage.component";
import React, {FC, ReactElement} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const AppRouter: FC = (): ReactElement => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LoginPage />} />
			<Route path="/documents" element={<DocumentEditor />} />
			<Route path="/chat" element={<Chatbot />} />
		</Routes>
	</BrowserRouter>
);
