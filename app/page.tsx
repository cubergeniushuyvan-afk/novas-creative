import { neon } from "@neondatabase/serverless";
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
    const sql = neon(process.env.DATABASE_URL!);
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
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      color: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* CSS Nhúng trực tiếp để đảm bảo Hiệu ứng & Đồ họa Hầm hố 100% */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes borderGradient {
          0% { border-color: #6366f1; }
          50% { border-color: #06b6d4; }
          100% { border-color: #a855f7; }
        }
        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, #818cf8 50%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glow-btn {
          background: linear-gradient(90deg, #4f46e5, #0891b2);
          box-shadow: 0 0 25px rgba(79, 70, 229, 0.5);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 0 40px rgba(8, 145, 178, 0.8);
        }
        .card-cyber {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(99, 102, 241, 0.3);
          transition: all 0.4s ease;
        }
        .card-cyber:hover {
          border-color: #38bdf8;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -10px rgba(56, 189, 248, 0.3);
        }
        .cyber-input {
          background: rgba(3, 7, 18, 0.9);
          border: 1px solid #1e293b;
          color: #f8fafc;
          transition: all 0.3s ease;
        }
        .cyber-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }
      `}</style>

      {/* Background Glow Orbs */}
      <div style={{
        position: 'fixed',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        animation: 'pulseGlow 6s infinite ease-in-out',
        zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(3, 7, 18, 0.8)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        padding: '0 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '900',
            letterSpacing: '2px',
            background: 'linear-gradient(90deg, #818cf8, #38bdf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ⚡ NOVAS CREATIVE
          </div>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>DỊCH VỤ</a>
            <a href="#order" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>ĐẶT HÀNG</a>
            <a href="/admin" className="glow-btn" style={{
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '1px'
            }}>QUẢN TRỊ ADMIN</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '100px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '20px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: '#a5b4fc',
          fontSize: '12px',
          fontWeight: '700',
          letterSpacing: '1.5px',
          marginBottom: '24px',
          textTransform: 'uppercase'
        }}>
          🔥 ĐỈNH CAO THIẾT KẾ SLIDE & GIÁO ÁN ĐIỆN TỬ
        </div>

        <h1 className="hero-title" style={{
          fontSize: '52px',
          fontWeight: '900',
          lineHeight: '1.15',
          margin: '0 0 24px 0',
          letterSpacing: '-1px'
        }}>
          Ý TƯỞNG HỌC ĐƯỜNG.<br />
          TRÌNH CHIẾU CỰC CHẤT.
        </h1>

        <p style={{
          color: '#94a3b8',
          fontSize: '18px',
          lineHeight: '1.6',
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px'
        }}>
          Biến bài thuyết trình khô khan thành một kiệt tác thị giác mạnh mẽ. Đạt điểm tối đa mọi môn học cùng Novas Creative.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="#order" className="glow-btn" style={{
            color: '#fff',
            textDecoration: 'none',
            padding: '16px 36px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '800',
            letterSpacing: '1px'
          }}>ĐẶT THIẾT KẾ NGAY</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '48px',
          letterSpacing: '1px',
          color: '#f8fafc'
        }}>
          ⚡ DỊCH VỤ CHUYÊN SÂU
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          <div className="card-cyber" style={{ padding: '36px', borderRadius: '20px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>💻</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 12px 0', color: '#38bdf8' }}>
              Slide PowerPoint Học Đường
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
              Toán, Ngữ Văn, Lịch Sử, Địa Lý, Lý, Hóa, Sinh, Tiếng Anh... Thiết kế hiệu ứng Morph mượt mà, chuyển động 3D thu hút từng giây.
            </p>
          </div>

          <div className="card-cyber" style={{ padding: '36px', borderRadius: '20px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 12px 0', color: '#a855f7' }}>
              Giáo Án Điện Tử
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0, fontSize: '14px' }}>
              Bài giảng chuẩn sư phạm trực quan, hệ thống hóa kiến thức logic dành riêng cho giáo viên đạt chuẩn giảng dạy chất lượng cao.
            </p>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" style={{ padding: '80px 24px', maxWidth: '650px', margin: '0 auto' }}>
        <div className="card-cyber" style={{
          padding: '40px',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '900',
            textAlign: 'center',
            margin: '0 0 8px 0',
            letterSpacing: '1px',
            color: '#fff'
          }}>
            🚀 GỬI YÊU CẦU ĐẶT HÀNG
          </h2>
          <p style={{
            color: '#64748b',
            fontSize: '13px',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Điền thông tin bên dưới, Novas Creative sẽ xử lý đơn hàng trong 5 phút!
          </p>

          <form action={createOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Họ và tên *
              </label>
              <input 
                type="text" 
                name="fullName" 
                required 
                placeholder="Nhập họ tên của bạn"
                className="cyber-input"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                  Số điện thoại *
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  required 
                  placeholder="039xxxxxxx"
                  className="cyber-input"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                  Độ tuổi
                </label>
                <input 
                  type="number" 
                  name="age" 
                  defaultValue={14}
                  className="cyber-input"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                  Loại dịch vụ
                </label>
                <select 
                  name="service"
                  className="cyber-input"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}
                >
                  <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                  <option value="Giáo án điện tử">Giáo án điện tử</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                  Liên hệ qua
                </label>
                <select 
                  name="clientName"
                  className="cyber-input"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}
                >
                  <option value="Zalo">Zalo</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '8px' }}>
                Chi tiết yêu cầu
              </label>
              <textarea 
                name="requirements" 
                rows={4}
                placeholder="Mô tả chủ đề bài học, số lượng slide hoặc tone màu mong muốn..."
                className="cyber-input"
                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="glow-btn"
              style={{
                width: '100%',
                padding: '18px',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '900',
                fontSize: '15px',
                letterSpacing: '2px',
                cursor: 'pointer',
                marginTop: '10px',
                textTransform: 'uppercase'
              }}
            >
              🔥 GỬI ĐƠN HÀNG NGAY 🔥
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 24px',
        textAlign: 'center',
        color: '#475569',
        fontSize: '13px'
      }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
