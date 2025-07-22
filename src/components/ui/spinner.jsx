export function Spinner({
  size = 48,       
  thickness = 4,    
  colorClass = "border-blue-500",
  fullScreen = false,  
  className = "",    
}) {
 
  const wrapperClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center overflow-hidden"
    : "flex items-center justify-center";

  return (
    <div className={`${wrapperClasses} ${className}`}>
      <div
        className={`
          animate-spin 
          rounded-full 
          border 
          border-t-transparent 
          ${colorClass}
        `}
        style={{
          width: size,
          height: size,
          borderWidth: thickness,
        }}
      />
    </div>
  );
}
