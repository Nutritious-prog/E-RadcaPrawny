import React, {FC, ReactElement, useState} from "react";
import {StyledLoginPage} from "./LoginPage.style";
import {LoginPanel} from "./loginPanel/LoginPanel.component";

export const LoginPage: FC = (): ReactElement => {
	const [userEmail, setUserEmail] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");

	return (
		<StyledLoginPage>
			<div className="login-page-box">
				<LoginPanel
					userEmail={userEmail}
					setUserEmail={setUserEmail}
					userPassword={userPassword}
					setUserPassword={setUserPassword}
				/>
			</div>
		</StyledLoginPage>
	);
};
