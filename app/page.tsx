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

  // Link API SheetDB chính chủ của Huỳnh Huy Văn đã được tích hợp 100%
  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_EMAIL = "Cubergeniushuyvan@gmail.com";

  useEffect(() => {
    // Hiệu ứng cuộn lặp đi lặp lại mượt mà (Cuộn tới hiện, cuộn đi ẩn)
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
      backgroundColor: '#f4f7fc',
      color: '#0f172a',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        /* Dynamic Animations Học Đường */
        @keyframes floatItem {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(37, 99, 235, 0.15), inset 0 0 10px rgba(59, 130, 246, 0.05); }
          50% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.35), inset 0 0 15px rgba(59, 130, 246, 0.15); }
        }

        @keyframes textGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .floating-icon {
          position: absolute;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
          animation: floatItem 6s ease-in-out infinite;
        }

        .hero-title {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #0284c7 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradient 6s ease infinite;
        }

        .slogan-box {
          background: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%);
          border: 2px solid #bfdbfe;
          animation: pulseGlow 4s infinite ease-in-out;
          transition: all 0.3s ease;
        }
        .slogan-box:hover {
          transform: translateY(-2px) scale(1.01);
        }

        .reveal {
          opacity: 0;
          transform: translateY(35px) scale(0.98);
          transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .school-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .school-card:hover {
          border-color: #3b82f6;
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.18);
        }

        .btn-school-primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-school-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(37, 99, 235, 0.45);
        }

        .form-control {
          background: #f8fafc;
          border: 1.5px solid #cbd5e1;
          color: #0f172a;
          transition: all 0.25s ease;
        }
        .form-control:focus {
          outline: none;
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title { font-size: 34px !important; }
        }
      `}</style>

      {/* Floating Background School Elements */}
      <div className="floating-icon" style={{ top: '12%', left: '5%', fontSize: '48px', animationDelay: '0s' }}>📚</div>
      <div className="floating-icon" style={{ top: '25%', right: '6%', fontSize: '56px', animationDelay: '1.5s' }}>🎓</div>
      <div className="floating-icon" style={{ top: '55%', left: '4%', fontSize: '44px', animationDelay: '3s' }}>📐</div>
      <div className="floating-icon" style={{ top: '75%', right: '5%', fontSize: '50px', animationDelay: '2s' }}>🎨</div>
      <div className="floating-icon" style={{ top: '40%', right: '12%', fontSize: '38px', animationDelay: '4s' }}>✏️</div>

      {/* Header Uy Tín Academic */}
      <header style={{
        borderBottom: '1px solid #e2e8f0',
        background: 'rgba(255, 255, 255, 0.96)', backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🎓</span> NOVAS CREATIVE <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1d4ed8', padding: '3px 9px', borderRadius: '8px', fontWeight: '800' }}>ACADEMIC STUDIO</span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#about" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>GIỚI THIỆU</a>
            <a href="#services" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>DỊCH VỤ DẪN ĐẦU</a>
            <a href="#order" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>ĐẶT ĐƠN TỰ ĐỘNG</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="reveal" style={{ padding: '80px 24px 45px', textAlign: 'center', maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Khẩu hiệu chuẩn xác có hiệu ứng Glowing Animation */}
        <div className="slogan-box" style={{
          padding: '16px 26px', borderRadius: '24px', marginBottom: '32px',
          color: '#1e40af', fontSize: '15px', fontWeight: '700', lineHeight: '1.7', display: 'inline-block'
        }}>
          ✨ Dự án được sáng tạo bởi <strong style={{ color: '#1d4ed8' }}>Huỳnh Huy Văn</strong> — Nỗ lực hỗ trợ các bạn học sinh, sinh viên nâng cao chất lượng bài thuyết trình học đường mà <strong style={{ color: '#1d4ed8' }}>không bị lạm dụng AI</strong>.
        </div>

        <h1 className="hero-title" style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1.22', margin: '0 0 20px 0', letterSpacing: '-0.5px' }}>
          Thiết Kế Slide & Giáo Án<br />Chuẩn Học Đường • Đỉnh Cao Trình Chiếu
        </h1>

        <p style={{ color: '#64748b', fontSize: '18px', lineHeight: '1.75', maxWidth: '720px', margin: '0 auto 38px' }}>
          Biến ý tưởng bài học khô khan thành những trang thuyết trình sinh động, tư duy bố cục logic. Phản hồi tư vấn chu đáo trong vòng <strong style={{ color: '#1d4ed8' }}>tối đa 4 tiếng</strong>!
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal" style={{ padding: '45px 24px', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', color: '#0f172a' }}>
          🎯 DỊCH VỤ CHUYÊN SÂU HỌC ĐƯỜNG
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '45px', fontSize: '16px' }}>Đồng hành cùng học sinh, sinh viên và thầy cô trên toàn quốc.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          <div className="school-card" style={{ padding: '40px', borderRadius: '28px' }}>
            <div style={{ fontSize: '42px', marginBottom: '16px' }}>💻</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: '#0f172a' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Chuyên thiết kế tất cả các môn học (Toán, Văn, Lý, Hóa, Sinh, Sử, Địa, Tiếng Anh...). Tích hợp hiệu ứng chuyển động Morph mượt mà giúp bạn hoàn toàn làm chủ buổi thuyết trình.
            </p>
          </div>

          <div className="school-card" style={{ padding: '40px', borderRadius: '28px' }}>
            <div style={{ fontSize: '42px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: '#0f172a' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#64748b', lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              Hỗ trợ thầy cô soạn thảo giáo án điện tử sinh động, trực quan đầy đủ tư liệu minh họa phục vụ cho các tiết dạy dự giờ, thi giáo viên dạy giỏi các cấp.
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Bắn Vào Google Sheets */}
      <section id="order" className="reveal" style={{ padding: '45px 24px 85px', maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="school-card" style={{ padding: '45px', borderRadius: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', margin: '0 0 10px 0', color: '#0f172a' }}>
            📝 GỬI YÊU CẦU ĐẶT ĐƠN TỰ ĐỘNG
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', textAlign: 'center', marginBottom: '35px' }}>
            Thông tin sẽ tự động lưu vào Google Sheets và thông báo trực tiếp đến Văn.
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '8px', letterSpacing: '0.3px' }}>HỌ VÀ TÊN CỦA BẠN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nhập họ và tên..." className="form-control" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '8px', letterSpacing: '0.3px' }}>SỐ ĐIỆN THOẠI / ZALO *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-control" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '8px', letterSpacing: '0.3px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '8px', letterSpacing: '0.3px' }}>LOẠI DỊCH VỤ</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '8px', letterSpacing: '0.3px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="form-control" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-school-primary" style={{
              width: '100%', padding: '18px', border: 'none', borderRadius: '14px',
              fontWeight: '900', fontSize: '16px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'
            }}>
              {loading ? "ĐANG GỬI ĐƠN HÀNG..." : "🚀 GỬI ĐƠN ĐẶT HÀNG NGAY"}
            </button>
          </form>

          {successMsg && (
            <div style={{
              marginTop: '24px', padding: '18px', borderRadius: '16px',
              background: '#dcfce7', border: '1px solid #86efac', color: '#166534',
              textAlign: 'center', fontSize: '15px', fontWeight: '800', lineHeight: '1.6'
            }}>
              🎉 ĐƠN HÀNG ĐÃ ĐƯỢC TỰ ĐỘNG LƯU VÀO GOOGLE SHEETS THÀNH CÔNG!<br />
              Văn sẽ tiếp nhận thông tin và phản hồi lại bạn trong vòng <strong>tối đa 4 tiếng</strong>!
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '38px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', background: '#ffffff', position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE ACADEMIC STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
