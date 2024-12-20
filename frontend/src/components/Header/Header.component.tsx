import {RootState} from "app/redux/store";
import {UserRole} from "app/redux/userRole/UserRole.type";
import {Dropdown} from "components/Header/Dropdown/Dropdown.component";
import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import UserIcon from "../../assets/images/UserIcon.png";
import {StyledHeader} from "./Header.style";

export const Header: React.FC = () => {
	const role: UserRole = useSelector((state: RootState) => state.user.role);
	const canEditDocuments: boolean = role === UserRole.ROLE_ADMIN || role === UserRole.ROLE_EDITOR;

	return (
		<StyledHeader>
			<nav className="header-nav">
				<ul className="flex justify-evenly">
                    {canEditDocuments && <li> <Link data-cy="documents-link" to="/documents">EDYTOR</Link></li>}
					<li>
						<Link data-cy="chatbot-link" to="/chat">CHATBOT</Link>
					</li>
				</ul>
			</nav>
			<div className="flex justify-around items-center space-x-8">
				<img src={UserIcon} alt="user" />
				<Dropdown isLoggedIn={role !== UserRole.ROLE_USER} />
			</div>
		</StyledHeader>
	);
};
