"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa6";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/app/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const Navbar = () => {
  return (
    <nav className="px-5 py-3 border-b mb-5">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"2"}>
            <Link href={"/"}>{<FaBug />}</Link>
            <NavBarLinks />
          </Flex>
          <NavBarDropdownMenu />
        </Flex>
      </Container>
    </nav>
  );
};

const NavBarDropdownMenu = () => {
  const { status, data } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"} />;

  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Log in</Link>;

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={data.user?.image! || "?"}
              fallback="?"
              size={"2"}
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size={"2"}>{data.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavBarLinks = () => {
  const pathName = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
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
  );
};

export default Navbar;
