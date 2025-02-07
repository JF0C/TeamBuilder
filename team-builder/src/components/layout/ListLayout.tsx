import { FunctionComponent, ReactNode } from "react";

export type ListLayoutProps = {
    children: ReactNode | ReactNode[];
    title?: string | ReactNode;
    bottomRow?: ReactNode;
}

export const ListLayout: FunctionComponent<ListLayoutProps> = ({ children, title, bottomRow }) => {

    return <div className="list-layout flex flex-col size-full relative">
        {
            title ? <div className="pb-2 font-bold">{title}</div> : <></>
        }
        <div className="flex-1 flex flex-col overflow-y-scroll">
            <div className="flex flex-row flex-wrap gap-2">
                {children}
                <div className="w-full h-8 placeholder"></div>
            </div>
        </div>
        <div className="absolute bottom-0 w-0 left-1/2 mb-2">
            <div className="flex flex-row justify-center">
                {
                    bottomRow
                }
            </div>

        </div>
    </div>
}