import { FunctionComponent } from "react";
import { PlayerList } from "./PlayerList";
import { PlayerDetails } from "./PlayerDetails";
import { useAppSelector } from "../../store/store";
import { NavLink } from "react-router-dom";
import { ListAndDetails } from "../layout/ListAndDetails";
import { Paths } from "../../constants/Paths";

export const PlayerManagement: FunctionComponent = () => {
    const editingPlayer = useAppSelector((state) => state.players.editingPlayer !== null);

    return (
        <ListAndDetails
            list={<PlayerList />}
            details={<PlayerDetails />}
            showDetails={editingPlayer}
            navigation={<div className="button">
                <NavLink to={Paths.HomePath}>
                    Back
                </NavLink>
            </div>}
        />
    )
}