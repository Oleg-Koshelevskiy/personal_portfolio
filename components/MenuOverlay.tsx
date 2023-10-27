import React from "react";
import NavLink from "./NavLink";
import { Props } from "@/types";

const MenuOverlay: React.FC<{ links: Props }> = ({ links }) => {
  return (
    <ul className="items-center absolute flex right-12 top-[-3px] border-2 rounded-lg border-primary-500/50 bg-slate-950/80">
      {links.map((link) => (
        <li key={link.id}>
          <NavLink href={link.href} title={link.name} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
