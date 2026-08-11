import { screenSize } from "../components/hooks/screenSize";
import PageConainer from "../components/PageContainer";
import Spacing from "../components/spacing/Spacing";

export default function BasicResult() {
  const { isMobile } = screenSize();
  return (
    <PageConainer>
      <div className={`flex h-full ${isMobile ? " flex-col" : "flex-row"}`}>
        <div
          className={`${!isMobile ? "w-1/2" : "w-full"}  p-4 flex flex-col justify-center items-center`}
        >
          <p className="data-big text-center">38.4 MW estancados</p>
          <Spacing size="lg" />
          <p className="data-small">−9.6 MW overhead · 42 MW instalados</p>
          <Spacing size="lg" />
          <p className="w-1/2 bg-green-dark rounded p-3 text-white text-center block">
            compartir resultado{" "}
          </p>
          <Spacing />
          <p>Ver análisis completo → (requiere email)</p>
        </div>
        <div className={`${!isMobile ? "w-1/2" : "w-full"}  p-4 flex justify-center items-center`}>
          <div className="p-2 h-1/2  flex justify-center items-center text-center border border-dashed bg-gray-200">
            Visualización 3 capas (Facility / IT / Workload) — contenido
            definido en Sprint 4 — En desktop: capas lado a lado
          </div>
        </div>
      </div>
    </PageConainer>
  );
}
