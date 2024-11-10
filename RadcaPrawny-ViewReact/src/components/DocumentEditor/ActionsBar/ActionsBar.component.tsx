import React from "react";
import { StyledActionsBar } from "./ActionsBar.style";
import { CustomButton } from "components/CustomButton/CustomButton.component";
import { COLORS } from "assets/colors";
import { mockTags } from "../Tag/mockTags";
import { Tag } from "../Tag/Tag.component";
import { TagOutlined } from "@ant-design/icons";

export const ActionsBar: React.FC = () => {
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
                        <Tag label={tag.label} />
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
