import { FunctionComponent, ReactNode } from "react";

export const RightOrBottomHalf: FunctionComponent<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
    return <div className="h-1/2 md:h-full md:w-1/2 border-t pt-2 md:pt-0 md:pl-2 md:border-t-0 md:border-l">
        {children}
    </div>
}