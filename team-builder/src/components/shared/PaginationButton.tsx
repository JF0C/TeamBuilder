import { FunctionComponent } from "react";

export const PaginationButton: FunctionComponent<{page: string, onClick: () => void}> = ({page, onClick}) => {

    return <div className="button rounded-full light" onClick={onClick}>
        {page}
    </div>
}