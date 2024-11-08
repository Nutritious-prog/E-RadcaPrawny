import React, { FC, ReactElement } from "react";
import { StyledDocumentEditor } from "./DocumentEditor.style";
import { Header } from "components/Header/Header.component";
import { Sidebar } from "components/Sidebar/Sidebar.component";

export const DocumentEditor: FC = (): ReactElement => {
    return (
        <StyledDocumentEditor>
			<Sidebar type="documents"/>
            <Header />
        </StyledDocumentEditor>
    );
};
