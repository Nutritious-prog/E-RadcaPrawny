import { LegalActDTO } from "app/documentEditor/DocumentEditor.dto";

export interface StartChatDTO {
    legalActs: LegalActDTO[];
}

export interface SendMessageRequestDTO {
    message: string;
}

export interface SendMessageResponseDTO {
    response: string;
}