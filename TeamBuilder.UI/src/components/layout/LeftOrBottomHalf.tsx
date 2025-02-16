import { FunctionComponent, ReactNode } from "react";

export const LeftOrBottomHalf: FunctionComponent<{children: ReactNode, expanded?: boolean}> =({children, expanded}) => {
    return <div className={`left-or-bottom flex md:h-full pt-2 md:pt-0 md:pr-2 justify-center ${expanded ? '' : 'h-1/2 md: md:w-1/2'}`}>
        {children}
    </div>
}