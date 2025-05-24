import { FunctionComponent, ReactNode } from "react";

export type ListItemProps = {
  isSelected?: boolean;
  onSelected?: () => void;
  children: string | ReactNode | ReactNode[];
  className?: string;
};

export const ListItem: FunctionComponent<ListItemProps> = ({
  isSelected,
  onSelected,
  children,
  className,
}) => {
  return (
    <div
      className={`${
        isSelected ? "highlighted" : ""
      } closes-modal cursor-pointer rounded-md border border-2 px-2 ${
        className ?? ""
      }`}
      onClick={() => onSelected?.()}
    >
      {children}
    </div>
  );
};
