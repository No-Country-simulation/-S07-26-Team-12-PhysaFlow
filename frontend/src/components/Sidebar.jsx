import { Link } from "react-router-dom";
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
        <Link to="/" onClick={() => setIsOpen(false)}>Inicio</Link>
        <Link to="/form" onClick={() => setIsOpen(false)}>Calcular</Link>
      </nav>
    </aside>
    
    )
}