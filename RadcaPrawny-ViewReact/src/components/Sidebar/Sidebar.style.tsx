import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledSidebar = styled.header`
    width: 25vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${COLORS.TURQUOISE};
    padding: 2rem;

    .sidebar-logo {
        font-family: Roboto Serif, serif;
        font-size: 32px;
        color: ${COLORS.WHITE};
    }
`;
