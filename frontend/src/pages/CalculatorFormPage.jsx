import CalculatorForm from "../components/calculator/CalculatorForm";
import Spacing from "../components/spacing/Spacing";
import PageContainer from "../components/PageContainer";

export default function CalculatorFormPage() {
  return (
    <PageContainer>
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center justify-center px-1 sm:px-4">
        <p className="mb-5 self-start font-data text-[9px] uppercase tracking-[0.14em] text-gold-darkest sm:mb-3">
          PhysaFlow
        </p>
        <h1 className="w-full max-w-[620px] text-left font-title text-[30px] font-semibold leading-tight text-green-darker sm:text-center sm:text-[36px]">
          ¿Cuánta capacidad estás desperdiciando?
        </h1>
        <Spacing size="xs" />
        <p className="w-full text-left text-sm text-green-dark sm:text-center">
          3 datos. Menos de 3 minutos. Sin registro.
        </p>
        <Spacing size="lg" />
        <CalculatorForm />
        <Spacing />
        <p className="text-center text-sm text-green-dark">
          Gratis · Sin email · Resultado inmediato
        </p>
      </div>
    </PageContainer>
  );
}
