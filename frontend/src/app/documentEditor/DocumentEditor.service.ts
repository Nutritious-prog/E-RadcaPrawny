import {ApiResponse} from '@/utils/axiosUtils/ApiResponse.dto';
import { LegalActContentDTO, LegalActDTO } from './DocumentEditor.dto';

const API_URL = "http://localhost:8080/api/v1/legal-acts";

export const DocumentEditorService = {
    getLegalActs: async (): Promise<ApiResponse<LegalActDTO[]>> => {
        const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.json();
    },

    updateLegalActContent: async (id: number, legalActContentDTO: LegalActContentDTO): Promise<ApiResponse<LegalActDTO>> => {
        const response = await fetch(`${API_URL}/${id}/content`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(legalActContentDTO),
        });
        return response.json();
    }
}