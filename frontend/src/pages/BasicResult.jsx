import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { screenSize } from "../components/hooks/screenSize";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import EmailCaptureModal from "../components/EmailCaptureModal";
import RoundedButton from "../components/reusableComponents/RoundedButton";
import { formatAmount } from "../components/hooks/formatAmount";
import Loader from "../components/reusableComponents/Loader";
import { getCalculation } from "../services/calculatorService";

export const mockCalculationResult = {
  facilitySize: 44,
  utilizationPercent: 73,
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
  id: data.id,
});


export default function BasicResult() {
  const { isMobile, isTablet } = screenSize();
  const location = useLocation();
  const { id } = useParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [calculationResult, setCalculationResult] = useState(
    location.state ?? null,
  );
  const [isLoading, setIsLoading] = useState(!location.state);

  useEffect(() => {
    if (calculationResult || !id) return;
    const fetchCalculation = async () => {
      try {
        setIsLoading(true);
        const data = await getCalculation(id);
        setCalculationResult(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalculation();
  }, [id, calculationResult]);

  const dataInfo = calculationResult?.data
    ? mapResultData(calculationResult.data)
    : null;

  const handleShare = async () => {
    const resultUrl = `${window.location.origin}/result/${dataInfo.id}`;

    const shareData = {
      title: "PhysaFlow Calculation Result",
      text: "View my PhysaFlow calculation result",
      url: resultUrl,
    };

    try {
      if (navigator.share && (isMobile || isTablet)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(resultUrl);

        alert("Link copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (isLoading) {
    return <Loader size="lg" />;
  }

  if (!dataInfo || Response == 400) {
    return (
      <PageConainer>
        <div className="flex flex-col justfy-center items-center">
        <h1 className="display-hero">No se encontró el resultado</h1>
        <Link to="/form">
          <RoundedButton text="Calcular mi capacidad" color="gold" />
        </Link>
        </div>
      </ PageConainer>
    );
  }

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
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-center display-data-big">
              {Math.round(dataInfo.strandedPercent * 100)}%
            </h1>
            <p className="text-center data-small-green">CAPACIDAD ESTANCADA</p>
          </div>

          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-center display-data-big">
              {Math.round(dataInfo.strandedMw * 10) / 10} MW
            </h1>
            <p className="text-center data-small-green">SIN USAR</p>
          </div>
        </div>

        <Spacing size="xs" />

        <div className="min-w-1/2 rounded-xl bg-green-darker p-3">
          <h2 className="data-medium text-center">
            PÉRDIDA FINANCIERA ANUAL ESTIMADA
          </h2>

          <h1 className="result-amount p-2 text-center text-white">
            {formatAmount(dataInfo.minLoss)} - {formatAmount(dataInfo.maxLoss)}
          </h1>
        </div>

        <Spacing size="md" />

        <p className="data-small-green">
          Facility → IT → Workload — dónde se pierde, en detalle
        </p>

        <Spacing size="md" />

        {location.state ? (
          <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
            <RoundedButton
              text="Ver breakdown completo + comparar escenarios"
              color="gold"
              onClick={() => setIsEmailModalOpen(true)}
            />

            <RoundedButton
              onClick={handleShare}
              text="Compartir con un colega"
              color="border"
            />
          </div>
        ) : (
          <Link to="/form">
            <RoundedButton text="Calcular mi capacidad" color="gold" />
          </Link>
        )}

        <Spacing size="md" />

        <div className="flex items-center justify-center rounded-lg bg-green-lightest p-3">
          <p className="data-big p-3 text-xl">i</p>

          <p className="p-3">
            Este resultado es gratis y completo. Si querés comparar escenarios,
            el breakdown por capa y el PDF descargable, te pedimos tu email a
            cambio — no antes.
          </p>
        </div>
      </div>

      {isEmailModalOpen && (
        <EmailCaptureModal
          calculationId={dataInfo.id}
          onClose={() => setIsEmailModalOpen(false)}
        />
      )}
    </PageConainer>
  );
}
