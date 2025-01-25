import { FunctionComponent } from "react";
import { PlayerList } from "./PlayerList";
import { EditPlayer } from "./EditPlayer";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router-dom";

export const PlayerManagement: FunctionComponent = () => {
    const editingPlayer = useAppSelector((state) => state.players.editingPlayer !== null);

    return <div className="flex flex-col w-full h-full p-4">
        <div className="flex flex-row w-full flex-1 flex-wrap">
            <div className="flex-1">
                <PlayerList />
            </div>
            <div className={`${editingPlayer ? 'w-1/2' : ''}`}>
                <EditPlayer />
            </div>
        </div>
        <div className="w-full">
            <div className="button">
                <NavLink to={'/'}>
                    Back
                </NavLink>
            </div>
        </div>
    </div>
}