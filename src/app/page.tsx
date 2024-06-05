"use client";

import Highlight from "@highlight-ai/app-runtime";

import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // On page load, fetch a new access token

    async function fetchToken() {
      const { accessToken, refreshToken } = await Highlight.auth.signIn();

      setToken(accessToken);
    }

    fetchToken();
  }, []);

  return (
    <main className="text-white p-4">
      <h1>Highlight Demo App</h1>
      <p>Token is {token}</p>
    </main>
  );
}
