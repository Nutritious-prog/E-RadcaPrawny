import { styled } from "styled-components";

interface StyledCustomButtonProps {
    buttonColor: string;
    buttonColorOnHover: string;
    labelColor: string;
    borderColor: string;
    fontBold: boolean;
}

export const StyledCustomButton = styled.div<StyledCustomButtonProps>`
    .ant-btn {
        width: 100%;
		height: 100%;
        height: 100%;
        padding: 1.25rem;
		font-size: 1rem;
        font-weight: ${(props: StyledCustomButtonProps): string => (props.fontBold ? "bold" : "normal")};
		font-family: "Poppins", sans-serif;
        background-color: ${(props: StyledCustomButtonProps): string => props.buttonColor};
        color: ${(props: StyledCustomButtonProps): string => props.labelColor};
        border-color: ${(props: StyledCustomButtonProps): string => props.borderColor};
        letter-spacing: 0.15rem;
        font-size: 1rem;
    }

    .ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover,
    .ant-btn-variant-dashed:not(:disabled):not(.ant-btn-disabled):hover {
        background-color: ${(props: StyledCustomButtonProps): string => props.buttonColor};
        color: ${(props: StyledCustomButtonProps): string => props.labelColor};
        border-color: ${(props: StyledCustomButtonProps): string => props.borderColor};
        transform: scale(1.05);
    }

    .ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover,
    .ant-btn-variant-dashed:not(:disabled):not(.ant-btn-disabled):hover {
        background-color: ${(props: StyledCustomButtonProps): string => props.buttonColor};
        color: ${(props: StyledCustomButtonProps): string => props.labelColor};
        border-color: ${(props: StyledCustomButtonProps): string => props.borderColor};
        transform: scale(1.05);
    }
`;
