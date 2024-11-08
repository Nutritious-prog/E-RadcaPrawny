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
			<div className="flex w-full text-5xl px-12">{`LOGO`}</div>
			<div className="flex flex-col w-full h-full items-center gap-y-12 m-[-6rem] justify-center">
				<div className="flex justify-center text-BLACK text-4xl font-extrabold text-justify font-extrabold">
					{`Witamy!`}
				</div>
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
					fontBold
				/>
			</div>
		</div>
	);

	const loginSecondSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full text-BLACK bg-TURQUOISE rounded-lg items-center justify-center gap-y-8">
			<div className="flex w-7/12 text-[1.25rem] mx-auto text-center font-semibold">
				{`Zarządzaj rozporządzeniami łatwiej niż kiedykolwiek!`}
			</div>
			<img className="w-1/2 text-BLACK" src={LoginSecondPanelImage} alt="LoginSecondPanelImage" />
			<div className="flex flex-col w-7/12 text-[1.25rem] mx-auto items-center text-center font-semibold">
				<div>{`Nie masz jeszcze konta?`}</div>
				<div>{`Zarejestruj się i dołącz do naszej społeczności!`}</div>
			</div>
			<CustomButton
				buttonColor={COLORS.TRANSPARENT}
				labelColor={COLORS.BLACK}
				className="w-64"
				label="ZAREJESTRUJ"
				onClick={() => console.log("Zarejestruj się")}
				fontBold
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
