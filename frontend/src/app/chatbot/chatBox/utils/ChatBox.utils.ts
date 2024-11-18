import {MessageModel} from '@chatscope/chat-ui-kit-react';

export const EXAMPLE_CHAT_MESSAGES: MessageModel[] = [
		{message: "Hello, how can I help you?", direction: "incoming", position: "last"},
		{message: "I have a problem with my order", direction: "outgoing", position: "last"},
		{
			message: "I'm sorry to hear that. Can you please provide me with your order number?",
			direction: "incoming",
			position: "last",
		},
		{message: "123456", direction: "outgoing", position: "last"},
		{message: "Thank you. Let me check that for you.", direction: "incoming", position: "last"},
		{message: "Sure, take your time", direction: "outgoing", position: "last"},
		{
			message: "I found your order. It's currently being processed and will be shipped soon.",
			direction: "incoming",
			position: "last",
		},
		{message: "Thank you!", direction: "outgoing", position: "last"},
		{message: "You're welcome. Have a great day!", direction: "incoming", position: "last"},
	];