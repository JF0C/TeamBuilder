import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { PlayerItem } from "../selection/PlayerItem";
import { useAppDispatch } from "../../store/store";
import { setTeamName } from "../../store/matchReducer";
import { EditableLabel } from "../shared/EditableLabel";

export type TeamViewProps = {
    index: number
    name: string
    players: PlayerDto[]
}

export const TeamView: FunctionComponent<TeamViewProps> = ({index, name, players}) => {
    const dispatch = useAppDispatch();

    const changeTeamName = (name: string) => {
        dispatch(setTeamName({
            index,
            name
        }))
    }

    return <div className="team-card pt-4">
        <div className="flex flex-row w-full justify-center">
            <EditableLabel value={name} onChange={changeTeamName} />

        </div>
        <div className="flex flex-row flex-wrap gap-2 justify-center">
            {
                players.map((p) => <PlayerItem key={`team-player-${p.id}`} player={p} />) 
            }
        </div>
    </div>
} 