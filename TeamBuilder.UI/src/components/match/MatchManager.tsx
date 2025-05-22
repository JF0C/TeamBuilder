import { FunctionComponent } from "react";
import { useAppSelector } from "../../store/store";
import { ListAndDetails } from "../layout/ListAndDetails";
import { MatchList } from "./MatchList";
import { MatchOverview } from "./MatchOverview";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";

export const MatchManager: FunctionComponent = () => {
  const isMatchSelected = useAppSelector(
    (state) => state.match.selected !== null
  );

  return (
    <ListAndDetails
      list={<MatchList />}
      details={<MatchOverview />}
      showDetails={isMatchSelected}
      navigation={<LinkBack to={Paths.HomePath} />}
    />
  );
};
