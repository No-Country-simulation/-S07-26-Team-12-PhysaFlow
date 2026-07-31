import InputForm from "../components/inputsform/inputForm";
import Spacing from "../../../components/spacing/Spacing";
import { screenSize } from "../../../components/hooks/screenSize";
 
export default function CalculatorPage() {
  const { isMobile, isTablet } = screenSize();

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header — logo + volver */}
      <header className="w-full flex items-center px-4 py-3">
        <span className="label-eyebrow">Header — logo</span>
        <span className="label-eyebrow ml-4">&larr; Volver</span>
      </header>

      <Spacing size="lg" />

      {/* Contenido principal: formulario + panel de ayuda */}
      <main
        className={`w-full flex-1 flex ${
          isMobile || isTablet ? "flex-col" : "flex-row"
        } gap-8 px-6 py-8`}
      >
        {/* Columna izquierda: formulario */}
        <section
          className={`${
            isMobile || isTablet ? "w-full" : "w-1/2"
          } flex justify-center`}
        >
          <InputForm />
        </section>

        {(isMobile || isTablet) && <Spacing />}

        {/* Columna derecha: panel de ayuda / ejemplo de datos */}
        <aside
          className={`${
            isMobile || isTablet ? "w-full" : "w-1/2"
          } flex items-center justify-center border border-dashed min-h-[300px]`}
        >
          <p className="body-large text-center">
            Panel de ayuda / ejemplo de datos
            <br />
            — definido en Sprint 3 —
          </p>
        </aside>
      </main>
    </div>
  );
}