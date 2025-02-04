import { FunctionComponent } from "react";
import { PlayerDto } from "../../dtos/players/PlayerDto";
import { PlayerItem } from "../selection/PlayerItem";

export type TeamViewProps = {
    name: string
    players: PlayerDto[]
}

export const TeamView: FunctionComponent<TeamViewProps> = (props) => {

    return <div className="team-card pt-4">
        <div>
            {props.name}
        </div>
        <div className="flex flex-row flex-wrap gap-2 justify-center">
            {
                props.players.map((p) => <PlayerItem key={`team-player-${p.id}`} player={p} />) 
            }
        </div>
    </div>
} 