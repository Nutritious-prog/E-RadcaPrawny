import React from "react";
import { StyledDropdown } from "./Dropdown.style";
import { Dropdown as AntdDropdown, MenuProps } from "antd";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
    {
        key: "1",
        label: "Wyloguj się",
    },
];

export const Dropdown: React.FC = () => {
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "1") {
            navigate("/");
        }
    };

    return (
        <StyledDropdown>
            <AntdDropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    <CustomIcon icon={faChevronDown} />
                </a>
            </AntdDropdown>
        </StyledDropdown>
    );
};
