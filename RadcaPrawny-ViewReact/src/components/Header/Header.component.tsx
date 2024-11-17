import React from "react";
import { StyledHeader } from "./Header.style";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/images/UserIcon.png";
import { Dropdown } from "components/Header/Dropdown/Dropdown.component";
import { Tooltip } from "components/DocumentEditor/ActionsBar/Tooltip/Tooltip.component";

export const Header: React.FC = () => {
    const isLoggedIn = true; //TODO: to be continued
    const isEditor = true; //TODO: to be continued
    return (
        <StyledHeader>
            <nav className="header-nav">
                <ul className="flex justify-evenly">
                    <li>
                        {isLoggedIn ? (
                            <Link to="/documents">EDYTOR</Link>
                        ) : (
                            <Tooltip title="Musisz mieć uprawnienia edytora, żeby móc tu przejść">
                                <span>EDYTOR</span>
                            </Tooltip>
                        )}
                    </li>
                    <li>
                        {isEditor ? (
                            <Tooltip title="Musisz mieć uprawnienia gościa, żeby móc tu przejść">
                                <span>CHATBOT</span>
                            </Tooltip>
                        ) : (
                            <Link to="/chat">CHATBOT</Link>
                        )}
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
