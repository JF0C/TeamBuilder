import { FunctionComponent } from "react";
import { MatchDto } from "../../dtos/matches/MatchDto";
import { ListItem } from "../shared/ListItem";
import { useAppDispatch } from "../../store/store";
import { resumeMatchRequest } from "../../thunks/matchThunk";
import { useNavigate } from "react-router";
import { Paths } from "../../constants/Paths";

export const MatchResumeItem: FunctionComponent<{ match: MatchDto }> = ({
  match,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resumeMatch = () => {
    dispatch(resumeMatchRequest(match.id)).then(() => navigate(Paths.TeamPath));
  };
  return (
    <ListItem className="p-2 gap-2 flex flex-col">
      {match.teams.map((t) => (
        <ListItem key={t.id} onSelected={resumeMatch} className="p-2">
          <div>{t.name}</div>
          <div className="flex flex-row flex-wrap gap-2 text-sm">
            {t.players.map((p) => (
              <ListItem key={`player-${p.id}`}>{p.name}</ListItem>
            ))}
          </div>
        </ListItem>
      ))}
    </ListItem>
  );
};
