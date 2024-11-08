import React from "react";
import { StyledSidebar } from "./Sidebar.style";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { Menu } from "components/Menu/Menu";

export const Sidebar: React.FC = () => {
    return (
        <StyledSidebar>
            <div className="flex flex-col justify-between">
                <span className="sidebar-logo">
                    <h1>Radca Prawny</h1>
                </span>
                <Menu />
            </div>
        </StyledSidebar>
    );
};
