export interface LegalActDTO {
    id: number;
    title: string;
    description?: string;
    effectiveDate?: Date;
    textContent?: string;
    legalActTags: LegalActTagDTO[];
    createdAt: Date;
    modifiedAt?: Date;
}

export interface LegalActContentDTO {
    content: string;
}

export interface LegalActTagDTO {
    tag: {
        id: number;
        name: string;
        createdAt: Date;
        modifiedAt?: Date;
    };
    addedAt: Date;
}