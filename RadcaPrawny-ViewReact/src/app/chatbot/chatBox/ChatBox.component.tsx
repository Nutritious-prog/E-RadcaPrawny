import {Content} from "antd/es/layout/layout";
import React, {FC, ReactElement, useState} from "react";
import {
	Avatar,
	ChatContainer,
	ConversationHeader,
	Message,
	MessageInput,
	MessageList,
	MessageModel,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import {StyledChatbox} from "./ChatBox.style";

interface ChatBoxProps {}

export const ChatBox: FC<ChatBoxProps> = (props: ChatBoxProps): ReactElement => {
	const [msgInputValue, setMsgInputValue] = useState<string>("");
	const [messages, setMessages] = useState<MessageModel[]>([]);

	const onSendMessageHandler = (msg: string) => {
		setMessages((prev) => [...prev, {message: msg, direction: "outgoing", position: "last"}]);
		setMsgInputValue("");
		onReceiveMessageHandler("I'm sorry, I'm just a demo bot. I don't understand what you're saying.");
	};

	const onReceiveMessageHandler = (msg: string) => {
		setMessages((prev) => [...prev, {message: msg, direction: "incoming", position: "last"}]);
	};

	return (
		<StyledChatbox>
			<ChatContainer className="w-full h-5/6">
				<ConversationHeader>
					<Avatar
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXueg7SFBTHqAZuYu-etDK9HPg7vUU02ukjg&s"
						name="Kai"
					/>
					<ConversationHeader.Content info="Z prawem za pan brat 🤓" userName="E-Radca Prawny" />
				</ConversationHeader>
				<MessageList
					scrollBehavior="auto"
					autoScrollToBottom
					typingIndicator={<TypingIndicator content="E-Radca Prawny" />}>
					{messages.map((m, i) => (
						<Message key={i} model={m} />
					))}
				</MessageList>
				<MessageInput
					placeholder="Type message here..."
					onSend={() => onSendMessageHandler(msgInputValue)}
					onChange={setMsgInputValue}
					value={msgInputValue}
					attachButton={false}
				/>
			</ChatContainer>
		</StyledChatbox>
	);
};
