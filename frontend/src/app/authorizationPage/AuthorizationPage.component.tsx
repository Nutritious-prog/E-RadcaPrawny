import React, {FC, ReactElement, useState} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import {StyledAuthotizationPage} from "./AuthorizationPage.style";
import {AuthorizationPanelType} from "./AuthotizationPage.utils";
import {LoginPanel} from "./loginPanel/LoginPanel.component";
import {RegisterPanel} from "./registerPanel/RegisterPanel.component";

export const AuthorizationPage: FC = (): ReactElement => {
	const [userEmail, setUserEmail] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");
	const [currentPanel, setCurrentPanel] = useState<AuthorizationPanelType>(AuthorizationPanelType.Login);

	const onChangePanelClickHandler = () => {
		setUserEmail("");
		setUserPassword("");
		setCurrentPanel((prevType: AuthorizationPanelType) =>
			prevType === AuthorizationPanelType.Login ? AuthorizationPanelType.Register : AuthorizationPanelType.Login,
		);
	};

	const LoginPage: ReactElement = (
		<LoginPanel
			userEmail={userEmail}
			setUserEmail={setUserEmail}
			userPassword={userPassword}
			setUserPassword={setUserPassword}
			onChangePanelClickHandler={onChangePanelClickHandler}
		/>
	);

	const RegisterPage: ReactElement = (
		<RegisterPanel
			userEmail={userEmail}
			setUserEmail={setUserEmail}
			userPassword={userPassword}
			setUserPassword={setUserPassword}
			onChangePanelClickHandler={onChangePanelClickHandler}
		/>
	);

	return (
		<StyledAuthotizationPage>
			<SwitchTransition>
				<CSSTransition key={currentPanel} timeout={300} classNames="authorization-page-box">
					<div className="authorization-page-box">
						{currentPanel === AuthorizationPanelType.Login ? LoginPage : RegisterPage}
					</div>
				</CSSTransition>
			</SwitchTransition>
		</StyledAuthotizationPage>
	);
};
