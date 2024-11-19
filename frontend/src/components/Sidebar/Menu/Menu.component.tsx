import {Menu as AntdMenu} from "antd";
import {RootState} from "app/redux/store";
import {UserRole} from "app/redux/userRole/UserRole.type";
import React, {FC, ReactElement} from "react";
import {useSelector} from "react-redux";
import {SidebarType} from "../Sidebar.utils";
import {StyledMenu} from "./Menu.style";
import {MenuItem} from "./Menu.utils";

interface MenuProps {
	type: SidebarType;
	className?: string;
	menuItems?: MenuItem[];
	onMainMenuClickHandler?: ({key}: {key: string}) => void;
}

export const Menu: FC<MenuProps> = (props: MenuProps): ReactElement => {
	const role: UserRole = useSelector((state: RootState) => state.user.role);

	const isAdmin: boolean = role === UserRole.ADMIN;

	const filteredItems =
		isAdmin || props.type !== SidebarType.DOCUMENTS
			? props.menuItems
			: props.menuItems?.filter((item, index) => index !== 0);

	return (
		<>
			<StyledMenu className={props.className}>
				<AntdMenu items={filteredItems} mode="inline" onClick={props.onMainMenuClickHandler} />
			</StyledMenu>
		</>
	);
};
