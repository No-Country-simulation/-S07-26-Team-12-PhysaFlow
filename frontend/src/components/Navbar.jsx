import { useState } from "react";
import { screenSize } from "./hooks/screenSize";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import RoundedButton from "./reusableComponents/RoundedButton";

export default function Navbar() {
  const { isMobile } = screenSize();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed h-16 top-0 left-0 w-full z-50 bg-background flex items-center px-4 justify-between">
        
        <Link className="flex flex-col justify-center items-center" to="/">
          <img src="/physaflow.png" alt="PhysaFlow" className="w-10 h-10" />
          <h3 className="font-title">PhysaFlow</h3>
        </Link>

        {isMobile ? (
          <button onClick={() => setIsOpen(true)}>menu</button>
        ) : (
         <>
        
            <div className="flex gap-4">
              <Link to="/">Inicio</Link>
              <Link to="/form">Calcular</Link>
            </div>
            <div className=" min-w-20"/>
            </>
        )}
      </div>
      {isMobile && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}
