import {COLORS} from "assets/colors";
import {styled} from "styled-components";

export const StyledCustomInput = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin: 0.5rem 0;

	.input-container {
		background-color: ${COLORS.MAIN_BACKGROUND};
	}

	.label-container {
		position: absolute;
		top: -0.25rem;
		left: 0.625rem;
		font-size: 0.7rem;
		z-index: 9;
		width: fit-content;
		padding: 0 0.25rem;
		line-height: 0.5rem;
		background-color: ${COLORS.MAIN_BACKGROUND};
	}

	.ant-input-affix-wrapper {
		width: 100%;
	}
`;
