import { ApiResponse } from "@/utils/axiosUtils/ApiResponse.dto";
import { StartChatDTO, SendMessageRequestDTO, SendMessageResponseDTO } from "./Chatbot.dto";
import store, { RootState } from "app/redux/store";

const API_URL = "http://localhost:8080/api/v1/chatbot";

const getToken = (): string | null => {
    const state: RootState = store.getState();
    return state.user.token;
};

export const ChatbotService = {
    startChat: async (): Promise<ApiResponse<void>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/start-chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.json();
    },

    sendMessage: async (message: string): Promise<ApiResponse<SendMessageResponseDTO>> => {
        const token = getToken();
        const request: SendMessageRequestDTO = { message };
        const response = await fetch(`${API_URL}/send-message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(request),
        });
        return response.json();
    },
};