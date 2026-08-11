export default function RoundedButton({onClick, text, color, type}) {
    const buttonStyle = {
        green:"bg-green-dark text-white",
        gold:"bg-gold-dark text-green-darker",
        white:"bg-white text-green-dark"
    }
    return (
        <div className={`${buttonStyle[color]} p-3 rounded-full max-w-xs text-center font-semibold`} onClick={onClick} type={type}>
            {text}
        </div>
    )
}