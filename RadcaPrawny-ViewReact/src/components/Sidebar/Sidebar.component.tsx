import React from "react";
import { StyledSidebar } from "./Sidebar.style";
import { Menu } from "components/Menu/Menu";
import Logo from "../../assets/images/Logo.png";
import DocumentEditorImage from "../../assets/images/DocumentEditorImage.png";

export const Sidebar: React.FC = () => {
    return (
        <StyledSidebar>
            <div className="flex flex-col justify-between space-y-48">
                <span className="sidebar-logo">
                    <img src={Logo} alt="Logo" height="200px" width="400px" />
                </span>
                <Menu />
                <img
                    src={DocumentEditorImage}
                    alt="Dokument wychodzący z laptopa"
                    className="absolute bottom-0 left-0 mb-4 ml-4"
                />
            </div>
        </StyledSidebar>
    );
};
