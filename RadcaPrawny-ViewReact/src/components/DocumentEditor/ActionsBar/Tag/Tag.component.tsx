import React, { ReactElement } from "react";
import { StyledTag } from "./Tag.style";
import { Tag as AntdTag } from "antd";
import { Tooltip } from "../Tooltip/Tooltip.component";

interface TagProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export const Tag: React.FC<TagProps> = (props: TagProps): ReactElement => {
    return (
        <StyledTag>
            {props.disabled ? (
                <Tooltip title="Musisz mieć uprawnienia administratora, żeby tagować dokumenty">
                    <AntdTag>{props.label}</AntdTag>
                </Tooltip>
            ) : (
                <AntdTag.CheckableTag checked={props.checked} onChange={props.onChange}>
                    {props.label}
                </AntdTag.CheckableTag>
            )}
        </StyledTag>
    );
};
