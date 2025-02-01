import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { deletePlayerRequest } from "../../thunks/playerThunk";

export const EditPlayer: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const editingPlayer = playerState.editingPlayer;
    if (editingPlayer === null || playerState.loading) {
        return <></>
    }

    const deselectPlayer = () => {
        dispatch(setEditingPlayer(null));
    }

    const deletePlayer = () => {
        dispatch(deletePlayerRequest({id: editingPlayer.id}))
            .unwrap()
            .then(() => {
                dispatch(reloadPlayers({}))
                dispatch(setEditingPlayer(null))
            })
    }

    return <div style={{minWidth: '200px'}} className="pb-4">
        <div className="flex flex-row justify-between">
            <div>{editingPlayer.id}</div>
            <div>{editingPlayer.name}</div>
            <div onClick={deselectPlayer} className="button">X</div>
        </div>
        <div>
            <div className="button" onClick={deletePlayer}>Delete</div>
        </div>
    </div>
}