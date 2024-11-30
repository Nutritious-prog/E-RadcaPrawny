import {ApiResponse} from '@/utils/axiosUtils/ApiResponse.dto';
import { LegalActContentDTO, LegalActDTO } from './DocumentEditor.dto';
import store, { RootState } from 'app/redux/store';

const API_URL = "http://localhost:8080/api/v1/legal-acts";

const getToken = (): string | null => {
    const state: RootState = store.getState();
    console.log("token:", state.user.token);
    return state.user.token;
};


export const DocumentEditorService = {
    getLegalActs: async (token: string): Promise<ApiResponse<LegalActDTO[]>> => {
        const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.json();
    },

    updateLegalActContent: async (id: number, legalActContentDTO: LegalActContentDTO): Promise<ApiResponse<LegalActDTO>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}/content`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(legalActContentDTO),
        });
        return response.json();
    }
}