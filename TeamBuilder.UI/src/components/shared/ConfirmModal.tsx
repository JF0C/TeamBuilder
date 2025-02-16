import { FunctionComponent, ReactNode } from "react";
import { Modal } from "./Modal";

export type ConfirmModalProps = {
    buttonContent: string | ReactNode
    children: string | ReactNode
    onConfirm: () => void
}

export const ConfirmModal: FunctionComponent<ConfirmModalProps> = (props) => {
    return <Modal
        buttonContent={props.buttonContent}>
        <div>
            {props.children}
        </div>
        <div className="flex flex-row justify-between w-full">
            <div className="button closes-modal">Cancel</div>
            <div onClick={props.onConfirm} className="button color-red">Confirm</div>
        </div>
    </Modal>
}