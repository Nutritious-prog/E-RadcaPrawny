import React from "react";
import { StyledHeader } from "./Header.style";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/images/UserIcon.png";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "components/Header/Dropdown/Dropdown.component";

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <nav className="header-nav">
                <ul className="flex justify-evenly">
                    <li>
                        <Link to="/documents">EDYTOR</Link>
                    </li>
                    <li>
                        <Link to="/chat">CHATBOT</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex justify-around items-center space-x-8">
                <img src={UserIcon} alt="user" />
                <Dropdown/>
            </div>
        </StyledHeader>
    );
};
