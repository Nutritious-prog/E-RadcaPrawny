import React from "react";
import { StyledUpload } from "./Upload.style";
import { Upload as AntdUpload, Button } from "antd";


export const Upload: React.FC = () => {
    return (
        <StyledUpload>
            <AntdUpload
                beforeUpload={(file) => {
                    console.log("File selected:", file);
                    return false; 
                }}
            >
                <Button>Wybierz plik do przesłania</Button>
            </AntdUpload>
        </StyledUpload>
    );
};
