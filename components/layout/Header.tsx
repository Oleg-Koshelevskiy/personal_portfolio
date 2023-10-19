import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="container flex justify-between gap-2 mx-auto my-4">
      <div className=" flex gap-2 justify-center align-middle">
        <Image
          src="/assets/icons/main-logo.svg"
          width={60}
          height={60}
          alt="main logo"
          className="object-contain"
        />
        <div className="flex flex-col justify-center">
          <h2 className="text-[26px] font-bold uppercase text-white">
            Web magic crafter
          </h2>
          <p className="italic font-semibold text-amber-200">
            Professional development solutions
          </p>
        </div>
      </div>
      <nav>Menu</nav>
    </header>
  );
};

export default Header;
