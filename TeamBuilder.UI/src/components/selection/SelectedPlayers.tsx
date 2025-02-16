import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerItem } from "./PlayerItem";
import { clearSelectedPlayers, reloadPlayers } from "../../store/playerReducer";
import { ListLayout } from "../layout/ListLayout";
import { FilterAction } from "../layout/FilterAction";

export const SelectedPlayers: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    const clearSelected = () => {
        dispatch(clearSelectedPlayers());
        dispatch(reloadPlayers({}));
    }

    return (
        <ListLayout title={
            <div>
                <div className="w-full flex flex-row justify-center gap-2 items-center">
                    Selected ({playerState.selected.length.toString()})
                    {
                        playerState.selected.length > 0 ?
                            <FilterAction onClick={clearSelected}>
                                Clear
                            </FilterAction>
                            : <></>
                    }
                </div>
            </div>
        }>
            {
                playerState.selected.map(p => <PlayerItem key={p.id} player={p} />)
            }
        </ListLayout>
    )
}