"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "14",
    service: "Slide PowerPoint học đường",
    requirements: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Link API SheetDB chính chủ của Huỳnh Huy Văn
  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_EMAIL = "Cubergeniushuyvan@gmail.com";

  useEffect(() => {
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
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Vui lòng điền Họ tên và Số điện thoại!");
      return;
    }

    setLoading(true);

    const orderData = {
      "Ngay": new Date().toLocaleString("vi-VN"),
      "Họ và tên": formData.fullName,
      "điện thoại": formData.phone,
      "độ tuổi": formData.age,
      "dịch vụ": formData.service,
      "yêu cầu": formData.requirements || "Không có"
    };

    try {
      await fetch(SHEETDB_API, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ data: [orderData] })
      });
    } catch (err) {
      console.log("Lỗi gửi dữ liệu Sheets:", err);
    }

    const subject = encodeURIComponent(`[ĐƠN ĐẶT HÀNG MỚI] ${formData.fullName} - Novas Creative`);
    const body = encodeURIComponent(
      `✨ CÓ ĐƠN HÀNG MỚI TỪ WEBSITE ✨\n\n` +
      `- Họ và tên: ${formData.fullName}\n` +
      `- Số điện thoại/Zalo: ${formData.phone}\n` +
      `- Độ tuổi: ${formData.age}\n` +
      `- Dịch vụ: ${formData.service}\n` +
      `- Yêu cầu chi tiết:\n${formData.requirements || "Không có"}\n\n` +
      `-----------------------------------------\n` +
      `Đơn hàng tự động lưu từ Novas Creative Studio.`
    );

    setLoading(false);
    setSuccessMsg(true);

    setTimeout(() => {
      window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0f1d',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        @keyframes floatBig {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(12deg) scale(1.08); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 45px rgba(59, 130, 246, 0.45); }
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(37, 99, 235, 0.4)); }
          50% { filter: drop-shadow(0 0 35px rgba(59, 130, 246, 0.8)); }
        }

        .floating-icon-huge {
          position: absolute;
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
          animation: floatBig 7s ease-in-out infinite;
        }

        .hero-main-title {
          font-size: 54px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1px;
          background: linear-gradient(135deg, #ffffff 30%, #93c5fd 70%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleGlow 5s ease infinite;
        }

        .slogan-card-academic {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
          animation: pulseGlow 4s infinite ease-in-out;
        }

        .reveal {
          opacity: 0;
          transform: translateY(45px) scale(0.96);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .academic-glass-card {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .academic-glass-card:hover {
          border-color: #3b82f6;
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px rgba(37, 99, 235, 0.25);
        }

        .btn-academic-glow {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
          transition: all 0.3s ease;
        }
        .btn-academic-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.7);
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .form-input-academic {
          background: rgba(30, 41, 59, 0.9);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .form-input-academic:focus {
          outline: none;
          border-color: #3b82f6;
          background: rgba(15, 23, 42, 0.95);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-main-title { font-size: 36px !important; }
        }
      `}</style>

      {/* Floating Icon Bự Chảng & Hoành Tráng */}
      <div className="floating-icon-huge" style={{ top: '8%', left: '3%', fontSize: '85px', animationDelay: '0s' }}>📚</div>
      <div className="floating-icon-huge" style={{ top: '18%', right: '4%', fontSize: '95px', animationDelay: '1.2s' }}>🎓</div>
      <div className="floating-icon-huge" style={{ top: '42%', left: '2%', fontSize: '75px', animationDelay: '2.5s' }}>📐</div>
      <div className="floating-icon-huge" style={{ top: '65%', right: '3%', fontSize: '90px', animationDelay: '1.8s' }}>💡</div>
      <div className="floating-icon-huge" style={{ top: '85%', left: '6%', fontSize: '80px', animationDelay: '3.2s' }}>⚡</div>
      <div className="floating-icon-huge" style={{ top: '30%', right: '12%', fontSize: '65px', animationDelay: '4s' }}>✏️</div>

      {/* Header Chuyên Nghiệp Đỉnh Cao */}
      <header style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(10, 15, 29, 0.85)', backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '21px', fontWeight: '900', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.5px' }}>
            <span style={{ fontSize: '28px' }}>🎓</span> NOVAS CREATIVE <span style={{ fontSize: '11px', background: 'rgba(37, 99, 235, 0.3)', color: '#93c5fd', padding: '4px 10px', borderRadius: '8px', fontWeight: '800', border: '1px solid rgba(59, 130, 246, 0.4)' }}>ACADEMIC LAB</span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#about" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '700', transition: 'color 0.2s' }}>GIỚI THIỆU</a>
            <a href="#services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '700', transition: 'color 0.2s' }}>DỊCH VỤ CHUYÊN SÂU</a>
            <a href="#order" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '700', transition: 'color 0.2s' }}>ĐẶT ĐƠN TỰ ĐỘNG</a>
          </nav>
        </div>
      </header>

      {/* Hero Section: Tiêu đề bự + Khẩu hiệu nằm phía dưới chuẩn chỉnh */}
      <section id="about" className="reveal" style={{ padding: '90px 24px 50px', textAlign: 'center', maxWidth: '920px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        <h1 className="hero-main-title" style={{ margin: '0 0 24px 0' }}>
          Thiết Kế Slide & Giáo Án<br />Học Thuật Đỉnh Cao • Sáng Tạo Chuẩn Mực
        </h1>

        {/* Khẩu hiệu nằm dưới tiêu đề, trang trí hoành tráng */}
        <div className="slogan-card-academic" style={{
          padding: '20px 30px', borderRadius: '24px', marginBottom: '35px',
          color: '#cbd5e1', fontSize: '16px', fontWeight: '600', lineHeight: '1.8', display: 'inline-block',
          maxWidth: '820px'
        }}>
          💡 <strong style={{ color: '#60a5fa' }}>Dự án sáng tạo bởi Huỳnh Huy Văn:</strong> Nỗ lực mang lại giải pháp trình chiếu chất lượng, hỗ trợ đắc lực cho học sinh, sinh viên nâng cao hiệu quả thuyết trình học đường mà <strong style={{ color: '#60a5fa' }}>không bị lạm dụng AI</strong>.
        </div>

        <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.8', maxWidth: '750px', margin: '0 auto 40px' }}>
          Kết hợp tư duy bố cục logic, hình ảnh đồ họa sắc nét và hiệu ứng khoa học. Phản hồi tư vấn nhanh chóng trong vòng <strong style={{ color: '#60a5fa' }}>tối đa 4 tiếng</strong>!
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="#order" className="btn-academic-glow" style={{ textDecoration: 'none', padding: '18px 36px', borderRadius: '16px', fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>
            🚀 TRẢI NGHIỆM ĐẶT ĐƠN NGAY
          </a>
        </div>
      </section>

      {/* Services Section Bố Cục Chuyên Nghiệp */}
      <section id="services" className="reveal" style={{ padding: '50px 24px', maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '34px', fontWeight: '900', textAlign: 'center', marginBottom: '14px', color: '#ffffff', letterSpacing: '-0.5px' }}>
          ✨ HỆ THỐNG DỊCH VỤ TRÌNH CHUYÊN SÂU
        </h2>
        <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '50px', fontSize: '16px' }}>Giải pháp đồ họa học thuật toàn diện dành riêng cho môi trường giáo dục.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '35px' }}>
          <div className="academic-glass-card" style={{ padding: '45px', borderRadius: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '18px' }}>💻</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 16px 0', color: '#ffffff' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.85', fontSize: '15.5px', margin: 0 }}>
              Chuyên thiết kế bài thuyết trình mọi môn học (Toán, Văn, Lý, Hóa, Sinh, Sử, Địa, Anh...). Bố cục rõ ràng, tư duy thông tin mạch lạc kết hợp hiệu ứng Morph mượt mà giúp bạn tự tin tuyệt đối trước hội đồng.
            </p>
          </div>

          <div className="academic-glass-card" style={{ padding: '45px', borderRadius: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '18px' }}>📚</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 16px 0', color: '#ffffff' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#94a3b8', lineHeight: '1.85', fontSize: '15.5px', margin: 0 }}>
              Hỗ trợ thầy cô giáo soạn thảo giáo án điện tử sinh động, trực quan đầy đủ tư liệu trực quan chất lượng cao phục vụ các tiết dạy dự giờ, thi giáo viên dạy giỏi cấp trường và cấp huyện.
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
      <section id="order" className="reveal" style={{ padding: '50px 24px 90px', maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="academic-glass-card" style={{ padding: '50px', borderRadius: '36px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center', margin: '0 0 12px 0', color: '#ffffff' }}>
            📋 HỆ THỐNG ĐẶT ĐƠN TỰ ĐỘNG
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15.5px', textAlign: 'center', marginBottom: '40px' }}>
            Điền thông tin chi tiết bên dưới. Hệ thống sẽ tự động lưu vào cơ sở dữ liệu Google Sheets và thông báo cho Văn.
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#93c5fd', marginBottom: '8px', letterSpacing: '0.5px' }}>HỌ VÀ TÊN CỦA BẠN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="form-input-academic" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#93c5fd', marginBottom: '8px', letterSpacing: '0.5px' }}>SỐ ĐIỆN THOẠI / ZALO *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-input-academic" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#93c5fd', marginBottom: '8px', letterSpacing: '0.5px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input-academic" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#93c5fd', marginBottom: '8px', letterSpacing: '0.5px' }}>LOẠI DỊCH VỤ YÊU CẦU</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-input-academic" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường" style={{ background: '#0f172a' }}>Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử" style={{ background: '#0f172a' }}>Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#93c5fd', marginBottom: '8px', letterSpacing: '0.5px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={5} placeholder="Nhập môn học, chủ đề, số lượng slide hoặc yêu cầu đặc biệt..." className="form-input-academic" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-academic-glow" style={{
              width: '100%', padding: '20px', border: 'none', borderRadius: '16px',
              fontWeight: '900', fontSize: '16px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {loading ? "ĐANG LƯU VÀ GỬI ĐƠN..." : "🚀 XÁC NHẬN GỬI ĐƠN ĐẶT HÀNG"}
            </button>
          </form>

          {successMsg && (
            <div style={{
              marginTop: '25px', padding: '20px', borderRadius: '16px',
              background: 'rgba(22, 101, 52, 0.4)', border: '1px solid rgba(74, 222, 128, 0.4)', color: '#4ade80',
              textAlign: 'center', fontSize: '15px', fontWeight: '800', lineHeight: '1.6'
            }}>
              🎉 ĐƠN HÀNG ĐÃ ĐƯỢC TỰ ĐỘNG LƯU VÀO GOOGLE SHEETS THÀNH CÔNG!<br />
              Văn sẽ tiếp nhận thông tin và phản hồi lại bạn trong vòng <strong>tối đa 4 tiếng</strong>!
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '40px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', background: '#0a0f1d', position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE ACADEMIC STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
