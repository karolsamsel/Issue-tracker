"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa6";
import classNames from "classnames";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const { status, data } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 px-5 h-14 border-b items-center mb-5">
      <Link href={"/"}>{<FaBug />}</Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classNames({
                "text-zinc-900": link.href === pathName,
                "text-zinc-500": link.href !== pathName,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {status === "authenticated" && (
        <Link href={"/api/auth/signout"}>Log out</Link>
      )}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Log in</Link>
      )}
    </nav>
  );
};

export default Navbar;
