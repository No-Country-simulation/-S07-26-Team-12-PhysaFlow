import CalculatorForm from "../components/calculator/CalculatorForm";
import { screenSize } from "../components/hooks/screenSize";
import Spacing from "../components/spacing/Spacing";
import PageContainer from "../components/PageContainer";

 
export default function CalculatorFormPage() {
  const { isMobile, isTablet } = screenSize();

  return (
    <PageContainer>

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
          } flex justify-center items-center `}
        >
          <CalculatorForm />
        </section>

        {(isMobile || isTablet) && <Spacing />}

        {/* Columna derecha: panel de ayuda / ejemplo de datos */}
        <div
          className={`${
            isMobile || isTablet ? "w-full" : "w-1/2"
          } flex items-center justify-center border border-dashed min-h-[300px]`}
        >
          <p className="body-large text-center">
            Panel de ayuda / ejemplo de datos
            <br />
            — definido en Sprint 3 —
          </p>
        </div>
      </main>
   
    </PageContainer>
  );
}