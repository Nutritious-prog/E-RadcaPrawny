import React, { ReactElement } from "react";
import { StyledSidebar } from "./Sidebar.style";
import { Menu } from "components/Sidebar/Menu/Menu.component";
import Logo from "../../assets/images/Logo.png";
import DocumentEditorImage from "../../assets/images/DocumentEditorImage.png";

interface SidebarProps {
    type: "documents" | "chat";
}

export const Sidebar: React.FC<SidebarProps> = (props: SidebarProps): ReactElement => {
    return (
        <StyledSidebar>
            <div className="flex flex-col justify-between space-y-12">
                <span className="sidebar-logo">
                    <img src={Logo} alt="Logo" height="200px" width="400px" />
                </span>
                <Menu type={props.type} className="z-20"/>
                {props.type === "documents" ? (
                    <img
                        src={DocumentEditorImage}
                        alt="Dokument wychodzący z laptopa"
                        className="absolute bottom-0 left-0 mb-4 ml-4 z-10"
                    />
                ) : (
                    <img
                        src=""
                        alt="Chat"
                        className="absolute bottom-0 left-0 mb-4 ml-4 z-10"
                    />
                )}
            </div>
        </StyledSidebar>
    );
};
