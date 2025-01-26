import { FunctionComponent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { PlayerDto } from "../../dtos/PlayerDto";
import { TeamView } from "./TeamView";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { LoadingSpinner } from "../shared/LoadingSpinner";

type Team = {
    players: PlayerDto[]
    name: string
}

export const Teams: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players);
    const teamConfig = useAppSelector((state) => state.teamConfig);
    const [teams, setTeams] = useState<Team[] | null>(null)

    if (playerState.players === null || playerState.loading) {
        return <LoadingSpinner />
    }

    const selectedPlayers = [...playerState.players.items
        .filter(p => playerState.selected.find(s => p.id === s) !== undefined)];

    const shuffle = (array: PlayerDto[]) => {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    const generateTeams = (selectedPlayers: PlayerDto[]): Team[] => {
        shuffle(selectedPlayers);

        const teams: Team[] = [];
        const selectedCount = selectedPlayers.length;
        const teamSize = Math.ceil(selectedCount / teamConfig.teamsCount);
        for (let k = 0; k < teamConfig.teamsCount; k++) {
            const players = selectedPlayers.slice(k * teamSize, Math.min((k + 1) * teamSize, selectedCount));
            let teamName = teamConfig.teamNames[k]
            if (teamName === '') {
                teamName = 'Team ' + (k+1)
            }
            teams.push({
                players: players,
                name: teamName
            });
        }
        return teams;
    }

    if (teams === null) {
        setTeams(generateTeams(selectedPlayers));
    }

    if (teams === null) {
        return <></>
    }

    return <div className="size-full flex flex-row justify-center">
        <div className="flex flex-col h-full p-4 w-screen md:max-w-2/3">
            <div className="flex-1">
                {
                    teams.map((team, index) =>
                        <TeamView key={`team-${index}`} name={team.name} players={team.players} />
                    )
                }
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    <NavLink to={Paths.SelectionPath}>
                        Back
                    </NavLink>
                </div>
                <div className="button" onClick={() => setTeams(generateTeams(selectedPlayers))}>
                    Again
                </div>
            </div>
        </div>
    </div>
}