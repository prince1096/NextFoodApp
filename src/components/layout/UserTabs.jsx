"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdRestaurantMenu } from "react-icons/md";
import { GiFullPizza } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  //   console.log(isAdmin);
  return (
    <>
      <div className="flex justify-center  gap-8 tabs">
        <Link
          className={
            path === "/profile"
              ? "active flex justify-center items-center  gap-1"
              : "flex justify-center items-center  gap-1"
          }
          //   className={"flex justify-center items-center  gap-1"}
          href={"/profile"}
        >
          Profile <CgProfile />
        </Link>

        {isAdmin && (
          <>
            <Link
              href={"/category"}
              //   className="flex justify-center items-center  gap-1"
              className={
                path === "/category"
                  ? "active flex justify-center items-center  gap-1"
                  : "flex justify-center items-center  gap-1"
              }
            >
              Category
              <BiCategory />
            </Link>
            <Link
              href={"/menuItems"}
              //   className="flex justify-center items-center  gap-1"

              className={
                path === "/menuItems"
                  ? "active flex justify-center items-center  gap-1"
                  : "flex justify-center items-center  gap-1"
              }
            >
              Menu Items <MdRestaurantMenu />{" "}
            </Link>
            <Link
              href={"/users"}
              //   className="flex justify-center items-center gap-1"

              className={
                path === "/users"
                  ? "active flex justify-center items-center  gap-1"
                  : "flex justify-center items-center  gap-1"
              }
            >
              Users
              <FaUsers />
            </Link>

            <Link
              href={"/orders"}
              //   className="flex justify-center items-center gap-1"

              className={
                path === "/orders"
                  ? "active flex justify-center items-center  gap-1"
                  : "flex justify-center items-center  gap-1"
              }
            >
              Orders
              <GiFullPizza />
            </Link>
          </>
        )}
      </div>
    </>
  );
}
