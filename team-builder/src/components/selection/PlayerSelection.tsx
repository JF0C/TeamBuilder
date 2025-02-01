import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { MatchConfiguration } from "./MatchConfiguration";
import { resetTeamPlayers } from "../../store/matchReducer";
import { SplitLayout } from "../layout/SplitLayout";

export const PlayerSelection: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);

    if (playerState.players === null || playerState.loading) {
        return <LoadingSpinner />
    }

    return (
        <SplitLayout
            left={<PlayerSelector />}
            right={<SelectedPlayers />}
            bottom={
                <div className="w-full flex flex-row justify-between">
                    <NavLink to={'/'}>
                        Back
                    </NavLink>
                    <MatchConfiguration />
                    <NavLink to={Paths.TeamPath} onClick={() => dispatch(resetTeamPlayers())}>
                        Generate
                    </NavLink>
                </div>
            } />
    )
}