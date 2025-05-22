import { FunctionComponent } from "react";
import { Paths } from "../../constants/Paths";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/authReducer";
import { AuthenticatedElement } from "../auth/AuthenticatedElement";
import { UnauthenticatedElement } from "../auth/UnauthenticatedElement";
import { Roles } from "../../constants/Roles";
import {
  faListDots,
  faPause,
  faRightFromBracket,
  faRightToBracket,
  faStar,
  faUser,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { MenuLink } from "../shared/MenuLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MainMenu: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full">
      <MenuLink to={Paths.SelectionPath} label="Begin Match" icon={faStar} />

      <MenuLink
        to={Paths.MatchResumePath}
        label="Resume Matches"
        icon={faPause}
      />

      <MenuLink to={Paths.PlayersPath} label="Players" icon={faUsers} />

      <MenuLink
        to={Paths.MatchManagementPath}
        label="Past Matches"
        icon={faListDots}
      />

      <AuthenticatedElement roles={[Roles.Admin]}>
        <MenuLink to={Paths.AdminMenuPath} label="Admin" icon={faUser} />
      </AuthenticatedElement>

      <AuthenticatedElement>
        <button
          className="flex flex-row gap-2 items-center"
          onClick={() => dispatch(logout())}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span>Logout</span>
        </button>
      </AuthenticatedElement>

      <UnauthenticatedElement>
        <MenuLink to={Paths.LoginPath} label="Login" icon={faRightToBracket} />
        <MenuLink to={Paths.RegisterPath} label="Register" icon={faUserPlus} />
      </UnauthenticatedElement>
    </div>
  );
};
