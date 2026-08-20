import Layer from "./LayerScenario";
import "./capacity.css";
import Loss from "./Loss";
import Spacing from "../spacing/Spacing";

const SVG_WIDTH = 500;
const GAP = 80;
const PADDING_TOP = 30;
const MAX_BAR_WIDTH = 300;

export default function CapacityGraph({ layers }) {
  if (!layers?.length) return null;

  const maxValue = Math.max(...layers.map((layer) => layer.value));

  const height = PADDING_TOP + GAP * layers.length;

  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${height}`}
      className="capacity-flow"
      preserveAspectRatio="xMidYMin meet"
    >
      {layers.map((layer, index) => {
        const nextLayer = layers[index + 1];
        return(
            <g>
        <Layer
          key={layer.id}
          y={PADDING_TOP + index * GAP}
          maxValue={maxValue}
          maxBarWidth={MAX_BAR_WIDTH}
          {...layer}
        />
            {
                nextLayer && 
                <Loss
                    from={layer.value}
                    to={nextLayer.value}
                    y={65 + index * GAP}
                />
            }
            </g>
        )

})}
    </svg>
  );
}