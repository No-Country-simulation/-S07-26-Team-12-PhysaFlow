export default function RectangleButton({
  onClick,
  text,
  color,
  type = "button",
  disabled = false,
  className = "",
}) {
    const buttonStyle = {
        green:"bg-green-dark text-white",
        greenLight:"bg-green-lightest text-green-dark",
        gold:"bg-gold-dark text-green-darker",
        white:"bg-white text-green-dark"
    }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyle[color]} max-w-xs rounded-lg p-3 text-center font-semibold transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {text}
    </button>
  );
}
