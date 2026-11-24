"use client";

import { useEffect } from "react";

export function InviteSession() {
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    const type = hash.get("type");
    const errored = hash.get("error");
    if (!accessToken && !refreshToken && !errored) return;

    const next =
      type === "invite" || type === "recovery"
        ? "/hiring/sign-in?setup=password"
        : "/hiring";
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );

    if (!accessToken || !refreshToken) {
      window.location.replace("/hiring/sign-in?link=expired");
      return;
    }

    fetch("/hiring/sign-in/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ accessToken, refreshToken }),
    })
      .then((response) => {
        window.location.replace(
          response.ok ? next : "/hiring/sign-in?link=expired",
        );
      })
      .catch(() => {
        window.location.replace("/hiring/sign-in?link=expired");
      });
  }, []);

  return null;
}
