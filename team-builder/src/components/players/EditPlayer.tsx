import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setEditingPlayer } from "../../store/playerReducer";

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

    return <div style={{minWidth: '250px'}}>
        <div className="flex flex-row justify-between">
            <div>{editingPlayer.id}</div>
            <div>{editingPlayer.name}</div>
            <div onClick={deselectPlayer} className="button">X</div>
        </div>
    </div>
}