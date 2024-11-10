import React from "react";
import { StyledUpload } from "./Upload.style";
import { Upload as AntdUpload, Button } from "antd";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { CustomIcon } from "components/CustomIcon/CustomIcon.component";


export const Upload: React.FC = () => {
    return (
        <StyledUpload>
            <AntdUpload
                beforeUpload={(file) => {
                    console.log("File selected:", file);
                    return false; 
                }}
            >
                <Button icon={<CustomIcon icon={faUpload}/>}>Wybierz plik do przesłania</Button>
            </AntdUpload>
        </StyledUpload>
    );
};
