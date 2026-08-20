import PageConainer from "../components/PageContainer";
import { screenSize } from "../components/hooks/screenSize";
import ScenarioCard from "../components/scenarios/ScenarioCard";
import { fullResultScenarios } from "../data/fullResultMock";

export default function FullResult() {
  const { isMobile } = screenSize();

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
              <button className="rounded-full border border-green-light px-4 py-2 text-[10px] text-green-darker">
                Exportar PDF
              </button>
              <button className="rounded-full bg-green-darker px-4 py-2 text-[10px] text-white">
                + Agregar escenario
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          <div className="mt-5 flex gap-1.5" aria-label="Escenarios disponibles">
            <span className="h-1.5 w-4 rounded-full bg-green-dark" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-lightest" />
            <span className="h-1.5 w-1.5 rounded-full bg-green-lightest" />
          </div>
        ) : (
          <div className="mt-9 flex flex-wrap gap-2 font-data text-[10px]">
            <span className="rounded-full bg-green-dark px-4 py-2 text-white">
              Actual&nbsp; · &nbsp;40 MW&nbsp; · &nbsp;68% util
            </span>
            <span className="rounded-full border border-green-lightest px-4 py-2 text-green-dark">
              Optimizado&nbsp; · &nbsp;40 MW&nbsp; · &nbsp;82% util
            </span>
            <span className="rounded-full border border-dashed border-green-light px-4 py-2 text-green-dark">
              + Nuevo escenario
            </span>
          </div>
        )}

        <section className="mt-5 flex flex-col gap-4 sm:mt-9 sm:flex-row">
          <ScenarioCard scenario={fullResultScenarios[0]} />
          {!isMobile && (
            <ScenarioCard scenario={fullResultScenarios[1]} optimized />
          )}
          {!isMobile && (
            <button className="flex min-h-[268px] w-full shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-green-light bg-transparent text-[10px] text-green-darker sm:w-[134px]">
              <span className="font-title text-2xl">+</span>
              <span>Agregar<br />escenario</span>
            </button>
          )}
        </section>

        {isMobile ? (
          <div className="mt-5 space-y-2">
            <button className="w-full rounded-full bg-green-dark px-4 py-3 text-[12px] font-semibold text-white">
              + Agregar escenario
            </button>
            <button className="w-full rounded-full border border-green-light px-4 py-3 text-[12px] text-green-darker">
              Exportar PDF
            </button>
          </div>
        ) : (
          <div className="mt-9 flex items-center justify-between gap-4 rounded-2xl bg-green-darker px-5 py-4 text-white sm:px-6">
            <p className="font-title text-[14px] font-bold text-gold-dark">
              Mejor escenario: Optimizado — ahorra ~$1.1M/año y recupera 12 pts de
              capacidad estancada.
            </p>
            <div className="flex shrink-0 gap-2">
              <button className="rounded-full border border-white px-4 py-2 text-[10px]">
                Compartir con un colega
              </button>
              <button className="rounded-full bg-gold-dark px-4 py-2 text-[10px] text-green-darker">
                Descargar comparación (PDF)
              </button>
            </div>
          </div>
        )}
      </main>
    </PageConainer>
  );
}
