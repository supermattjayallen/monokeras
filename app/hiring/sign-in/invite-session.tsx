"use client";

import { useEffect } from "react";

export function InviteSession() {
  useEffect(() => {
    const params = readHash(window.location.hash);
    const accessToken = params.get("access_token") ?? "";
    const refreshToken = params.get("refresh_token") ?? "";
    const type = params.get("type") ?? "";
    const invite = type === "invite" || type === "recovery";
    // A normal visit has no hash. An error fragment with no session tokens
    // is not an exchange failure, so it must not show the expired-link message.
    if (!invite || !accessToken || !refreshToken) return;

    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );

    fetch("/hiring/sign-in/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    })
      .then((response) => {
        window.location.replace(
          response.ok
            ? "/hiring/sign-in?setup=password"
            : "/hiring/sign-in?link=expired",
        );
      })
      .catch(() => {
        window.location.replace("/hiring/sign-in?link=expired");
      });
  }, []);

  return null;
}

function readHash(hash: string): Map<string, string> {
  const params = new Map<string, string>();
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return params;
  for (const piece of raw.split("&")) {
    if (!piece) continue;
    const index = piece.indexOf("=");
    const key = decode(index === -1 ? piece : piece.slice(0, index));
    const value = decode(index === -1 ? "" : piece.slice(index + 1));
    if (key) params.set(key, value);
  }
  return params;
}

function decode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
