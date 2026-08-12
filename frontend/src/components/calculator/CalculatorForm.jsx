import { useState } from "react";
import RoundedButton from "../reusableComponents/RoundedButton";
import Spacing from "../spacing/Spacing";
import CalculatorInput from "./calculatorComponents/CalculatorInput";
import { calculateCapacity } from "../../services/calculatorService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      navigate("/result", {state: resultRes})
      console.log("form info", resultRes)
    } catch (error) {
      console.log("error:", error);
      setApiError("No pudimos calcular la capacidad. Intenta nuevamente.");
    } finally {
      setLoading(false);
      setSize("");
      setUsage("");
      setCoolingOption("");
     
    }

   
  
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-md justify-center ">
      <h2 className="display-h2 px-3 py-2">
        Ingresá los datos de tu datacenter
      </h2>
      <Spacing size="xs" />
      <form onSubmit={handleSubmit}>
        <CalculatorInput
          name="facility_size_mw"
          label="Tamaño del Facility (MW)"
          type="number"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="Ej. 22 MW"
          hasError={Boolean(errors.size)}
          errorMessage={errors.size}
        />
        <Spacing size="xs" />
        <CalculatorInput
          name="utilization_percentage"
          label="Utilizacion aproximada (%)"
          type="number"
          min="0"
          max="100"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          placeholder="Ej. 60%"
          hasError={Boolean(errors.usage)}
          errorMessage={errors.usage}
        />

        <div className="flex flex-col gap-1 w-full ">
          <label className="label-eyebrow">Elegí el tipo de cooling:</label>
          <select
            name="cooling_type"
            className={`w-full px-3 py-2 bg-gray-100 rounded border ${
              errors.cooling ? "border-red-500" : "border-green-lightest"
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
            <span className="data-small text-red-500">{errors.cooling}</span>
          )}
        </div>

        <Spacing size="lg" />
        <div className="flex justify-center">
          <RoundedButton
            color="green"
            text="Calcular capacidad"
            type="submit"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}
