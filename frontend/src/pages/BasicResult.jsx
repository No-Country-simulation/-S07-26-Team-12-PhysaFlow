import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import { screenSize } from "../components/hooks/screenSize";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import EmailCaptureModal from "../components/EmailCaptureModal";
import RoundedButton from "../components/reusableComponents/RoundedButton";
import { formatAmount } from "../components/hooks/formatAmount";
import { getCalculation } from "../services/calculatorService";

export const mockCalculationResult = {
  facilitySize: 666,
  utilizationPercent: 100,
  cooling: ["air", "immersion"],
  strandedPercent: 0.052890003,
  strandedMw: 5,
  minLoss: 1000100,
  maxLoss: 35900,
};

const mapResultData = (data) => ({
  facilitySize: data.facility_size_mw,
  utilizationPercent: data.utilization_percentage,
  cooling: data.cooling_type,
  strandedPercent: data.stranded_capacity_percent,
  strandedMw: data.stranded_capacity_mw,
  minLoss: data.annual_loss_min,
  maxLoss: data.annual_loss_max,
});

export default function BasicResult() {
  const { isMobile } = screenSize();
  const location = useLocation();
  const { id } = useParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [calculationResult, setCalculationResult] = useState(
    location.state ?? null,
  );

  // ---------------------------------------------------------
  // GET
  // useEffect(() => {
  //   if (calculationResult || !id) return;
  // const fetchCalculation = async () => {
  //   try {
  //     const data = await getCalculation(id);
  //     setCalculationResult(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // fetchCalculation();
  //
  // }, [id, calculationResult]);
  // ---------------------------------------------------------


  const dataInfo = calculationResult?.data
    ? mapResultData(calculationResult.data)
    : mockCalculationResult;


  return (
    <PageConainer>
      <div className="flex flex-col items-center justify-center p-4">
        <p className="data-medium text-gold-darkest">
          TU RESULTADO · {dataInfo.facilitySize} MW ·{" "}
          {dataInfo.utilizationPercent}% UTIL ·{" "}
          {dataInfo.cooling.join(" + ").toUpperCase()}
        </p>

        <Spacing size="xs" />
        <h1 className="display-h1">Tenés capacidad estancada</h1>

        <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
          <div className="p-4 flex flex-col justify-center items-center">
            <h1 className="text-center display-data-big">
              {Math.round(dataInfo.strandedPercent * 100)}%
            </h1>

            <p className="text-center data-small-green">CAPACIDAD ESTANCADA</p>
          </div>

          <div className="p-4 flex flex-col justify-center items-center">
            <h1 className="text-center display-data-big">
              {Math.round(dataInfo.strandedMw * 10) / 10} MW
            </h1>

            <p className="text-center data-small-green">SIN USAR</p>
          </div>
        </div>

        <Spacing size="xs" />

        <div className="bg-green-darker p-3 rounded rounded-xl min-w-1/2">
          <h2 className="data-medium text-center">
            PÉRDIDA FINANCIERA ANUAL ESTIMADA
          </h2>

          <h1 className="p-2 result-amount text-white text-center">
            {formatAmount(dataInfo.minLoss)} - {formatAmount(dataInfo.maxLoss)}
          </h1>
        </div>

        <Spacing size="md" />

        <p className="data-small-green">
          Facility → IT → Workload — dónde se pierde, en detalle
        </p>

        <Spacing size="md" />

        <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
          <RoundedButton
            text="Ver breakdown completo + comparar escenarios"
            color="gold"
            onClick={() => setIsEmailModalOpen(true)}
          />

          <RoundedButton text="Compartir con un colega" color="border" />
        </div>

        <Spacing size="md" />

        <div className="bg-green-lightest p-3 rounded rounded-lg flex justify-center items-center">
          <p className="p-3 data-big text-xl">i</p>

          <p className="p-3">
            Este resultado es gratis y completo. Si querés comparar escenarios,
            el breakdown por capa y el PDF descargable, te pedimos tu email a
            cambio — no antes.
          </p>
        </div>
      </div>

      {isEmailModalOpen && (
        <EmailCaptureModal onClose={() => setIsEmailModalOpen(false)} />
      )}
    </PageConainer>
  );
}
