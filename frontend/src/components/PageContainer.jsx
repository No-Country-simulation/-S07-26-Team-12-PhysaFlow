export default function PageConainer({children}){
    return (
        <div className="py-16 min-h-screen w-full flex justify-center ">
            <div className="container p-4">{children}</div>
        </div>
    )
}