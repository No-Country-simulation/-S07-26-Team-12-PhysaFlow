export default function Spacing({size}){
    return(
        <div className={`${size === 'xs' ? "h-[8px]" : size === 'lg' ? "h-[16px]" : "h-[48px]"}`}/>
    )
}