"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, LockKeyhole, LogIn, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function validReturnUrl(value) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/";
}
export default function AuthForm({ mode }) {
  const isSignIn = mode === "signin";
  const router = useRouter();
  const query = useSearchParams();
  const callbackURL = validReturnUrl(query.get("callbackUrl"));
  const [busy, setBusy] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  useEffect(() => {
    if (query.get("registered") === "1" && isSignIn) toast.success("রেজিস্ট্রেশন হয়েছে! এখন সাইন ইন করুন।");
    if (query.get("reason") === "protected") toast("বিস্তারিত দেখতে আগে সাইন ইন করুন।", { icon: "🔒" });
  }, [query, isSignIn]);
  async function submit(e) {
    e.preventDefault();
    setErrorText("");
    if (!isSignIn && form.name.trim().length < 2) return showError("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return showError("সঠিক ইমেইল দিন।");
    if (form.password.length < 8) return showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    setBusy(true);
    try {
      if (isSignIn) {
        const { error } = await authClient.signIn.email({ email: form.email.trim(), password: form.password });
        if (error) return showError(error.message || "ইমেইল বা পাসওয়ার্ড ভুল।");
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
        router.push(callbackURL);
        router.refresh();
      } else {
        const { error } = await authClient.signUp.email({ name: form.name.trim(), email: form.email.trim(), password: form.password });
        if (error) return showError(error.message || "সাইন আপ সম্পন্ন হয়নি।");
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
        router.push("/signin?registered=1");
        router.refresh();
      }
    } catch (error) { showError(error.message || "নেটওয়ার্ক সমস্যা হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setBusy(false); }
  }
  function showError(message) { setErrorText(message); toast.error(message); }
  async function social(provider) {
    setErrorText("");
    setBusy(true);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL: isSignIn ? callbackURL : "/" });
      if (error) showError(error.message || `${provider} সাইন ইন ব্যর্থ হয়েছে।`);
    } catch (error) { showError(error.message || `${provider} দিয়ে সাইন ইন করা যাচ্ছে না।`); }
    finally { setBusy(false); }
  }
  return <div className="auth-center">
    <div className="text-center mb-7"><div className="text-5xl mb-2">{isSignIn ? '🔑' : '🛒'}</div>
      <div className="section-eyebrow">বাজার দর অ্যাকাউন্ট</div>
      <h1 className="section-title">{isSignIn ? 'স্বাগতম! সাইন ইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}</h1>
      <p className="section-subtitle">{isSignIn ? 'পণ্যের বিস্তারিত বাজারদর দেখতে সাইন ইন করুন।' : 'সব পণ্যের বিস্তারিত তথ্য দেখতে যোগ দিন।'}</p>
    </div>
    <div className="form-panel">
      <form onSubmit={submit} noValidate>
        {!isSignIn && <><label className="form-label" htmlFor="name">আপনার নাম</label><input id="name" autoComplete="name" className="form-input" placeholder="আপনার পূর্ণ নাম" value={form.name} onChange={e => setForm({ ...form, name:e.target.value })} required/></>}
        <label className="form-label" htmlFor="email">ইমেইল ঠিকানা</label>
        <input id="email" type="email" autoComplete="email" className="form-input" placeholder="example@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/>
        <label className="form-label" htmlFor="password">পাসওয়ার্ড</label>
        <input id="password" type="password" autoComplete={isSignIn ? "current-password" : "new-password"} className="form-input" minLength={8} placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/>
        {errorText && <div role="alert" className="form-help bg-[#fff5f3] rounded-lg px-3 py-2 mt-4">{errorText}</div>}
        <button type="submit" disabled={busy} className="btn btn-green w-full mt-6">{isSignIn ? <LogIn size={18}/> : <UserPlus size={18}/>} {busy ? 'অপেক্ষা করুন…' : isSignIn ? 'সাইন ইন' : 'অ্যাকাউন্ট তৈরি করুন'}</button>
      </form>
      <div className="separate">অথবা</div>
      <div className="grid gap-2">
        <button type="button" disabled={busy} onClick={()=>social('google')} className="social-btn"><span className="text-lg font-black text-[#4285f4]">G</span> Google দিয়ে চালিয়ে যান</button>
        <button type="button" disabled={busy} onClick={()=>social('github')} className="social-btn"><Github size={17}/> GitHub দিয়ে চালিয়ে যান</button>
      </div>
      <p className="text-center text-sm text-[#6a8070] mt-7">
        {isSignIn ? 'নতুন ব্যবহারকারী?' : 'ইতোমধ্যে অ্যাকাউন্ট আছে?'}{' '}
        <Link className="font-extrabold text-[#176d43] hover:underline" href={isSignIn ? '/signup' : '/signin'}>{isSignIn ? 'সাইন আপ করুন' : 'সাইন ইন করুন'}</Link>
      </p>
    </div>
    <p className="flex justify-center gap-2 items-center text-xs text-[#849587] mt-5"><LockKeyhole size={14}/> আপনার তথ্য নিরাপদভাবে সংরক্ষিত থাকে</p>
  </div>;
}
