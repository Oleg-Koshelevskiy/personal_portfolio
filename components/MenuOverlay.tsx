import React from "react";
import NavLink from "./NavLink";
import { Props } from "@/types";

const MenuOverlay: React.FC<{ links: Props }> = ({ links }) => {
  return (
    <ul className="items-center absolute right-16 top--12 border-2 rounded-lg border-primary-500/50 bg-slate-950/70">
      {links.map((link) => (
        <li key={link.id}>
          <NavLink href={link.href} title={link.name} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
