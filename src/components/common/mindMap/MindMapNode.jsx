export function MindMapNode({
  label,
  percentage,
  onClick,
  position,
  isCenter = false,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        absolute px-4 py-2 rounded-full border-2 transition-all
        ${
          isCenter
            ? "bg-primary text-primary-foreground border-primary scale-110"
            : "bg-card border-border hover:border-primary hover:scale-105 cursor-pointer"
        }
      `}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span className="text-sm">{label}</span>
        {percentage !== undefined && !isCenter && (
          <span className="text-xs opacity-70">{percentage}%</span>
        )}
      </div>
    </div>
  );
}
