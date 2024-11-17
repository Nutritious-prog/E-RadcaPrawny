import {Header} from "components/Header/Header.component";
import {Sidebar} from "components/Sidebar/Sidebar.component";
import React, {FC, ReactElement} from "react";
import {StyledChatbot} from "./Chatbot.style";
import {ChatBox} from "./chatBox/ChatBox.component";

export const Chatbot: FC = (): ReactElement => {
	return (
		<StyledChatbot>
			<div className="w-3/12 h-full">
				<Sidebar type="chat" />
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

<ChatBox />;
