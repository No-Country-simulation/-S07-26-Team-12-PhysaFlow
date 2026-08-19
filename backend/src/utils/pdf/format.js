export function formatCurrency(value) {
  if (value == null) return "—";
  return `$${Number(value).toLocaleString("en-US")}`;
}

export function formatCurrencyShort(value) {
  if (value == null) return "—";
  const num = Number(value);
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(1)}K`;
  return `$${num.toFixed(0)}`;
}

export function formatMW(value) {
  if (value == null) return "—";
  return `${Number(value).toFixed(2)} MW`;
}

export function formatPercent(value) {
  if (value == null) return "—";
  return `${Number(value).toFixed(2)}%`;
}

export function formatDate(date) {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(date) {
  if (!date) return "—";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatId(id) {
  if (!id) return "—";
  return String(id).slice(0, 8);
}

export function calcUsedCapacityMW(facility, utilization) {
  const used = (Number(facility) * Number(utilization)) / 100;
  return Number(used.toFixed(2));
}

export function calcStrandedMW(facility, strandedPercent) {
  const stranded = (Number(facility) * Number(strandedPercent)) / 100;
  return Number(stranded.toFixed(2));
}

export function calcChange(a, b) {
  return Number((Number(a) - Number(b)).toFixed(2));
}

export function calcChangePercent(a, b) {
  if (Number(b) === 0) return "N/A";
  const pct = ((Number(a) - Number(b)) / Number(b)) * 100;
  return `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
}
