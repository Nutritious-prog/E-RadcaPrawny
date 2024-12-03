import React, { ReactElement } from "react";
import {
	FileTextOutlined,
	FormOutlined,
	MessageOutlined,
	MinusOutlined,
	PlusOutlined,
	SmileOutlined,
} from "@ant-design/icons";

export interface MenuItem {
	key: string;
	icon: ReactElement;
	label: string;
}

export interface DocumentItem extends MenuItem {
	children?: DocumentItem[];
}

export interface ChatItem extends MenuItem {}

export const mapIcon = (iconName: string) => {
	switch (iconName) {
		case "PlusOutlined":
			return <PlusOutlined />;
		case "MinusOutlined":
			return <MinusOutlined />;
		case "FileTextOutlined":
			return <FileTextOutlined />;
		case "FormOutlined":
			return <FormOutlined />;
		case "MessageOutlined":
			return <MessageOutlined />;
		default:
			return <SmileOutlined />;
	}
};
