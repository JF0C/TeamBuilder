import { FunctionComponent } from "react";
import { TeamDto } from "../../dtos/TeamDto";

export const MatchTeamDetails: FunctionComponent<{team: TeamDto}> = ({team}) => {

    return <div>
        <div className="flex flex-row justify-between">
            <div>
                {team.name}
            </div>
            <div>
                Score: {team.score}
            </div>
        </div>
        <div>

        </div>
    </div>
}