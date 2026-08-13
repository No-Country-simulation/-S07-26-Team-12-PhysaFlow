import { useState } from "react";
import { useLocation } from "react-router-dom";
import { screenSize } from "../components/hooks/screenSize";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import EmailCaptureModal from "../components/EmailCaptureModal";
import RoundedButton from "../components/reusableComponents/RoundedButton";
import { formatAmount } from "../components/hooks/formatAmount";

export default function BasicResult() {
  const { isMobile } = screenSize();
  const location = useLocation();
  const result = location.state;

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const data = result?.data ?? {};

  const strandedCapacity = data.stranded_capacity_mw ?? 38.4;
  const strandedPercent = data.stranded_capacity_percent ?? 0;
  const facilitySize = data.facility_size_mw ?? 0;
  const utilization = data.utilization_percentage ?? 0;
  const minLoss = data.annual_loss_min ?? 0;
  const maxLoss = data.annual_loss_max ?? 0;
  const cooling = data.cooling_type ?? [];


  return (
    <PageConainer>
      <div className={`flex flex-col items-center justify-center p-4`}>
        <p className="data-medium text-gold-darkest">
          TU RESULTADO · 
          {facilitySize} MW · 
          {utilization}% UTIL · 
          {cooling.join(" + ").toUpperCase()}
        </p>
          <Spacing size="xs" />
        <h1 className="display-h1">Tenés capacidad estancada</h1>
        <div className={`flex ${isMobile ? "flex-col": "flex-row"}`}>
          <div className="p-4 flex flex-col justify-center iitems-center">
            <h1 className="text-center display-data-big">{strandedPercent * 100}%</h1>
            <p className="text-center data-small-green">CAPACIDAD ESTANCADA</p>
          </div>
          <div className="p-4 flex flex-col justify-center iitems-center">
            <h1 className="text-center display-data-big">{Math.round(strandedCapacity * 10) / 10} MW</h1>
            <p className="text-center data-small-green">SIN USAR</p>
          </div>
        </div>
        <Spacing size="xs" />
        <div className="bg-green-darker p-3 rounded rounded-xl min-w-1/2">
          <h2 className="data-medium text-center">
            PÉRDIDA FINANCIERA ANUAL ESTIMADA
          </h2>
          <h1 className="p-2 result-amount text-white text-center">
            {formatAmount(minLoss)} - {formatAmount(maxLoss)}
          </h1>
        </div>
        <Spacing size="md" />
        <p className="data-small-green ">
          Facility → IT → Workload — dónde se pierde, en detalle
        </p>
        <Spacing size="md" />
        <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
          <RoundedButton
            text="Ver breakdown completo + comparar escenarios"
            color="gold"
            onClick={()=>setIsEmailModalOpen(true)}
          />
          <RoundedButton text="Compartir con un colega" color="border" />
        </div>
                <Spacing size="md" />

        <div className="bg-green-lightest p-3 rounded rounded-lg  flex justify-center items-center">
        <p className="p-3 data-big text-xl">i</p>
          <p className="p-3">
            Este resultado es gratis y completo. Si querés comparar escenarios,
            el breakdown por capa y el PDF descargable, te pedimos tu email a
            cambio — no antes.
          </p>
        </div>
        
      </div>

      {isEmailModalOpen && (
        <EmailCaptureModal
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}
    </PageConainer>
  );
}