export interface LegalActDTO {
    id: number;
    title: string;
    description: string;
    effectiveDate: Date;
    textContent?: string; 
    modifiedAt?: Date;
}

export interface LegalActContentDTO {
    content: string;
}