import { FunctionComponent } from "react";
import { PlayerSelector } from "./PlayerSelector";
import { SelectedPlayers } from "./SelectedPlayers";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { useAppDispatch } from "../../store/store";
import { MatchConfiguration } from "./MatchConfiguration";
import { resetTeamPlayers } from "../../store/matchReducer";
import { SplitLayout } from "../layout/SplitLayout";

export const PlayerSelection: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    return (
        <SplitLayout
            source={<PlayerSelector />}
            selected={<SelectedPlayers />}
            navigation={
                [
                    <NavLink to={Paths.HomePath} key='back'>
                        Back
                    </NavLink>,
                    <MatchConfiguration key='match-config' />,
                    <NavLink key='next' to={Paths.TeamPath} onClick={() => dispatch(resetTeamPlayers())}>
                        Generate
                    </NavLink>
                ]
            } />
    )
}