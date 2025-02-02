import { FunctionComponent } from "react";

export type RadioGroupProps = {
    items: {name: string, id: number}[]
    onSelectionChanged: (id: number) => void
    selectedId: number
    justifyRight?: boolean
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = (props) => {

    return <div className={`flex flex-row flex-wrap ${props.justifyRight ? 'justify-end' : ''}`}>
        {
            props.items.map(item => 
                <div className={`${item.id === props.selectedId ? 'highlighted' : ''} px-2 rounded-md cursor-pointer`} 
                    key={`radio-${item.id}-${item.name}`} 
                    onClick={() => props.onSelectionChanged(item.id)}>
                    {item.name}
                </div>
            )
        }
    </div>
}