import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledHeader = styled.header`
    height: 9vh;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    background-color: ${COLORS.WHITE};
    padding: 2rem;
    border-bottom: 0.125rem solid;

    .header-nav {
        width: 95%;
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
