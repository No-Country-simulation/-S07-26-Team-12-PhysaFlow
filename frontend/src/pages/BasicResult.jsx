import { useState } from "react";
import { useLocation } from "react-router-dom";
import { screenSize } from "../components/hooks/screenSize";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";
import EmailCaptureModal from "../components/EmailCaptureModal";

export default function BasicResult() {
  const { isMobile } = screenSize();
  const location = useLocation();
  const result = location.state;

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const strandedCapacity =
    result?.data?.stranded_capacity_mw ?? 38.4;

  return (
    <PageConainer>
      <div className={`flex h-full ${isMobile ? "flex-col" : "flex-row"}`}>
        <div
          className={`${
            !isMobile ? "w-1/2" : "w-full"
          } flex flex-col items-center justify-center p-4`}
        >
          <p className="data-big text-center">
            {Math.round(strandedCapacity)} MW estancados
          </p>

          <Spacing size="lg" />

          <p className="data-small">
            −9.6 MW overhead · 42 MW instalados
          </p>

          <Spacing size="lg" />

          <button
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
            className="w-1/2 rounded bg-green-dark p-3 text-center text-white transition hover:bg-green-darker"
          >
            compartir resultado
          </button>

          <Spacing />

          <p>Ver análisis completo → (requiere email)</p>
        </div>

        <div
          className={`${
            !isMobile ? "w-1/2" : "w-full"
          } flex items-center justify-center p-4`}
        >
          <div className="flex h-1/2 items-center justify-center border border-dashed bg-gray-200 p-2 text-center">
            Visualización 3 capas (Facility / IT / Workload) — contenido
            definido en Sprint 4 — En desktop: capas lado a lado
          </div>
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