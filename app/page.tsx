'use client';

import { useState } from 'react';
import { createOrder } from './actions';
import { Phone, MessageCircle, Facebook, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [age, setAge] = useState(14);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('age', age.toString());
    const res = await createOrder(formData);
    setResult(res);
  }

  return (
    <div className="min-h-screen bg-[#10131B] text-[#F3F0E8] font-sans pb-20">
      <header className="p-6 border-b border-white/10 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="bg-[#C7F36B] text-[#10131B] font-bold px-3 py-1 rounded-lg text-sm">NOVAS</span>
          <span className="font-bold tracking-wider">CREATIVE</span>
        </div>
        <a href="#order" className="bg-[#C7F36B] text-[#10131B] font-bold px-4 py-2 rounded-xl text-sm">Đặt Thiết Kế</a>
      </header>

      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs text-[#C7F36B] mb-6">
          <Sparkles className="w-4 h-4" /> CREATIVE IDEAS. VISUAL IMPACT.
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Ý TƯỞNG HỌC ĐƯỜNG.<br /><span className="text-[#C7F36B]">TRÌNH CHIẾU CÓ CHẤT.</span>
        </h1>
        <p className="text-gray-400 mb-10">"Biến kiến thức thành trải nghiệm thị giác." Dịch vụ thiết kế slide PowerPoint & Giáo án điện tử hàng đầu.</p>
      </section>

      <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6 mb-20">
        <div className="bg-[#1a1f2c] p-8 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-3 text-[#C7F36B]">A. SLIDE POWERPOINT HỌC ĐƯỜNG</h3>
          <p className="text-gray-400 text-sm">Bao gồm tất cả các môn: Toán, Ngữ văn, Lịch sử, Địa lý, Lý, Hóa, Sinh, Tiếng Anh, Tin học...</p>
        </div>
        <div className="bg-[#1a1f2c] p-8 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-3 text-[#C7F36B]">B. GIÁO ÁN ĐIỆN TỬ</h3>
          <p className="text-gray-400 text-sm">Bài giảng điện tử, slide trình chiếu chuẩn giảng dạy trực quan dành cho giáo viên.</p>
        </div>
      </section>

      <section id="order" className="max-w-2xl mx-auto px-6">
        <div className="bg-[#1a1f2c] p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">GỬI YÊU CẦU ĐẶT HÀNG</h2>
          {result?.success ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-[#C7F36B] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">GỬI ĐƠN THÀNH CÔNG!</h3>
              <p className="text-gray-400 text-sm mb-4">Mã đơn hàng của bạn là:</p>
              <div className="text-2xl font-mono text-[#C7F36B] font-bold">{result.orderCode}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Họ và tên *</label>
                <input name="fullName" required className="w-full bg-[#10131B] border border-white/10 rounded-xl p-3 outline-none focus:border-[#C7F36B]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Số điện thoại (VN) *</label>
                  <input name="phone" required type="tel" className="w-full bg-[#10131B] border border-white/10 rounded-xl p-3 outline-none focus:border-[#C7F36B]" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Độ tuổi: <span className="text-[#C7F36B] font-bold">{age}</span></label>
                  <input type="range" min="5" max="100" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full accent-[#C7F36B] mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Dịch vụ</label>
                  <select name="serviceType" className="w-full bg-[#10131B] border border-white/10 rounded-xl p-3 outline-none">
                    <option>Slide PowerPoint học đường</option>
                    <option>Giáo án điện tử</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Liên hệ qua</label>
                  <select name="contactMethod" className="w-full bg-[#10131B] border border-white/10 rounded-xl p-3 outline-none">
                    <option>Zalo</option>
                    <option>Gọi điện</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Yêu cầu chi tiết</label>
                <textarea name="requirements" rows={3} className="w-full bg-[#10131B] border border-white/10 rounded-xl p-3 outline-none focus:border-[#C7F36B]" />
              </div>
              <button type="submit" className="w-full bg-[#C7F36B] text-[#10131B] font-bold py-4 rounded-xl hover:bg-[#b5e058]">GỬI ĐƠN HÀNG NGAY</button>
            </form>
          )}
        </div>
      </section>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <a href="tel:0339641646" className="w-12 h-12 bg-[#C7F36B] text-[#10131B] rounded-full flex items-center justify-center font-bold shadow-lg"><Phone className="w-5 h-5" /></a>
        <a href="https://zalo.me/0399641646" target="_blank" className="w-12 h-12 bg-[#0068FF] text-white rounded-full flex items-center justify-center font-bold shadow-lg text-xs">Zalo</a>
        <a href="https://www.facebook.com/profile.php?id=61573067264653" target="_blank" className="w-12 h-12 bg-[#1877F2] text-white rounded-full flex items-center justify-center font-bold shadow-lg"><Facebook className="w-5 h-5" /></a>
      </div>
    </div>
  );
}
