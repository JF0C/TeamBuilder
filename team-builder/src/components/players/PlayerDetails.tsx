import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { deletePlayerRequest } from "../../thunks/playerThunk";
import { PlayerGroups } from "./PlayerGroups";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { DetailsLayout } from "../layout/DetailsLayout";

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

    return (
        <DetailsLayout onClose={deselectPlayer} title={editingPlayer.name} id={editingPlayer.id.toString()}>
            <PlayerGroups player={editingPlayer} />
            <div className="button color-red" onClick={deletePlayer}>Delete</div>
        </DetailsLayout>
    )
}