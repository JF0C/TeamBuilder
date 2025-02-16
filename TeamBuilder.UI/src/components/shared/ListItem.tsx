import { FunctionComponent, ReactNode } from "react";

export type ListItemProps = {
    isSelected?: boolean
    onSelected?: () => void
    children: string | ReactNode | ReactNode[]
}

export const ListItem: FunctionComponent<ListItemProps> = ({ isSelected, onSelected, children }) => {

    return (
        <div className={`${isSelected ? 'highlighted' : ''} closes-modal cursor-pointer rounded-md border border-2 px-2`}
            onClick={() => onSelected?.()}>
            {children}
        </div>
    )
}