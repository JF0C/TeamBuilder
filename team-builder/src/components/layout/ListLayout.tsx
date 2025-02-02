import { FunctionComponent, ReactNode } from "react";

export const ListLayout: FunctionComponent<{ children: ReactNode | ReactNode[], title?: string | ReactNode }> = ({children, title}) => {

    return <div className="flex flex-col size-full">
        {
            title ? <div className="pb-2">{title}</div> : <></>
        }
        <div className="flex-1 flex flex-col overflow-y-scroll">
            <div className="flex flex-row flex-wrap gap-2 overflow-y-scroll">
                {children}
            </div>
        </div>
    </div>
}