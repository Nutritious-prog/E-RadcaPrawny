import {COLORS} from "assets/colors";
import LoginSecondPanelImage from "assets/images/LoginSecondPanelImage.svg";
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
		<div className="flex flex-col w-1/2 h-full items-center m-auto">
			<div className="flex w-full text-3xl px-12">{`LOGO`}</div>
			<div className="flex flex-col w-full h-full items-center gap-y-12 m-[-4.5rem] justify-center">
				<div className="flex justify-center text-BLACK text-3xl font-extrabold text-justify">{`Witamy!`}</div>
				<CustomInput
					className="w-80 h-12"
					label="Email"
					inputType="email"
					icon={faEnvelope}
					placeholder="Wpisz swój email"
					value={props.userEmail}
					setValue={props.setUserEmail}
				/>
				<CustomInput
					className="w-80 h-12"
					label="Hasło"
					inputType="password"
					icon={faLock}
					placeholder="Wpisz swoje hasło"
					value={props.userPassword}
					setValue={props.setUserPassword}
				/>
				<CustomButton
					buttonColor={COLORS.BLACK}
					labelColor={COLORS.WHITE}
					borderColor={COLORS.BLACK}
					className="w-64 text-3xl"
					label="ZALOGUJ"
					onClick={() => console.log("Zaloguj się")}
				/>
			</div>
		</div>
	);

	const loginSecondSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full text-BLACK bg-TURQUOISE rounded-lg items-center justify-center gap-y-8">
			<div className="flex w-7/12 text-xl mx-auto text-justify">
				{`Zarządzaj rozporządzeniami łatwiej niż kiedykolwiek!`}
			</div>
			<img className="w-5/12 text-BLACK" src={LoginSecondPanelImage} alt="LoginSecondPanelImage" />
			<div className="flex w-7/12 text-xl mx-auto items-center">
				{`Nie masz jeszcze konta? Zarejestruj się i dołącz do naszej społeczności!`}
			</div>
			<CustomButton
				buttonColor={COLORS.TRANSPARENT}
				labelColor={COLORS.BLACK}
				className="w-64"
				label="ZAREJESTRUJ"
				onClick={() => console.log("Zarejestruj się")}
			/>
		</div>
	);

	return (
		<StyledLoginPanale>
			{loginMainSection}
			{loginSecondSection}
		</StyledLoginPanale>
	);
};
