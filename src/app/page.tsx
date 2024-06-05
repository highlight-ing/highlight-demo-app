"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    // On page load, fetch a new access token

    async function fetchToken() {
      // Dynamic import to avoid issues with Next prerendering
      const Highlight = (await import("@highlight-ai/app-runtime")).default;

      const { accessToken, refreshToken } = await Highlight.auth.signIn();

      setToken(accessToken);
    }

    fetchToken();
  }, []);

  return (
    <main className="text-white p-4">
      <h1>Highlight Demo App</h1>
      {token && <p>Your token is {token}</p>}
    </main>
  );
}
