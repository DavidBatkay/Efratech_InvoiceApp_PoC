"use client";

export default function LogoutButton({
  handleLogOut,
}: {
  handleLogOut: () => void;
}) {
  return (
    <button
      onClick={handleLogOut}
      type="button"
      className="
        relative inline-flex items-center justify-center 
        px-3 py-1 
        overflow-hidden text-sm font-semibold 
        text-white transition-all duration-200 
        bg-white/10 hover:bg-red-500/20 
        border border-white/20 hover:border-red-500/50 
        rounded-lg group
      "
    >
      <span className="relative group-hover:text-red-400 transition-colors">
        Log Out
      </span>
    </button>
  );
}
