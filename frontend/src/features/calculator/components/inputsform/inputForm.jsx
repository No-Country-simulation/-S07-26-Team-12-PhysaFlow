
import Fields from "./Fields";
import ErrorMessage from "./ErrorMessage";
import CalculateButton from "./CalculateButton";
 
export default function InputForm() {
  return (
    <form className="flex flex-col gap-3 w-full max-w-md">
      <h2 className="display-h2 px-3 py-2">Ingresá los datos de tu datacenter</h2>
 
      <Fields
        label="Superficie del datacenter (m²)"
        name="superficie"
      />
 
      <div className="flex flex-col">
        <Fields
          label="Capacidad IT instalada (kW)"
          name="capacidadInstalada"
          hasError={true}
        />
        {/* Estado de error asociado a este campo, como en la captura */}
        <ErrorMessage visible={true} />
      </div>
 
      <Fields
        label="Capacidad IT en uso (kW)"
        name="capacidadEnUso"
      />
 
      <Fields
        label="PUE actual"
        name="pueActual"
      />
 
      <CalculateButton />
    </form>
  );
}