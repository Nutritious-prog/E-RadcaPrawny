import React, {FC, ReactElement} from "react";
import {IconDefinition, SizeProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface CustomIconProps {
	icon: IconDefinition;
	size?: SizeProp;
	iconColor?: string;
	border?: boolean;
	onHoverIcon?: IconDefinition;
	onHoverIconColor?: string;
}

export const CustomIcon: FC<CustomIconProps> = (props: CustomIconProps): ReactElement => {
	return (
		<FontAwesomeIcon
			fontWeight={100}
			icon={props.icon}
			color={props.iconColor}
			fontSize={props.size}
			border={props.border}
		/>
	);
};
