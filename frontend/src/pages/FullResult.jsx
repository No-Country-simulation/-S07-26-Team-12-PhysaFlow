import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageConainer from "../components/PageContainer";
import { screenSize } from "../components/hooks/screenSize";
import useFullResult from "../components/hooks/useFullResult";
import ScenarioCard from "../components/scenarios/ScenarioCard";
import NewScenarioModal from "../components/scenarios/NewScenarioModal";
import Loader from "../components/reusableComponents/Loader";
import { mapCalculationToScenario } from "../components/scenarios/fullResultMapper";
import { fullResultScenarios } from "../data/fullResultMock";

export default function FullResult() {
  const { isMobile } = screenSize();
  const { id } = useParams();
  const {
    calculation,
    error,
    isDownloading,
    isLoading,
    handleDownloadPdf,
  } = useFullResult(id);
  const [newScenarios, setNewScenarios] = useState([]);
  const [scenarioOrder, setScenarioOrder] = useState([]);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const mobileCarouselRef = useRef(null);

  const actualScenario = calculation
    ? mapCalculationToScenario(calculation)
    : null;
  const scenarioCatalog = actualScenario
    ? [actualScenario, fullResultScenarios[1], ...newScenarios]
    : [];
  const scenarios = scenarioOrder.length
    ? scenarioOrder
        .map((scenarioId) =>
          scenarioCatalog.find((scenario) => scenario.id === scenarioId),
        )
        .filter(Boolean)
    : scenarioCatalog;

  const openScenarioModal = () => setIsScenarioModalOpen(true);

  const handleScenarioCreated = (scenario) => {
    setNewScenarios((currentScenarios) => [...currentScenarios, scenario]);
    setScenarioOrder((currentOrder) =>
      currentOrder.length ? [...currentOrder, scenario.id] : currentOrder,
    );
    setIsScenarioModalOpen(false);
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    setScenarioOrder(() => {
      const reordered = scenarios.map((scenario) => scenario.id);
      const [draggedScenario] = reordered.splice(draggedIndex, 1);
      reordered.splice(dropIndex, 0, draggedScenario);
      return reordered;
    });
    setDraggedIndex(null);
  };

  const handleMobileScroll = (event) => {
    const cardWidth = event.currentTarget.clientWidth;
    if (!cardWidth) return;

    setActiveScenarioIndex(
      Math.min(
        scenarios.length - 1,
        Math.max(0, Math.round(event.currentTarget.scrollLeft / cardWidth)),
      ),
    );
  };

  const goToMobileScenario = (index) => {
    const card = mobileCarouselRef.current?.children[index];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveScenarioIndex(index);
  };

  const handlePointerMove = (event) => {
    if (event.pointerType !== "touch" || draggedIndex === null) return;

    const target = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-scenario-index]");
    const dropIndex = Number(target?.dataset.scenarioIndex);

    if (!Number.isInteger(dropIndex) || dropIndex === draggedIndex) return;

    const reordered = scenarios.map((scenario) => scenario.id);
    const [draggedScenario] = reordered.splice(draggedIndex, 1);
    reordered.splice(dropIndex, 0, draggedScenario);
    setScenarioOrder(reordered);
    setDraggedIndex(dropIndex);
  };

  if (isLoading) return <Loader size="lg" />;

  if (error || !calculation) {
    return (
      <PageConainer>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-title text-3xl text-green-darker">
            {error || "No se encontró el resultado"}
          </h1>
          <Link
            to="/form"
            className="rounded-full bg-gold-dark px-5 py-3 font-semibold text-green-darker"
          >
            Volver a calcular
          </Link>
        </div>
      </PageConainer>
    );
  }

  const downloadLabel = isDownloading ? "Descargando..." : "Exportar PDF";

  return (
    <PageConainer>
      <main className="mx-auto w-full max-w-[896px] px-1 py-5 sm:px-5 sm:py-7">
        <p className="font-data text-[9px] uppercase tracking-[0.12em] text-gold-darkest">
          Comparación de escenarios
        </p>

        <div className="mt-3 flex items-end justify-between gap-6">
          <div>
            <h1 className="font-title text-[26px] font-bold leading-tight text-green-dark sm:text-[28px]">
              Compará tus escenarios lado a lado
            </h1>
            {!isMobile && (
              <p className="mt-2 max-w-[500px] text-[12px] leading-relaxed text-green-dark">
                Ajustá utilización, cooling o tamaño y mirá cómo se mueve la
                capacidad estancada entre capas, sin perder tu resultado base.
              </p>
            )}
          </div>
          {!isMobile && (
            <div className="flex shrink-0 gap-2">
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="rounded-full border border-green-light px-4 py-2 text-[10px] text-green-darker transition hover:-translate-y-0.5 hover:bg-green-lightest hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloadLabel}
              </button>
              <button
                onClick={openScenarioModal}
                className="rounded-full bg-green-darker px-4 py-2 text-[10px] text-white transition hover:-translate-y-0.5 hover:bg-green-dark hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0 active:scale-[.98]"
              >
                + Agregar escenario
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          <div className="mt-5 flex gap-1.5" aria-label="Escenarios disponibles">
            {scenarios.map((scenario, index) => (
              <button
                key={scenario.id}
                type="button"
                aria-label={`Ver ${scenario.name}`}
                aria-current={activeScenarioIndex === index}
                onClick={() => goToMobileScenario(index)}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark ${
                  activeScenarioIndex === index
                    ? "w-4 bg-green-dark"
                    : "w-1.5 bg-green-lightest hover:bg-green-light"
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-9 flex flex-wrap gap-2 font-data text-[10px]">
            <span className="rounded-full bg-green-dark px-4 py-2 text-white">
              Actual&nbsp; · &nbsp;{calculation.facility_size_mw} MW&nbsp; · &nbsp;
              {calculation.utilization_percentage}% util
            </span>
            <span className="rounded-full border border-green-lightest px-4 py-2 text-green-dark">
              Optimizado&nbsp; · &nbsp;40 MW&nbsp; · &nbsp;82% util
            </span>
            <span className="rounded-full border border-dashed border-green-light px-4 py-2 text-green-dark">
              {newScenarios.length > 0
                ? `${newScenarios.length} escenarios nuevos`
                : "+ Nuevo escenario"}
            </span>
          </div>
        )}

        {isMobile ? (
          <section
            ref={mobileCarouselRef}
            onScroll={handleMobileScroll}
            className="scenario-carousel mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain"
            aria-label="Carrusel de escenarios"
          >
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                optimized={scenario.name === "Optimizado"}
                className="min-w-full snap-start"
              />
            ))}
          </section>
        ) : (
          <section className="mt-5 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:flex-wrap">
            {scenarios.map((scenario, index) => (
              <ScenarioCard
                key={scenario.id}
                scenario={scenario}
                optimized={scenario.name === "Optimizado"}
                draggable
                scenarioIndex={index}
                onDragStart={() => setDraggedIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(index)}
                onDragEnd={() => setDraggedIndex(null)}
                onPointerDown={(event) => {
                  if (event.pointerType === "touch") setDraggedIndex(index);
                }}
                onPointerMove={handlePointerMove}
                onPointerUp={() => setDraggedIndex(null)}
              />
            ))}
            <button
              onClick={openScenarioModal}
              className="flex min-h-[268px] w-full shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-green-light bg-transparent text-[10px] text-green-darker transition hover:-translate-y-1 hover:bg-green-lightest/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:scale-[.98] sm:w-[134px]"
            >
              <span className="font-title text-2xl">+</span>
              <span>Agregar<br />escenario</span>
            </button>
          </section>
        )}
        {isMobile ? (
          <div className="mt-5 space-y-2">
            <button
              onClick={openScenarioModal}
              className="w-full rounded-full bg-green-dark px-4 py-3 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-darker hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0 active:scale-[.98]"
            >
              + Agregar escenario
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="w-full rounded-full border border-green-light px-4 py-3 text-[12px] text-green-darker transition hover:bg-green-lightest hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloadLabel}
            </button>
          </div>
        ) : (
          <div className="mt-9 flex items-center justify-between gap-4 rounded-2xl bg-green-darker px-5 py-4 text-white sm:px-6">
            <p className="font-title text-[14px] font-bold text-gold-dark">
              Mejor escenario: Optimizado — recomendado para mejorar la capacidad
              estancada.
            </p>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-white px-4 py-2 text-[10px] transition hover:-translate-y-0.5 hover:bg-white hover:text-green-darker hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:translate-y-0 active:scale-[.98]">
                Compartir con un colega
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="rounded-full bg-gold-dark px-4 py-2 text-[10px] text-green-darker transition hover:-translate-y-0.5 hover:bg-gold-darker hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark active:translate-y-0 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {downloadLabel}
              </button>
            </div>
          </div>
        )}
      </main>
      {isScenarioModalOpen && (
        <NewScenarioModal
          scenarioNumber={newScenarios.length + 1}
          onClose={() => setIsScenarioModalOpen(false)}
          onCreated={handleScenarioCreated}
        />
      )}
    </PageConainer>
  );
}
