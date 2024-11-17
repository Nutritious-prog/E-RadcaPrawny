import {COLORS} from "assets/colors";
import styled from "styled-components";

export const StyledChatbox = styled.div`
	display: flex;
	height: 100dvh;
	padding: 1rem;

	.cs-message.cs-message--outgoing .cs-message__content {
		background-color: ${COLORS.DARK_TURQUOISE};
	}

	.cs-message.cs-message--incoming .cs-message__content {
		background-color: ${COLORS.TURQUOISE};
	}

	.cs-typing-indicator__text {
		color: ${COLORS.TURQUOISE};
	}

	.cs-button--send {
		.svg-inline--fa {
			color: ${COLORS.TURQUOISE};
		}
	}

	.cs-message-input__content-editor-wrapper,
	.cs-message-input__content-editor {
		background-color: ${COLORS.MAIN_BACKGROUND};
	}

	.cs-message-input__content-editor-wrapper {
		width: 75%;
		margin: 0 auto;
	}
`;
