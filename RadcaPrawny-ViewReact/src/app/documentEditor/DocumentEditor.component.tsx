import React, { FC, ReactElement } from "react";
import { StyledDocumentEditor } from "./DocumentEditor.style";
import { Header } from "components/Header/Header.component";
import { Sidebar } from "components/Sidebar/Sidebar.component";
import { ActionsBar } from "components/DocumentEditor/ActionsBar/ActionsBar.component";

export const DocumentEditor: FC = (): ReactElement => {
    return (
        <StyledDocumentEditor>
            <div className="w-1/5 h-full">
                <Sidebar type="documents" />
            </div>
            <div className="w-4/5 flex flex-col">
                <div className="w-full">
                    <Header />
                </div>
                <div className="w-full flex-grow">
                    <ActionsBar />
                </div>
            </div>
        </StyledDocumentEditor>
    );
};
