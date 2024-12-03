import {COLORS} from "assets/colors";
import LoginSecondPanelImage from "assets/images/LoginSecondPanelImage.svg";
import {CustomButton} from "components/CustomButton/CustomButton.component";
import React, {FC, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {setUser} from "@/app/redux/userRole/userRole.slice";
import {CustomInput} from "@/components/CustomInput/CustomInput.component";
import {ApiResponse} from "@/utils/axiosUtils/ApiResponse.dto";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {LoginRequestDTO, LoginResponseDTO} from "../AuthorizationPage.dto";
import {AuthorizationPageService} from "../AuthorizationPage.service";
import {StyledLoginPanale} from "./LoginPanel.style";

interface LoginPanelProps {
	userEmail: string;
	setUserEmail: (email: string) => void;
	userPassword: string;
	setUserPassword: (password: string) => void;
	onChangePanelClickHandler: () => void;
}

export const LoginPanel: FC<LoginPanelProps> = (props: LoginPanelProps): ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onLoginClickHandler = async () => {
		const loginRequestDTO: LoginRequestDTO = {
			email: props.userEmail,
			password: props.userPassword,
		};

		const apiResponse: ApiResponse<LoginResponseDTO> =
			await AuthorizationPageService.createAuthenticationTokenRest(loginRequestDTO);

		if (apiResponse.success) {
			toast.success("Zalogowano pomyślnie");
			dispatch(setUser({role: apiResponse.response.role, token: apiResponse.response.token}));
			navigate("/chat");
		} else {
			toast.error("Nie udało się zalogować. Spróbuj ponownie");
		}
	};

	const onContinueAsGuestClickHandler = () => {
		navigate("/chat");
	};

	const loginMainSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full items-center m-auto">
			<div className="flex flex-col w-full h-full items-center gap-y-12 justify-center">
				<div className="flex justify-center text-BLACK text-extra_lg font-extrabold text-justify font-roboto-serif">
					{`Witamy!`}
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
				<CustomButton
					buttonColor={COLORS.BLACK}
					labelColor={COLORS.WHITE}
					borderColor={COLORS.BLACK}
					className="w-8/12 h-[3.25rem]"
					label="ZALOGUJ SIĘ"
					onClick={onLoginClickHandler}
					fontBold
				/>
				<Link to="/chat" className="text-BLACK" onClick={onContinueAsGuestClickHandler}>
					{`Kontynuuj jako gość`}
				</Link>
			</div>
		</div>
	);

	const loginSecondSection: ReactElement = (
		<div className="flex flex-col w-1/2 h-full text-BLACK bg-TURQUOISE rounded-lg items-center justify-center gap-y-8">
			<div className="flex w-7/12 text-[1.125rem] mx-auto font-semibold">
				{`Zarządzaj rozporządzeniami łatwiej niż kiedykolwiek!`}
			</div>
			<img className="text-BLACK w-1/2" src={LoginSecondPanelImage} alt="LoginSecondPanelImage" />
			<div className="flex flex-col w-7/12 text-[1.125rem] mx-auto font-semibold">
				<div>{`Nie masz jeszcze konta? Zarejestruj się i dołącz do naszej społeczności!`}</div>
			</div>
			<CustomButton
				buttonColor={COLORS.TRANSPARENT}
				labelColor={COLORS.BLACK}
				className="w-8/12 h-[3.25rem]"
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
