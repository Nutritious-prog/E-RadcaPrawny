import React, {FC, ReactElement, useEffect, useState} from "react";
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
import { ChatbotService } from "../Chatbot.service";

export const ChatBox: FC = (): ReactElement => {
	const [msgInputValue, setMsgInputValue] = useState<string>("");
	const [messages, setMessages] = useState<MessageModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSendMessageHandler = async (msg: string) => {
        setMessages((prev) => [...prev, {message: msg, direction: "outgoing", position: "last"}]);
        setMsgInputValue("");

        setIsLoading(true);
        try {
            const chatResponse = await ChatbotService.sendMessage(msg);
            onReceiveMessageHandler(chatResponse.response);
        } catch (error) {
            onReceiveMessageHandler("Failed to send message.");
        } finally {
            setIsLoading(false);
        }
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
					typingIndicator={isLoading && <TypingIndicator content="E-Radca Prawny" />}>
					{messages.map((m, i) => (
						<Message key={i} model={m} />
					))}
				</MessageList>
				<MessageInput
					placeholder="Zadaj pytanie..."
					onSend={() => onSendMessageHandler(msgInputValue)}
					onChange={setMsgInputValue}
                    onPaste={(event) => {
                        event.preventDefault();
                        setMsgInputValue(event.clipboardData.getData("text"));
                    }}
					value={msgInputValue}
					attachButton={false}
				/>
			</ChatContainer>
		</StyledChatbox>
	);
};
