import { COLORS } from "assets/colors";
import { styled } from "styled-components";

export const StyledTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-tag {
        padding: 0.2rem 0.8rem 0.2rem 0.8rem;
        width: 12rem;
        text-align: center;
        background-color: ${COLORS.TURQUOISE};
    }

    .ant-tag-checkable {
        background-color: ${COLORS.TURQUOISE};
        color: ${COLORS.WHITE};
    }

    .ant-tag-checkable:hover {
        background-color: ${COLORS.DARK_TURQUOISE};
        color: ${COLORS.WHITE};
    }

    .ant-tag-checkable-checked {
        background-color: ${COLORS.DARK_TURQUOISE};
        color: ${COLORS.WHITE};
    }
`;
