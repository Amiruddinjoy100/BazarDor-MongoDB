import Link from "next/link";
import ChangeBadge from "@/components/ChangeBadge";
import { taka, unitLabel, productPath } from "@/lib/format";

export default function ProductCard({ product }) {
  return <Link href={productPath(product)} className="product-card" aria-label={`${product.nameBn} এর বিস্তারিত দাম দেখুন`}>
    <div className="product-image" aria-hidden="true">{product.image || product.categoryIcon || "🛒"}</div>
    <h3 className="product-name">{product.nameBn || "পণ্য"}</h3>
    <p className="product-unit">{unitLabel(product.unit)}</p>
    <div className="product-bottom">
      <div><div className="product-price-label">আজকের দাম</div><div className="product-price">{taka(product.today)}</div></div>
      <ChangeBadge product={product}/>
    </div>
  </Link>;
}
