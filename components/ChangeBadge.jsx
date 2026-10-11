import { banglaNumber, changeInfo } from "@/lib/format";
export default function ChangeBadge({ product }) {
  const { dir, pct } = changeInfo(product);
  const className = dir === "up" ? "change-up" : dir === "down" ? "change-down" : "change-flat";
  const symbol = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  return <span className={`change-badge ${className}`} aria-label={`দাম ${dir === 'up' ? 'বেড়েছে' : dir === 'down' ? 'কমেছে' : 'অপরিবর্তিত'}`}>
    {symbol} {banglaNumber(pct, 1)}%
  </span>;
}
