import React from "react";
import { StyledTextTools } from "./TextTools.style";
import { faBold, faItalic, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";

export const TextTools: React.FC = () => {
    return (
        <StyledTextTools><CustomIcon icon={faBold} /><CustomIcon icon={faItalic} /><CustomIcon icon={faUnderline} /></StyledTextTools>
    );
};
