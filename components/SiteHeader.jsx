"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SiteHeader({ categories, date }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  async function logOut() {
    const { error } = await authClient.signOut();
    if (error) return toast.error(error.message || "সাইন আউট হয়নি");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }
  return <header className="site-header">
    <div className="page-wrap topbar">
      <Link href="/" className="brand-row" aria-label="বাজার দর হোমপেজ">
        <div className="logo-box"><Image src="/logo-icon.png" alt="" width={24} height={24}/></div>
        <div><div className="brand-title">বাজার দর</div><div className="brand-date">{date}</div></div>
      </Link>
      <div className="auth-actions" aria-label="অ্যাকাউন্ট নেভিগেশন">
        {isPending ? <div className="loading-block" style={{height:36,width:146}}/> : session?.user ? <>
          <Link href="/profile" className="btn btn-light"><UserRound size={15}/> <span className="hidden sm:inline">আমার প্রোফাইল</span><span className="sm:hidden">প্রোফাইল</span></Link>
          <button type="button" className="btn btn-green" onClick={logOut}><LogOut size={15}/> <span className="hidden sm:inline">সাইন আউট</span><span className="sm:hidden">বের হন</span></button>
        </> : <>
          <Link href="/signin" className="btn btn-light">সাইন ইন</Link>
          <Link href="/signup" className="btn btn-green">সাইন আপ</Link>
        </>}
      </div>
    </div>
    <div className="nav-row"><nav className="page-wrap category-scroll" aria-label="পণ্যের ক্যাটাগরি">
      <Link className={`nav-pill ${pathname === "/" ? "active" : ""}`} href="/">🏠 সব পণ্য</Link>
      {categories.map((c) => <Link key={c.slug} href={`/category/${encodeURIComponent(c.slug)}`} className={`nav-pill ${pathname === `/category/${c.slug}` ? "active" : ""}`}>{c.icon || "🛍️"} {c.nameBn}</Link>)}
    </nav></div>
  </header>;
}
