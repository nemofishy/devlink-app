export default function CodeBlock({ code, highlightLines = [], filename }) {
  const lines = code.split("\n");
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0B1220]">
      {filename && (
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-teal-bright/70" />
          </div>
          <code className="ml-2 text-xs text-slate-400">{filename}</code>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code>
          {lines.map((line, i) => {
            const num = i + 1;
            const flagged = highlightLines.includes(num);
            return (
              <div
                key={i}
                className={`flex gap-4 px-2 ${flagged ? "bg-amber-500/10 border-l-2 border-amber-400" : ""}`}
              >
                <span className="w-5 shrink-0 select-none text-right text-slate-600">{num}</span>
                <span className={`whitespace-pre ${flagged ? "text-amber-200" : "text-slate-300"}`}>{line}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
