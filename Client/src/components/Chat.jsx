"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sendChat } from "../services/api.js";
import MessageBubble from "./MessageBubble.jsx";
import { SendIcon } from "./Icons.jsx";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: crypto.randomUUID(), role: "assistant", content: "Hi! I'm your DKAI assistant. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    if (!canSend) return;

    setError("");
    const userMsg = { id: crypto.randomUUID(), role: "user", content: input.trim() };
    setMessages((current) => [...current, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = messages
        .filter((message) => message.role !== "error")
        .concat(userMsg)
        .map(({ role, content }) => ({ role, content }));

      const { text } = await sendChat({ model, messages: payload });
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: text || "(No response)" },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "error", content: `Request failed: ${msg}` },
      ]);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function clearChat() {
    setMessages([
      { id: crypto.randomUUID(), role: "assistant", content: "Chat cleared. How can I help now?" },
    ]);
    setError("");
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-4 pt-6 sm:px-6">
        <div
          ref={listRef}
          className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-[32px] border border-[color:var(--line)] bg-[color:var(--panel)] px-4 py-4 shadow-[0_20px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-6 sm:py-6"
        >
          {messages.map((message) => (
            <MessageBubble key={message.id} role={message.role} text={message.content} />
          ))}

          {!loading && messages.length === 1 && (
            <div className="rounded-[28px] border border-dashed border-blue-400/25 bg-blue-500/5 p-5 text-sm text-[color:var(--muted)]">
              Start with a greeting, ask a coding question, or test your backend connection.
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 rounded-full border border-[color:var(--line)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--muted)]">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/25 border-t-blue-400" />
              Thinking...
            </div>
          )}
        </div>

        <div className="mt-4 rounded-[32px] border border-[color:var(--line)] bg-[color:var(--panel)] p-3 shadow-[0_20px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <div className="rounded-[24px] border border-[color:var(--line)] bg-[color:var(--card)] p-3">
            <textarea
              className="min-h-28 w-full resize-none bg-transparent px-3 py-3 text-sm leading-7 text-[color:var(--text)] outline-none placeholder:text-[color:var(--muted)]"
              rows={1}
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />

            <div className="flex flex-col gap-3 border-t border-[color:var(--line)] px-2 pt-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="text-xs text-[color:var(--muted)]">
                {error ? "Error: try again after checking your backend." : "Enter to send, Shift+Enter for a new line."}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="cursor-pointer rounded-full border border-[color:var(--line)] bg-[color:var(--panel-solid)] px-3 py-2 text-sm text-[color:var(--text)] outline-none"
                >
                  <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                  <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                </select>

                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[image:linear-gradient(135deg,#3b82f6,#1d4ed8)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!canSend}
                  onClick={handleSend}
                >
                  <SendIcon />
                  {loading ? "Sending..." : "Send"}
                </button>

                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-[color:var(--line)] bg-transparent px-4 py-2 text-sm font-medium text-[color:var(--text)] transition hover:bg-white/5"
                  onClick={clearChat}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 px-2 text-xs text-[color:var(--muted)]">
            <span>Backend:</span>
            <code className="rounded-full bg-white/5 px-2 py-1">
              {process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001"}
            </code>
            <span>Set</span>
            <code className="rounded-full bg-white/5 px-2 py-1">GEMINI_API_KEY</code>
            <span>in the server.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
