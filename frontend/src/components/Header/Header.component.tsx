import React from "react";
import { StyledHeader } from "./Header.style";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/images/UserIcon.png";
import { Dropdown } from "components/Header/Dropdown/Dropdown.component";
import { Tooltip } from "components/DocumentEditor/ActionsBar/Tooltip/Tooltip.component";

export const Header: React.FC = () => {
    const isLoggedIn = false; //TODO: to be continuedODO: to be continued
    return (
        <StyledHeader>
            <nav className="header-nav">
                <ul className="flex justify-evenly">
                    <li>
                        {isLoggedIn ? (
                            <Link to="/documents">EDYTOR</Link>
                        ) : (
                            <span className="disabled-link">EDYTOR</span>
                        )}
                    </li>
                    <li>
                        <Link to="/chat">CHATBOT</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex justify-around items-center space-x-8">
                <img src={UserIcon} alt="user" />
                <Dropdown isLoggedIn={true} />
            </div>
        </StyledHeader>
    );
};
