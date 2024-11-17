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
	onChangePanelClickHandler: () => void;
}

export const LoginPanel: FC<LoginPanelProps> = (props: LoginPanelProps): ReactElement => {
	const loginMainSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full items-center m-auto">
			<div className="flex w-full text-extra_lg px-12 mt-[2rem]">{`LOGO`}</div>
			<div className="flex flex-col w-full h-full items-center gap-y-12 m-[-6rem] justify-center">
				<div className="flex justify-center text-BLACK text-xl font-extrabold text-justify font-roboto-serif font-extrabold">
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
					className="w-80 h-[3.25rem]"
					label="ZALOGUJ SIĘ"
					onClick={() => console.log("Login")}
					fontBold
				/>
			</div>
		</div>
	);

	const loginSecondSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full text-BLACK bg-TURQUOISE rounded-lg items-center justify-center gap-y-8">
			<div className="flex w-7/12 text-[1.125rem] mx-auto font-semibold">
				{`Zarządzaj rozporządzeniami łatwiej niż kiedykolwiek!`}
			</div>
			<img className="text-BLACK" src={LoginSecondPanelImage} alt="LoginSecondPanelImage" />
			<div className="flex flex-col w-7/12 text-[1.125rem] mx-auto font-semibold">
				<div>{`Nie masz jeszcze konta? Zarejestruj się i dołącz do naszej społeczności!`}</div>
			</div>
			<CustomButton
				buttonColor={COLORS.TRANSPARENT}
				labelColor={COLORS.BLACK}
				className="w-80 h-[3.25rem]"
				label="ZAREJESTRUJ SIĘ"
				onClick={props.onChangePanelClickHandler}
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
