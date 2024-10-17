import {ReactElement} from 'react';
import {ClosedEnvelopeIcon} from '@/assets/icons/ClosedEnvelope';
import {IconEnum} from './Icon.enum';

export const IconsList: Map<IconEnum, (height: string , width: string, color: string) => ReactElement> = new Map([
    [IconEnum.CLOSED_ENVELOPE, (height: string , width: string, color: string) => ClosedEnvelopeIcon(height, width, color)]
]);