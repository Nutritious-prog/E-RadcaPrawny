import {Menu} from "components/Sidebar/Menu/Menu.component";
import React, {ReactElement} from "react";
import DocumentEditorImage from "../../assets/images/DocumentEditorImage.png";
import ChatImage from "../../assets/images/ChatImage.png";
import Logo from "../../assets/images/Logo.png";
import {MenuItem} from "./Menu/Menu.utils";
import {StyledSidebar} from "./Sidebar.style";
import {SidebarType} from "./Sidebar.utils";

interface SidebarProps {
	type: SidebarType;
	menuItems?: MenuItem[];
	onMainMenuClickHandler?: ({key}: {key: string}) => void;
}

export const Sidebar: React.FC<SidebarProps> = (props: SidebarProps): ReactElement => {
	return (
        <StyledSidebar>
            <div className="flex flex-col justify-start space-y-12 max-w-full h-full">
                <span className="sidebar-logo">
                    <img src={Logo} alt="Logo" height="200px" width="400px"/>
                </span>
                <Menu
                    type={props.type}
                    className="z-20 max-h-[45%] overflow-y-auto"
                    menuItems={props.menuItems}
                    onMainMenuClickHandler={props.onMainMenuClickHandler}
                />
                {props.type === SidebarType.DOCUMENTS ? (
                    <img
                        src={DocumentEditorImage}
                        alt="Document Image"
                        height="100px"
                        className="!mt-auto z-10"
                    />
                ) : (
                    <img
                        src={ChatImage}
                        alt="Chat Image"
                        height="100px"
                        className="!mt-auto z-10"
                    />
                )}
            </div>
        </StyledSidebar>
    );
};
