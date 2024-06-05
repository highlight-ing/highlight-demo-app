"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [runningInHighlight, setRunningInHighlight] = useState<boolean | null>(
    null
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    // On page load, fetch a new access token

    async function fetchToken() {
      // Dynamic import to avoid issues with Next prerendering

      let Highlight;
      try {
        Highlight = (await import("@highlight-ai/app-runtime")).default;
        setRunningInHighlight(true);
      } catch (error) {
        setRunningInHighlight(false);
        return;
      }

      const { accessToken, refreshToken } = await Highlight.auth.signIn();

      setToken(accessToken);
    }

    fetchToken();
  }, []);

  return (
    <main className="p-4 space-y-2">
      <h1 className="text-2xl font-bold">Highlight Demo App</h1>
      <p>This is a demo app to showcase the Highlight Runtime API.</p>
      {runningInHighlight === null && <p>Loading...</p>}
      {runningInHighlight === false && (
        <p className="text-red-500">Not running in Highlight</p>
      )}
      {token && <p>Your token is {token}</p>}
    </main>
  );
}
