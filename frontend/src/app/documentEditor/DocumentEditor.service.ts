import {ApiResponse} from '@/utils/axiosUtils/ApiResponse.dto';
import { LegalActContentDTO, LegalActDTO, LegalActTagDTO } from './DocumentEditor.dto';
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

    updateLegalAct: async (id: number, legalAct: LegalActDTO): Promise<ApiResponse<LegalActDTO>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(legalAct),
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
    },

    addTagToLegalAct: async (id: number, tag: LegalActTagDTO): Promise<ApiResponse<LegalActDTO>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(tag),
        });
        return response.json();
    },

    addMultipleTagsToLegalAct: async (id: number, tags: LegalActTagDTO[]): Promise<ApiResponse<LegalActDTO>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}/tags/multiple`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(tags),
        });
        return response.json();
    },

    removeTagFromLegalAct: async (id: number, tag: LegalActTagDTO): Promise<ApiResponse<LegalActDTO>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}/tags`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(tag),
        });
        return response.json();
    },

    removeMultipleTagsFromLegalAct: async (id: number, tags: LegalActTagDTO[]): Promise<ApiResponse<LegalActDTO>> => {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}/tags/multiple`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(tags),
        });
        return response.json();
    },
}