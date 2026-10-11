"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
export default function ProfileUpdateForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [saving, setSaving] = useState(false);
  const [errorText, setErrorText] = useState('');
  async function submit(e) {
    e.preventDefault();
    setErrorText('');
    if (name.trim().length < 2) { const message='নাম কমপক্ষে ২ অক্ষরের হতে হবে।'; setErrorText(message); toast.error(message); return; }
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: name.trim() });
      if (error) throw new Error(error.message || 'নাম আপডেট হয়নি');
      toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
      router.push('/profile');
      router.refresh();
    } catch (err) { setErrorText(err.message || 'আপডেট করা যায়নি।'); toast.error(err.message || 'আপডেট করা যায়নি।'); }
    finally { setSaving(false); }
  }
  return <form onSubmit={submit} noValidate>
    <label htmlFor="profile-name" className="form-label">আপনার নাম</label>
    <input id="profile-name" className="form-input" value={name} onChange={e=>setName(e.target.value)} autoComplete="name" minLength={2} required/>
    {errorText && <p className="form-help" role="alert">{errorText}</p>}
    <button disabled={saving} type="submit" className="btn btn-green mt-6 w-full"><CheckCircle2 size={18}/>{saving ? 'আপডেট হচ্ছে…' : 'তথ্য আপডেট করুন'}</button>
  </form>;
}
