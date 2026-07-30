export default function Sidebar({ isOpen, setIsOpen }){
    return (
    <aside
      className={`
        fixed top-0 right-0 z-50 h-screen w-72
        bg-background
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <h3 className="font-title">PhysaFlow</h3>

        <button onClick={() => setIsOpen(false)}>
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-6 p-6">
        <a href="#">Inicio</a>
        <a href="#">Dashboard</a>
        <a href="#">Información</a>

        <button className="rounded-full bg-gold-lightest p-2">
          Calcular
        </button>
      </nav>
    </aside>
    
    )
}