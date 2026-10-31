"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("theme-purple");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "14",
    service: "Slide PowerPoint học đường",
    requirements: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("novas_theme") || "theme-purple";
    setTheme(saved);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAppMessenger = () => {
    // Thử kích hoạt mở thẳng App Messenger bằng Deep Link
    window.location.href = "fb-messenger://";
    
    // Nếu trong 1.5s không bật được App (do laptop không có app), tự động chuyển sang bản Web
    setTimeout(() => {
      window.open("https://m.me/", "_blank");
    }, 1500);
  };

  const handleSendMessenger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Vui lòng điền Họ tên và Số điện thoại!");
      return;
    }

    const message = `✨ [ĐƠN ĐẶT HÀNG NOVAS CREATIVE] ✨\n- Họ tên: ${formData.fullName}\n- SĐT: ${formData.phone}\n- Độ tuổi: ${formData.age}\n- Dịch vụ: ${formData.service}\n- Yêu cầu: ${formData.requirements || "Không có"}`;
    
    // Tự động sao chép vào bộ nhớ tạm
    navigator.clipboard.writeText(message);

    // Kích hoạt mở App Messenger
    openAppMessenger();
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
          50% { transform: translateY(-35px) scale(1.15); }
        }

        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-color) 50%, var(--secondary-glow) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 35px rgba(192, 132, 252, 0.4));
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
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-cyber:hover {
          border-color: var(--accent-color);
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.9), 0 0 20px var(--primary-glow);
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

        .reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      {/* Background Orbs */}
      <div style={{
        position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '800px',
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
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => changeTheme('theme-purple')} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#8b5cf6', border: 'none', cursor: 'pointer' }} title="Neon Purple"></button>
              <button onClick={() => changeTheme('theme-green')} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#10b981', border: 'none', cursor: 'pointer' }} title="Matrix Green"></button>
              <button onClick={() => changeTheme('theme-blue')} style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#3b82f6', border: 'none', cursor: 'pointer' }} title="Cyber Blue"></button>
            </div>

            <nav className="header-nav" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>DỊCH VỤ</a>
              <a href="#guide" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>HƯỚNG DẪN</a>
              <a href="#order" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>ĐẶT HÀNG</a>
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
          Biến những trang bài giảng khô khan thành kiệt tác đồ họa sống động. Tối ưu hóa điểm số và trải nghiệm thuyết trình đỉnh cao.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#order" className="glow-btn" style={{ color: '#fff', textDecoration: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '15px', fontWeight: '900', letterSpacing: '1px' }}>
            ⚡ ĐẶT HÀNG NGAY (HOÀN THÀNH 48H)
          </a>
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
              Toán, Văn, Sử, Địa, Lý, Hóa, Sinh, Tiếng Anh... Tích hợp hiệu ứng chuyển động Morph chuẩn xu hướng đồ họa mới nhất.
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

      {/* Detailed Guide Section */}
      <section id="guide" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px' }}>
          📖 HƯỚNG DẪN DÀNH CHO KHÁCH HÀNG
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>Chọn thiết bị bạn đang sử dụng để xem cách gửi đơn nhanh nhất:</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
          {/* Hướng dẫn trên Điện thoại */}
          <div className="card-cyber" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '30px', marginBottom: '16px' }}>📱 Dành cho Điện Thoại</div>
            <ul style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
              <li><strong>Bước 1:</strong> Điền đầy đủ Họ tên, SĐT và yêu cầu vào bảng bên dưới.</li>
              <li><strong>Bước 2:</strong> Bấm nút <strong style={{ color: '#fff' }}>"GỬI ĐƠN QUA MESSENGER"</strong>. Ứng dụng Messenger sẽ tự động bật lên lập tức.</li>
              <li><strong>Bước 3:</strong> Bạn chỉ cần <strong>chạm và giữ tay 1 giây</strong> vào khung nhắn tin rồi bấm <strong>"Dán" (Paste)</strong> để gửi đơn!</li>
            </ul>
          </div>

          {/* Hướng dẫn trên Laptop / Máy tính */}
          <div className="card-cyber" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '30px', marginBottom: '16px' }}>💻 Dành cho Laptop / Máy Tính</div>
            <ul style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
              <li><strong>Bước 1:</strong> Điền đầy đủ thông tin yêu cầu thiết kế vào form đặt hàng bên dưới.</li>
              <li><strong>Bước 2:</strong> Bấm nút <strong style={{ color: '#fff' }}>"GỬI ĐƠN QUA MESSENGER"</strong>. Nội dung được copy ngầm vào máy.</li>
              <li><strong>Bước 3:</strong> Khi ô chat hiện lên, bấm tổ hợp phím <strong style={{ color: '#fff' }}>Ctrl + V</strong> (hoặc nhấn chuột phải chọn <strong>Dán</strong>) rồi nhấn <strong>Enter</strong> là xong!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Order Form & Direct Chat Section */}
      <section id="order" className="reveal mobile-padding" style={{ padding: '80px 24px', maxWidth: '680px', margin: '0 auto' }}>
        <div className="card-cyber" style={{ padding: '40px', borderRadius: '28px', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '1px' }}>
            🚀 GỬI YÊU CẦU ĐẶT HÀNG (48H)
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '36px' }}>
            Điền thông tin bên dưới hoặc trò chuyện trực tiếp với chúng tôi mà không cần qua form!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>HỌ VÀ TÊN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nhập họ tên của bạn" className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>SỐ ĐIỆN THOẠI *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>LOẠI DỊCH VỤ</label>
              <select name="service" value={formData.service} onChange={handleChange} className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#cbd5e1', marginBottom: '8px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="cyber-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button onClick={handleSendMessenger} className="glow-btn" style={{
              width: '100%', padding: '18px', border: 'none', borderRadius: '12px',
              color: '#fff', fontWeight: '900', fontSize: '15px', letterSpacing: '1px',
              cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #00c6ff, #0072ff)'
            }}>
              💬 GỬI ĐƠN QUA MESSENGER
            </button>

            {/* Lựa chọn phụ cho khách thích chat thẳng */}
            <div style={{ textAlign: 'center', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Hoặc nếu bạn muốn trao đổi trực tiếp ngay lập tức:</p>
              <button onClick={openAppMessenger} style={{
                display: 'inline-block', padding: '12px 24px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '13px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s ease'
              }}>
                💬 CHAT TRỰC TIẾP KHÔNG CẦN FORM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. ALL RIGHTS RESERVED. DESIGNED FOR CEO VĂN.</p>
      </footer>
    </div>
  );
}
