import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledHeader = styled.header`
    height: 10vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.WHITE};
    padding: 2rem;

    .header-nav {
        width: 70rem;
        font-family: Poppins, sans-serif;
        font-weight: 600;
        font-size: 1.4rem;
        letter-spacing: 0.15em;

        a {
            text-decoration: none;
            color: ${COLORS.VERY_DARK_BLUE};
            transition: color 0.3s ease;

            &:hover {
                text-decoration: underline;
                text-decoration-thickness: 3px;
                text-underline-offset: 10px;
            }
        }

        .disabled-link {
            color: ${COLORS.PLACEHOLDER};
            cursor: not-allowed;
        }
    }
`;