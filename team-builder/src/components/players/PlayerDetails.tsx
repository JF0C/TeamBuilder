import { ChangeEvent, FunctionComponent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadPlayers, setEditingPlayer } from "../../store/playerReducer";
import { deletePlayerRequest, renamePlayerRequest } from "../../thunks/playerThunk";
import { PlayerGroups } from "./PlayerGroups";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { DetailsLayout } from "../layout/DetailsLayout";
import { ConfirmModal } from "../shared/ConfirmModal";

export const PlayerDetails: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const editingPlayer = playerState.editingPlayer;
    const [newName, setNewName] = useState('');
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

    const renamePlayer = () => {
        dispatch(renamePlayerRequest({
            id: editingPlayer.id,
            name: newName
        })).unwrap().then(() => {
            dispatch(reloadPlayers({}))
        })
    }

    return (
        <DetailsLayout onClose={deselectPlayer} title={editingPlayer.name} id={editingPlayer.id.toString()}>
            <PlayerGroups player={editingPlayer} />
            <div className="flex flex-row">
                <input placeholder="Rename" onChange={(e: ChangeEvent<HTMLInputElement>) => {setNewName(e.target.value)}} />
                <div className="button" onClick={renamePlayer}>
                    Set
                </div>
            </div>
            <ConfirmModal buttonContent={<div className="button color-red">Delete</div>} onConfirm={deletePlayer}>
                Delete Player {editingPlayer.name}?
            </ConfirmModal>
            
        </DetailsLayout>
    )
}