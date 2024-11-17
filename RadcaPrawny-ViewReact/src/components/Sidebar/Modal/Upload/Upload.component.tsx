import React from "react";
import { Upload as AntdUpload } from "antd";
import { CustomButton } from "components/CustomButton/CustomButton.component";

export const Upload: React.FC = () => {
    const handleUpload = () => {
        console.log("File uploaded");
    };

    return (
        <AntdUpload
            beforeUpload={(file) => {
                console.log("File selected:", file);
                return false;
            }}
        >
            <CustomButton label={`Wybierz plik`} onClick={handleUpload} className="h-8" />
        </AntdUpload>
    );
};
