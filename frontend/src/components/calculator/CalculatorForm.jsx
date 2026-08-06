import RoundedButton from "../reusableComponents/RoundedButton";
import Spacing from "../spacing/Spacing";
import CalculatorInput from "./calculatorComponents/CalculatorInput";
import ErrorMsg from "./calculatorComponents/ErrorMsg";

 
export default function CalculatorForm() {
  return (
    <form className="flex flex-col gap-3 w-full max-w-md justify-center ">
      <h2 className="display-h2 px-3 py-2">Ingresá los datos de tu datacenter</h2>

      <Spacing size="xs" />
 
      <CalculatorInput
        label="Superficie del datacenter (m²)"
        name="superficie"
        placeholder="Ej. 22"
      />
 
      <div className="flex flex-col">
        <CalculatorInput
          label="Capacidad IT instalada (kW)"
          name="capacidadInstalada"
          hasError={true}
          placeholder="Ej. 22"
        />
        {/* Estado de error asociado a este campo, como en la captura */}
        <ErrorMsg visible={true} />
      </div>
 
      <CalculatorInput
        label="Capacidad IT en uso (kW)"
        name="capacidadEnUso"
      />
 
      <CalculatorInput
        label="PUE actual"
        name="pueActual"
      />

      <Spacing size="lg" />
      <div className="flex justify-center">
        <RoundedButton color="green" text="Calcular capacidad"/>
      </div>
      
    </form>
  );
}