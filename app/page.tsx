import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

async function createOrder(formData: FormData) {
  "use server";
  const fullName = formData.get("fullName") as string;
  const phone = formData.get("phone") as string;
  const age = formData.get("age") as string;
  const service = formData.get("service") as string;
  const clientName = formData.get("clientName") as string;
  const requirements = formData.get("requirements") as string;
  
  const orderCode = "NOVAS-" + Math.floor(1000 + Math.random() * 9000);

  try {
    await sql`
      INSERT INTO orders (order_code, full_name, phone, age, client_name, service, status, created_at)
      VALUES (${orderCode}, ${fullName}, ${phone}, ${age}, ${clientName}, ${service}, 'pending', NOW())
    `;
    revalidatePath("/admin");
  } catch (error) {
    console.error("Lỗi lưu đơn hàng:", error);
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Header / Nav */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            NOVAS CREATIVE
          </div>
          <nav className="flex items-center gap-6">
            <a href="#services" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Dịch vụ</a>
            <a href="#order" className="text-sm font-medium text-slate-300 hover:text-indigo-400 transition-colors">Đặt thiết kế</a>
            <a href="/admin" className="px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-500/25">Quản trị</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 border-b border-slate-800/60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            ✨ Sáng tạo không giới hạn - Đỉnh cao thị giác
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Ý TƯỞNG HỌC ĐƯỜNG.<br />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              TRÌNH CHIẾU CÓ CHẤT.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Biến kiến thức thành trải nghiệm thị giác đỉnh cao. Dịch vụ thiết kế slide PowerPoint & Giáo án điện tử hàng đầu dành cho học sinh và giáo viên.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#order" className="px-8 py-3.5 text-base font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-xl shadow-indigo-600/30">
              Đặt đơn ngay
            </a>
            <a href="#services" className="px-8 py-3.5 text-base font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl transition-all">
              Khám phá dịch vụ
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
          Dịch Vụ Chuyên Sâu
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 text-xl group-hover:scale-110 transition-transform">
              💻
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">A. Slide PowerPoint Học Đường</h3>
            <p className="text-slate-400 leading-relaxed">
              Bao gồm tất cả các môn: Toán, Ngữ văn, Lịch sử, Địa lý, Lý, Hóa, Sinh, Tiếng Anh, Tin học... Thiết kế trực quan, hiệu ứng chuyển động mượt mà, thu hút mọi ánh nhìn.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6 text-xl group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-100">B. Giáo Án Điện Tử</h3>
            <p className="text-slate-400 leading-relaxed">
              Bài giảng điện tử, slide trình chiếu chuẩn giảng dạy trực quan, giúp giáo viên truyền đạt kiến thức sinh động và đạt hiệu quả cao nhất trên lớp.
            </p>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="py-20 px-6 max-w-2xl mx-auto">
        <div className="p-8 md:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-2 text-center text-slate-100">GỬI YÊU CẦU ĐẶT HÀNG</h2>
          <p className="text-sm text-slate-400 text-center mb-8">Điền thông tin bên dưới, Novas Creative sẽ liên hệ lại ngay lập tức.</p>

          <form action={createOrder} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Họ và tên *</label>
              <input 
                type="text" 
                name="fullName" 
                required 
                placeholder="Nhập họ tên của bạn"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Số điện thoại (VN) *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="039xxxxxxx"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Độ tuổi</label>
                <input 
                  type="number" 
                  name="age" 
                  defaultValue={14}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Dịch vụ</label>
                <select 
                  name="service"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                  <option value="Giáo án điện tử">Giáo án điện tử</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Liên hệ qua</label>
                <select 
                  name="clientName"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="Zalo">Zalo</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Yêu cầu chi tiết</label>
              <textarea 
                name="requirements" 
                rows={4}
                placeholder="Mô tả nội dung, số lượng slide hoặc yêu cầu đặc biệt..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 font-bold bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white rounded-xl transition-all shadow-xl shadow-indigo-600/25 tracking-wider uppercase text-sm"
            >
              Gửi Đơn Hàng Ngay
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-sm text-slate-500">
        <p>© 2026 Novas Creative. All rights reserved.</p>
      </footer>
    </main>
  );
}
