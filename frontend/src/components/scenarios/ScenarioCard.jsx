import ScenarioBars from "./ScenarioBars";

export default function ScenarioCard({ scenario, optimized = false }) {
  return (
    <article
      className={`flex min-h-[268px] flex-1 flex-col rounded-2xl border bg-white p-5 sm:p-6 ${
        optimized ? "border-gold-dark" : "border-green-lightest"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-title text-[22px] font-bold leading-none text-green-darker">
            {scenario.name}
          </h2>
          <p className="mt-1 text-[11px] text-green-dark">{scenario.details}</p>
        </div>
        <span className="shrink-0 rounded-full bg-green-lightest px-2 py-1 font-data text-[9px] text-green-darker">
          {scenario.badge}
        </span>
      </div>

      <div className="my-4 border-t border-green-lightest" />

      <div className="grid grid-cols-[1fr_1.35fr] gap-3">
        <div>
          <p className="font-data text-[8px] uppercase text-green-dark">
            Capacidad estancada
          </p>
          <p className="mt-1 font-data text-[25px] font-semibold leading-none text-green-darker">
            {scenario.stranded}
          </p>
          <p className="mt-2 font-data text-[9px] text-green-dark">
            {scenario.strandedMw}
          </p>
        </div>
        <div>
          <p className="font-data text-[8px] uppercase text-green-dark">
            Pérdida anual est.
          </p>
          <p className="mt-1 whitespace-nowrap font-data text-[23px] font-semibold leading-none text-green-darker sm:text-[25px]">
            {scenario.loss}
          </p>
          <p className="mt-2 font-data text-[9px] text-green-dark">
            rango estimado
          </p>
        </div>
      </div>

      <ScenarioBars values={scenario.bars} />
    </article>
  );
}
