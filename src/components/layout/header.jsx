"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  const session = useSession();
  console.log(session, "session");

  const status = session.status;
  // const status = "abc";

  // const signOut = () => {};
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName && userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header className="flex items-center justify-between">
        <Link className="text-primary font-semibold text-2xl" href="">
          ST PIZZA
        </Link>

        <div className="flex gap-8 ">
          <nav className="flex gap-8  items-center text-gray-500 font-semibold">
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </nav>

          <nav className="flex gap-8 items-center font-semibold">
            {status === "authenticated" && (
              <>
                <Link href={"/profile"} className="whitespace-nowrap">
                  Hello,{userName}
                </Link>

                <button
                  className="bg-primary text-white px-4 py-2 rounded-full"
                  href={"/register"}
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </>
            )}

            {status === "unauthenticated" && (
              <>
                <Link
                  className="bg-primary text-white px-4 py-2 rounded-full"
                  href={"/login"}
                >
                  Login
                </Link>
                <Link
                  className="bg-primary text-white px-4 py-2 rounded-full"
                  href={"/register"}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
