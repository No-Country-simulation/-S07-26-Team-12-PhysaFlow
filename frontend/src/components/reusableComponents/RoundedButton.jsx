export default function RoundedButton({ onClick, text, color, type = "button" }) {
    const buttonStyle = {
        green:"bg-green-dark text-white",
        gold:"bg-gold-dark text-green-darker",
        white:"bg-white text-green-dark underline",
        border:"bg-white text-green-dark border border-green-dark"
    }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${buttonStyle[color]} m-3 rounded-full p-3 text-center font-semibold transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0 active:scale-[.98]`}
    >
      {text}
    </button>
  );
}
