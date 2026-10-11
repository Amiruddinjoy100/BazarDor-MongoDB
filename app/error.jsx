"use client";
import Link from "next/link";
export default function ErrorPage({ reset }) {
  return <div className="empty-box my-14"><div className="empty-emoji">⚠️</div><h1 className="section-title">কিছু একটা সমস্যা হয়েছে</h1>
    <p className="section-subtitle mb-6">দয়া করে আবার চেষ্টা করুন।</p><div className="flex gap-3 justify-center flex-wrap">
      <button onClick={reset} className="btn btn-green">আবার চেষ্টা করুন</button><Link href="/" className="btn btn-light">হোম পেজে ফিরে যান</Link>
    </div>
  </div>;
}
