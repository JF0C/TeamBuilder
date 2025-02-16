import { FunctionComponent, ReactNode } from "react";

export const RightOrBottomHalf: FunctionComponent<{ children: ReactNode | ReactNode[], contracted?: boolean }> = ({ children, contracted }) => {
    return <div className={`${contracted ? 
        'h-0 md:w-0' : 
        'h-1/2 md:w-1/2 md:h-full border-t pt-2 md:pt-0 md:pl-2 md:border-t-0 md:border-l'}
        animated right-or-bottom`}>
        { contracted ? <></> : children}
    </div>
}