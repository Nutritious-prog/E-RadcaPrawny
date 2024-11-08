import { Menu as AntdMenu, GetProp, MenuProps as AntdMenuProps } from "antd";
import React, { FC, ReactElement } from "react";
import { StyledMenu } from "./Menu.style";
import { FileTextOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";

type MenuItem = GetProp<AntdMenuProps, "items">[number];

const items: MenuItem[] = [
    {
        key: "1",
        icon: <PlusOutlined />,
        label: "Dodaj ustawę",
    },
    {
        key: "2",
        icon: <FileTextOutlined />,
        label: "Ustawy i rozporządzenia",
        expandIcon: <PlusOutlined />,
        children: [
            {
                key: "3",
                icon: <FormOutlined />,
                label: "Ustawa o podatku...",
            },
            {
                key: "4",
                icon: <FormOutlined />,
                label: "Rozporządzenie o ochronie...",
            },
        ],
    },
];

interface MenuProps {}

export const Menu: FC<MenuProps> = (props: MenuProps): ReactElement => {
    return (
        <StyledMenu>
            <AntdMenu items={items} mode="inline" />
        </StyledMenu>
    );
};
