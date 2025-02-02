import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";
import { clearSelectedPlayers } from "../../store/playerReducer";
import { ListLayout } from "../layout/ListLayout";
import { FilterAction } from "../layout/FilterAction";

export const SelectedPlayers: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    const clearSelected = () => {
        dispatch(clearSelectedPlayers());
    }

    return (
        <ListLayout title={
            <div>
                <div className="w-full">
                    Selected ({playerState.selected.length.toString()})
                </div>
                {
                    playerState.selected.length > 0 ?
                    <FilterAction onClick={clearSelected}>
                        Clear
                    </FilterAction>
                    : <></>
                }
            </div>
        }>
            {
                playerState.selected.map(p => <PlayerItem key={p.id} player={p} />)
            }
        </ListLayout>
    )
}