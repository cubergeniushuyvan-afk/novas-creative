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

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText(MY_PHONE);
      setCopiedAlert(true);
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
          50% { transform: translateY(-40px) scale(1.18); }
        }

        .cyber-grid-bg {
          background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .hero-title {
          background: linear-gradient(135deg, #ffffff 0%, var(--accent-color) 50%, var(--secondary-glow) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 40px rgba(192, 132, 252, 0.5));
        }

        .glow-btn {
          background: linear-gradient(90deg, var(--primary-glow), var(--secondary-glow));
          box-shadow: 0 0 35px var(--primary-glow);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glow-btn:hover {
          transform: translateY(-5px) scale(1.04);
          box-shadow: 0 0 60px var(--secondary-glow);
        }

        .direct-chat-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 2px solid var(--accent-color);
          box-shadow: 0 0 25px rgba(192, 132, 252, 0.35);
          transition: all 0.35s ease;
        }
        .direct-chat-btn:hover {
          background: var(--accent-color);
          color: #000 !important;
          box-shadow: 0 0 45px var(--accent-color);
          transform: translateY(-3px) scale(1.02);
        }

        .card-cyber {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-cyber:hover {
          border-color: var(--accent-color);
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px var(--primary-glow);
        }

        .cyber-input {
          background: rgba(3, 7, 18, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #f8fafc;
          transition: all 0.3s ease;
        }
        .cyber-input:focus {
          outline: none;
          border-color: var(--primary-glow);
          box-shadow: 0 0 25px var(--primary-glow);
        }

        .reveal {
          opacity: 0;
          transform: translateY(60px) scale(0.95);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .mobile-padding { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>

      {/* Cyber Grid Overlay */}
      <div className="cyber-grid-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.4 }} />

      {/* Background Orbs */}
      <div style={{
        position: 'fixed', top: '-15%', left: '50%', transform: 'translateX(-50%)',
        width: '850px', height: '850px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(0,0,0,0) 70%)',
        opacity: 0.3, pointerEvents: 'none', animation: 'floatOrb 9s infinite ease-in-out', zIndex: 0
      }} />

      {/* Header */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(3, 7, 18, 0.88)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '22px', fontWeight: '900', letterSpacing: '2.5px',
            background: 'linear-gradient(90deg, #fff, var(--accent-color))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            display: 'flex', alignItems: 'center', gap: '8px', filter: 'drop-shadow(0 0 15px rgba(192,132,252,0.4))'
          }}>
            ⚡ NOVAS CREATIVE
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.12)' }}>
              <button onClick={() => changeTheme('theme-purple')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#8b5cf6', border: 'none', cursor: 'pointer' }} title="Neon Purple"></button>
              <button onClick={() => changeTheme('theme-green')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#10b981', border: 'none', cursor: 'pointer' }} title="Matrix Green"></button>
              <button onClick={() => changeTheme('theme-blue')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#3b82f6', border: 'none', cursor: 'pointer' }} title="Cyber Blue"></button>
            </div>

            <nav className="header-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>DỊCH VỤ</a>
              <a href="#guide" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>HƯỚNG DẪN</a>
              <a href="#order" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>ĐẶT HÀNG</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="reveal mobile-padding" style={{ padding: '120px 24px 80px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'inline-block', padding: '8px 22px', borderRadius: '30px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)', fontSize: '12px', fontWeight: '900', letterSpacing: '2.5px', marginBottom: '24px', textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(192,132,252,0.2)'
        }}>
          🔥 THIẾT KẾ SLIDE & GIÁO ÁN ĐIỆN TỬ SỐ 1 VIỆT NAM
        </div>

        <h1 className="hero-title" style={{ fontSize: '62px', fontWeight: '900', lineHeight: '1.15', margin: '0 0 24px 0', letterSpacing: '-1.5px' }}>
          Ý TƯỞNG HỌC ĐƯỜNG.<br />TRÌNH CHIẾU CỰC KÌ MẠNH MẼ.
        </h1>

        <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.7', maxWidth: '740px', margin: '0 auto 40px' }}>
          Biến mọi bài thuyết trình thành kiệt tác đồ họa đỉnh cao. Không lo đăng nhập rườm rà - Liên hệ trực tiếp qua Zalo hoặc Gmail, phản hồi nhanh chóng trong vòng <strong style={{ color: '#fff' }}>tối đa 4 tiếng</strong>!
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#order" className="glow-btn" style={{ color: '#fff', textDecoration: 'none', padding: '18px 40px', borderRadius: '16px', fontSize: '15px', fontWeight: '900', letterSpacing: '1.5px' }}>
            ⚡ ĐẶT HÀNG NGAY (HOÀN THÀNH 48H)
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="reveal mobile-padding" style={{ padding: '20px 24px', maxWidth: '1000px', margin: '0 auto 60px' }}>
        <div className="card-cyber grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '36px', borderRadius: '24px', textAlign: 'center', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '38px', fontWeight: '900', color: '#fff' }}>≤ 4 Giờ</div>
            <div style={{ fontSize: '12px', color: 'var(--accent-color)', marginTop: '6px', fontWeight: '900', letterSpacing: '1px' }}>PHẢN HỒI THẦN TỐC</div>
          </div>
          <div>
            <div style={{ fontSize: '38px', fontWeight: '900', color: '#fff' }}>48 Giờ</div>
            <div style={{ fontSize: '12px', color: 'var(--accent-color)', marginTop: '6px', fontWeight: '900', letterSpacing: '1px' }}>HOÀN THÀNH SIÊU TỐC</div>
          </div>
          <div>
            <div style={{ fontSize: '38px', fontWeight: '900', color: '#fff' }}>100% Không Lỗi</div>
            <div style={{ fontSize: '12px', color: 'var(--accent-color)', marginTop: '6px', fontWeight: '900', letterSpacing: '1px' }}>KHÔNG BẮT ĐĂNG NHẬP</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '34px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px' }}>
          ⚡ DỊCH VỤ THIẾT KẾ ĐỈNH CAO
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>Đột phá mọi giới hạn đồ họa học đường và sư phạm.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
          <div className="card-cyber" style={{ padding: '40px', borderRadius: '26px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>💻</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 14px 0', color: '#fff' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Thiết kế chuyên sâu cho mọi môn học: Toán, Văn, Sử, Địa, Lý, Hóa... Tích hợp hiệu ứng chuyển động mượt mà, layout hiện đại giúp chinh phục mọi điểm 10.
            </p>
          </div>

          <div className="card-cyber" style={{ padding: '40px', borderRadius: '26px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 14px 0', color: '#fff' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Bài giảng trực quan sinh động dành riêng cho giáo viên dự giờ, thi giáo viên dạy giỏi. Bố cục logic, khoa học và cực kỳ trang trọng.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Guide Section */}
      <section id="guide" className="reveal mobile-padding" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '34px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', letterSpacing: '1px' }}>
          📖 HƯỚNG DẪN LIÊN HỆ KHÔNG BỊ LỖI ĐĂNG NHẬP
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '15px' }}>Giao tiếp mượt mà, cam kết phản hồi trong vòng <strong style={{ color: '#fff' }}>tối đa 4 tiếng</strong>:</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
          <div className="card-cyber" style={{ padding: '36px', borderRadius: '26px' }}>
            <div style={{ fontSize: '30px', marginBottom: '16px' }}>📱 Cách 1: Liên Hệ Zalo Trực Tiếp</div>
            <ul style={{ color: '#94a3b8', lineHeight: '1.9', fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
              <li><strong>Bước 1:</strong> Bấm nút sao chép số Zalo <strong style={{ color: 'var(--accent-color)' }}>0399.641.646</strong> ở khung bên dưới.</li>
              <li><strong>Bước 2:</strong> Mở ứng dụng Zalo trên điện thoại hoặc máy tính, tìm kiếm số điện thoại để nhắn tin cho Văn.</li>
              <li><strong>Bước 3:</strong> Nói gì cũng được (yêu cầu bài tập, slide...), Văn sẽ tiếp nhận và phản hồi trong vòng <strong style={{ color: '#fff' }}>≤ 4 giờ</strong>!</li>
            </ul>
          </div>

          <div className="card-cyber" style={{ padding: '36px', borderRadius: '26px' }}>
            <div style={{ fontSize: '30px', marginBottom: '16px' }}>📧 Cách 2: Gửi Đơn Qua Gmail</div>
            <ul style={{ color: '#94a3b8', lineHeight: '1.9', fontSize: '14px', paddingLeft: '20px', margin: 0 }}>
              <li><strong>Bước 1:</strong> Điền thông tin yêu cầu vào form đặt hàng bên dưới.</li>
              <li><strong>Bước 2:</strong> Bấm nút <strong style={{ color: '#fff' }}>"GỬI ĐƠN QUA GMAIL"</strong>. Ứng dụng email tự động mở ra với hòm thư <strong style={{ color: '#fff' }}>Cubergeniushuyvan@gmail.com</strong>.</li>
              <li><strong>Bước 3:</strong> Bấm Gửi và chờ phản hồi qua email trong vòng <strong style={{ color: '#fff' }}>tối đa 4 tiếng</strong>!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Order Form & Direct Contact Section */}
      <section id="order" className="reveal mobile-padding" style={{ padding: '80px 24px', maxWidth: '680px', margin: '0 auto' }}>
        <div className="card-cyber" style={{ padding: '40px', borderRadius: '30px', boxShadow: '0 25px 60px rgba(0,0,0,0.9)' }}>
          
          {/* PHẦN HIỂN THỊ SỐ ZALO VÀ GMAIL NỔI BẬT */}
          <div style={{
            background: 'rgba(192, 132, 252, 0.1)',
            border: '2px solid var(--accent-color)',
            padding: '28px',
            borderRadius: '22px',
            textAlign: 'center',
            marginBottom: '36px',
            boxShadow: '0 0 30px rgba(192,132,252,0.25)'
          }}>
            <h3 style={{ fontSize: '21px', fontWeight: '900', color: '#fff', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ⚡ LIÊN HỆ TRỰC TIẾP KHÔNG LO ĐĂNG NHẬP
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: '0 0 16px 0', fontWeight: '600', lineHeight: '1.6' }}>
              Zalo/SĐT: <strong style={{ color: 'var(--accent-color)', fontSize: '18px' }}>0399.641.646</strong><br />
              Gmail: <strong style={{ color: 'var(--accent-color)' }}>Cubergeniushuyvan@gmail.com</strong><br />
              Phản hồi cực nhanh trong vòng <strong style={{ color: '#fff' }}>tối đa 4 tiếng</strong>!
            </p>
            <button onClick={handleCopyPhone} className="direct-chat-btn" style={{
              width: '100%', padding: '16px', borderRadius: '14px',
              color: '#fff', fontWeight: '900', fontSize: '15px', letterSpacing: '1px',
              cursor: 'pointer', textTransform: 'uppercase'
            }}>
              📋 SAO CHÉP SỐ ZALO NHẮN TIN NGAY
            </button>
          </div>

          {copiedAlert && (
            <div style={{
              marginBottom: '25px', padding: '14px', borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#34d399',
              textAlign: 'center', fontSize: '13px', fontWeight: '800'
            }}>
              🎉 ĐÃ SAO CHÉP SỐ ZALO: 0399641646! Hãy mở Zalo lên và dán vào ô tìm kiếm nhé!
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 30px 0', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#64748b', letterSpacing: '1.5px' }}>HOẶC ĐIỀN ĐƠN GỬI QUA GMAIL (48H)</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          </div>

          <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>HỌ VÀ TÊN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nhập họ tên của bạn" className="cyber-input" style={{ width: '100%', padding: '15px 18px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>SỐ ĐIỆN THOẠI *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="cyber-input" style={{ width: '100%', padding: '15px 18px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="cyber-input" style={{ width: '100%', padding: '15px 18px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>LOẠI DỊCH VỤ</label>
              <select name="service" value={formData.service} onChange={handleChange} className="cyber-input" style={{ width: '100%', padding: '15px 18px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#cbd5e1', marginBottom: '8px', letterSpacing: '0.5px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="cyber-input" style={{ width: '100%', padding: '15px 18px', borderRadius: '12px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" className="glow-btn" style={{
              width: '100%', padding: '18px', border: 'none', borderRadius: '14px',
              color: '#fff', fontWeight: '900', fontSize: '15px', letterSpacing: '1.5px',
              cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #00c6ff, #0072ff)'
            }}>
              📧 GỬI ĐƠN QUA GMAIL
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. ALL RIGHTS RESERVED. DESIGNED FOR CEO VĂN.</p>
      </footer>
    </div>
  );
}
