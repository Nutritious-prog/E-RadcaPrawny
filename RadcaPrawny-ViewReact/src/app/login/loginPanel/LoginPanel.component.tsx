import {CustomButton} from "components/CustomButton/CustomButton.component";
import React, {FC, ReactElement} from "react";
import {CustomInput} from "@/components/CustomInput/CustomInput.component";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {StyledLoginPanale} from "./LoginPanel.style";

interface LoginPanelProps {
	userEmail: string;
	setUserEmail: (email: string) => void;
	userPassword: string;
	setUserPassword: (password: string) => void;
}

export const LoginPanel: FC<LoginPanelProps> = (props: LoginPanelProps): ReactElement => {
	const loginMainSection: ReactElement = (
		<div className="flex flex-col w-7/12 h-full items-center gap-y-12 m-auto">
			<div className="flex flex-col w-full h-full items-center justify-center gap-y-12 m-auto">
				<div className="flex justify-center text-DARK_TURQUOISE text-3xl font-extrabold">
					{`Zaloguj się do...`}
				</div>
				<CustomInput
					className="w-64"
					label="Email"
					inputType="email"
					icon={faEnvelope}
					placeholder="Wpisz swój email"
					value={props.userEmail}
					setValue={props.setUserEmail}
				/>
				<CustomInput
					className="w-64"
					label="Hasło"
					inputType="password"
					icon={faLock}
					placeholder="Wpisz swoje hasło"
					value={props.userPassword}
					setValue={props.setUserPassword}
				/>
				<CustomButton className="w-64" label="Zaloguj się" onClick={() => console.log("Zaloguj się")} />
			</div>
		</div>
	);

	const loginSecondSection: ReactElement = <div className="flex flex-col w-5/12 h-full m-auto"></div>;

	return (
		<StyledLoginPanale>
			{loginMainSection}
			{loginSecondSection}
		</StyledLoginPanale>
	);
};
