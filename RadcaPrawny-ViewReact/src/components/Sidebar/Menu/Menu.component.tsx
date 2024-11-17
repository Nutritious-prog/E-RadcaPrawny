import {Menu as AntdMenu} from "antd";
import {RootState} from "app/redux/store";
import {UserRole} from "app/redux/userRole/UserRole.type";
import React, {FC, ReactElement, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Modal} from "../Modal/Modal.component";
import {Upload} from "../Modal/Upload/Upload.component";
import {SidebarType} from "../Sidebar.utils";
import {StyledMenu} from "./Menu.style";
import {MenuItem} from "./Menu.utils";
import {mockChatResponse, mockDocumentsResponse} from "./mockResponses";

interface MenuProps {
	type: SidebarType;
	className?: string;
	menuItems?: MenuItem[];
	onMainMenuClickHandler?: ({key}: {key: string}) => void;
}

export const Menu: FC<MenuProps> = (props: MenuProps): ReactElement => {
	const role: UserRole = useSelector((state: RootState) => state.user.role);
	const [items, setItems] = useState<MenuItem[]>([]);
	const [uploadVisible, setUploadVisible] = useState<boolean>(false);

	const isAdmin: boolean = role === UserRole.ADMIN;

	const handleMenuClick = ({key}: {key: string}) => {
		if (isAdmin && props.type === SidebarType.DOCUMENTS && key === "1") {
			setUploadVisible(true);
		}
	};

	const filteredItems =
		isAdmin || props.type !== SidebarType.DOCUMENTS
			? props.menuItems
			: props.menuItems?.filter((item, index) => index !== 0);

	return (
		<>
			<StyledMenu className={props.className}>
				<AntdMenu items={filteredItems} mode="inline" onClick={props.onMainMenuClickHandler} />
			</StyledMenu>

			{isAdmin && (
				<Modal
					open={uploadVisible}
					title="Dodaj nowy dokument"
					onCancel={() => setUploadVisible(false)}
					footer={null}
					centered={true}>
					<Upload />
				</Modal>
			)}
		</>
	);
};
