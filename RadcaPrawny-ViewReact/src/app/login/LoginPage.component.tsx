import React, {FC, ReactElement} from "react";
import {IconEnum} from "@/components/CustomIcon/iconUtils/Icon.enum";
import {CustomInput} from "@/components/CustomInput/CustomInput.component";

export const LoginPage: FC = (): ReactElement => {
	return (
		<>
			<CustomInput label="Email" inputType="email" icon={IconEnum.CLOSED_ENVELOPE} />
		</>
	);
};
