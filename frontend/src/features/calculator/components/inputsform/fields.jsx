export default function Fields({
  label,
  name,
  type = "number",
  placeholder = "",
  hasError = false,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="label-eyebrow">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 py-2 bg-gray-100 rounded"
        // value, onChange, etc. se conectan más adelante
      />

      {/* Placeholder estático del estado de error individual del campo (opcional) */}
      {hasError && (
        <span className="data-small">Campo obligatorio faltante</span>
      )}
    </div>
  );
}