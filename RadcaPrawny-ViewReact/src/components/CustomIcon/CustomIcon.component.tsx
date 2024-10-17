import React, {FC, ReactElement} from "react";
import {IconEnum} from "@/components/CustomIcon/iconUtils/Icon.enum";
import {IconsSVGList, remCalc} from "@/components/CustomIcon/iconUtils/IconUtils.utils";
import Icon from "@ant-design/icons";

import type {GetProps} from "antd";
type CustomIconComponentProps = GetProps<typeof Icon>;

interface CustomIconProps extends CustomIconComponentProps {
	icon: IconEnum;
	iconColor?: string;
}

export const CustomIcon: FC<CustomIconProps> = (props: Partial<CustomIconProps>): ReactElement => {
	const iconHeight: string = props.height ? remCalc(props.height) : "1rem";
	const iconWidth: string = props.width ? remCalc(props.width) : "1rem";
	const iconColor: string = props.iconColor || "black";

	const icon: ReactElement = (
		<svg width={iconHeight} height={iconWidth} fill={iconColor}>
			<title>Custom Icon</title>
			<path d={IconsSVGList.get(props.icon!)} fill={iconColor}></path>
		</svg>
	);

	return <Icon component={() => icon} />;
};
