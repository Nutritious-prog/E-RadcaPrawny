import React, { useState } from "react";
import { StyledActionsBar } from "./ActionsBar.style";
import { CustomButton } from "components/CustomButton/CustomButton.component";
import { COLORS } from "assets/colors";
import { mockTags } from "./Tag/mockTags";
import { Tag } from "./Tag/Tag.component";
import { TagOutlined } from "@ant-design/icons";

export const ActionsBar: React.FC = () => {
    const isAdmin = false; //TODO: to be continued
    const [selectedTags, setSelectedTags] = useState<string[]>(["Podatki"]);
    const handleTagSelect = (label: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, label] : selectedTags.filter((tag) => tag !== label);
        setSelectedTags(nextSelectedTags);
    };

    const handleDownload = () => {
        console.log("Download");
    };

    const handleSave = () => {
        console.log("Save");
    };

    return (
        <StyledActionsBar>
            <h2 className="actions-text mb-6">Dodatkowe opcje</h2>
            <h2 className="actions-tag mb-2">
                <TagOutlined className="mr-2" /> SŁOWA KLUCZOWE
            </h2>
            <div className="flex flex-wrap">
                {mockTags.map((tag, index) => (
                    <div key={index} className="w-1/2 p-2">
                        <Tag
                            label={tag.label}
                            checked={selectedTags.includes(tag.label)}
                            onChange={(checked) => handleTagSelect(tag.label, checked)}
                            disabled={!isAdmin}
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col space-y-6 mt-12">
                <CustomButton
                    onClick={handleDownload}
                    label="POBIERZ"
                    buttonColor={`${COLORS.MAIN_BACKGROUND}`}
                    labelColor={`${COLORS.VERY_DARK_BLUE}`}
                    fontBold={true}
                    className={"h-16"}
                />
                <CustomButton
                    onClick={handleSave}
                    label="ZAPISZ"
                    buttonColor={`${COLORS.VERY_DARK_BLUE}`}
                    labelColor={`${COLORS.WHITE}`}
                    fontBold={true}
                />
            </div>
        </StyledActionsBar>
    );
};
