import Link from "next/link";
import { banglaNumber, changeInfo, productPath } from "@/lib/format";
export default function PriceTicker({ products }) {
  if (!products.length) return null;
  const items = products.slice(0, 30);
  return <div className="ticker" aria-label="সর্বশেষ বাজার দরের স্ক্রলিং তালিকা">
    <div className="ticker-track">
      {[0,1].map((copy) => <div key={copy} className="flex shrink-0" aria-hidden={copy === 1 ? "true" : undefined}>
        {items.map((p) => {
          const c = changeInfo(p);
          return <Link key={`${copy}-${p.id ?? p.slug}`} className="ticker-item" href={productPath(p)} tabIndex={copy === 1 ? -1 : undefined}>
            <span>{p.image || p.categoryIcon || "🛒"}</span> <span>{p.nameBn}</span>
            <span className="text-[#e6fbd5]">{banglaNumber(p.today)} টাকা</span>
            <span className={c.dir === "down" ? "text-[#ffb1a5]" : "text-[#b6f5c2]"}>{c.dir === "up" ? "▲" : c.dir === "down" ? "▼" : "—"}{banglaNumber(c.pct, 1)}%</span>
          </Link>;
        })}
      </div>)}
    </div>
  </div>;
}
