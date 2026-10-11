/** Numeric parsing handles Latin and Bengali digits and thousands separators. */
const bnToEn = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };

export function toNumber(value) {
  if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
  if (typeof value !== "string") return NaN;
  const normalized = value.replace(/[০-৯]/g, (ch) => bnToEn[ch]).replace(/[,，\s৳%]/g, "");
  const number = Number(normalized);
  return normalized !== "" && Number.isFinite(number) ? number : NaN;
}

export function banglaNumber(value, digits = 0) {
  const num = toNumber(value);
  return Number.isFinite(num)
    ? new Intl.NumberFormat("bn-BD", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(num)
    : "—";
}

export function taka(value) {
  return `${banglaNumber(value)} টাকা`;
}

export function unitLabel(value) {
  const unit = String(value ?? "").trim();
  const known = {
    kg: "প্রতি কেজি", liter: "প্রতি লিটার", litre: "প্রতি লিটার",
    ltr: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস", pcs: "প্রতি পিস",
    কেজি: "প্রতি কেজি", লিটার: "প্রতি লিটার", ডজন: "প্রতি ডজন", পিস: "প্রতি পিস"
  };
  if (!unit) return "প্রতি একক";
  return unit.startsWith("প্রতি") ? unit : known[unit.toLowerCase()] || `প্রতি ${unit}`;
}

export function changeInfo(product) {
  const change = product?.change ?? {};
  const raw = toNumber(change.pct);
  const percentage = Number.isFinite(raw)
    ? Math.abs(raw)
    : percentageFromPrices(product?.today, product?.yesterday);
  const dir = change.dir === "up" || change.dir === "down" || change.dir === "flat"
    ? change.dir
    : directionFromPrices(product?.today, product?.yesterday);
  return { dir, pct: percentage };
}

function directionFromPrices(today, yesterday) {
  const t = toNumber(today);
  const y = toNumber(yesterday);
  if (!Number.isFinite(t) || !Number.isFinite(y)) return "flat";
  return t > y ? "up" : t < y ? "down" : "flat";
}
function percentageFromPrices(today, yesterday) {
  const t = toNumber(today);
  const y = toNumber(yesterday);
  return Number.isFinite(t) && Number.isFinite(y) && y !== 0 ? Math.abs(((t - y) / y) * 100) : 0;
}

export function sortedProducts(products, sort = "default") {
  const copy = [...products];
  if (sort === "asc" || sort === "desc") {
    copy.sort((a, b) => {
      const aPrice = toNumber(a.today);
      const bPrice = toNumber(b.today);
      const av = Number.isFinite(aPrice) ? aPrice : Infinity;
      const bv = Number.isFinite(bPrice) ? bPrice : Infinity;
      // Keep missing prices last for either order.
      if (!Number.isFinite(aPrice)) return Number.isFinite(bPrice) ? 1 : 0;
      if (!Number.isFinite(bPrice)) return -1;
      return sort === "asc" ? av - bv : bv - av;
    });
  }
  return copy;
}

export function productPath(product) {
  return `/product/${encodeURIComponent(product.slug || String(product.id))}`;
}

export function marketSummary(product) {
  const markets = Array.isArray(product.markets) ? product.markets : [];
  const available = markets.map((m) => ({ min: toNumber(m.min), max: toNumber(m.max) }))
    .filter((m) => Number.isFinite(m.min) && Number.isFinite(m.max));
  if (!available.length) return { min: NaN, max: NaN, average: toNumber(product.today) };
  return {
    min: Math.min(...available.map((m) => m.min)),
    max: Math.max(...available.map((m) => m.max)),
    average: available.reduce((total, m) => total + (m.min + m.max) / 2, 0) / available.length,
  };
}
