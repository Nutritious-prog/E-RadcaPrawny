import {Header} from "components/Header/Header.component";
import {Sidebar} from "components/Sidebar/Sidebar.component";
import {SidebarType} from "components/Sidebar/Sidebar.utils";
import React, {FC, ReactElement, useEffect, useState} from "react";
import {StyledChatbot} from "./Chatbot.style";
import {ChatBox} from "./chatBox/ChatBox.component";
import { ChatbotService } from "./Chatbot.service";

export const Chatbot: FC = (): ReactElement => {
	const startChatSession = async () => {
        try {
            await ChatbotService.startChat();
        } catch (error) {
            console.error("Failed to start chat session:", error);
        }
    };

	useEffect(() => {
        startChatSession();
    }, []);

	return (
		<StyledChatbot>
			<div className="w-3/12 h-full">
				<Sidebar
					type={SidebarType.CHAT}
				/>
			</div>
			<div className="w-9/12 flex flex-col">
				<Header />
				<div className="w-full flex-grow flex justify-end h-full">
					<div className="flex-grow">
						<div className="flex-grow h-full">
							<ChatBox />
						</div>
					</div>
				</div>
			</div>
		</StyledChatbot>
	);
};
