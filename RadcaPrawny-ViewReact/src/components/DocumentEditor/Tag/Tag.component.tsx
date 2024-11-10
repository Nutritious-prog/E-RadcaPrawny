import React, { ReactElement } from "react";
import { StyledTag } from "./Tag.style";
import { Tag as AntdTag } from "antd";
import { COLORS } from "assets/colors";

interface TagProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Tag: React.FC<TagProps> = (props: TagProps): ReactElement => {

    return (
        <StyledTag>
            <AntdTag.CheckableTag checked={props.checked} onChange={props.onChange}>{props.label}</AntdTag.CheckableTag>
        </StyledTag>
    );
};
