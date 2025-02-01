import { FunctionComponent, ReactNode } from "react";
import { Pagination } from "../shared/Pagination";
import { PageDto } from "../../dtos/PageDto";

export type PaginatedListLayoutProps = {
    children: ReactNode | ReactNode[]
    onPageChange: (page: number) => void
    pageData: PageDto | null
}

export const PaginatedListLayout: FunctionComponent<PaginatedListLayoutProps> = ({ children, onPageChange, pageData }) => {
    return (
        <div className="size-full flex flex-col">
            <div className="flex-1">
                <div className="flex flex-row flex-wrap gap-2">
                    {children}
                </div>
            </div>
            <div className="w-full pt-2">
                <Pagination pageData={pageData} onPageChange={onPageChange} />
            </div>
        </div>
    )
}