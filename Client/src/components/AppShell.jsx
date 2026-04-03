"use client";

import { useEffect, useState } from "react";
import Chat from "./Chat.jsx";

export default function AppShell() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-[color:var(--line)] bg-[color:var(--panel)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[image:linear-gradient(135deg,#3b82f6,#1d4ed8)] text-sm font-semibold text-white shadow-[0_12px_32px_rgba(37,99,235,0.35)]">
              DK
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">
                DK Chatbot
              </h1>
              <p className="text-sm text-[color:var(--muted)]">
                Private chat UI, now structured for Next.js App Router.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--card)] px-4 py-2 text-sm font-medium text-[color:var(--text)] shadow-[0_8px_30px_rgba(2,6,23,0.12)] transition hover:border-blue-400/40 hover:bg-[color:var(--panel-solid)]"
          >
            <span>{theme === "dark" ? "Dark" : "Light"}</span>
            <span className="text-[color:var(--muted)]">{theme === "dark" ? "Moon" : "Sun"}</span>
          </button>
        </div>
      </header>

      <Chat />
    </main>
  );
}
