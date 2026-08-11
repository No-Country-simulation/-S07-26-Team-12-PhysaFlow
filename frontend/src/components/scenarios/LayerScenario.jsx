const BAR_HEIGHT = 24;

export default function Layer({
  x = 24,
  y,
  label,
  value,
  maxValue,
  color,
  maxBarWidth,
 
}) {
  const width = (value / maxValue) * maxBarWidth;

  return (
    <g

    >
      {/* Label */}
      <text
        x={x}
        y={y}
        className="layer-label"
      >
        {label}
      </text>

      {/* Barra */}
      <rect
        x={x}
        y={y + 10}
        width={width}
        height={BAR_HEIGHT}
        rx={BAR_HEIGHT / 2}
        className="layer-bar"
        fill={color}
      />

      {/* Valor */}
      <text
        x={x + width + 12}
        y={y + 28}
        className="layer-value"
      >
        {value} MW
      </text>
    </g>
  );
}