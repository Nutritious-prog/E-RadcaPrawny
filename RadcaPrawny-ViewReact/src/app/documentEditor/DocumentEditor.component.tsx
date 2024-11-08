import React, {FC, ReactElement} from "react";
import { StyledDocumentEditor } from "./DocumentEditor.style";
import { Header } from "components/Header/Header.component";

export const DocumentEditor: FC = (): ReactElement => {
	return <StyledDocumentEditor>
		<Header/>
	</StyledDocumentEditor>;
};
