import {COLORS} from "assets/colors";
import {styled} from "styled-components";

export const StyledMenu = styled.div`
	ul.ant-menu.ant-menu-root.ant-menu-inline.ant-menu-light {
		border: none;
	}

	.ant-menu-inline .ant-menu-item,
	.ant-menu-submenu {
		max-width: 28rem;
		font-weight: 500;
		background-color: ${COLORS.TURQUOISE};
	}

	.ant-menu-title-content {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 30rem;
		position: relative;
		mask-image: linear-gradient(to right, black 80%, transparent 100%);
	}

    .ant-menu-inline::-webkit-scrollbar {
        width: 8px;
    }

    .ant-menu-inline::-webkit-scrollbar-thumb {
        background-color: ${COLORS.DARK_TURQUOISE}; /* Kolor "kciuka" scrolla */
        border-radius: 4px; /* Zaokrąglone rogi */
    }

    .ant-menu-inline::-webkit-scrollbar-track {
        background-color: ${COLORS.TURQUOISE}; /* Kolor tła scrolla */
    }
`;
