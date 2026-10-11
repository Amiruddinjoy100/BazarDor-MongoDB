export default function ProductSkeleton({ count = 8 }) {
  return <div className="product-grid" aria-label="পণ্যের তথ্য লোড হচ্ছে">
    {Array.from({length:count},(_,i) => <div key={i} className="product-card" aria-hidden="true">
      <div className="loading-block h-[137px] mb-4"/><div className="loading-block h-5 w-3/4 mb-3"/><div className="loading-block h-4 w-1/2 mb-5"/>
      <div className="border-t border-[#e9eee8] pt-4 flex gap-2"><div className="loading-block h-6 w-2/3"/><div className="loading-block h-6 w-1/3"/></div>
    </div>)}
  </div>;
}
