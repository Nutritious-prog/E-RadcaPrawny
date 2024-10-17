import React, {ReactElement} from "react";
import {IconEnum} from "@/utils/iconUtils/Icon.enum";
import {IconsList} from "@/utils/iconUtils/IconUtils.utils";
import Icon from "@ant-design/icons";

import type {GetProps} from "antd";
type CustomIconComponentProps = GetProps<typeof Icon>;

interface CustomIconProps extends CustomIconComponentProps {
	icon: IconEnum;
	iconColor?: string;
}

export const CustomIcon = (props: Partial<CustomIconProps>) => {
	const iconHeight: string = props.height ? remCalc(props.height) : "1rem";
	const iconWidth: string = props.width ? remCalc(props.width) : "1rem";
	const iconColor: string = props.iconColor || "black";

	const icon: ReactElement = IconsList.get(props.icon!)!(iconHeight, iconWidth, iconColor);

	return <Icon component={() => icon} />;
};

const remCalc = (px: number | string, base: number = 16) => {
	const tempPx = `${px}`.replace("px", "");

	return (1 / base) * parseInt(tempPx) + "rem";
};
