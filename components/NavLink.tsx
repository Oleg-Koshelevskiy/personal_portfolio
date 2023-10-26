import Link from "next/link";

const NavLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0 hover:font-bold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-primary-400 to-secondary-400 hover:scale-105 transition duration-300"
    >
      {title}
    </Link>
  );
};

export default NavLink;
