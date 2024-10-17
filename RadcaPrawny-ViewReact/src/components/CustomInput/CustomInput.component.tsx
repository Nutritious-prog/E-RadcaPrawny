import {Input} from "antd";
import React, {FC, HTMLInputTypeAttribute, ReactElement} from "react";
import {IconEnum} from "@/utils/iconUtils/Icon.enum";
import {STRING_UTILS} from "@/utils/stringUtils/StringUtils.utils";
import {CustomIcon} from "../CustomIcon/CustomIcon.component";
import {StyledCustomInput} from "./CustomInput.style";

interface CustomInputProps {
	label: string;
	inputType: HTMLInputTypeAttribute;
	placeholder?: string;
	icon?: IconEnum;
	iconColor?: string;
}

export const CustomInput: FC<CustomInputProps> = (props: CustomInputProps): ReactElement => {
	const suffixIcon = <CustomIcon icon={props.icon} iconColor={props.iconColor} />;

	return (
		<StyledCustomInput>
			<div className="label-container">{props.label}</div>
			<Input
				className="input-container"
				type={props.inputType}
				placeholder={props.placeholder ?? STRING_UTILS.EMPTY_STRING}
				suffix={suffixIcon}
			/>
		</StyledCustomInput>
	);
};
