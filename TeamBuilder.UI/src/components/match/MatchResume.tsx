import { FunctionComponent } from "react";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { NavBarLayout } from "../layout/NavbarLayout";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadResumableMatches } from "../../store/matchResumeReducer";
import { MatchDto } from "../../dtos/matches/MatchDto";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { MatchResumeItem } from "./MatchResumeItem";

export const MatchResume: FunctionComponent = () => {
  const matchResumeState = useAppSelector((state) => state.matchResume);
  const dispatch = useAppDispatch();

  const pageChange = (page: number) => {
    dispatch(reloadResumableMatches({ page }));
  };

  if (!matchResumeState.matches) {
    return <LoadingSpinner />;
  }

  return (
    <NavBarLayout navigation={<LinkBack to={Paths.HomePath} />}>
      <PaginatedListLayout
        onPageChange={pageChange}
        pageData={matchResumeState.matches}
        title="Resume Matches"
      >
        <div className="flex flex-row gap-2">
          {matchResumeState.matches.items.map((m: MatchDto) => (
            <MatchResumeItem key={m.id} match={m} />
          ))}
        </div>
      </PaginatedListLayout>
    </NavBarLayout>
  );
};
