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
            <div className="w-3/12 h-full">
                <Sidebar type="documents" />
            </div>
            <div className="w-9/12 flex flex-col">
                <Header />
                <div className="w-full flex-grow flex justify-end h-full">
                    <div className="flex-grow">
                        <TextTools />
                        <div className="flex-grow h-full">
                            <EditorView />
                        </div>
                    </div>
                    <div className="w-3/12 h-full">
                        <ActionsBar />
                    </div>
                </div>
            </div>
        </StyledDocumentEditor>
    );
};
