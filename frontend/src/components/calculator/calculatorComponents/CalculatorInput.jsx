export default function CalculatorInput({
  label,
  name,
  type,
  placeholder,
  hasError,
  errorMessage,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col gap-1 w-full ">
      <label htmlFor={name} className="label-eyebrow">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 bg-gray-100 rounded border ${hasError ? "border-red-500" :"border-green-lightest"} `}
        // value, onChange, etc. se conectan más adelante
      />

      {/* Placeholder estático del estado de error individual del campo (opcional) */}
      {hasError && (
        <div className="w-full px-3 py-2 flex items-center gap-2">
          <span aria-hidden="true" className="data-small">
            ⚠
          </span>
          <p className="data-small">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
