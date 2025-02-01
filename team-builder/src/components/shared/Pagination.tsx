import { FunctionComponent } from "react";
import { PageDto } from "../../dtos/PageDto";
import { PaginationButton } from "./PaginationButton";
import { LoadingSpinner } from "./LoadingSpinner";

export const Pagination: FunctionComponent<{pageData: PageDto | null, onPageChange: (page: number) => void}> = ({pageData, onPageChange}) => {

    if (pageData === null) {
        return <LoadingSpinner />
    }

    return <div className="flex flex-row w-full justify-center">
        <PaginationButton page="1" onClick={() => onPageChange(1)} />
        <div>
            prev
        </div>
        <div>
            {pageData.page}
        </div>
        <div>
            next
        </div>
        <div>
            {pageData.totalPages}
        </div>
    </div>
}