import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { deletePlayerRequest } from "../../thunks/playerThunk";
import { PlayerGroups } from "./PlayerGroups";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const PlayerDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const editingPlayer = playerState.editingPlayer;
    if (editingPlayer === null || playerState.loading) {
        return <LoadingSpinner />
    }

    const deselectPlayer = () => {
        dispatch(setEditingPlayer(null));
    }

    const deletePlayer = () => {
        dispatch(deletePlayerRequest({ id: editingPlayer.id }))
            .unwrap()
            .then(() => {
                dispatch(reloadPlayers({}))
                dispatch(setEditingPlayer(null))
            })
    }

    return <div style={{ minWidth: '200px' }} className="pb-4 size-full flex flex-col">
        <div className="flex flex-row justify-between">
            <div>{editingPlayer.id}</div>
            <div>{editingPlayer.name}</div>
            <div onClick={deselectPlayer} className="button">X</div>
        </div>
        <div className="flex-1 overflow-y-scroll text-left">
            <PlayerGroups player={editingPlayer} />
            <div className="button color-red" onClick={deletePlayer}>Delete</div>
        </div>
    </div>
}