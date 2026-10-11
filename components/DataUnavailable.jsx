import Link from "next/link";
import { WifiOff } from "lucide-react";
export default function DataUnavailable() {
  return <div className="empty-box my-12"><WifiOff size={44} className="mx-auto text-[#7b9483]"/><h2 className="font-black text-2xl mt-4">দামের তথ্য লোড করা যাচ্ছে না</h2><p className="text-[#718274] my-4">বাজারদর API-তে সাময়িক সমস্যা হতে পারে। অনুগ্রহ করে আবার চেষ্টা করুন।</p><Link className="btn btn-green" href="/">হোম পেজে ফিরে যান</Link></div>;
}
