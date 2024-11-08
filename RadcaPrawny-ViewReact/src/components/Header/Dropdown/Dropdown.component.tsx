import React from "react";
import { StyledDropdown } from "./Dropdown.style";
import { Dropdown as AntdDropdown, MenuProps } from "antd";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const items: MenuProps["items"] = [
    {
        key: "1",
        label: "1st menu item",
    },
    {
        key: "2",
        label: "2nd menu item",
    },
    {
        key: "3",
        label: "3rd menu item",
    },
];

export const Dropdown: React.FC = () => {
    return (
        <StyledDropdown>
            <AntdDropdown menu={{ items }} trigger={["click"]}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    <CustomIcon icon={faChevronDown} />
                </a>
            </AntdDropdown>
        </StyledDropdown>
    );
};
