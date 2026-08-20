import { useState } from "react";
import RectangleButton from "../reusableComponents/RectangleButton";
import Spacing from "../spacing/Spacing";
import CalculatorInput from "./calculatorComponents/CalculatorInput";
import { calculateCapacity } from "../../services/calculatorService";
import { useNavigate } from "react-router-dom";
import Loader from "../reusableComponents/Loader";

const coolingOpt = [
  { name: "Air", value: ["air"] },
  { name: "Liquid", value: ["liquid"] },
  { name: "Immersion", value: ["immersion"] },
  { name: "Air + Liquid", value: ["air", "liquid"] },
  { name: "Air + Immersion", value: ["air", "immersion"] },
  { name: "Liquid + Immersion", value: ["liquid", "immersion"] },
  { name: "Air + Liquid + Immersion", value: ["air", "liquid", "immersion"] },
];

export default function CalculatorForm() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState("");
  const [usage, setUsage] = useState("");
  const [coolingOption, setCoolingOption] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (size === "") {
      newErrors.size = "El tamaño del facility es obligatorio";
    } else if (Number(size) <= 0) {
      newErrors.size = "El tamaño debe ser mayor a 0";
    }

    if (usage === "") {
      newErrors.usage = "La utilización es obligatoria";
    } else if (Number(usage) < 0 || Number(usage) > 100) {
      newErrors.usage = "La utilización debe estar entre 0 y 100";
    }

    if (coolingOption === "") {
      newErrors.cooling = "Selecciona un tipo de cooling";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    const selectedCooling = coolingOpt.find(
      (item) => item.name === coolingOption,
    );

    const data = {
      facility_size_mw: Number(size),
      utilization_percentage: Number(usage),
      cooling_type: selectedCooling?.value,
    };

    try {
      setLoading(true);
      setApiError("");
      const resultRes = await calculateCapacity(data);
      navigate(`/result/${resultRes.data.id}`, { state: resultRes });
      setSize("");
      setUsage("");
      setCoolingOption("");
    } catch (error) {
      console.log("error:", error);
      setApiError("No pudimos calcular la capacidad. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-xl flex-col justify-center rounded-2xl border border-green-lightest bg-white p-4 sm:p-6">
      {loading ? <Loader/> : 
      <>
      <Spacing size="xs" />
      <form onSubmit={handleSubmit}>
        <CalculatorInput
          name="facility_size_mw"
          label="TAMAÑO DEL FACILITY (MW)"
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Ej. 22 MW"
          hasError={Boolean(errors.size)}
          errorMessage={errors.size}
        />
        <Spacing size="lg" />
        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="utilization_percentage" className="data-small-green">
              UTILIZACION APROXIMADA (%)
            </label>
            <div className="flex items-center gap-1">
              <input
                id="utilization_percentage"
                name="utilization_percentage_number"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={usage}
                onChange={(e) => setUsage(e.target.value)}
                placeholder="0"
                aria-label="Utilización aproximada en porcentaje"
                className="w-14 border-b border-green-light bg-transparent text-right font-data text-sm text-green-darker outline-none transition focus:border-green-dark"
              />
              <span className="font-data text-sm text-green-darker">%</span>
            </div>
          </div>

          <input
            name="utilization_percentage"
            className="utilization-slider"
            type="range"
            min="0"
            max="100"
            value={usage === "" ? 0 : usage}
            onChange={(e) => setUsage(e.target.value)}
            style={{
              background: `linear-gradient(to right,#1f5c45 ${usage || 0}%,#d8e2d8 ${usage || 0}%)`,
            }}
          />
          {errors.usage && (
            <div className="w-full px-3 py-2 flex items-center gap-2">
              <span aria-hidden="true" className="data-small">
                ⚠
              </span>
              <p className="data-small">La utilización es obligatoria</p>
            </div>
          )}
        </div>
        <Spacing size="lg" />
        <div className="flex flex-col gap-1 w-full ">
          <label className="data-small-green">TIPO DE COOLING:</label>
          <select
            name="cooling_type"
            className={`w-full px-3 py-2 bg-page-background rounded  ${
              errors.cooling ? "border border-red-500" : ""
            }`}
            value={coolingOption}
            onChange={(e) => {
              setCoolingOption(e.target.value);
            }}
          >
            <option value="">Selecciona tipo de cooling</option>
            {coolingOpt.map((item) => {
              return (
                <option key={item.name} value={item.name}>
                  {item.name}{" "}
                </option>
              );
            })}
          </select>
          {errors.cooling && (
            <div className="w-full px-3 py-2 flex items-center gap-2">
              <span aria-hidden="true" className="data-small">
                ⚠
              </span>
              <span className="data-small text-data-small">
                {errors.cooling}
              </span>
            </div>
          )}
        </div>

        {apiError && (
          <p className="mt-4 text-center text-sm text-red-600" role="alert">
            {apiError}
          </p>
        )}

        <Spacing size="lg" />
        <div className="flex justify-center">
          <RectangleButton
            color="gold"
            text="Calcular mi capacidad estancada →"
            type="submit"
            className="w-full max-w-none sm:max-w-xs"
          />
        </div>
      </form>
      </>
      }
      
    </div>
  );
}
