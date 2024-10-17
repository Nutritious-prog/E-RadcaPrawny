import {ReactElement} from 'react';
import {ClosedEnvelopeIconSVG} from '@/assets/icons/ClosedEnvelope';
import {IconEnum} from './Icon.enum';

export const IconsSVGList: Map<IconEnum, string> = new Map([
    [IconEnum.CLOSED_ENVELOPE, ClosedEnvelopeIconSVG]
]);

export const remCalc = (px: number | string, base: number = 16) => {
	const tempPx = `${px}`.replace("px", "");

	return (1 / base) * parseInt(tempPx) + "rem";
};
