import { FunctionComponent, ReactNode } from "react";

export type ListLayoutProps = {
    children: ReactNode | ReactNode[];
    title?: string | ReactNode;
    bottomRow?: ReactNode;
}

export const ListLayout: FunctionComponent<ListLayoutProps> = ({children, title, bottomRow}) => {

    return <div className="flex flex-col size-full">
        {
            title ? <div className="pb-2 font-bold">{title}</div> : <></>
        }
        <div className="flex-1 flex flex-col overflow-y-scroll">
            <div className="flex flex-row flex-wrap gap-2">
                {children}
            </div>
        </div>
        {
            bottomRow
        }
    </div>
}