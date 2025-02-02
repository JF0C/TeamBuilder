import { FunctionComponent, ReactNode } from "react";

export const RightOrTopHalf: FunctionComponent<{children: ReactNode}> = ({children}) => {
    return <div className="h-1/2 pb-2 border-b md:pb-0 md:pl-2 md:border-l md:h-full md:w-1/2 md:border-b-0">
        {children}
    </div>
}