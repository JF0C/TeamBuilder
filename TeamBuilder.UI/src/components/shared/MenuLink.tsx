import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { NavLink } from "react-router";

export const MenuLink: FunctionComponent<{
  to: string;
  label: string;
  icon?: IconProp;
}> = ({ to, label, icon }) => {
  return (
    <NavLink className="flex flex-row gap-2 items-center" to={to}>
      {icon !== undefined ? <FontAwesomeIcon icon={icon} /> : <></>}
      <span>{label}</span>
    </NavLink>
  );
};
