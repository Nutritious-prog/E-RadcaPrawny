import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledSidebar = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${COLORS.TURQUOISE};
    padding: 2rem;

    .sidebar-logo {
        display: flex;
        justify-content: center;
    }
`;
