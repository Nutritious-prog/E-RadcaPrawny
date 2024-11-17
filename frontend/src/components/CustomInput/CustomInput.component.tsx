import {Input} from "antd";
import React, {FC, HTMLInputTypeAttribute, ReactElement} from "react";
import {STRING_UTILS} from "@/utils/stringUtils/StringUtils.utils";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {CustomIcon} from "../CustomIcon/CustomIcon.component";
import {StyledCustomInput} from "./CustomInput.style";

interface CustomInputProps {
	label: string;
	inputType: HTMLInputTypeAttribute;
	value: string;
	setValue: (value: string) => void;
	className?: string;
	disabled?: boolean;
	hidden?: boolean;
	placeholder?: string;
	icon?: IconDefinition;
	iconColor?: string;
}

export const CustomInput: FC<CustomInputProps> = (props: CustomInputProps): ReactElement => {
	const suffixIcon: ReactElement | null = props.icon ? (
		<CustomIcon icon={props.icon} iconColor={props.iconColor} />
	) : null;

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const newValue: string = event.target.value;
		props.setValue(newValue);
	};

	return (
		<StyledCustomInput className={props.className}>
			<div className="label-container">{props.label}</div>
			<Input
				className="input-container"
				type={props.inputType}
				placeholder={props.placeholder ?? STRING_UTILS.EMPTY_STRING}
				suffix={suffixIcon}
				value={props.value}
				onChange={handleOnChange}
				disabled={props.disabled}
				hidden={props.hidden}
			/>
		</StyledCustomInput>
	);
};
