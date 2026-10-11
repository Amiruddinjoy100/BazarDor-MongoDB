import ProductSkeleton from "@/components/ProductSkeleton";
export default function Loading() {
  return <div className="py-10" role="status">
    <div className="loading-block w-full h-60 mb-9"/>
    <div className="loading-block w-60 h-7 mb-6"/>
    <ProductSkeleton count={8}/>
    <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>
  </div>;
}
