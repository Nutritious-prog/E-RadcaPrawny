import { RootState } from "app/redux/store";
import { UserRole } from "app/redux/userRole/UserRole.type";
import { COLORS } from "assets/colors";
import { CustomButton } from "components/CustomButton/CustomButton.component";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TagOutlined } from "@ant-design/icons";
import { StyledActionsBar } from "./ActionsBar.style";
import { Tag } from "./Tag/Tag.component";
import { LegalActTagDTO } from "app/documentEditor/DocumentEditor.dto";
import { mockTags } from "./Tag/mockTags";

interface ActionsBarProps {
    tags: LegalActTagDTO[];
    onSave: () => void;
    onTagChange: (selectedTags: string[]) => void;
    selectedActId: number | null;
}

export const ActionsBar: React.FC<ActionsBarProps> = ({ tags, onSave, onTagChange, selectedActId }) => {
    const role: UserRole = useSelector((state: RootState) => state.user.role);
    const [selectedTags, setSelectedTags] = useState<string[]>(tags.map((tag) => tag.tag.name));

    const handleTagSelect = (label: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, label] : selectedTags.filter((tag) => tag !== label);
        setSelectedTags(nextSelectedTags);
        onTagChange(nextSelectedTags);
    };

    const isAdmin: boolean = role === UserRole.ROLE_ADMIN;

    useEffect(() => {
        setSelectedTags(tags.map((tag) => tag.tag.name));
    }, [tags]);

    const filteredMockTags = mockTags.filter((mockTag) => !tags.some((tag) => tag.tag.name === mockTag.label));

    return (
        <StyledActionsBar>
            <h2 className="actions-text mb-6">Dodatkowe opcje</h2>
            {isAdmin ? (
                <>
                    <h2 className="actions-tag mb-2">
                        <TagOutlined className="mr-2" /> SŁOWA KLUCZOWE
                    </h2>
                    {selectedActId === null ? ( 
                        <p>Wybierz akt prawny, aby zobaczyć słowa kluczowe.</p>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(45%,2fr))] gap-1">
                            {tags.map((tag, index) => (
                                <div key={index} className="p-0.5">
                                    <Tag
                                        label={tag.tag.name}
                                        checked={selectedTags.includes(tag.tag.name)}
                                        onChange={(checked) => handleTagSelect(tag.tag.name, checked)}
                                    />
                                </div>
                            ))}
                            {filteredMockTags.map((tag, index) => (
                                <div key={index} className="p-0.5">
                                    <Tag
                                        label={tag.label}
                                        checked={selectedTags.includes(tag.label)}
                                        onChange={(checked) => handleTagSelect(tag.label, checked)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h2 className="actions-tag mb-2">
                        <TagOutlined className="mr-2" /> SŁOWA KLUCZOWE
                    </h2>
                    {selectedActId === null ? ( 
                        <p>Wybierz akt prawny, aby zobaczyć słowa kluczowe.</p>
                    ) : (
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(45%,2fr))] gap-1">
                            {tags.map((tag, index) => (
                                <div key={index} className="p-2">
                                    <Tag label={tag.tag.name} checked={true} onChange={() => {}} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            <div className="flex flex-col space-y-6 mt-12 justify-center items-center">
                <CustomButton
                    onClick={onSave}
                    label="ZAPISZ"
                    buttonColor={`${COLORS.VERY_DARK_BLUE}`}
                    labelColor={`${COLORS.WHITE}`}
                    fontBold={true}
                    className="h-16 min-w-12 w-11/12"
                />
            </div>
        </StyledActionsBar>
    );
};
