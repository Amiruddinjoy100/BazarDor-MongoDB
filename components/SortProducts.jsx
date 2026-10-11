"use client";
import { useMemo, useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { sortedProducts, banglaNumber } from "@/lib/format";
export default function SortProducts({ products }) {
  const [sort, setSort] = useState('default');
  const sorted = useMemo(() => sortedProducts(products, sort), [products, sort]);
  return <>
    <div className="section-heading mb-5">
      <p className="section-subtitle">মোট {banglaNumber(products.length)}টি পণ্য পাওয়া গেছে</p>
      <div className="flex items-center gap-2"><label htmlFor="product-sort" className="text-sm font-bold">সাজান:</label>
        <select id="product-sort" value={sort} onChange={e => setSort(e.target.value)} className="select-control">
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
    </div>
    <ProductGrid products={sorted}/>
  </>;
}
