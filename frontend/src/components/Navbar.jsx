import { useState } from "react";
import { screenSize } from "./hooks/screenSize";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isMobile } = screenSize();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

    <div className="fixed h-16 top-0 left-0 w-full z-50 bg-background flex items-center px-4 justify-between">
      <Link to="/">
        <img src="/physaflow.png" alt="PhysaFlow" className="w-10 h-10" />
      </Link>
      <h3 className="font-title">PhysaFlow</h3>
      {isMobile ? (
        <button onClick={() => setIsOpen(true)}>menu</button>
      ) : (
        <>
          {/* <div className="flex gap-4">
            <div>botones</div>
            <div>botones</div>
          </div> */}
          <button className="rounded-full bg-gold-lightest p-2">calcular</button>
        </>
      )}
    </div>
          {isMobile && (
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
          </>
    
  );
}
