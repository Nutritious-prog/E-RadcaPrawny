import React, { ReactNode } from "react";
import { Modal as AntdModal } from "antd";

interface ModalProps {
    open: boolean;
    title: string;
    onCancel: () => void;
    children: ReactNode;
    footer: ReactNode;
    centered?: boolean;
}

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
    return (
        <AntdModal
            title={props.title}
            open={props.open}
            onCancel={props.onCancel}
            footer={props.footer}
            centered={props.centered}
        >
            {props.children}
        </AntdModal>
    );
};
