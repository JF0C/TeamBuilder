import { ChangeEvent, FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";

export const PlayerNameFilter: FunctionComponent<{onFilterChange: (name: string) => void}> = ({onFilterChange}) => {
    const nameFilter = useAppSelector((state) => state.players.queryFilter.name);

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        onFilterChange(e.target.value);
    }

    if (!nameFilter) {
        return <input placeholder="Player Name" className="w-full" onChange={onInput} />
    }

    return <input value={nameFilter} className="w-full" placeholder="Player Name" onChange={onInput} />
}