import React, { ReactNode } from "react";
import { StyledModal } from "./Modal.style";
import { Modal as AntdModal } from "antd";

interface ModalProps {
    open: boolean;
    title: string;
    onCancel: () => void;
    children: ReactNode;
    footer: ReactNode;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    return (
        <StyledModal>
            <AntdModal title={props.title} open={props.open} onCancel={props.onCancel} footer={props.footer}>
                {props.children}
            </AntdModal>
        </StyledModal>
    );
};
