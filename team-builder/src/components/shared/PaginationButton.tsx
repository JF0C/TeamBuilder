import { FunctionComponent, ReactNode } from "react";

export const PaginationButton: FunctionComponent<{page: string | ReactNode, onClick: () => void, isCurrent?: boolean}> = ({page, onClick, isCurrent}) => {

    return <div className={`${!isCurrent ? 'button' : ''} rounded-full bg-action px-2 text-msm`} onClick={onClick}>
        {page}
    </div>
}