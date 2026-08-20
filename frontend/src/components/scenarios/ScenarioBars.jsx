const layerLabels = ["Facility", "IT", "Workload"];

export default function ScenarioBars({ values }) {
  return (
    <div className="mt-4">
      <p className="mb-2 font-data text-[8px] uppercase text-green-dark">
        Dónde se pierde · Facility → IT → Workload
      </p>
      <div className="space-y-1">
        {values.map((value, index) => (
          <div className="flex items-center gap-1.5" key={layerLabels[index]}>
            <div className="h-3 flex-1 overflow-hidden rounded bg-green-lightest">
              <div
                className={`h-full rounded ${
                  index === 0
                    ? "bg-green-light"
                    : index === 1
                      ? "bg-green-dark"
                      : "bg-green-darker"
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="w-7 font-data text-[9px] text-green-darker">
              {value}%
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between pr-7 font-data text-[7px] text-green-dark">
        {layerLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
