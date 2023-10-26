"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { Props } from "@/types";

const MobileNav: React.FC<{ links: Props }> = ({ links }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="mobile-menu block md:hidden mr-2 self-center relative z-20">
      {navbarOpen && <MenuOverlay links={links} />}
      {!navbarOpen ? (
        <button
          onClick={() => setNavbarOpen(true)}
          className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
        >
          <Bars3Icon className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={() => setNavbarOpen(false)}
          className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default MobileNav;
