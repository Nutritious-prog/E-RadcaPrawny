import React, { ReactElement } from "react";
import { StyledTag } from "./Tag.style";
import { Tag as AntdTag } from "antd";
import { COLORS } from "assets/colors";

interface TagProps {
    label: string;
}

export const Tag: React.FC<TagProps> = (props: TagProps): ReactElement => {

    return (
        <StyledTag>
            <AntdTag color={`${COLORS.TURQUOISE}`} bordered={false}>{props.label}</AntdTag>
        </StyledTag>
    );
};
