import { links } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="container flex justify-between gap-2 mx-auto my-4">
      <Link href="/" className=" flex gap-2 justify-center align-middle">
        <Image
          src="/assets/icons/main-logo.svg"
          width={60}
          height={60}
          alt="main logo"
          className="object-contain"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-1 text-[34px] font-bold uppercase text-white self-center  hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-400 transition-all duration-800">
            Web magic crafter
          </h2>
          <p className="italic font-semibold text-stone-900">
            Professional development solutions
          </p>
        </div>
      </Link>
      <nav className="flex gap-4 uppercase align-middle justify-center font-semibold ">
        {links.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className="self-center text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 transition-all duration-800 hover:font-bold"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
