export default function RoundedButton({onClick, text, color, type}) {
    const buttonStyle = {
        green:"bg-green-dark text-white",
        gold:"bg-gold-dark text-green-darker",
        white:"bg-white text-green-dark underline",
        border:"bg-white text-green-dark border border-green-dark"
    }
    return (
        <div className={`${buttonStyle[color]} p-3 m-3 rounded-full  text-center font-semibold `} onClick={onClick} type={type}>
            {text}
        </div>
    )
}