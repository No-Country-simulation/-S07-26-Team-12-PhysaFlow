export default function CalculateButton({ label = "Calcular capacidad →" }) {
  return (
    <button type="submit" className="px-4 py-2 w-fit">
      {label}
    </button>
  );
}