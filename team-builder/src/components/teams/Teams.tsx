import { FunctionComponent, useState } from "react";
import { useAppSelector } from "../../store/store";
import { Player } from "../../data/player";
import { TeamView } from "./TeamView";
import { NavLink } from "react-router";
import { Paths } from "../../constants/Paths";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const Teams: FunctionComponent = () => {
    const playerState = useAppSelector((state) => state.players);
    const [teams, setTeams] = useState<Player[][] | null>(null)

    if (playerState.players === null) {
        return <LoadingSpinner />
    }

    const selectedPlayers = [...playerState.players.items
        .filter(p => playerState.selected.find(s => p.id === s) !== undefined)];

    const shuffle = (array: Player[]) => {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

    const generateTeams = (selectedPlayers: Player[]): Player[][] => {
        shuffle(selectedPlayers);

        const teams: Player[][] = [];
        const selectedCount = selectedPlayers.length;
        const teamSize = Math.ceil(selectedCount / playerState.teamCount);
        for (let k = 0; k < playerState.teamCount; k++) {
            teams.push(selectedPlayers.slice(k * teamSize, Math.min((k + 1) * teamSize, selectedCount)));
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
                        <TeamView key={`team-${index}`} name={`Team ${index + 1}`} players={team} />
                    )
                }
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    <NavLink to={Paths.SelectionPath}>
                        Back
                    </NavLink>
                </div>
                <div>
                    <a onClick={() => setTeams(generateTeams(selectedPlayers))}>
                        Again
                    </a>
                </div>
            </div>
        </div>
    </div>
}