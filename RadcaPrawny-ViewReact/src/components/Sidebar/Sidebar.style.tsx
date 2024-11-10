import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledSidebar = styled.div`
    width: 30rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${COLORS.TURQUOISE};
    padding: 2rem;

    .sidebar-logo {
        color: ${COLORS.WHITE};
        display: flex;
        justify-content: center;
        width: 100%;
    }
`;
