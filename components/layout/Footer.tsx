import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="container mx-auto my-4 flex justify-between">
      <div className="flex gap-2 align-middle justify-start ml-2">
        <Image
          src="/assets/icons/main-logo.svg"
          width={30}
          height={30}
          alt="logo"
        />
        <div className="text-sm self-center">Web Magic Crafter &copy; </div>
      </div>
      <div className="text-sm self-center mr-2">All rights reserved</div>
    </div>
  );
};

export default Footer;
