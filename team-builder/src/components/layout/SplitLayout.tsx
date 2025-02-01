import { FunctionComponent, ReactNode } from "react"

export const SplitLayout: FunctionComponent<{left: ReactNode, right: ReactNode, bottom: ReactNode | ReactNode[]}> = ({left, right, bottom}) => {
    return <div className="flex flex-col h-full p-4">
            <div className="flex-1 flex flex-row">
                <div className="w-1/2 pr-2 border-r">
                    {left}
                </div>
                <div className="w-1/2 pl-2">
                    {right}
                </div>
            </div>
            <div className="w-full flex flex-row justify-between">
                {bottom}
            </div>
        </div>

}