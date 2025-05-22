import { FunctionComponent, ReactNode, useState } from "react";

export type ModalProps = {
  children?: ReactNode[] | ReactNode;
  buttonContent?: ReactNode | string;
};

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  buttonContent,
}) => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modalClicked = (e: any) => {
    const targetClasses = e.target.className;
    if (
      targetClasses.includes("modal-background") ||
      targetClasses.includes("closes-modal")
    ) {
      setOpen(false);
    }
  };

  return (
    <>
      <button className="button flex" onClick={() => setOpen(true)}>
        {buttonContent ?? "Modal"}
      </button>
      {open ? (
        <div
          className="absolute size-full left-0 top-0 flex flex-row justify-center items-center modal-background font-normal"
          onClick={modalClicked}
        >
          <div className="flex flex-row flex-wrap gap-2 modal-content p-4 rounded-md">
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
