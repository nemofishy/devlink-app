export default function Logo({ dark = true, size = "md" }) {
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal text-white font-head font-bold text-sm">
        {"</>"}
      </div>
      <span className={`font-head font-bold ${textSize} ${dark ? "text-white" : "text-ink"}`}>
        DevLink<span className="text-teal-bright">.ai</span>
      </span>
    </div>
  );
}
