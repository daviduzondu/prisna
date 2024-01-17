"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { MegaphoneIcon, MenuIcon, XIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const navLinks = [
  {
    name: "Discover",
    href: "#discover",
  },
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Create Account",
    href: "/create-account",
    separator: true,
  },
  {
    name: "Add a listing",
    href: `account/:account/add-listing`,
    asc: true,
  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="flex items-center z-40 bg-white relative lg:-mx-56 lg:px-56 px-4 -mx-4 -mt-6 mb-3 pt-3 pb-3 text-black drop-shadow-xl">
      <div className="logo font-semibold text-3xl flex-1 ">Prisna</div>
      <div className="items-center nav-links gap-5 lg:flex">
        <Popover open={menuOpen}>
          <PopoverTrigger className="lg:hidden" asChild onClick={() => setMenuOpen(!menuOpen)}>
            <Button variant="secondary">
              {!menuOpen ? (
                <>
                  <MenuIcon className="icon mr-2" />
                  {"Menu"}
                </>
              ) : (
                <>
                  <XIcon className="icon mr-2" />
                  {"Close"}
                </>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-screen mt-2 flex flex-col gap-8 text-left">
            <NavLinks navLinks={navLinks} mobile={true} />
          </PopoverContent>
        </Popover>
        <NavLinks navLinks={navLinks} className="hidden" />
      </div>
    </nav>
  );
}

function NavLinks({ navLinks, mobile, className }) {
  return (
    <>
      {navLinks.map(({ name, href, asc, separator }) => (
        <span key={`${name}${href}`} className={`text-base lg:block ${className} ${mobile && "w-[100%] "}`}>
          {asc && (
            <Button asChild>
              <Link href={href}>
                <MegaphoneIcon className="icon mr-2" />
                {name}
              </Link>
            </Button>
          )}
          {!asc && (
            <Link href={href} className="focus:underline hover:underline w-screen">
              {name}
            </Link>
          )}
        </span>
      ))}
    </>
  );
}
