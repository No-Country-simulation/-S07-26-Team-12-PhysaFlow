export default function CalculateButton({ label = "Calcular capacidad →" }) {
  return (
    <button type="submit" className="w-1/2 bg-green-dark rounded p-3 text-white text-center block">
      {label}
    </button>
  );
}