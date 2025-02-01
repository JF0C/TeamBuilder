import { FunctionComponent } from "react";
import { PlayerList } from "./PlayerList";
import { EditPlayer } from "./EditPlayer";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router-dom";
import { ListAndDetails } from "../layout/ListAndDetails";

export const PlayerManagement: FunctionComponent = () => {
    const editingPlayer = useAppSelector((state) => state.players.editingPlayer !== null);

    return (
        <ListAndDetails
            list={<PlayerList />}
            details={<EditPlayer />}
            showDetails={editingPlayer}
            bottom={<div className="button">
                <NavLink to={'/'}>
                    Back
                </NavLink>
            </div>}
        />
    )
}