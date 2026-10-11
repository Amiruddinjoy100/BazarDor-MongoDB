import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Mail, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { auth } from "@/lib/auth";
export const metadata = { title: 'আমার প্রোফাইল' };
export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect('/signin?reason=protected&callbackUrl=%2Fprofile');
  const user = session.user;
  return <div className="max-w-2xl mx-auto py-12">
    <div className="page-heading mt-0"><div className="section-eyebrow">আপনার অ্যাকাউন্ট</div><h1 className="section-title">আমার প্রোফাইল</h1><p className="section-subtitle">আপনার অ্যাকাউন্টের তথ্য দেখুন ও পরিবর্তন করুন।</p></div>
    <div className="paper"><div className="flex items-center gap-5 flex-wrap border-b border-[#e8ede7] pb-6">
      <div className="h-20 w-20 rounded-full bg-[#e7f6e9] text-[#176d43] grid place-items-center text-3xl font-black" aria-label="প্রোফাইল ছবি">{user.name?.charAt(0)?.toLocaleUpperCase() || <UserRound size={32}/>}</div>
      <div className="flex-1 min-w-[180px]"><h2 className="text-xl font-black">{user.name}</h2><p className="text-[#708471] text-sm break-all">{user.email}</p><div className="inline-flex items-center gap-1 text-xs text-[#168052] mt-2"><ShieldCheck size={14}/> অ্যাকাউন্ট সক্রিয়</div></div>
    </div>
      <div className="py-6 space-y-5"><div className="flex gap-3 items-start"><UserRound className="text-[#709a7a]" size={20}/><div><p className="text-xs text-[#819283] mb-1">নাম</p><p className="font-bold">{user.name}</p></div></div>
      <div className="flex gap-3 items-start"><Mail className="text-[#709a7a]" size={20}/><div><p className="text-xs text-[#819283] mb-1">ইমেইল</p><p className="font-bold break-all">{user.email}</p></div></div></div>
      <Link href="/profile/update" className="btn btn-green"><Pencil size={17}/> তথ্য আপডেট করুন</Link>
    </div>
  </div>;
}
