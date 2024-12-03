import {styled} from "styled-components";
import {COLORS} from "assets/colors";

export const StyledEditorView = styled.div`
	padding: 1.5rem;
    margin: 0.5rem;
	height: 90%;
	outline: none;
	overflow-y: auto;
    border: dashed 0.0625rem ${COLORS.BLACK}
`;
