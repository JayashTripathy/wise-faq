"use client";
import React, { useEffect } from "react";
import { MainHeader } from "./ui/header";
import { ModeToggle } from "./ui/modeToggle";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Github,
  GripVertical,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  ShieldQuestionIcon,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useRouter } from "next/router";
import { Badge } from "./ui/badge";

function Navbar() {
  const router = useRouter();
  const { theme, setTheme, systemTheme } = useTheme();
  const [logoTheme, setLogoTheme] = React.useState<string>("logo-dark.svg");
  const { data } = useSession();

  const components: { title: string; href: string; icon: React.ReactNode }[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      title: "FAQ",
      href: "/faq/WiseFAQ",
      icon: <ShieldQuestionIcon size={18} />,
    },
    {
      title: "Github",
      href: "https://github.com/JayashTripathy/wise-faq",
      icon: <Github size={18} />,
    },
  ];

  useEffect(() => {
    setLogoTheme(`/logo-${theme === "system" ? systemTheme : theme}.svg`);
  }, [theme, systemTheme]);

  return (
    <div className="sticky top-0 z-10 w-screen p-4 backdrop-blur-3xl ">
      <MainHeader
        heading={
          <div className="flex">
            <Link href="/">
              <img
                src={logoTheme}
                className="max-w-[150px] md:max-w-[200px] "
              />
            </Link>
            <Badge
              className="h-5 p-0 px-2 text-[10px] font-normal "
              variant={"secondary"}
            >
              Beta
            </Badge>
          </div>
        }
      >
        <div className="ml-10 hidden w-full  md:flex">
          <ul className="flex gap-10 text-xl">
            {components.map((component, ind) => (
              <li
                key={ind}
                className="flex cursor-pointer items-center gap-2 text-foreground/75 transition-all duration-100 ease-in-out hover:text-foreground"
              >
                {component.icon}
                <Link href={component.href}>{component.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center justify-center gap-3 md:flex">
          <ModeToggle />
          {!data ? (
            <Link href="/auth/signin">
              <Button className="text-lg font-semibold">SignIn</Button>
            </Link>
          ) : (
            <Button
              variant={"ghost"}
              className="flex  justify-center gap-2 rounded-xl   border-2  "
              onClick={() => void signOut()}
            >
              <img
                src={data.user.image ?? ""}
                className=" h-6 w-6 rounded-xl "
                alt=""
              />
              <div className=" flex items-center justify-center gap-2 ">
                <div className=" font-bold">Logout </div>
                <LogOut size={15} className=" text-muted-foreground " />
              </div>
            </Button>
          )}
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <MoreHorizontal />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <h1 className="text-left text-xl font-bold"> Options </h1>
            </SheetHeader>
            <div className="flex flex-col items-start justify-start gap-3 py-8 text-lg ">
              {components.map((component, ind) => (
                <SheetClose className="" asChild key={ind}>
                  <button
                    type="submit"
                    onClick={() => void router.push(component.href)}
                    className="flex items-center gap-2 transition-all duration-100 ease-in-out hover:text-foreground/75"
                  >
                    {component.icon} {component.title}
                  </button>
                </SheetClose>
              ))}
            </div>
            <SheetFooter>
              {!data ? (
                <SheetClose asChild>
                  <Button
                    type="submit"
                    onClick={() => void router.push("/auth/signin")}
                    className="text-lg font-semibold"
                  >
                    SignIn
                  </Button>
                </SheetClose>
              ) : (
                <Button
                  variant={"ghost"}
                  className="flex  justify-center gap-2 rounded-xl   border-2  "
                  onClick={() => void signOut()}
                >
                  <img
                    src={data.user.image ?? ""}
                    className=" h-6 w-6 rounded-xl "
                    alt=""
                  />
                  <div className=" flex items-center justify-center gap-2 ">
                    <div className=" font-bold">Logout </div>
                    <LogOut size={15} className=" text-muted-foreground " />
                  </div>
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </MainHeader>
    </div>
  );
}

export default Navbar;
