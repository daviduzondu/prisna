"use client";
import Link from "next/link";
import { useState, useContext, Suspense } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Dot } from "lucide-react";
import { MegaphoneIcon, MenuIcon, XIcon } from "lucide-react";
import { AuthContext } from "@/lib/context/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Loading from "./loader";

const navLinks = [
  // {
  //   name: "Discover",
  //   href: "/#discover",
  //   auth: false,
  // },
  {
    name: "Login",
    href: "/login",
    auth: false,
    // default
  },
  {
    name: "Create Account",
    href: "/create-account",
    separator: true,
    auth: false,
  },
  {
    name: "My Profile",
    href: "/account",
    separator: true,
    auth: true,
  },
  // {
  //   name: "Add a listing",
  //   href: `?add=true`,
  //   asc: true,
  //   auth: true,
  // },
];

const navLinksAuth = navLinks.filter((x) => x.auth);
const navLinksNoAuth = navLinks.filter((x) => !x.auth);

export default function Header() {
  const login = useContext(AuthContext);
  const { user, loading, error } = login;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center z-40 bg-white relative lg:-mx-56 lg:px-56 px-4 -mx-4 -mt-6 mb-3 pt-3 pb-3 text-black drop-shadow-xl">
      <div className="logo font-semibold text-3xl flex-1 ">
        <Link href="/" className="block">
          Prisna
        </Link>
      </div>
      {loading && <div><Loading height={20} width={20}></Loading></div>}
      {!loading && (
        <div className="items-center justify-center nav-links gap-5 lg:flex">
          <div className="flex gap-4">
            {user && (
              <span className="text-green-600 font-semibold inline-flex items-center justify-center">
                {" "}
                <Dot color="green" size={40} className="-mr-2" /> Logged In
              </span>
            )}
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

              <PopoverContent className="w-screen mt-2 flex flex-col gap-8 text-left lg:hidden">
                <NavLinks navLinks={user ? navLinksAuth : navLinksNoAuth} mobile={true} />
              </PopoverContent>
            </Popover>
          </div>
          <NavLinks navLinks={user ? navLinksAuth : navLinksNoAuth} className="hidden" />
        </div>
      )}
    </nav>
  );
}

function NavLinks({ navLinks, mobile, className }) {
  const login = useContext(AuthContext);
  return (
    <>
      {navLinks.map(({ name, href, asc, separator }) => (
        <span key={`${name}${href}`} className={`text-base lg:block ${className} ${mobile && "w-[100%] "}`}>
          {asc && (
            <Button asChild>
              <Link href={href.replace("/account", `/${login.user.uid}`)}>
                <MegaphoneIcon className="icon mr-2" />
                {name}
              </Link>
            </Button>
          )}
          {!asc && (
            <Link
              href={href.includes("/account") ? href.replace("/account", `/${login.user.uid}`) : href}
              className="focus:underline hover:underline w-screen"
            >
              {name}
            </Link>
          )}
        </span>
      ))}
    </>
  );
}
