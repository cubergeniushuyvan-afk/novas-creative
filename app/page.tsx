"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("theme-purple");
  const [copiedAlert, setCopiedAlert] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "14",
    service: "Slide PowerPoint học đường",
    requirements: ""
  });

  const MY_PHONE = "0399641646";
  const MY_EMAIL = "Cubergeniushuyvan@gmail.com";

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
      { threshold: 0.12 }
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

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText(MY_PHONE);
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 4000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Vui lòng điền Họ tên và Số điện thoại!");
      return;
    }

    const subject = encodeURIComponent(`[ĐƠN ĐẶT HÀNG NOVAS CREATIVE] từ ${formData.fullName}`);
    const body = encodeURIComponent(
      `✨ THÔNG TIN ĐƠN ĐẶT HÀNG NOVAS CREATIVE ✨\n\n` +
      `- Họ và tên: ${formData.fullName}\n` +
      `- Số điện thoại: ${formData.phone}\n` +
      `- Độ tuổi: ${formData.age}\n` +
      `- Dịch vụ yêu cầu: ${formData.service}\n` +
      `- Mô tả chi tiết:\n${formData.requirements || "Không có yêu cầu thêm"}\n\n` +
      `-----------------------------------------\n` +
      `Gửi từ Landing Page Novas Creative Studio.`
    );

    window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={theme} style={{
      minHeight: '100vh',
      backgroundColor: '#070913',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      transition: 'all 0.5s ease',
      position: 'relative'
    }}>
      <style>{`
        :root {
          --primary-glow: #a855f7;
          --secondary-glow: #ec4899;
          --accent-cyan: #06b6d4;
        }
        .theme-purple {
          --primary-glow: #a855f7;
          --secondary-glow: #ec4899;
          --accent-cyan: #38bdf8;
        }
        .theme-green {
          --primary-glow: #10b981;
          --secondary-glow: #06b6d4;
          --accent-cyan: #34d399;
        }
        .theme-blue {
          --primary-glow: #3b82f6;
          --secondary-glow: #8b5cf6;
          --accent-cyan: #60a5fa;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-45px) rotate(180deg) scale(1.15); }
        }

        @keyframes glowBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-title {
          background: linear-gradient(135deg, #ffffff 10%, var(--accent-cyan) 45%, var(--secondary-glow) 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 35px rgba(168, 85, 247, 0.45));
        }

        .glow-btn-primary {
          background: linear-gradient(135deg, var(--primary-glow), var(--secondary-glow));
          box-shadow: 0 0 35px rgba(168, 85, 247, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glow-btn-primary:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 0 55px rgba(236, 72, 153, 0.75), inset 0 1px 2px rgba(255, 255, 255, 0.6);
        }

        .card-cyber-bright {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-cyber-bright:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px var(--primary-glow);
        }

        .gradient-border-box {
          position: relative;
          background: rgba(15, 23, 42, 0.85);
          border-radius: 24px;
          backdrop-filter: blur(25px);
        }
        .gradient-border-box::before {
          content: "";
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          border-radius: 26px;
          background: linear-gradient(90deg, var(--primary-glow), var(--accent-cyan), var(--secondary-glow), var(--primary-glow));
          background-size: 300% 300%;
          z-index: -1;
          animation: glowBorder 6s linear infinite;
        }

        .cyber-input-bright {
          background: rgba(3, 7, 18, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .cyber-input-bright:focus {
          outline: none;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 25px var(--accent-cyan);
        }

        .reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .mobile-padding { padding-left: 18px !important; padding-right: 18px !important; }
        }
      `}</style>

      {/* Dynamic Background Lights */}
      <div style={{
        position: 'fixed', top: '-10%', left: '20%',
        width: '650px', height: '650px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(0,0,0,0) 70%)',
        opacity: 0.35, pointerEvents: 'none', animation: 'floatOrb 12s infinite ease-in-out', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', right: '15%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, var(--accent-cyan) 0%, rgba(0,0,0,0) 70%)',
        opacity: 0.25, pointerEvents: 'none', animation: 'floatOrb 15s infinite ease-in-out reverse', zIndex: 0
      }} />

      {/* Header Bar */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(7, 9, 19, 0.85)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '22px', fontWeight: '900', letterSpacing: '2px',
            background: 'linear-gradient(90deg, #ffffff, var(--accent-cyan))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span style={{ fontSize: '24px' }}>⚡</span> NOVAS CREATIVE
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <button onClick={() => changeTheme('theme-purple')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', border: 'none', cursor: 'pointer' }} title="Neon Violet"></button>
              <button onClick={() => changeTheme('theme-green')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #06b6d4)', border: 'none', cursor: 'pointer' }} title="Cyber Emerald"></button>
              <button onClick={() => changeTheme('theme-blue')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', cursor: 'pointer' }} title="Electric Sapphire"></button>
            </div>

            <nav className="header-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="#services" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>DỊCH VỤ</a>
              <a href="#guide" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>HƯỚNG DẪN</a>
              <a href="#order" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>ĐẶT HÀNG</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="reveal mobile-padding" style={{ padding: '110px 24px 70px', textAlign: 'center', maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 24px', borderRadius: '30px',
          background: 'rgba(255,255,255,0.06)', border: '1px solid var(--accent-cyan)',
          color: 'var(--accent-cyan)', fontSize: '12px', fontWeight: '900', letterSpacing: '2px', marginBottom: '28px', textTransform: 'uppercase'
        }}>
          <span>🚀</span> THIẾT KẾ SLIDE & GIÁO ÁN ĐIỆN TỬ SỐ 1 VIỆT NAM
        </div>

        <h1 className="hero-title" style={{ fontSize: '64px', fontWeight: '900', lineHeight: '1.12', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
          Ý TƯỞNG HỌC ĐƯỜNG.<br />TRÌNH CHIẾU CỰC KÌ MẠNH MẼ.
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '19px', lineHeight: '1.7', maxWidth: '750px', margin: '0 auto 40px' }}>
          Biến các trang thuyết trình khô khan thành kiệt tác đồ họa sống động. Không lo lỗi đăng nhập – Phản hồi tận tâm trong vòng <strong style={{ color: '#ffffff' }}>tối đa 4 tiếng</strong> trở lại!
        </p>

        <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#order" className="glow-btn-primary" style={{ color: '#ffffff', textDecoration: 'none', padding: '18px 42px', borderRadius: '16px', fontSize: '15px', fontWeight: '900', letterSpacing: '1px' }}>
            ⚡ ĐẶT HÀNG SIÊU TỐC (HOÀN THÀNH 48H)
          </a>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="reveal mobile-padding" style={{ padding: '10px 24px 60px', maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="card-cyber-bright grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '36px', borderRadius: '28px', textAlign: 'center', gap: '24px' }}>
          <div>
            <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px' }}>≤ 4 Giờ</div>
            <div style={{ fontSize: '13px', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: '900', letterSpacing: '1px' }}>PHẢN HỒI THẦN TỐC</div>
          </div>
          <div>
            <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px' }}>48 Giờ</div>
            <div style={{ fontSize: '13px', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: '900', letterSpacing: '1px' }}>HOÀN THÀNH BÀI GIẢNG</div>
          </div>
          <div>
            <div style={{ fontSize: '42px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px' }}>100%</div>
            <div style={{ fontSize: '13px', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: '900', letterSpacing: '1px' }}>HIỆU ỨNG MORPH MƯỢT MÀ</div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px', color: '#ffffff' }}>
          ⚡ DỊCH VỤ THIẾT KẾ DẪN ĐẦU
        </h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '52px', fontSize: '16px' }}>Đột phá mọi giới hạn hình ảnh học đường & sư phạm chuyên nghiệp.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          <div className="card-cyber-bright" style={{ padding: '42px', borderRadius: '28px' }}>
            <div style={{ fontSize: '42px', marginBottom: '18px' }}>💻</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 14px 0', color: '#ffffff' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Toán, Văn, Sử, Địa, Lý, Hóa, Sinh, Tiếng Anh... Tích hợp hiệu ứng chuyển động Morph hiện đại, đồ họa trực quan giúp bạn tỏa sáng mọi buổi thuyết trình.
            </p>
          </div>

          <div className="card-cyber-bright" style={{ padding: '42px', borderRadius: '28px' }}>
            <div style={{ fontSize: '42px', marginBottom: '18px' }}>📚</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 14px 0', color: '#ffffff' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Bài giảng trực quan sinh động dành riêng cho thầy cô dự giờ, thi giáo viên dạy giỏi. Bố cục logic, khoa học và cực kỳ ấn tượng.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section id="guide" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px', color: '#ffffff' }}>
          📖 LIÊN HỆ ĐƠN GIẢN - 100% KHÔNG LỖI
        </h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '52px', fontSize: '16px' }}>Chủ động kết nối nhịp nhàng, phản hồi trong vòng <strong style={{ color: '#ffffff' }}>tối đa 4 tiếng</strong>:</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          <div className="card-cyber-bright" style={{ padding: '38px', borderRadius: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '16px', fontWeight: '900', color: 'var(--accent-cyan)' }}>📱 Cách 1: Qua Zalo Trực Tiếp</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.9', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li><strong>Bước 1:</strong> Bấm nút sao chép số Zalo <strong style={{ color: 'var(--accent-cyan)' }}>0399.641.646</strong> bên dưới.</li>
              <li><strong>Bước 2:</strong> Mở ứng dụng Zalo trên máy, tìm kiếm số để mở ô chat với Văn.</li>
              <li><strong>Bước 3:</strong> Nhắn bất cứ điều gì bạn muốn, Văn sẽ tiếp nhận và chốt đơn trong <strong style={{ color: '#ffffff' }}>≤ 4 giờ</strong>!</li>
            </ul>
          </div>

          <div className="card-cyber-bright" style={{ padding: '38px', borderRadius: '28px' }}>
            <div style={{ fontSize: '28px', marginBottom: '16px', fontWeight: '900', color: 'var(--accent-cyan)' }}>📧 Cách 2: Gửi Đơn Tự Động Qua Gmail</div>
            <ul style={{ color: '#cbd5e1', lineHeight: '1.9', fontSize: '15px', paddingLeft: '22px', margin: 0 }}>
              <li><strong>Bước 1:</strong> Điền đầy đủ thông tin yêu cầu vào form bên dưới.</li>
              <li><strong>Bước 2:</strong> Bấm nút <strong style={{ color: '#ffffff' }}>"GỬI ĐƠN QUA GMAIL"</strong>. Ứng dụng email tự động điền sẵn nội dung.</li>
              <li><strong>Bước 3:</strong> Bấm Gửi thư và nhận phản hồi chu đáo qua email trong vòng <strong style={{ color: '#ffffff' }}>tối đa 4 tiếng</strong>!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Direct Action & Form Area */}
      <section id="order" className="reveal mobile-padding" style={{ padding: '80px 24px 100px', maxWidth: '720px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="gradient-border-box" style={{ padding: '44px', boxShadow: '0 30px 70px rgba(0,0,0,0.9)' }}>
          
          {/* Quick Contact Banner */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '28px',
            borderRadius: '20px',
            textAlign: 'center',
            marginBottom: '38px'
          }}>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ⚡ CHAT TRỰC TIẾP KHÔNG LO ĐĂNG NHẬP
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: '0 0 20px 0', fontWeight: '600', lineHeight: '1.6' }}>
              Zalo/SĐT: <strong style={{ color: 'var(--accent-cyan)', fontSize: '18px' }}>0399.641.646</strong><br />
              Gmail: <strong style={{ color: 'var(--accent-cyan)' }}>Cubergeniushuyvan@gmail.com</strong><br />
              Phản hồi thần tốc trong vòng <strong style={{ color: '#ffffff' }}>tối đa 4 tiếng</strong>!
            </p>
            <button onClick={handleCopyPhone} className="glow-btn-primary" style={{
              width: '100%', padding: '18px', borderRadius: '14px', border: 'none',
              color: '#ffffff', fontWeight: '900', fontSize: '15px', letterSpacing: '1px',
              cursor: 'pointer', textTransform: 'uppercase'
            }}>
              📋 SAO CHÉP SỐ ZALO NHẮN TIN NGAY
            </button>
          </div>

          {copiedAlert && (
            <div style={{
              marginBottom: '26px', padding: '16px', borderRadius: '14px',
              background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399',
              textAlign: 'center', fontSize: '14px', fontWeight: '800'
            }}>
              🎉 ĐÃ SAO CHÉP SỐ ZALO: 0399641646! Hãy mở Zalo lên và dán vào ô tìm kiếm để chat với Văn nhé!
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0 32px 0', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#64748b', letterSpacing: '1.5px' }}>HOẶC ĐIỀN ĐƠN GỬI QUA GMAIL (48H)</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }}></div>
          </div>

          <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>HỌ VÀ TÊN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nhập họ tên của bạn" className="cyber-input-bright" style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>SỐ ĐIỆN THOẠI *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="cyber-input-bright" style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="cyber-input-bright" style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>LOẠI DỊCH VỤ</label>
              <select name="service" value={formData.service} onChange={handleChange} className="cyber-input-bright" style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="cyber-input-bright" style={{ width: '100%', padding: '16px 20px', borderRadius: '14px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" className="glow-btn-primary" style={{
              width: '100%', padding: '20px', border: 'none', borderRadius: '16px',
              color: '#ffffff', fontWeight: '900', fontSize: '16px', letterSpacing: '1.5px',
              cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase'
            }}>
              📧 GỬI ĐƠN QUA GMAIL
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '45px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. ALL RIGHTS RESERVED. DESIGNED FOR CEO VĂN.</p>
      </footer>
    </div>
  );
}
