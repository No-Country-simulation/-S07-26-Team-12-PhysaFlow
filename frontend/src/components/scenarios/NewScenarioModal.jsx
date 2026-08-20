import { useState } from "react";
import CalculatorInput from "../calculator/calculatorComponents/CalculatorInput";
import Loader from "../reusableComponents/Loader";
import { calculateCapacity, registerLead } from "../../services/calculatorService";
import { LEAD_EMAIL_STORAGE_KEY } from "../../constants/storage";
import { mapCalculationToScenario } from "./fullResultMapper";

const coolingOptions = [
  { label: "Air", value: ["air"] },
  { label: "Liquid", value: ["liquid"] },
  { label: "Immersion", value: ["immersion"] },
  { label: "Air + Liquid", value: ["air", "liquid"] },
];

export default function NewScenarioModal({ onClose, onCreated, scenarioNumber }) {
  const [size, setSize] = useState("");
  const [usage, setUsage] = useState("");
  const [cooling, setCooling] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (!size || Number(size) <= 0) {
      nextErrors.size = "Ingresá un tamaño mayor a 0";
    }
    if (usage === "" || Number(usage) < 0 || Number(usage) > 100) {
      nextErrors.usage = "Elegí una utilización entre 0 y 100%";
    }
    if (!cooling) {
      nextErrors.cooling = "Seleccioná un tipo de cooling";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate() || isLoading) return;

    const email = sessionStorage.getItem(LEAD_EMAIL_STORAGE_KEY);
    if (!email) {
      setApiError("No encontramos tu email de esta sesión. Volvé a desbloquear el análisis.");
      return;
    }

    try {
      setIsLoading(true);
      setApiError("");
      const selectedCooling = coolingOptions.find((option) => option.label === cooling);
      const result = await calculateCapacity({
        facility_size_mw: Number(size),
        utilization_percentage: Number(usage),
        cooling_type: selectedCooling.value,
      });

      await registerLead(email, result.data.id);
      const scenario = mapCalculationToScenario(result.data, {
        name: `Escenario ${scenarioNumber}`,
        badge: "NUEVO",
      });
      onCreated(scenario);
    } catch (error) {
      console.error("Error creating scenario:", error);
      setApiError("No pudimos crear el escenario. Intentá nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-green-darker/45 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-scenario-title"
    >
      <div className="max-h-[calc(100dvh-64px)] w-full max-w-[500px] overflow-y-auto rounded-[24px] bg-white px-5 py-6 shadow-2xl sm:px-8 sm:py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-data text-[9px] uppercase tracking-[0.12em] text-gold-darker">
              Nuevo escenario
            </p>
            <h2 id="new-scenario-title" className="mt-2 font-title text-2xl font-bold text-green-darker">
              Probá otra configuración
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Cerrar"
            className="rounded-full px-2 text-2xl leading-none text-green-dark transition hover:bg-green-lightest hover:text-green-darker focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:scale-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            &times;
          </button>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
          <CalculatorInput
            name="scenario_facility_size"
            label="TAMAÑO DEL FACILITY (MW)"
            type="number"
            value={size}
            onChange={(event) => setSize(event.target.value)}
            placeholder="Ej. 40 MW"
            hasError={Boolean(errors.size)}
            errorMessage={errors.size}
          />

          <div>
            <div className="flex justify-between">
              <label htmlFor="scenario_usage" className="data-small-green">
                UTILIZACIÓN APROXIMADA (%)
              </label>
              <span className="font-data text-xs text-green-darker">{usage || 0}%</span>
            </div>
            <input
              id="scenario_usage"
              className="utilization-slider mt-2"
              type="range"
              min="0"
              max="100"
              value={usage || 0}
              onChange={(event) => setUsage(event.target.value)}
              style={{
                background: `linear-gradient(to right,#1f5c45 ${usage || 0}%,#d8e2d8 ${usage || 0}%)`,
              }}
            />
            {errors.usage && <p className="data-small mt-2">{errors.usage}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="scenario_cooling" className="data-small-green">
              TIPO DE COOLING
            </label>
            <select
              id="scenario_cooling"
              value={cooling}
              onChange={(event) => setCooling(event.target.value)}
              className={`w-full rounded bg-page-background px-3 py-2 ${errors.cooling ? "border border-red-500" : ""}`}
            >
              <option value="">Seleccioná tipo de cooling</option>
              {coolingOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.cooling && <p className="data-small mt-2">{errors.cooling}</p>}
          </div>

          {apiError && <p className="text-sm text-red-600" role="alert">{apiError}</p>}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-full border border-green-light px-5 py-3 text-sm text-green-darker transition hover:bg-green-lightest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex min-h-12 items-center justify-center rounded-full bg-green-dark px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-green-darker hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark active:translate-y-0 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? <Loader size="sm" label="Creando escenario" /> : "Agregar escenario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
