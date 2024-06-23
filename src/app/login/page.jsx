"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Google from "@/assets/Google.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState(null);

  // async function handleFormSubmit(ev) {
  //   ev.preventDefault();
  //   console.log("Clicked Before"); // Debugging statement
  //   setLoginInProgress(true);
  //   setError(null);

  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       email,
  //       password,
  //     });

  //     console.log("Clicked After"); // Debugging statement

  //     if (result.error) {
  //       setError(result.error);
  //     }
  //   } catch (err) {
  //     console.error("Error during sign-in:", err);
  //     setError("An unexpected error occurred.");
  //   } finally {
  //     setLoginInProgress(false);
  //   }
  // }

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    const value = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
    console.log(value, "value");
    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit">
          Login
        </button>
        {error && <div className="text-red-500">{error}</div>}
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={Google} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
}
