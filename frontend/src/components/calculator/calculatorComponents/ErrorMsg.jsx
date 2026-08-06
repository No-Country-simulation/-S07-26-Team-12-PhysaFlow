export default function ErrorMsg({
  visible = true,
  message = "Estado: campo obligatorio faltante",
}) {
  if (!visible) return null;
 
  return (
    <div className="w-full px-3 py-2 flex items-center gap-2">
      <span aria-hidden="true" className="data-small">⚠</span>
      <p className="data-small">{message}</p>
    </div>
  );
}