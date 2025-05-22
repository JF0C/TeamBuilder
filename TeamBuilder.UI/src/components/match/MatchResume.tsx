import { FunctionComponent } from "react";
import { PaginatedListLayout } from "../layout/PaginatedListLayout";
import { NavBarLayout } from "../layout/NavbarLayout";
import { Paths } from "../../constants/Paths";
import { LinkBack } from "../shared/LinkBack";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { reloadResumableMatches } from "../../store/matchResumeReducer";

export const MatchResume: FunctionComponent = () => {
  const matchResumeState = useAppSelector((state) => state.matchResume);
  const dispatch = useAppDispatch();

  const pageChange = (page: number) => {
    dispatch(reloadResumableMatches({ page }));
  };

  return (
    <NavBarLayout navigation={<LinkBack to={Paths.HomePath} />}>
      <PaginatedListLayout
        onPageChange={pageChange}
        pageData={matchResumeState.matches}
        title="Resume Matches"
      >
        <div></div>
      </PaginatedListLayout>
    </NavBarLayout>
  );
};
