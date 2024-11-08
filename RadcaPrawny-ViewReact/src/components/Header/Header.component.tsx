import React from "react";
import { StyledHeader } from "./Header.style";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";
import { Link } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <nav className="header-nav">
                <ul className="flex justify-around">
                    <li>
                        <Link to="/documents">EDYTOR</Link>
                    </li>
                    <li>
                        <Link to="/chat">CHATBOT</Link>
                    </li>
                </ul>
            </nav>
            <div className="flex justify-around space-x-8">
                <img src="../../assets/images/UserIcon.png" alt="user" />
                <CustomIcon icon={faChevronDown} />
            </div>
        </StyledHeader>
    );
};
