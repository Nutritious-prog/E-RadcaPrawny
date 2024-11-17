import React, { ReactElement, ReactNode } from "react";
import { Tooltip as AntdTooltip } from "antd";
import { COLORS } from "assets/colors";

interface TooltipProps {
    title: string;
    children: ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = (props: TooltipProps): ReactElement => {
    return (
        <AntdTooltip title={props.title} color={`${COLORS.VERY_DARK_BLUE}`}>
            {props.children}
        </AntdTooltip>
    );
};
