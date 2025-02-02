import { FunctionComponent, ReactNode } from "react";

export const LeftOrBottomHalf: FunctionComponent<{children: ReactNode}> =({children}) => {
    return <div className="left-or-bottom flex md:h-full pt-2 md:pt-0 md:pr-2h-1/2 md:w-1/2 justify-end">
        {children}
    </div>
}