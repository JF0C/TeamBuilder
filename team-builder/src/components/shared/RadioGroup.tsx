import { FunctionComponent } from "react";

export type RadioGroupProps = {
    items: {name: string, id: number}[]
    onSelectionChanged: (id: number) => void
    selectedId: number
}

export const RadioGroup: FunctionComponent<RadioGroupProps> = (props) => {

    return <div className="flex flex-row flex-wrap">
        {
            props.items.map(item => 
                <div className={`${item.id === props.selectedId ? 'highlighted' : ''} px-1 rounded-md cursor-pointer`} 
                    key={`radio-${item.id}-${item.name}`} 
                    onClick={() => props.onSelectionChanged(item.id)}>
                    {item.name}
                </div>
            )
        }
    </div>
}