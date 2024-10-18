import {styled} from "styled-components";

interface StyledCustomButtonProps {
	buttonColor: string;
	labelColor: string;
	buttonColorOnHover: string;
}

export const StyledCustomButton = styled.div<StyledCustomButtonProps>`
	.ant-btn {
		width: 100%;
		background-color: ${(props: StyledCustomButtonProps): string => props.buttonColor};
		color: ${(props: StyledCustomButtonProps): string => props.labelColor};
	}

	.ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover,
	.ant-btn-variant-dashed:not(:disabled):not(.ant-btn-disabled):hover {
		background-color: ${(props: StyledCustomButtonProps): string => props.buttonColor};
		color: ${(props: StyledCustomButtonProps): string => props.labelColor};
	}

	.ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover,
	.ant-btn-variant-dashed:not(:disabled):not(.ant-btn-disabled):hover {
		background-color: ${(props: StyledCustomButtonProps): string => props.buttonColor};
		color: ${(props: StyledCustomButtonProps): string => props.labelColor};
	}
`;
