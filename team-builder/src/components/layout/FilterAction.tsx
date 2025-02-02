import { FunctionComponent, ReactNode } from "react";

export const FilterAction: FunctionComponent<{children: ReactNode, onClick?: () => void}> = ({children, onClick}) => {
    return <div onClick={onClick} className="text-msm px-2 border rounded-md button">
        {children}
    </div>
}