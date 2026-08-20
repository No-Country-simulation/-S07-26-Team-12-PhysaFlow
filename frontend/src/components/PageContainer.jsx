export default function PageConainer({children}){
    return (
        <div className="flex min-h-screen w-full justify-center overflow-x-hidden bg-page-background py-16">
            <div className="container p-4">{children}</div>
        </div>
    )
}
