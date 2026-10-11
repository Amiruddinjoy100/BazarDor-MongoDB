import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
export const metadata = { title: 'তথ্য আপডেট' };
export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/signin?reason=protected&callbackUrl=%2Fprofile%2Fupdate');
  return <div className="max-w-lg mx-auto py-12"><Link href="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-[#176d43] mb-5"><ArrowLeft size={17}/> প্রোফাইলে ফিরে যান</Link>
    <div className="form-panel"><div className="section-eyebrow">অ্যাকাউন্ট ব্যবস্থাপনা</div><h1 className="section-title">তথ্য আপডেট করুন</h1><p className="section-subtitle">এখান থেকে আপনার অ্যাকাউন্টের নাম পরিবর্তন করুন।</p>
      <ProfileUpdateForm currentName={session.user.name}/>
    </div>
  </div>;
}
