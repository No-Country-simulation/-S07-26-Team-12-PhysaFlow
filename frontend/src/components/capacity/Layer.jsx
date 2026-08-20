export default function Layer({
  cx,
  y,
  height,
  label,
  value,
  maxValue,
  color,
  maxBarWidth,
  inactive
}) {
  const width = (value / maxValue) * maxBarWidth;
  const x = cx - width / 2;
  const percent = Math.round((value / maxValue) * 100);
  const midY = y + height / 2;

  const rectColor = label === "Facility" ? "#6FA98A" : label === "IT" ? "#2E6B4C" :  label === "Workload" ? "#1B4632" : color;
  const textMw = (
    label === "Facility" ? "MW instalados" :
    label === "IT" ? "MW útiles post-overhead" :  
    label === "Workload" ? "MW aprovechados por cargas activas" : "")
  return (
    <g
      opacity={inactive ? 0.4 : 1}
      style={{
        transition: "opacity .25s ease"
      }}
    >
      {/* Etiqueta de la capa, arriba a la izquierda de la barra */}
      <text x={x} y={y - 10} className="layer-label">
        {label.toUpperCase()}
      </text>

      {/* Barra */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        className="layer-bar"
        fill={rectColor}
      />

      {/* Porcentaje y detalle, dentro de la barra */}
      <text
        x={cx}
        y={midY}
        textAnchor="end"
        dominantBaseline="middle"
        className="layer-percent"
      >
        {percent}% 
      </text>
     
        <text
          x={cx -80}
          y={midY +10}
          dominantBaseline="middle"
          className="layer-note"
        >
          {value } {textMw}
        </text>
      
    </g>
  );
}
