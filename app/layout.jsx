import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PriceTicker from "@/components/PriceTicker";
import { getCategories, getProducts } from "@/lib/api";

export const metadata = {
  title: { default: "বাজার দর | আজকের নিত্যপ্রয়োজনীয় পণ্যের দাম", template: "%s | বাজার দর" },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম, দাম বৃদ্ধি-হ্রাস এবং বাজারভিত্তিক দামের তুলনা।"
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);
  const date = new Intl.DateTimeFormat("bn-BD", { dateStyle: "full", timeZone: "Asia/Dhaka" }).format(new Date());
  return <html lang="bn"><body>
    <SiteHeader categories={categories} date={date}/>
    <PriceTicker products={products}/>
    <main className="page-wrap min-h-[58vh]">{children}</main>
    <SiteFooter/>
    <Toaster position="top-center" toastOptions={{duration:3500,style:{borderRadius:"12px",fontFamily:"inherit"}}}/>
  </body></html>;
}
