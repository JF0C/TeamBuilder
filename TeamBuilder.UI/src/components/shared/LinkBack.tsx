import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

export const LinkBack: FunctionComponent<{ to: string }> = ({ to }) => {
  return (
    <NavLink to={to} className="flex flex-row items-center gap-2">
      <FontAwesomeIcon icon={faCaretLeft} />
      <span>Back</span>
    </NavLink>
  );
};
