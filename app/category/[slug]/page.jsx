import Link from "next/link";
import { notFound } from "next/navigation";
import SortProducts from "@/components/SortProducts";
import DataUnavailable from "@/components/DataUnavailable";
import { getCategories, getCategoryProducts } from "@/lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === slug);
    return { title: category ? `${category.nameBn} এর বাজারদর` : "পাওয়া যায়নি" };
  } catch { return { title: "পণ্যের বিভাগ" }; }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  let category, products;
  try {
    const categories = await getCategories();
    category = categories.find(c => c.slug === slug);
    if (!category) notFound();
    products = await getCategoryProducts(slug);
  } catch (err) {
    // Next.js's notFound() must not be swallowed by the API error fallback.
    if (err?.digest?.startsWith('NEXT_HTTP_ERROR_FALLBACK;404')) throw err;
    return <DataUnavailable/>;
  }
  if (!products.length) notFound();
  return <div className="pb-12">
    <div className="page-heading">
      <nav className="crumbs"><Link href="/">হোম</Link><span>›</span><span>{category.nameBn}</span></nav>
      <div className="flex items-center gap-4"><span className="text-6xl" aria-hidden="true">{category.icon || '🛒'}</span><div>
        <div className="section-eyebrow">বাজার দরের বিভাগ</div>
        <h1 className="section-title">{category.nameBn} এর আজকের দাম</h1>
        <p className="section-subtitle">এক নজরে বিভিন্ন পণ্যের বর্তমান দর দেখুন এবং সাজিয়ে নিন।</p>
      </div></div>
    </div>
    <SortProducts products={products}/>
  </div>;
}
