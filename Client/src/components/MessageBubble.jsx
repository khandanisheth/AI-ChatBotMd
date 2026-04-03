import Avatar from "./Avatar.jsx";
import CopyButton from "./CopyButton.jsx";

export default function MessageBubble({ role, text }) {
  const isUser = role === "user";
  const isError = role === "error";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-[24px] border px-4 py-3 shadow-[0_14px_48px_rgba(15,23,42,0.16)] backdrop-blur",
          isUser
            ? "border-blue-400/30 bg-[image:var(--user)] text-white"
            : isError
              ? "border-red-400/30 bg-[image:var(--danger)] text-red-50"
              : "border-[color:var(--line)] bg-[image:var(--assistant)] text-[color:var(--text)]",
        ].join(" ")}
      >
        <div className="mb-2 flex items-center gap-3 opacity-90">
          <Avatar role={role} />
          <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
            {role}
          </span>
        </div>
        <div className="whitespace-pre-wrap text-sm leading-7">{text}</div>
        {!isError && (
          <div className="mt-3 opacity-90">
            <CopyButton text={text} />
          </div>
        )}
      </div>
    </div>
  );
}
