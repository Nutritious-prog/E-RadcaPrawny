import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledTextTools = styled.div`
    height: 4rem;
    background-color: ${COLORS.MAIN_BACKGROUND};
    border: 1px solid ${COLORS.BORDER};
    border-right: none;
    padding: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
`;
