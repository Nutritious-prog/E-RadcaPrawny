import React from "react";
import { StyledTextTools } from "./TextTools.style";
import {
    faArrowTurnUp,
    faArrowTurnDown,
    faBold,
    faItalic,
    faUnderline,
    faHeading,
    faAlignLeft,
    faAlignCenter,
    faAlignJustify,
    faAlignRight,
} from "@fortawesome/free-solid-svg-icons";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { EditorViewProps } from "../EditorView/EditorView.component";

interface TextToolsProps {
    editorRef: React.RefObject<EditorViewProps>;
}

export const TextTools: React.FC<TextToolsProps> = (props: TextToolsProps) => {
    const handleCommand = (command: string) => {
        props.editorRef.current?.applyFormatting(command);
    };

    return (
        <StyledTextTools>
            <span className="space-x-6  ">
                <CustomIcon icon={faArrowTurnUp} transform={{ rotate: -90 }} />
                <CustomIcon icon={faArrowTurnDown} transform={{ rotate: -90 }} />
            </span>
            <span className="space-x-24 ">
                <span className="space-x-6">
                    <CustomIcon icon={faBold} />
                    <CustomIcon icon={faItalic} />
                    <CustomIcon icon={faUnderline} />
                    <CustomIcon icon={faHeading} />
                </span>
                <span className="space-x-6">
                    <CustomIcon icon={faAlignLeft} />
                    <CustomIcon icon={faAlignCenter} />
                    <CustomIcon icon={faAlignJustify} />
                    <CustomIcon icon={faAlignRight} />
                </span>
            </span>
        </StyledTextTools>
    );
};
