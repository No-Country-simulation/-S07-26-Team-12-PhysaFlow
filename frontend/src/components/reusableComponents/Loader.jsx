export default function Loader({ size = "md", fullScreen = false, label }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={`${sizes[size]} animate-spin rounded-full border-green-lightest border-t-green-dark`}
      role="status"
      aria-label={label || "Cargando"}
    />
  );

  if (!fullScreen) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        {spinner}
        {label && (
          <p className="font-data text-sm text-green-dark">{label}</p>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/40 backdrop-blur-sm">
      {spinner}
      {label && (
        <p className="font-data text-sm text-green-dark">{label}</p>
      )}
    </div>
  );
}