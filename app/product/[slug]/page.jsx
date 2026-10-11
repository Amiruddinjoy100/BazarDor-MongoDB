import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ChartNoAxesCombined, MapPin, TrendingDown, TrendingUp } from "lucide-react";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { banglaNumber, marketSummary, taka, toNumber, unitLabel } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";
import MarketTable from "@/components/MarketTable";
import DataUnavailable from "@/components/DataUnavailable";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try { const product = await getProduct(slug); return { title: product?.nameBn || 'পণ্য পাওয়া যায়নি' }; }
  catch { return { title: 'পণ্যের বিস্তারিত' }; }
}

function Metric({ label, value, icon, featured = false }) {
  return <div className={`price-box ${featured ? 'highlight' : ''}`}>
    <div className="flex items-center justify-between gap-2"><div className="caption">{label}</div><span className="text-[#378b5e]">{icon}</span></div>
    <div className="number">{taka(value)}</div>
  </div>;
}
export default async function ProductPage({ params }) {
  const { slug } = await params;
  let product;
  try { product = await getProduct(slug); } catch { return <DataUnavailable/>; }
  if (!product) notFound();

  // Server-side authorization: direct URL navigation and reload are protected too.
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect(`/signin?reason=protected&callbackUrl=${encodeURIComponent(`/product/${slug}`)}`);

  const summary = marketSummary(product);
  const history = [
    { label: 'গতকালের দাম', value: product.yesterday },
    { label: 'গত সপ্তাহে', value: product.lastWeek },
    { label: 'গত মাসে', value: product.lastMonth },
  ].filter(h => Number.isFinite(toNumber(h.value)));
  const markets = Array.isArray(product.markets) ? product.markets : [];

  return <div className="pb-12">
    <div className="page-heading">
      <nav className="crumbs"><Link href="/">হোম</Link><span>›</span><Link href={`/category/${encodeURIComponent(product.category)}`}>{product.categoryNameBn || 'বিভাগ'}</Link><span>›</span><span>{product.nameBn}</span></nav>
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#176d43] hover:underline"><ArrowLeft size={17}/> সব পণ্যে ফিরে যান</Link>
    </div>
    <section className="paper">
      <div className="detail-top">
        <div className="detail-emoji" aria-hidden="true">{product.image || product.categoryIcon || '🛒'}</div>
        <div className="flex-1"><div className="section-eyebrow">আজকের বাজারদর</div>
          <h1 className="detail-title">{product.nameBn}</h1>
          <p className="section-subtitle">বাংলাদেশের বিভিন্ন বাজারে {product.nameBn} এর বর্তমান মূল্য ও দামের তুলনা।</p>
          <div><Link href={`/category/${encodeURIComponent(product.category)}`} className="detail-tag">{product.categoryIcon || '🛒'} {product.categoryNameBn || product.category}</Link><span className="detail-tag">⚖️ {unitLabel(product.unit)}</span></div>
        </div>
        <div className="rounded-xl bg-[#f1f8f2] px-5 py-4 min-w-[180px]"><p className="text-[#697e6d] text-xs mb-1">আজকের গড় বাজারদর</p>
          <div className="font-black text-2xl text-[#176d43]">{taka(product.today)}</div>
          <div className="mt-2"><ChangeBadge product={product}/></div>
        </div>
      </div>
    </section>
    <section className="section"><div className="section-heading"><div><div className="section-eyebrow">মূল্য বিশ্লেষণ</div><h2 className="section-title"><ChartNoAxesCombined className="inline-block text-[#176d43] mr-2" size={25}/>দামের সারসংক্ষেপ</h2><p className="section-subtitle">তালিকাভুক্ত বাজারগুলোর সর্বনিম্ন, সর্বোচ্চ ও গড় মূল্য</p></div></div>
      <div className="price-summary">
        <Metric label="আজকের দাম" value={product.today} icon={<ArrowUpRight size={19}/>} featured/>
        <Metric label="সর্বনিম্ন দাম" value={summary.min} icon={<TrendingDown size={19}/>}/>
        <Metric label="সর্বোচ্চ দাম" value={summary.max} icon={<TrendingUp size={19}/>}/>
        <Metric label="গড় দাম" value={summary.average} icon={<ChartNoAxesCombined size={19}/>}/>
      </div>
      {history.length > 0 && <div className="paper mt-4"><h3 className="font-black text-[16px] mb-3">পূর্ববর্তী দামের তুলনা</h3><div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {history.map(h => <div key={h.label} className="rounded-xl bg-[#f7faf6] p-4"><p className="text-[#738377] text-xs">{h.label}</p><p className="font-black text-lg mt-1">{taka(h.value)}</p></div>)}
      </div></div>}
    </section>
    <section className="section"><div className="section-heading"><div><div className="section-eyebrow">বিভিন্ন বাজারের তুলনা</div><h2 className="section-title"><MapPin size={25} className="inline-block text-[#176d43] mr-2"/>বাজারভিত্তিক আজকের দাম</h2><p className="section-subtitle">{banglaNumber(markets.length)}টি বাজারে {product.nameBn} এর মূল্যসীমা</p></div></div>
      <div className="paper p-0! overflow-hidden"><MarketTable markets={markets}/></div>
    </section>
    <p className="text-[#7a8d7e] text-xs mb-2">নোট: দাম স্থান ও সময়ভেদে পরিবর্তিত হতে পারে। এখানে প্রদর্শিত বাজারের গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবিন্দু থেকে গণনা করা হয়েছে।</p>
  </div>;
}
