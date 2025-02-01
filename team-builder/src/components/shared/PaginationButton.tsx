import { FunctionComponent, ReactNode } from "react";

export const PaginationButton: FunctionComponent<{page: string | ReactNode, onClick: () => void, isCurrent?: boolean}> = ({page, onClick, isCurrent}) => {

    return <div className={`${!isCurrent ? 'button' : ''} rounded-full bg-action px-3`} onClick={onClick}>
        {page}
    </div>
}