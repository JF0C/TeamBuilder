import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FunctionComponent, ReactNode } from "react"

export type DetailsLayoutProps = {
    id: string
    title: string | ReactNode
    children: ReactNode | ReactNode[]
    onClose: () => void
}

export const DetailsLayout: FunctionComponent<DetailsLayoutProps> = ({ id, title, children, onClose }) => {

    return <div style={{ minWidth: '200px' }} className="pb-4 size-full flex flex-col">
        <div className="flex flex-row justify-between pb-2">
            <div>{id}</div>
            <div>{title}</div>
            <div onClick={onClose} className="button">
                <FontAwesomeIcon icon={faXmarkCircle}/>
            </div>
        </div>
        <div className="flex-1 overflow-y-scroll text-left">
            {children}
        </div>
    </div>
}