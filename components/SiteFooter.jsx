import Link from "next/link";
export default function SiteFooter() {
  return <footer className="footer"><div className="page-wrap footer-inner">
    <div><Link href="/" className="font-black text-xl text-[#14663f]">🛒 বাজার দর</Link><p className="text-sm text-[#687d6e] mt-1">প্রয়োজনীয় পণ্যের দাম এক নজরে।</p></div>
    <small>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</small>
  </div></footer>;
}
