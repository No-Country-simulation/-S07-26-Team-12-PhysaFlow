const CARD_WIDTH = 100;
const LINE_HEIGHT = 15;

/**
 * Trapecio que conecta la barra de arriba (ancho topWidth) con la de
 * abajo (ancho bottomWidth), mas la tarjeta amarilla con la perdida.
 */
export default function Loss({
  cx,
  topY,
  bottomY,
  topWidth,
  bottomWidth,
  from,
  to,
  reason,
  fill = "#CFE0D3",
}) {
  const lost = from - to;

  const topLeft = cx - topWidth / 2;
  const topRight = cx + topWidth / 2;
  const bottomLeft = cx - bottomWidth / 2;
  const bottomRight = cx + bottomWidth / 2;

  // Punto del borde derecho del trapecio donde se ancla la tarjeta
  const t = 0.55;
  const anchorX = topRight + (bottomRight - topRight) * t;
  const anchorY = topY + (bottomY - topY) * t;

  const lines = wrap(reason, 32);
  const cardHeight = 34 + lines.length * LINE_HEIGHT;
  const cardY = anchorY - cardHeight / 2;

  return (
    <>
      <polygon
        points={`${topLeft},${topY} ${topRight},${topY} ${bottomRight},${bottomY} ${bottomLeft},${bottomY}`}
        fill={fill}
      />

      <g transform={`translate(${anchorX - 50}, ${cardY})`}>
        <rect
          width={CARD_WIDTH}
          height={cardHeight}
          rx={8}
          fill="#EFD9A0"
          className="rect-border"
        />
        <text x={14} y={22} className="loss-value">
          −{lost} MW
        </text>
        {lines.map((line, i) => (
          <text
            key={i}
            x={14}
            y={38 + i * LINE_HEIGHT}
            className="loss-reason"
          >
            {line}
          </text>
        ))}
      </g>
    </>
  );
}

function wrap(text = "", max) {
  const out = [];
  let current = "";
  for (const word of text.split(" ")) {
    if ((current + " " + word).trim().length > max) {
      out.push(current);
      current = word;
    } else {
      current = (current + " " + word).trim();
    }
  }
  if (current) out.push(current);
  return out;
}
