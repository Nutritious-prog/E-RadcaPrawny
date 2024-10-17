import {styled} from "styled-components";

export const StyledCustomInput = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	margin: 0.5rem 0;

	//TODO - add file with colors in consts

	.input-container {
		background-color: white;
	}

	.label-container {
		position: absolute;
		top: -0.25rem;
		left: 0.625rem;
		font-size: 0.7rem;
		z-index: 15;
		width: fit-content;
		padding: 0 0.25rem;
		line-height: 0.5rem;
		background-color: white;
	}
`;
