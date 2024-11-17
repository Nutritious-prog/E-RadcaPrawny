import React, { ReactElement } from "react";
import { StyledDropdown } from "./Dropdown.style";
import { Dropdown as AntdDropdown, MenuProps } from "antd";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface DropdownProps {
    isLoggedIn: boolean;
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps): ReactElement => {
    const navigate = useNavigate();

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "1") {
            navigate("/");
        }
    };

    const items: MenuProps["items"] = props.isLoggedIn
        ? [{ key: "1", label: "Wyloguj się" }]
        : [{ key: "1", label: "Zaloguj się" }];

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
