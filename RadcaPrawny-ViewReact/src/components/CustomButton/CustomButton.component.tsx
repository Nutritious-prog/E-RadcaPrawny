import {Button} from "antd";
import {ButtonVariantType} from "antd/es/button/buttonHelpers";
import {COLORS} from "assets/colors";
import React, {FC, ReactElement} from "react";
import {StyledCustomButton} from "./CustomButton.style";

interface CustomButtonProps {
	label: string;
	onClick: () => void;
	className?: string;
	buttonColor?: string;
	buttonColorOnHover?: string;
	labelColor?: string;
	disabled?: boolean;
	hidden?: boolean;
	variant?: ButtonVariantType;
}

export const CustomButton: FC<CustomButtonProps> = ({
	label,
	onClick,
	className = "",
	buttonColor = COLORS.DARK_TURQUOISE,
	buttonColorOnHover = COLORS.TURQUOISE,
	labelColor = COLORS.WHITE,
	disabled = false,
	hidden = false,
	variant = "text",
}: CustomButtonProps): ReactElement => {
	return (
		<StyledCustomButton
			className={className}
			buttonColor={buttonColor}
			labelColor={labelColor}
			buttonColorOnHover={buttonColorOnHover}
		>
			<Button onClick={onClick} disabled={disabled} hidden={hidden} variant={variant}>
				{label}
			</Button>
		</StyledCustomButton>
	);
};
