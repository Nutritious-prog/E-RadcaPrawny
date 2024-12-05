import { COLORS } from "assets/colors";
import styled from "styled-components";

export const StyledChatbox = styled.div`
    display: flex;
    height: 100dvh;
    padding: 1rem;

    .cs-conversation-header,
    .cs-conversation-header__content .cs-conversation-header__user-name,
    .cs-conversation-header__content .cs-conversation-header__info {
        background-color: ${COLORS.WHITE};
    }

    .cs-message.cs-message--outgoing .cs-message__content {
        background-color: ${COLORS.VERY_DARK_BLUE};
        color: ${COLORS.WHITE};
        font-family: 'Baloo Paaji 2', sans-serif;
    }

    .cs-message.cs-message--incoming .cs-message__content {
        background-color: ${COLORS.TURQUOISE};
        color: ${COLORS.WHITE};
        font-family: 'Baloo Paaji 2', sans-serif;
    }

    .cs-message {
        max-width: 75%;
        word-wrap: break-word;
        margin-bottom: 1.5rem; 
    }

    .cs-message:last-child {
        margin-bottom: 0;
    }

    .cs-typing-indicator__text {
        color: ${COLORS.TURQUOISE};
        font-family: 'Baloo Paaji 2', sans-serif;
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

    .scrollbar-container.cs-message-list__scroll-wrapper {
        gap: 20rem;
    }

`;
