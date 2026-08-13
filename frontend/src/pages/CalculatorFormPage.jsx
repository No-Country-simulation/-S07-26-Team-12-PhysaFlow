import CalculatorForm from "../components/calculator/CalculatorForm";
import { screenSize } from "../components/hooks/screenSize";
import Spacing from "../components/spacing/Spacing";
import PageContainer from "../components/PageContainer";

export default function CalculatorFormPage() {
  const { isMobile, isTablet } = screenSize();

  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center ">
        <h1 className="display-h1 text-green-darker">¿Cuánta capacidad estás desperdiciando?</h1>
        <Spacing size="xs"/>
        <p>3 datos. Menos de 3 minutos. Sin registro.</p>
        <Spacing size="lg"/>
        <CalculatorForm />
        <Spacing/>
        <p>Gratis · Sin email · Resultado inmediato</p>
      </div>
    </PageContainer>
  );
}
