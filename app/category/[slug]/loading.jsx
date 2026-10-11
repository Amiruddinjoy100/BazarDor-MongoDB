import ProductSkeleton from "@/components/ProductSkeleton";
export default function Loading() { return <div className="py-10" role="status"><div className="loading-block h-8 w-56 mb-4"/><div className="loading-block h-5 w-80 max-w-full mb-8"/><ProductSkeleton count={8}/><span className="sr-only">লোড হচ্ছে…</span></div>; }
