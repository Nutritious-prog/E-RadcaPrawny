import React, {FC, ReactElement} from "react";
import {CustomInput} from "@/components/CustomInput/CustomInput.component";
import {IconEnum} from "@/utils/iconUtils/Icon.enum";

export const LoginPage: FC = (): ReactElement => {
	return (
		<>
			<CustomInput label="Email" inputType="email" icon={IconEnum.CLOSED_ENVELOPE} />
		</>
	);
};
