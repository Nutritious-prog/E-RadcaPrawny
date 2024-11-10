import React, { FC, ReactElement } from "react";
import { StyledDocumentEditor } from "./DocumentEditor.style";
import { Header } from "components/Header/Header.component";
import { Sidebar } from "components/Sidebar/Sidebar.component";
import { ActionsBar } from "components/DocumentEditor/ActionsBar/ActionsBar.component";
import { EditorView } from "components/DocumentEditor/EditorView/EditorView.component";
import { TextTools } from "components/DocumentEditor/TextTools/TextTools.component";

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
                <div className="w-full flex-grow flex justify-end h-full">
                    <div className="w-4/5">
                        <TextTools />
                    </div>
                    <div className="w-1/5 h-full">
                        <ActionsBar />
                    </div>
                </div>
            </div>
        </StyledDocumentEditor>
    );
};
