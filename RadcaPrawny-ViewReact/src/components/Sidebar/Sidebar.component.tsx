import {Menu} from "components/Sidebar/Menu/Menu.component";
import React, {ReactElement} from "react";
import DocumentEditorImage from "../../assets/images/DocumentEditorImage.png";
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
			<div className="flex flex-col justify-between space-y-12 max-w-full">
				<span className="sidebar-logo">
					<img src={Logo} alt="Logo" height="200px" width="400px" />
				</span>
				<Menu
					type={props.type}
					className="z-20"
					menuItems={props.menuItems}
					onMainMenuClickHandler={props.onMainMenuClickHandler}
				/>
				{props.type === SidebarType.DOCUMENTS ? (
					<img
						src={DocumentEditorImage}
						alt="Dokument wychodzący z laptopa"
						height="200px"
						width="400px"
						className="absolute bottom-0 left-0 m-auto z-2 w-3/12 h-3/12"
					/>
				) : (
					<img src="" alt="Chat" className="absolute bottom-0 left-0 m-auto z-2 w-3/12 h-3/12" />
				)}
			</div>
		</StyledSidebar>
	);
};
