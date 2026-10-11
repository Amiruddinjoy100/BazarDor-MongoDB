import { ArrowDown, ArrowUp, Box, ChartNoAxesCombined, ShoppingBasket } from "lucide-react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import DataUnavailable from "@/components/DataUnavailable";
import { getProducts, getCategories } from "@/lib/api";
import { banglaNumber, changeInfo } from "@/lib/format";

function Section({ icon, eyebrow, title, subtitle, products, children }) {
  return <section className="section">
    <div className="section-heading">
      <div><div className="section-eyebrow">{eyebrow}</div>
        <h2 className="section-title flex items-center gap-2">{icon}{title}</h2>
        <p className="section-subtitle">{subtitle}</p></div>
      {children}
    </div>
    {products.length ? <ProductGrid products={products}/> : <p className="paper text-[#748779]">এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।</p>}
  </section>;
}

export default async function HomePage() {
  let products, categories;
  try { [products, categories] = await Promise.all([getProducts(), getCategories()]); }
  catch { return <><Hero/><DataUnavailable/></>; }
  const risers = products.filter(p => changeInfo(p).dir === 'up').sort((a,b) => changeInfo(b).pct - changeInfo(a).pct).slice(0,6);
  const fallers = products.filter(p => changeInfo(p).dir === 'down').sort((a,b) => changeInfo(b).pct - changeInfo(a).pct).slice(0,6);
  return <>
    <Hero/>
    <div className="stats-strip">
      <div className="stat-card"><div className="stat-icon"><ShoppingBasket size={23}/></div><div><div className="stat-value">{banglaNumber(products.length)}+</div><div className="stat-label">নিত্যপ্রয়োজনীয় পণ্য</div></div></div>
      <div className="stat-card"><div className="stat-icon"><Box size={23}/></div><div><div className="stat-value">{banglaNumber(categories.length)}</div><div className="stat-label">পণ্যের বিভাগ</div></div></div>
      <div className="stat-card"><div className="stat-icon"><ChartNoAxesCombined size={23}/></div><div><div className="stat-value">{banglaNumber(risers.length + fallers.length)}</div><div className="stat-label">দাম পরিবর্তিত পণ্যের ঝলক</div></div></div>
    </div>
    <Section icon={<ArrowUp className="text-[#198553]"/>} eyebrow="আজকের বাজারের খবর" title="আজ দাম বেড়েছে ▲" subtitle="আজ সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের" products={risers}/>
    <Section icon={<ArrowDown className="text-[#be4c40]"/>} eyebrow="আজকের বাজারের খবর" title="আজ দাম কমেছে ▼" subtitle="আজ সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের" products={fallers}/>
    <div id="সব-পণ্য">
      <Section icon={<ShoppingBasket className="text-[#176d43]"/>} eyebrow="এক নজরে সব দর" title="সব পণ্য" subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের সর্বশেষ দাম এক জায়গায়" products={products}/>
    </div>
  </>;
}
