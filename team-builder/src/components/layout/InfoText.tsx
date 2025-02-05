import { FunctionComponent, ReactNode } from "react";

export const InfoText: FunctionComponent<{children: string | ReactNode}> = ({children}) => {
    return <div className="text-msm">
        {children}
    </div>
}