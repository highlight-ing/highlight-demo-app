"use client";

import { Key, Mail, TriangleAlert } from "lucide-react";
import Highlight from "@highlight-ai/app-runtime";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

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
    <main className="flex h-svh flex-col items-center justify-center gap-4 text-center">
      <Logo className="size-16" />

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">Highlight Demo App</h1>
        <p className="text-muted-foreground">
          This is a demo app to showcase the Highlight Runtime API.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2">
        {token && (
          <div className="flex max-w-xl flex-row items-center gap-1.5">
            <Key className="size-4 shrink-0" />
            <p className="truncate text-muted-foreground">{token}</p>
          </div>
        )}

        {email && (
          <div className="flex max-w-xl flex-row items-center gap-1.5">
            <Mail className="size-4 shrink-0" />
            <p className="truncate text-muted-foreground">{email}</p>
          </div>
        )}

        {error && (
          <div className="flex flex-row items-center gap-1.5">
            <TriangleAlert className="size-4 shrink-0 text-destructive" />
            <p className="text-destructive">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
