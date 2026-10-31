import { db } from '@/db';
import { orders } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Phone, MessageCircle } from 'lucide-react';

export default async function AdminPage() {
  const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div className="min-h-screen bg-[#10131B] text-[#F3F0E8] p-8 font-sans">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
        <h1 className="text-2xl font-bold">NOVAS CREATIVE — QUẢN LÝ ĐƠN HÀNG</h1>
        <div className="bg-[#1a1f2c] px-4 py-2 rounded-xl text-sm border border-white/10">
          Tổng đơn: <span className="text-[#C7F36B] font-bold">{allOrders.length}</span>
        </div>
      </div>

      <div className="bg-[#1a1f2c] rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-4">Mã đơn</th>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">SĐT</th>
              <th className="p-4">Dịch vụ</th>
              <th className="p-4">Yêu cầu</th>
              <th className="p-4">Thời gian</th>
              <th className="p-4 text-center">Liên hệ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {allOrders.map((o) => (
              <tr key={o.id}>
                <td className="p-4 font-mono font-bold text-[#C7F36B]">{o.orderCode}</td>
                <td className="p-4 font-semibold">{o.fullName} ({o.age}t)</td>
                <td className="p-4 font-mono">{o.phone}</td>
                <td className="p-4">{o.service}</td>
                <td className="p-4 text-gray-400">{o.requirements || '---'}</td>
                <td className="p-4 text-xs text-gray-400">{new Date(o.createdAt).toLocaleString('vi-VN')}</td>
                <td className="p-4 flex justify-center gap-2">
                  <a href={`tel:${o.phone}`} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"><Phone className="w-4 h-4" /></a>
                  <a href={`https://zalo.me/${o.phone}`} target="_blank" className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><MessageCircle className="w-4 h-4" /></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
