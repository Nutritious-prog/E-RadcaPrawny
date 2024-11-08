import { Menu as AntdMenu } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { StyledMenu } from "./Menu.style";
import {
    FileTextOutlined,
    FormOutlined,
    PlusOutlined,
    MessageOutlined,
    SmileOutlined,
    MinusOutlined,
} from "@ant-design/icons";
import { mockChatResponse, mockDocumentsResponse } from "./mockResponses";
import { Upload } from "../Upload/Upload.component";
import { Modal } from "../Modal/Modal.component";

export interface DocumentItem {
    key: string;
    icon: string;
    label: string;
    children?: DocumentItem[];
}

export interface ChatItem {
    key: string;
    icon: string;
    label: string;
}

type MenuItem = DocumentItem | ChatItem;

const mapIcon = (iconName: string) => {
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

interface MenuProps {
    type: "documents" | "chat";
}

export const Menu: FC<MenuProps> = (props: MenuProps): ReactElement => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [uploadVisible, setUploadVisible] = useState(false);

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "1") {
            setUploadVisible(true);
        }
    };

    // Simulated API call
    useEffect(() => {
        const fetchData = async () => {
            const data = (props.type === "documents" ? mockDocumentsResponse : mockChatResponse).map((item) => ({
                ...item,
                icon: mapIcon(item.icon),
                children:
                    "children" in item
                        ? (item.children as DocumentItem[])?.map((child: DocumentItem) => ({
                              ...child,
                              icon: mapIcon(child.icon),
                          }))
                        : undefined,
            }));
            setItems(data);
        };

        fetchData();
    }, [props.type]);

    return (
        <>
            <StyledMenu>
                <AntdMenu items={items} mode="inline" onClick={handleMenuClick} />
            </StyledMenu>

            <Modal
                open={uploadVisible}
                title="Dodaj nowy dokument"
                onCancel={() => setUploadVisible(false)}
                footer={null}
                centered={true}
            >
                <Upload />
            </Modal>
        </>
    );
};
