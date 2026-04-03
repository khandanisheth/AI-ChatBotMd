export default function Avatar({ role }) {
  if (role === "error") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-red-500 text-xs font-bold text-white">
        !
      </div>
    );
  }

  if (role === "user") {
    return (
      <div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-200 text-xs font-bold text-slate-900">
        You
      </div>
    );
  }

  return (
    <div className="grid h-8 w-8 place-items-center rounded-xl bg-[image:linear-gradient(135deg,#6366f1,#2563eb)] text-xs font-bold text-white">
      AI
    </div>
  );
}
