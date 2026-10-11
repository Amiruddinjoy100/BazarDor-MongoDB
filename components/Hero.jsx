import Image from "next/image";
import { ArrowDownRight, Sparkles } from "lucide-react";
export default function Hero() {
  return <section className="hero" aria-label="বাজার দরের পরিচিতি">
    <div className="hero-copy">
      <span className="hero-eyebrow"><Sparkles size={14}/> আপনার প্রতিদিনের বাজারসঙ্গী</span>
      <h1>বাজারের সঠিক দাম,<br/> এখন আপনার হাতেই!</h1>
      <p>চাল, ডাল, তেল থেকে শাকসবজি—নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম জানুন, পরিবর্তন বুঝুন, আর কেনাকাটা করুন আরও স্মার্টভাবে।</p>
      <a className="hero-cta" href="#সব-পণ্য">সব পণ্যের দাম দেখুন <ArrowDownRight size={19}/></a>
    </div>
    <div className="hero-art"><Image src="/bazar-hero.png" alt="তাজা ফল ও সবজির ঝুড়ি" width={315} height={263} priority/></div>
  </section>;
}
