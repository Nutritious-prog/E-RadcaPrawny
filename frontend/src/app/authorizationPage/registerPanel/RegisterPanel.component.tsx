import {COLORS} from "assets/colors";
import RegisterSecondPanelImage from "assets/images/RegisterSecondPanelImage.svg";
import {CustomButton} from "components/CustomButton/CustomButton.component";
import React, {FC, ReactElement, useState} from "react";
import {toast} from "react-toastify";
import {CustomInput} from "@/components/CustomInput/CustomInput.component";
import {ApiResponse} from "@/utils/axiosUtils/ApiResponse.dto";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {UserDTO} from "../AuthorizationPage.dto";
import {AuthorizationPageService} from "../AuthorizationPage.service";
import {StyledRegisterPanal} from "./RegisterPanel.style";

interface RegisterPanelProps {
	userEmail: string;
	setUserEmail: (email: string) => void;
	userPassword: string;
	setUserPassword: (password: string) => void;
	onChangePanelClickHandler: () => void;
}

export const RegisterPanel: FC<RegisterPanelProps> = (props: RegisterPanelProps): ReactElement => {
	const [repeatedPassword, setRepeatedPassword] = useState<string>("");

	const validateIdenticalPasswords = (password: string, confirmPassword: string): boolean => {
		return password === confirmPassword && password.length > 0;
	}

	const onRegisterClickHandler = async () => {

		const userDTO: UserDTO = {
			email: props.userEmail,
			password: props.userPassword,
		};

		if (!validateIdenticalPasswords(props.userPassword, repeatedPassword)) {
			toast.error("Hasła nie są identyczne");
			return;
		}

		const response: ApiResponse<any> = await AuthorizationPageService.registerUserRest(userDTO);

		if (response.success) {
			toast.success("Zarejestrowano pomyślnie");
			props.onChangePanelClickHandler();
		} else {
			toast.error("Nie udało się zarejestrować. Spróbuj ponownie");
		}
	};

	const registerMainSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full items-center m-auto">
			<div className="flex flex-col w-full h-full items-center gap-y-12 justify-center">
				<div className="flex justify-center text-BLACK text-extra_lg font-extrabold text-justify font-roboto-serif">
					{`Stwórz Konto`}
				</div>
				<CustomInput
					className="w-8/12 h-12"
					label="Email"
					inputType="email"
					icon={faEnvelope}
					placeholder="Wpisz swój email"
					value={props.userEmail}
					setValue={props.setUserEmail}
				/>
				<CustomInput
					className="w-8/12 h-12"
					label="Hasło"
					inputType="password"
					icon={faLock}
					placeholder="Wpisz swoje hasło"
					value={props.userPassword}
					setValue={props.setUserPassword}
				/>
				<CustomInput
					className="w-8/12 h-12"
					label="Powtórz hasło"
					inputType="password"
					icon={faLock}
					placeholder="Powtórz swoje hasło"
					value={repeatedPassword}
					setValue={setRepeatedPassword}
				/>
				<CustomButton
					buttonColor={COLORS.BLACK}
					labelColor={COLORS.WHITE}
					borderColor={COLORS.BLACK}
					className="w-8/12 h-[3.25rem]"
					label="ZAREJESTRUJ SIĘ"
					onClick={onRegisterClickHandler}
					fontBold
				/>
			</div>
		</div>
	);

	const registerSecondSection: ReactElement = (
		<div className="flex flex-col w-7/12 h-full items-center bg-TURQUOISE rounded-lg m-auto">
			<div className="flex flex-col w-full h-full text-BLACK items-center justify-center gap-y-6">
				<div className="flex w-9/12 text-bg mx-auto font-semibold">
					{`Edytuj treści, dodawaj słowa kluczowe i skorzystaj z inteligentnego asystenta, aby ułatwić sobie pracę z ustawami.`}
				</div>
				<img className="text-BLACK w-5/12" src={RegisterSecondPanelImage} alt="RegisterSecondPanelImage" />
				<div className="flex flex-col w-8/12 text-bg mx-auto items-center text-center font-semibold">
					<div>{`Masz już konto? Zaloguj się, aby rozpocząć pracę.`}</div>
				</div>
				<CustomButton
					buttonColor={COLORS.TRANSPARENT}
					labelColor={COLORS.BLACK}
					className="w-8/12 h-[3.25rem]"
					label="ZALOGUJ SIĘ"
					onClick={props.onChangePanelClickHandler}
					fontBold
				/>
			</div>
		</div>
	);

	return (
		<StyledRegisterPanal>
			{registerSecondSection}
			{registerMainSection}
		</StyledRegisterPanal>
	);
};
