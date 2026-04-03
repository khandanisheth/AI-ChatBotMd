"use client";

import { useState } from "react";

export default function CopyButton({ text }) {
  const [done, setDone] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  }

  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-[color:var(--text)] transition hover:border-blue-400/40 hover:bg-blue-500/10"
      onClick={copy}
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}
