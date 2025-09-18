import React, { useState } from "react";

export default function CopyButton({ text }) {
  const [done, setDone] = useState(false);
  async function copy() {
    await navigator.clipboard.writeText(text);
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  }
  return (
    <button className="copy" onClick={copy}>{done ? "Copied" : "Copy"}</button>
  );
}