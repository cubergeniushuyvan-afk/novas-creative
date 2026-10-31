"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("theme-purple");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("novas_theme") || "theme-purple";
    setTheme(saved);

    // Xử lý hiệu ứng lướt xuất hiện & biến mất lặp đi lặp lại
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
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
      {/* CSS & Hiệu ứng Cyberpunk Responsive */}
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
          50% { transform: translateY(-30px) scale(1.12); }
        }

        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-color) 50%, var(--secondary-glow) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glow-btn {
          background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
          box-shadow: 0 0 25px var(--primary-glow);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-btn:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 0 45px var(--secondary-glow);
        }

        .card-cyber {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-cyber:hover {
          border-color: var(--accent-color);
          transform: translateY(-8px) scale(1.02);
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

        /* Hiệu ứng lướt tới hiện ra, lướt đi ẩn mất liên tục */
        .reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Responsive Layout cho Mobile */
        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      {/* Background Orb */}
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
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '20px', fontWeight: '900', letterSpacing: '2px',
            background: 'linear-gradient(90deg, #fff, var(--accent-color))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            ⚡ NOVAS CREATIVE
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {/* Nút Đổi Màu */}
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => changeTheme('theme-purple')} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#8b5cf6', border: 'none', cursor: 'pointer' }} title="Neon Purple"></button>
              <button onClick={() => changeTheme('theme-green')} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981', border: 'none', cursor: 'pointer' }} title="Matrix Green"></button>
              <button onClick={() => changeTheme('theme-blue')} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#3b82f6', border: 'none', cursor: 'pointer' }} title="Cyber Blue"></button>
            </div>

            <nav className="header-nav" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>DỊCH VỤ</a>
              <a href="#process" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>QUY TRÌNH</a>
              <a href="#order" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>ĐẶT HÀNG</a>
              <a href="/admin" className="glow-btn" style={{ color: '#fff', textDecoration: 'none', padding: '8px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: '800' }}>ADMIN</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="reveal mobile-padding" style={{ padding: '110px 24px 70px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'inline-block', padding: '8px 20px', borderRadius: '30px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', marginBottom: '24px', textTransform: 'uppercase'
        }}>
          🔥 THIẾT KẾ SLIDE & GIÁO ÁN ĐIỆN TỬ SỐ 1 VIỆT NAM
        </div>

        <h1 className="hero-title" style={{ fontSize: '60px', fontWeight: '900', lineHeight: '1.15', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
          Ý TƯỞNG HỌC ĐƯỜNG.<br />TRÌNH CHIẾU CỰC KÌ MẠNH MẼ.
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto 40px' }}>
          Biến những trang bài giảng khô khan thành kiệt tác đồ họa 3D sống động. Tối ưu hóa điểm số và trải nghiệm thuyết trình đỉnh cao.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#order" className="glow-btn" style={{ color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '15px', fontWeight: '900', letterSpacing: '1px' }}>
            ⚡ ĐẶT HÀNG NGAY (HOÀN THÀNH 48H)
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="reveal mobile-padding" style={{ padding: '30px 24px', maxWidth: '1000px', margin: '0 auto 60px' }}>
        <div className="card-cyber grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '32px', borderRadius: '24px', textAlign: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>48 Giờ</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '800' }}>HOÀN THÀNH SIÊU TỐC</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>100%</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '800' }}>HIỆU ỨNG MƯỢT MÀ</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff' }}>Đỉnh Cao</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', fontWeight: '800' }}>ĐIỂM 10 THUYẾT TRÌNH</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px' }}>
          ⚡ DỊCH VỤ THIẾT KẾ DẪN ĐẦU
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>Thiết kế chuẩn phong cách hiện đại, phối màu sắc nét.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
          <div className="card-cyber" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>💻</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: '#fff' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', margin: 0 }}>
              Toán, Văn, Sử, Địa, Lý, Hóa, Sinh, Tiếng Anh... Tích hợp hiệu ứng chuyển động Morph, 3D Object chuẩn xu hướng đồ họa mới nhất.
            </p>
          </div>

          <div className="card-cyber" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: '#fff' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '15px', margin: 0 }}>
              Bài giảng trực quan sinh động dành riêng cho giáo viên. Tối ưu bố cục logic giúp tạo ấn tượng sâu sắc trong các buổi thi giảng.
            </p>
          </div>
        </div>
      </section>

      {/* 48H Process Section */}
      <section id="process" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px' }}>
          🚀 QUY TRÌNH XỬ LÝ ĐƠN HÀNG TRONG 48H
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>Nhanh chóng - Chuyên nghiệp - Cam kết đúng hạn.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          <div className="card-cyber" style={{ padding: '28px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--accent-color)', marginBottom: '8px' }}>BƯỚC 1</div>
            <h4 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#fff' }}>Gửi Yêu Cầu</h4>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Điền thông tin và yêu cầu thiết kế vào form bên dưới.</p>
          </div>
          <div className="card-cyber" style={{ padding: '28px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--accent-color)', marginBottom: '8px' }}>BƯỚC 2</div>
            <h4 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#fff' }}>Dựng Sáng Tạo (48H)</h4>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Novas Studio lên ý tưởng, dựng slide và canh chỉnh hiệu ứng.</p>
          </div>
          <div className="card-cyber" style={{ padding: '28px', borderRadius: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--accent-color)', marginBottom: '8px' }}>BƯỚC 3</div>
            <h4 style={{ fontSize: '18px', margin: '0 0 8px 0', color: '#fff' }}>Bàn Giao & Tối Ưu</h4>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>Nhận file PowerPoint hoàn chỉnh và hỗ trợ chỉnh sửa theo ý muốn.</p>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order" className="reveal mobile-padding" style={{ padding: '80px 24px', maxWidth: '680px', margin: '0 auto' }}>
        <div className="card-cyber" style={{ padding: '40px', borderRadius: '28px', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '1px' }}>
            🚀 GỬI YÊU CẦU ĐẶT HÀNG (48H)
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '36px' }}>
            Gửi yêu cầu ngay hôm nay để nhận sản phẩm slide hoàn chỉnh trong vòng 48 giờ!
          </p>

          {success ? (
            <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399', textAlign: 'center', fontWeight: '700' }}>
              🎉 Đơn hàng đã gửi thành công! Novas Creative sẽ liên hệ ngay trong thời gian sớm nhất.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>HỌ VÀ TÊN *</label>
                <input type="text" name="fullName" required placeholder="Nhập họ tên của bạn" className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>SỐ ĐIỆN THOẠI *</label>
                  <input type="tel" name="phone" required placeholder="039xxxxxxx" className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>ĐỘ TUỔI</label>
                  <input type="number" name="age" defaultValue={14} className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>LOẠI DỊCH VỤ</label>
                  <select name="service" className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                    <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                    <option value="Giáo án điện tử">Giáo án điện tử</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>LIÊN HỆ QUA</label>
                  <select name="clientName" className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                    <option value="Zalo">Zalo</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
                <textarea name="requirements" rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="glow-btn" style={{
                width: '100%', padding: '18px', border: 'none', borderRadius: '12px',
                color: '#fff', fontWeight: '900', fontSize: '15px', letterSpacing: '2px',
                cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase'
              }}>
                {loading ? "ĐANG XỬ LÝ..." : "⚡ GỬI ĐƠN HÀNG NGAY (48H) ⚡"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. ALL RIGHTS RESERVED. DESIGNED FOR CEO VĂN.</p>
      </footer>
    </div>
  );
}
