import { FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { TeamView } from "./TeamView";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { TeamEntity } from "../../data/TeamEntity";
import { setTeamName, setTeamPlayers } from "../../store/matchReducer";
import { NavBarLayout } from "../layout/NavbarLayout";

export const Teams: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const playerState = useAppSelector((state) => state.players);
    const matchState = useAppSelector((state) => state.match);

    if (playerState.players === null || playerState.loading) {
        return <LoadingSpinner />
    }

    const selectedPlayers = [...playerState.selected];

    const shuffle = (array: PlayerDto[]) => {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    const generateTeams = (selectedPlayers: PlayerDto[]) => {
        shuffle(selectedPlayers);

        const teams: TeamEntity[] = [];
        const selectedCount = selectedPlayers.length;
        const teamSize = Math.ceil(selectedCount / matchState.current.teams.length);
        for (let k = 0; k < matchState.current.teams.length; k++) {
            const players = selectedPlayers.slice(k * teamSize, Math.min((k + 1) * teamSize, selectedCount));
            dispatch(setTeamPlayers({ index: k, players: players }));
            if (matchState.current.teams[k].name === '') {
                dispatch(setTeamName({ index: k, name: `Team ${(k + 1)}` }))
            }
        }
        return teams;
    }

    if (matchState.current.teams.every(t => t.players.length === 0)) {
        generateTeams(selectedPlayers);
    }

    return (
        <NavBarLayout navigation={
            [
                <div>
                    <NavLink to={Paths.SelectionPath}>
                        Back
                    </NavLink>
                </div>,
                <div className="button" onClick={() => generateTeams(selectedPlayers)}>
                    Shuffle
                </div>,
                <div>
                    <NavLink to={Paths.MatchCompletionPath}>
                        Play
                    </NavLink>
                </div>
            ]
        }>
            {
                matchState.current.teams.map((team, index) =>
                    <TeamView key={`team-${index}`} name={team.name} players={team.players} />
                )
            }
        </NavBarLayout>

    )
}