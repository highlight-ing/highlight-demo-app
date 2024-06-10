"use client";

import { useEffect, useState } from "react";
import Highlight from "@highlight-ai/app-runtime";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // On page load, fetch a new access token
    async function fetchToken() {
      try {
        const { accessToken, refreshToken } = await Highlight.auth.signIn();
        setToken(accessToken);
      } catch (error) {
        setError("Failed to fetch token");
      }
    }

    async function fetchEmail() {
      try {
        const email = await Highlight.user.getEmail();
        setEmail(email);
      } catch (error) {
        setError("Failed to fetch email");
      }
    }

    fetchToken();
    fetchEmail();
  }, []);

  useEffect(() => {
    Highlight.addEventListener("onContext", (context: any) => {
      console.log("Got this context", context);
    });
  }, []);

  return (
    <main className="p-4 space-y-2 ">
      <h1 className="text-2xl font-bold">Highlight Demo App</h1>
      <p>This is a demo app to showcase the Highlight Runtime API.</p>
      {error && <p className="text-red-500">{error}</p>}
      {token && <p>Your token is {token}</p>}
      {email && <p>Your Highlight email is {email}</p>}
    </main>
  );
}
