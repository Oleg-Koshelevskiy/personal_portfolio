import { links } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="fixed z-10 bg-neutral-950/75 w-full">
      <div className="container mx-auto flex justify-between gap-2 py-4">
        <Link href="/" className=" flex gap-2 justify-center align-middle">
          <Image
            src="/assets/icons/main-logo.svg"
            width={60}
            height={60}
            alt="main logo"
            className="object-contain"
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-1 text-xl lg:text-2xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Web magic crafter
            </h2>
            <p className="italic text-xs lg:text-sm font-semibold text-slate-200">
              Professional development solutions
            </p>
          </div>
        </Link>
        <nav className="hidden md:flex gap-4 uppercase align-middle justify-center font-semibold text-sm lg:text-base">
          {links.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="self-center text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-primary-300 to-secondary-300 hover:scale-105 transition duration-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
