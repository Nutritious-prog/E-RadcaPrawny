import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledActionsBar = styled.div`
    height: 100%;
    background-color: ${COLORS.MAIN_BACKGROUND};
    border: 1px solid ${COLORS.BORDER};
    padding: 2rem;

    .actions-text {
        font-weight: 500;
        font-size: 1.5rem;
    }

    .actions-tag {
        font-weight: 600;
        font-size: 1.2rem;
        font-family: Poppins, sans-serif;
        letter-spacing: 0.15rem;
    }
`;
