import { FunctionComponent, ReactNode } from "react";
import { Pagination } from "../shared/Pagination";
import { PageDto } from "../../dtos/base/PageDto";
import { ListLayout } from "./ListLayout";

export type PaginatedListLayoutProps = {
    children: ReactNode | ReactNode[]
    onPageChange: (page: number) => void
    pageData: PageDto | null
    title?: string | ReactNode | ReactNode[]
}

export const PaginatedListLayout: FunctionComponent<PaginatedListLayoutProps> = ({ children, onPageChange, pageData, title }) => {
    return (
        <div className="paginated-list size-full flex flex-col">
            <ListLayout title={title} bottomRow={
                <div className="w-full pt-2">
                    <Pagination pageData={pageData} onPageChange={onPageChange} />
                </div>
            }>
                {children}
            </ListLayout>
        </div>
    )
}