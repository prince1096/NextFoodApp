"use client";
import { FaArrowLeft } from "react-icons/fa";
import MenuItemsForm from "@/components/layout/MenuItemsForm";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading, data } = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    // const savingPromise = new Promise(async (resolve, reject) => {

    //   if (response.ok) resolve();
    //   else reject();
    // });

    const response = await fetch("/api/menuItems", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Successful, 30");
    }

    // await toast.promise(savingPromise, {
    //   loading: "Saving this tasty item",
    //   success: "Saved",
    //   error: "Error",
    // });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menuItems");
  }

  if (loading) {
    return "Loading user info...";
  }

  if (!data.admin) {
    return "Not an admin.";
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menuItems"} className="button">
          {/* <Left /> */}
          <FaArrowLeft />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemsForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}
