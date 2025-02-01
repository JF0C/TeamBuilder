import { FunctionComponent, ReactNode } from "react";

export type ListAndDetailsProps = {
    showDetails: boolean
    list: ReactNode
    details: ReactNode
    bottom: ReactNode | ReactNode[]
}

export const ListAndDetails: FunctionComponent<ListAndDetailsProps> = ({ showDetails, list, details, bottom }) => {
    console.log('show details: ', showDetails)
    return (
        <div className="flex flex-col w-full h-full p-4">
            <div className="flex flex-col w-full flex-1 flex-wrap md:flex-row-reverse md:justify-center">
                {
                    showDetails ?
                        <div className="md:w-1/2 h-full">
                            {details}
                        </div>
                        : <></>
                }
                <div className={`${showDetails ? 'md:w-1/2' : ''} h-full`}>
                    {list}
                </div>
            </div>
            <div className="w-full">
                {bottom}
            </div>
        </div>
    )
}