"use client";

import { useEffect, useState } from "react";
import Highlight from "@highlight-ai/app-runtime";

export default function Home() {
  const [runningInHighlight, setRunningInHighlight] = useState<boolean | null>(
    null
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    // On page load, fetch a new access token

    async function fetchToken() {
      try {
        const { accessToken, refreshToken } = await Highlight.auth.signIn();
        setRunningInHighlight(true);
        setToken(accessToken);
      } catch (error) {
        setRunningInHighlight(false);
      }
    }

    fetchToken();
  }, []);

  return (
    <main className="p-4 space-y-2 ">
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
