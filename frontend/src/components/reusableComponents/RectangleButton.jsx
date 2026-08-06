export default function RectangleButton({onClick, text, color}) {
    const buttonStyle = {
        green:"bg-green-dark text-white",
        greenLight:"bg-green-lightest text-green-dark",
        gold:"bg-gold-dark text-green-darker",
        white:"bg-white text-green-dark"
    }
    return (
        <div className={`${buttonStyle[color]} p-3 rounded-lg max-w-xs text-center font-semibold`} onClick={onClick}>
            {text}
        </div>
    )
}