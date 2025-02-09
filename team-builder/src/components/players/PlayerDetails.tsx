import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { deletePlayerRequest, renamePlayerRequest } from "../../thunks/playerThunk";
import { PlayerGroups } from "./PlayerGroups";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { DetailsLayout } from "../layout/DetailsLayout";
import { ConfirmModal } from "../shared/ConfirmModal";
import { EditableLabel } from "../shared/EditableLabel";

export const PlayerDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const editingPlayer = playerState.editingPlayer;
    if (editingPlayer === null || playerState.requestState === 'loading') {
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

    const renamePlayer = (name: string) => {
        dispatch(renamePlayerRequest({
            id: editingPlayer.id,
            name: name
        })).unwrap().then(() => {
            dispatch(reloadPlayers({}))
        })
    }

    return (
        <DetailsLayout onClose={deselectPlayer} title={editingPlayer.name} id={editingPlayer.id.toString()}>
            <PlayerGroups player={editingPlayer} />
            <EditableLabel value={editingPlayer.name} onChange={renamePlayer}/>
            <ConfirmModal buttonContent={<div className="button color-red">Delete</div>} onConfirm={deletePlayer}>
                Delete Player {editingPlayer.name}?
            </ConfirmModal>
        </DetailsLayout>
    )
}