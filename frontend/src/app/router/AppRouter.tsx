import {AuthorizationPage} from "app/authorizationPage/AuthorizationPage.component";
import {Chatbot} from "app/chatbot/Chatbot.component";
import {DocumentEditor} from "app/documentEditor/DocumentEditor.component";
import React, {FC, ReactElement} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const AppRouter: FC = (): ReactElement => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<AuthorizationPage />} />
			<Route path="/documents" element={<DocumentEditor />} />
			<Route path="/chat" element={<Chatbot />} />
		</Routes>
	</BrowserRouter>
);
