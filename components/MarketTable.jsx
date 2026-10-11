import { banglaNumber, toNumber } from "@/lib/format";
export default function MarketTable({ markets = [] }) {
  if (!markets.length) return <div className="text-center text-[#728579] py-10">বাজারভিত্তিক দামের তথ্য বর্তমানে নেই।</div>;
  return <div className="market-table-wrap">
    <table className="market-table">
      <thead><tr><th>#</th><th>বাজারের নাম</th><th>অঞ্চল</th><th>সর্বনিম্ন দাম</th><th>সর্বোচ্চ দাম</th><th>গড় দাম</th></tr></thead>
      <tbody>{markets.map((m,i) => {
        const min = toNumber(m.min), max = toNumber(m.max);
        const avg = Number.isFinite(min) && Number.isFinite(max) ? (min + max) / 2 : NaN;
        return <tr key={`${m.market}-${i}`}>
          <td className="text-[#799082]">{banglaNumber(i+1)}</td>
          <td>{m.market || 'অজানা বাজার'}</td><td>{m.division || '—'}</td>
          <td>{banglaNumber(min)} টাকা</td><td>{banglaNumber(max)} টাকা</td>
          <td className="text-[#176d43] font-extrabold">{banglaNumber(avg)} টাকা</td>
        </tr>;
      })}</tbody>
    </table>
  </div>;
}
