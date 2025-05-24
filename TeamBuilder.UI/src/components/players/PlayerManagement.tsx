import { FunctionComponent } from "react";
import { PlayerList } from "./PlayerList";
import { PlayerDetails } from "./PlayerDetails";
import { useAppSelector } from "../../store/store";
import { ListAndDetails } from "../layout/ListAndDetails";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";

export const PlayerManagement: FunctionComponent = () => {
  const editingPlayer = useAppSelector(
    (state) => state.players.editingPlayer !== null
  );

  return (
    <ListAndDetails
      list={<PlayerList />}
      details={<PlayerDetails />}
      showDetails={editingPlayer}
      navigation={<LinkBack to={Paths.HomePath} />}
    />
  );
};
