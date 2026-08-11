import Layer from "./Layer";
import Loss from "./Loss";
import "./capacity.css";
import { useState } from "react";

const SVG_WIDTH = 1100;
const CENTER_X = SVG_WIDTH/2;
const MAX_BAR_WIDTH = 780;
const BAR_HEIGHT = 50;
const FUNNEL_GAP = 100; // alto del trapecio entre dos barras
const PADDING_TOP = 40;

export default function CapacityFlow({ layers }) {

const [activeIndex, setActiveIndex] = useState(null);
const [selectedLoss, setSelectedLoss] = useState(null);

  if (!layers?.length) return null;

  const maxValue = Math.max(...layers.map((l) => l.value));
  const widthOf = (v) => (v / maxValue) * MAX_BAR_WIDTH;

 
  const barY = (i) => PADDING_TOP + i * (BAR_HEIGHT + FUNNEL_GAP);
  const height = barY(layers.length - 1) + BAR_HEIGHT + PADDING_TOP;
  

  return (
    
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${height}`}
      className="capacity-flow"
      preserveAspectRatio="xMidYMin meet"
      width="100%"
    >
     
      {layers.slice(0, -1).map((layer, i) => {
          const inactive = activeIndex !== null && activeIndex !== i;

        const next = layers[i + 1];
        return (
        <g
        key={`loss-${layer.id}`}
        style={{animationDelay:`${i*200+200}ms`}}
        onMouseEnter={() => setActiveIndex(i)}
        onMouseLeave={() => setActiveIndex(null)}
        opacity={inactive ? 0.4 : 1}
      >
          <Loss
            cx={CENTER_X}
            topY={barY(i) + BAR_HEIGHT}
            bottomY={barY(i + 1)}
            topWidth={widthOf(layer.value)}
            bottomWidth={widthOf(next.value)}
            from={layer.value}
            to={next.value}
            reason={next.lossReason}
          />
          </g>
        );
      })}

      {layers.map((layer, i) =>{ 
        const inactive = activeIndex !== null && activeIndex !== i;
        return( 
        
        <g
        key={layer.id}
        className="layer-group"
        style={{animationDelay:`${i*200}ms`}}
        onMouseEnter={()=>setActiveIndex(i)}
        onMouseLeave={()=>setActiveIndex(null)}
        opacity={inactive?0.4:1}
        >

        <Layer
        inactive={inactive}
          cx={CENTER_X}
          y={barY(i)}
          height={BAR_HEIGHT}
          maxValue={maxValue}
          maxBarWidth={MAX_BAR_WIDTH}
          {...layer}
        />
        
         </g>
      )})}
    
    </svg>
    
  );
}
