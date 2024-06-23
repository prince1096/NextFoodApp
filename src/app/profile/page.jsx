"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { redirect } from "next/navigation";
import ProfileImage from "@/assets/profile.jpg";
import SuccessBox from "@/components/layout/SuccessBox";
import InfoBox from "@/components/layout/InfoBox";
import UserTabs from "@/components/layout/UserTabs";
import toast from "react-hot-toast";

const Profile = () => {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user.name || "");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  // console.log(session, "session");
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
    }
    setImage(session?.data?.user?.image);

    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        console.log(data);
        setPhone(data.phone);
        setStreetAddress(data.streetAddress);
        setCity(data.city);
        setCountry(data.country);
        setPostalCode(data.postalCode);
        setIsAdmin(data.admin);
        setProfileFetched(true);
      });
    });
  }, [session, status]);

  if (status === "loading" || !profileFetched) {
    return (
      <div className="mt-8">
        <UserTabs isAdmin={isAdmin} />
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  //   const userImage = session.data.user.image;

  //   console.log(userImage, "userImage");

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    setSaved(false);
    setIsSaving(true);
    toast("Saving...");
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: userName,
        image,
        streetAddress,
        phone,
        postalCode,
        phone,
        city,
        country,
      }),
    });
    setIsSaving(false);

    // console.log(response.ok, "response");
    if (response.ok) {
      setSaved(true);
    }

    toast.success("Profile Saved");

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  const handleFileChange = async (event) => {
    event.preventDefault();

    const files = event?.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);
      setIsUploading(true);
      // toast("Uploading...");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
        // headers: { "Content-Type": "multipart/form-data" },
      });

      //   console.log(response);

      if (response.ok) {
        toast.success("Upload Complete");
      } else {
        toast.error("Upload error!");
      }

      const link = await response.json();
      // console.log(link);
      setImage(link);
      setIsUploading(false);
    }
  };

  // console.log(isAdmin);

  return (
    <>
      <section className="mt-8">
        <UserTabs isAdmin={isAdmin} />

        <h1 className="text-center text-primary text-4xl mb-4 mt-2">Profile</h1>

        <div className="max-w-md mx-auto">
          {saved && <SuccessBox>Profile Saved</SuccessBox>}

          {isSaving && <InfoBox>Saving...</InfoBox>}

          {isUploading && <InfoBox> Uploading... </InfoBox>}

          <div className="flex gap-4 items-start">
            <div className="relative inline-block ">
              {" "}
              {/* Set the container to be relatively positioned */}
              <div className="bg-gray-300 rounded-full p-1 w-[130px] h-[130px] ">
                <Image
                  className="rounded-full"
                  //   src={image}
                  src={image ? image : ProfileImage}
                  width={125}
                  height={125}
                  alt="avatar"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <label
                htmlFor="file-upload"
                //    className="cursor-pointer"

                className="rounded-full w-auto py-2 px-2 absolute bottom-4 right-4 mb-1 mr-1 cursor-pointer  border-primary bg-primary text-white" // Set button to be absolutely positioned
                style={{ transform: "translate(50%, 50%)" }}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="flex items-center p-1 ">
                  <FaRegImage />
                </span>
              </label>
              {/* <button
                type="submit"
                className="rounded-full w-auto py-2 px-4 absolute bottom-4 right-4 mb-1 mr-1" // Set button to be absolutely positioned
                style={{ transform: "translate(50%, 50%)" }} // Optional: Adjust position to avoid overlap with image border
              >
                <FaRegImage />
              </button> */}
            </div>
            <form onSubmit={handleProfileUpdate} className="grow">
              <label htmlFor="userName">Full Name</label>

              <input
                type="text"
                placeholder="Full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="userName"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                disabled="true"
                value={session.data.user.email}
              />
              <label htmlFor="phonenumber">Phone Number</label>

              <input
                type="tel"
                placeholder="Phone Number"
                id="phonenumber"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />

              <label htmlFor="streetaddress">Street Address</label>

              <input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                id="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />

              <div className="flex gap-2">
                <label htmlFor="postalcode">
                  PostalCode
                  <input
                    type="text"
                    placeholder="PostalCode"
                    value={postalCode}
                    id="postalcode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </label>

                <label htmlFor="city">
                  City
                  <input
                    type="text"
                    placeholder="City"
                    id="city"
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                </label>
              </div>

              <label htmlFor="country">Country</label>

              <input
                type="text"
                placeholder="Country"
                id="country"
                value={country}
                onChange={(ev) => setCountry(ev.target.value)}
              />

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
