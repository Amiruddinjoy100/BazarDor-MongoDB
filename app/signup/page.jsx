import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "সাইন আপ" };
export default function SignUpPage() { return <Suspense fallback={<div className="loading-block mx-auto mt-16 h-96 max-w-[460px]"/>}><AuthForm mode="signup"/></Suspense>; }
