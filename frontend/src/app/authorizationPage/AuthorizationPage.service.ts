import {ApiResponse} from '@/utils/axiosUtils/ApiResponse.dto';
import {LoginRequestDTO, LoginResponseDTO, UserDTO} from './AuthorizationPage.dto';

const API_URL = "http://localhost:8080/api/v1/auth";

export const AuthorizationPageService = {
    registerUserRest: async (userDTO: UserDTO): Promise<ApiResponse<any>> => {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDTO),
        });
        return response.json();
    },

    createAuthenticationTokenRest: async (userDTO: LoginRequestDTO): Promise<ApiResponse<LoginResponseDTO>> => {
        const response = await fetch(`${API_URL}/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDTO),
        });
        return response.json();
    }
}