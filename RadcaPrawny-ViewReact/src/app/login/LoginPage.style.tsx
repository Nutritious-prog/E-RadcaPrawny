import {COLORS} from "assets/colors";
import styled from "styled-components";

export const StyledLoginPage = styled.div`
	display: flex;
	position: relative;
	width: 100dvw;
	height: 100dvh;
	background-color: ${COLORS.MAIN_BACKGROUND};
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		bottom: -4.25rem;
		left: -4.25rem;
		width: 20.75rem;
		height: 20.75rem;
		background-color: ${COLORS.TURQUOISE};
		border-radius: 50%;
	}

	&::after {
		content: "";
		position: absolute;
		top: -9.375rem;
		right: -9.375rem;
		width: 37.5rem;
		height: 22.25rem;
		background-color: ${COLORS.TURQUOISE};
		border-radius: 50%;
	}

	.login-page-box {
		display: flex;
		margin: auto;
		opacity: 0.7;
		width: 80%;
		height: 90%;
		z-index: 1;
		background-color: ${COLORS.MAIN_BACKGROUND};
		box-shadow: 0 0.3125rem 0.625rem rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
`;
