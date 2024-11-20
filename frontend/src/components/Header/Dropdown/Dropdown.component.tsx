import {Dropdown as AntdDropdown, MenuProps} from "antd";
import {setUser} from "app/redux/userRole/userRole.slice";
import {UserRole} from "app/redux/userRole/UserRole.type";
import {CustomIcon} from "components/CustomIcon/CustomIcon.component";
import React, {ReactElement} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {StyledDropdown} from "./Dropdown.style";

interface DropdownProps {
	isLoggedIn: boolean;
}

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps): ReactElement => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleMenuClick = ({key}: {key: string}) => {
		if (key === "1") {
			dispatch(setUser({role: UserRole.ROLE_USER, token: ""}));
			navigate("/");
		}
	};

	const items: MenuProps["items"] = props.isLoggedIn
		? [{key: "1", label: "Wyloguj się"}]
		: [{key: "1", label: "Zaloguj się"}];

	return (
		<StyledDropdown>
			<AntdDropdown menu={{items, onClick: handleMenuClick}} trigger={["click"]}>
				<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
					<CustomIcon icon={faChevronDown} />
				</a>
			</AntdDropdown>
		</StyledDropdown>
	);
};
