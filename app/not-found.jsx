import Link from "next/link";
import { Home, SearchX } from "lucide-react";
export default function NotFound() {
  return <div className="empty-box my-16"><SearchX size={57} className="text-[#96b19c] mx-auto"/>
    <div className="text-6xl font-black text-[#176d43] mt-4">৪০৪</div>
    <h1 className="section-title mt-4">এই পেজ বা পণ্যটি পাওয়া যায়নি</h1>
    <p className="section-subtitle mt-2 mb-6">লিংকটি ভুল হতে পারে অথবা পণ্যটি এখন আর তালিকায় নেই।</p>
    <Link className="btn btn-green" href="/"><Home size={17}/> হোম পেজে ফিরে যান</Link>
  </div>;
}
