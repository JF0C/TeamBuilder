import { FunctionComponent, ReactNode } from "react";

export const LeftOrTopHalf: FunctionComponent<{children: ReactNode | ReactNode[]}> = ({children}) => {
    return <div className="left-or-top h-1/2 md:h-full 
        flex-1 pb-2 md:pb-0 md:pr-2">
        {children}
    </div>
}