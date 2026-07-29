import { screenSize } from "./hooks/screenSize";

export default function Navbar() {
  const { isMobile } = screenSize();

  return (
    <div className="fixed h-16 top-0 left-0 w-full z-50 bg-pink-200 flex items-center px-4 justify-between">
      <h3>PhysaFlow</h3>
      {isMobile ? (
        <div>menu</div>
      ) : (
        <>
          <div className="flex gap-4">
            <div>botones</div>
            <div>botones</div>
          </div>
          <div>calcular</div>
        </>
      )}
    </div>
  );
}
