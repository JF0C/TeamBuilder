import { FunctionComponent } from "react";
import { PageDto } from "../../dtos/base/PageDto";
import { PaginationButton } from "./PaginationButton";
import { LoadingSpinner } from "./LoadingSpinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'

export const Pagination: FunctionComponent<{pageData: PageDto | null, onPageChange: (page: number) => void}> = ({pageData, onPageChange}) => {

    if (pageData === null) {
        return <LoadingSpinner />
    }

    return <div className="flex flex-row w-full justify-center gap-2">
        {
            pageData.page > 1 ?
            <>
                <PaginationButton page="1" onClick={() => onPageChange(1)} />
                {
                    pageData.page > 2 ?
                        <PaginationButton page={<FontAwesomeIcon icon={faCaretLeft}/>} onClick={() => onPageChange(pageData.page - 1)} />
                        :<></>
                }
            </>
            :<></>
        }
        <PaginationButton page={pageData.page.toString()} onClick={() => {}} isCurrent />
        {
            pageData.totalPages > pageData.page ?
            <>
                {
                    pageData.totalPages - 1 > pageData.page ?
                    <PaginationButton page={<FontAwesomeIcon icon={faCaretRight}/>} onClick={() => onPageChange(pageData.page + 1)} />
                    :<></>
                }
                <PaginationButton page={pageData.totalPages.toString()} onClick={() => onPageChange(pageData.totalPages)} />
            </>
            :<></>
        }
    </div>
}