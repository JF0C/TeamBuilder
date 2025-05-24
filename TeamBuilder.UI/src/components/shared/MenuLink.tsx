import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { NavLink } from "react-router";

export const MenuLink: FunctionComponent<{
  to: string;
  label: string;
  icon?: IconProp;
  iconRight?: boolean;
  onClick?: () => void;
}> = ({ to, label, icon, iconRight, onClick }) => {
  return (
    <NavLink
      onClick={onClick}
      className={`flex ${
        iconRight ? "flex-row-reverse" : "flex-row"
      } gap-2 items-center`}
      to={to}
    >
      {icon !== undefined ? <FontAwesomeIcon icon={icon} /> : <></>}
      <span>{label}</span>
    </NavLink>
  );
};
