import { Menu as AntdMenu, GetProp, MenuProps as AntdMenuProps } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { StyledMenu } from "./Menu.style";
import { FileTextOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";

type MenuItem = GetProp<AntdMenuProps, "items">[number];

const mockApiResponse = [
    {
        key: "1",
        icon: "PlusOutlined",
        label: "Dodaj ustawę",
    },
    {
        key: "2",
        icon: "FileTextOutlined",
        label: "Ustawy i rozporządzenia",
        expandIcon: "PlusOutlined",
        children: [
            {
                key: "3",
                icon: "FormOutlined",
                label: "Ustawa o podatku...",
            },
            {
                key: "4",
                icon: "FormOutlined",
                label: "Rozporządzenie o ochronie...",
            },
            {
                key: "5",
                icon: "FormOutlined",
                label: "Prawo przedsiębiorców...",
            },
            {
                key: "6",
                icon: "FormOutlined",
                label: "Ustawa o zdrowiu...",
            },
            {
                key: "7",
                icon: "FormOutlined",
                label: "Rozporządzenie o edukacji...",
            },
            {
                key: "8",
                icon: "FormOutlined",
                label: "Prawo zatrudnienia młodocianych...",
            },
        ],
    },
];

const mapIcon = (iconName: string) => {
    switch (iconName) {
        case "PlusOutlined":
            return <PlusOutlined />;
        case "FileTextOutlined":
            return <FileTextOutlined />;
        case "FormOutlined":
            return <FormOutlined />;
        default:
            return null;
    }
};


export const Menu: FC = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    // Simulated API call
    useEffect(() => {
        const fetchData = async () => {
            const data = mockApiResponse.map((item) => ({
                ...item,
                icon: mapIcon(item.icon),
                expandIcon: item.expandIcon ? mapIcon(item.expandIcon) : undefined,
                children: item.children
                    ? item.children.map((child) => ({
                          ...child,
                          icon: mapIcon(child.icon),
                      }))
                    : undefined,
            }));
            setItems(data);
        };

        fetchData();
    }, []);
    
    return (
        <StyledMenu>
            <AntdMenu items={items} mode="inline" />
        </StyledMenu>
    );
};
