"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("theme-purple");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("novas_theme") || "theme-purple";
    setTheme(saved);
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("novas_theme", newTheme);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Gửi đơn hàng về Server Action / API
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme} style={{
      minHeight: '100vh',
      backgroundColor: '#030712',
      color: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflowX: 'hidden',
      transition: 'all 0.5s ease'
    }}>
      {/* CSS Nhúng Trực Tiếp Cyberpunk Đỉnh Cao */}
      <style jsx global>{`
        :root {
          --primary-glow: #8b5cf6;
          --secondary-glow: #ec4899;
          --accent-color: #c084fc;
        }
        .theme-purple {
          --primary-glow: #8b5cf6;
          --secondary-glow: #ec4899;
          --accent-color: #c084fc;
        }
        .theme-green {
          --primary-glow: #10b981;
          --secondary-glow: #3b82f6;
          --accent-color: #34d399;
        }
        .theme-blue {
          --primary-glow: #3b82f6;
          --secondary-glow: #06b6d4;
          --accent-color: #60a5fa;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-25px) scale(1.1); }
        }
        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-color) 60%, var(--secondary-glow) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glow-btn {
          background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
          box-shadow: 0 0 30px var(--primary-glow);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-btn:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 0 50px var(--secondary-glow);
        }
        .card-cyber {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-cyber:hover {
          border-color: var(--accent-color);
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8);
        }
        .cyber-input {
          background: rgba(3, 7, 18, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f8fafc;
          transition: all 0.3s ease;
        }
        .cyber-input:focus {
          outline: none;
          border-color: var(--primary-glow);
          box-shadow: 0 0 20px var(--primary-glow);
        }
      `}</style>

      {/* Background Glow */}
      <div style={{
        position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '750px', height: '750px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(0,0,0,0) 70%)',
        opacity: 0.25, pointerEvents: 'none', animation: 'floatOrb 8s infinite ease-in-out', zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(3, 7, 18, 0.85)', backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 32px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '22px', fontWeight: '900', letterSpacing: '2px',
            background: 'linear-gradient(90deg, #fff, var(--accent-color))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            ⚡ NOVAS CREATIVE STUDIO
          </div>

          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>DỊCH VỤ</a>
            <a href="#portfolio" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>ĐẲNG CẤP</a>
            <a href="#order" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>ĐẶT HÀNG</a>
            
            {/* Nút Đổi Màu Hoạt Động 100% */}
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => changeTheme('theme-purple')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#8b5cf6', border: 'none', cursor: 'pointer' }} title="Neon Purple"></button>
              <button onClick={() => changeTheme('theme-green')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#10b981', border: 'none', cursor: 'pointer' }} title="Matrix Green"></button>
              <button onClick={() => changeTheme('theme-blue')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#3b82f6', border: 'none', cursor: 'pointer' }} title="Cyber Blue"></button>
            </div>

            <a href="/admin" className="glow-btn" style={{
              color: '#fff', textDecoration: 'none', padding: '10px 22px',
              borderRadius: '10px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px'
            }}>ADMIN</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '130px 24px 80px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'inline-block', padding: '8px 22px', borderRadius: '30px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', marginBottom: '28px', textTransform: 'uppercase'
        }}>
          🔥 NỀN TẢNG SÁNG TẠO ĐỒ HỌA & SLIDE HỌC ĐƯỜNG SỐ 1 VIỆT NAM
        </div>

        <h1 className="hero-title" style={{ fontSize: '62px', fontWeight: '900', lineHeight: '1.15', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
          Ý TƯỞNG HỌC ĐƯỜNG.<br />TRÌNH CHIẾU CỰC KÌ MẠNH MẼ.
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '19px', lineHeight: '1.6', maxWidth: '750px', margin: '0 auto 48px' }}>
          Phá vỡ mọi giới hạn thuyết trình truyền thống. Đem lại hiệu ứng chuyển động mượt mà, thị giác hầm hố giúp bạn bùng nổ điểm số mọi môn học.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="#order" className="glow-btn" style={{ color: '#fff', textDecoration: 'none', padding: '18px 40px', borderRadius: '14px', fontSize: '15px', fontWeight: '900', letterSpacing: '1.5px' }}>
            ⚡ KHỞI TẠO ĐƠN HÀNG NGAY
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto 80px' }}>
        <div className="card-cyber" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '36px', borderRadius: '24px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>100%</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontWeight: '800' }}>HIỆU ỨNG MƯỢT MÀ</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>5 Phút</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontWeight: '800' }}>XỬ LÝ ĐƠN TỐC ĐỘ</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>Đỉnh Cao</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px', fontWeight: '800' }}>ĐIỂM 10 THUYẾT TRÌNH</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', marginBottom: '16px', letterSpacing: '1px' }}>
          ⚡ HỆ THỐNG DỊCH VỤ CỰC MẠNH
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '60px', fontSize: '15px' }}>Thiết kế độc quyền, không đụng hàng, tối ưu hóa điểm số.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          <div className="card-cyber" style={{ padding: '40px', borderRadius: '24px' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>💻</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 16px 0', color: '#fff' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', margin: 0 }}>
              Toán, Văn, Sử, Địa, Lý, Hóa, Sinh, Tiếng Anh... Tích hợp hiệu ứng chuyển động Morph, 3D Object và bố cục cực kỳ mãn nhãn.
            </p>
          </div>

          <div className="card-cyber" style={{ padding: '40px', borderRadius: '24px' }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>📚</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 16px 0', color: '#fff' }}>Giáo Án Điện Tử Chuyên Sâu</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', margin: 0 }}>
              Hệ thống bài giảng điện tử chuẩn sư phạm, trực quan sinh động giúp giáo viên ghi điểm tuyệt đối trong các hội giảng cấp trường, cấp tỉnh.
            </p>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" style={{ padding: '100px 24px', maxWidth: '700px', margin: '0 auto' }}>
        <div className="card-cyber" style={{ padding: '50px', borderRadius: '30px', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', margin: '0 0 10px 0', letterSpacing: '1px' }}>
            🚀 GỬI YÊU CẦU ĐẶT HÀNG
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '40px' }}>
            Điền thông tin bên dưới để kết nối trực tiếp với hệ thống tự động của Novas Creative.
          </p>

          {success ? (
            <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', textAlign: 'center', fontWeight: '700' }}>
              🎉 Đơn hàng đã được gửi thành công! Novas Creative sẽ liên hệ ngay.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>HỌ VÀ TÊN *</label>
                <input type="text" name="fullName" required placeholder="Nhập họ tên của bạn" className="cyber-input" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>SỐ ĐIỆN THOẠI *</label>
                  <input type="tel" name="phone" required placeholder="039xxxxxxx" className="cyber-input" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>ĐỘ TUỔI</label>
                  <input type="number" name="age" defaultValue={14} className="cyber-input" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>LOẠI DỊCH VỤ</label>
                  <select name="service" className="cyber-input" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box' }}>
                    <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                    <option value="Giáo án điện tử">Giáo án điện tử</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>LIÊN HỆ QUA</label>
                  <select name="clientName" className="cyber-input" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '15px', boxSizing: 'border-box' }}>
                    <option value="Zalo">Zalo</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>CHI TIẾT YÊU CẦU</label>
                <textarea name="requirements" rows={4} placeholder="Mô tả chủ đề bài học, số lượng slide..." className="cyber-input" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '15px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="glow-btn" style={{
                width: '100%', padding: '20px', border: 'none', borderRadius: '14px',
                color: '#fff', fontWeight: '900', fontSize: '16px', letterSpacing: '2px',
                cursor: 'pointer', marginTop: '12px', textTransform: 'uppercase'
              }}>
                {loading ? "ĐANG GỬI..." : "⚡ GỬI ĐƠN HÀNG NGAY ⚡"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
