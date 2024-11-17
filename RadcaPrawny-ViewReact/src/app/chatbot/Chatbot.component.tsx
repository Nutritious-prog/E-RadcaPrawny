import {Header} from "components/Header/Header.component";
import {ChatItem, mapIcon} from "components/Sidebar/Menu/Menu.utils";
import {mockChatResponse} from "components/Sidebar/Menu/mockResponses";
import {Sidebar} from "components/Sidebar/Sidebar.component";
import {SidebarType} from "components/Sidebar/Sidebar.utils";
import React, {FC, ReactElement, useEffect, useState} from "react";
import {StyledChatbot} from "./Chatbot.style";
import {ChatBox} from "./chatBox/ChatBox.component";

export const Chatbot: FC = (): ReactElement => {
	const [previusConversations, setPreviusConversations] = useState<ChatItem[]>([]);

	useEffect(() => {
		fetchConversations();
	}, []);

	const fetchConversations = async () => {
		const data: ChatItem[] = mockChatResponse.map((item) => ({
			...item,
			icon: mapIcon(item.icon),
		}));
		setPreviusConversations(data);
	};

	const handleMenuClick = ({key}: {key: string}) => {
		if (key === "1") {
			console.log("Open new chat");
		}
	};

	return (
		<StyledChatbot>
			<div className="w-3/12 h-full">
				<Sidebar
					type={SidebarType.CHAT}
					menuItems={previusConversations}
					onMainMenuClickHandler={handleMenuClick}
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
