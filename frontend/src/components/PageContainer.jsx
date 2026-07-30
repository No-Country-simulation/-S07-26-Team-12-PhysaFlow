export default function PageConainer({children}){
    return (
        <div className="py-16 min-h-screen w-full flex justify-center ">
            <div className="bg-background container">{children}</div>
        </div>
    )
}