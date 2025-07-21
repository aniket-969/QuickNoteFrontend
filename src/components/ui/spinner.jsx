export function Spinner({
  size = 48,         
  thickness = 4,     
  colorClass = "border-blue-500",
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-transparent ${colorClass}`}
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
        }}
      />
    </div>
  );
}
