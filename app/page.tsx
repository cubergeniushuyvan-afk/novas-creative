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

  const MY_PHONE = "0399641646";
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

  const handleOpenZalo = () => {
    // Mở thẳng deep-link hoặc link zalo trực tiếp qua số điện thoại
    window.location.href = `https://zalo.me/${MY_PHONE}`;
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
      `Dự án thiết kế chuyên nghiệp bởi Huỳnh Huy Văn.`
    );

    window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    }}>
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .professional-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05);
          transition: all 0.4s ease;
        }
        .professional-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -10px rgba(37, 99, 235, 0.12);
          border-color: #3b82f6;
        }

        .btn-action {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
          transition: all 0.3s ease;
        }
        .btn-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
        }

        .btn-zalo {
          background: linear-gradient(135deg, #0068ff, #0052cc);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 104, 255, 0.3);
          transition: all 0.3s ease;
        }
        .btn-zalo:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 104, 255, 0.45);
        }

        .form-input {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          transition: all 0.3s ease;
        }
        .form-input:focus {
          outline: none;
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 32px !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
        }
      `}</style>

      {/* Header Uy Tín */}
      <header style={{
        borderBottom: '1px solid #e2e8f0',
        background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '20px', fontWeight: '900', letterSpacing: '1px',
            color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            ⚡ NOVAS CREATIVE <span style={{ fontSize: '12px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '6px' }}>STUDIO</span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#about" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>GIỚI THIỆU</a>
            <a href="#services" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>DỊCH VỤ</a>
            <a href="#order" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>LIÊN HỆ & ĐẶT ĐƠN</a>
          </nav>
        </div>
      </header>

      {/* Hero Section với Lời Ngỏ Của Huỳnh Huy Văn */}
      <section className="reveal" style={{ padding: '80px 24px 50px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Lời ngỏ dự án chính chủ */}
        <div style={{
          background: '#eff6ff', border: '1px solid #bfdbfe', padding: '16px 24px',
          borderRadius: '16px', marginBottom: '30px', color: '#1e40af', fontSize: '14px', fontWeight: '600', lineHeight: '1.6',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.05)'
        }}>
          🛡️ Đây là dự án sáng tạo của <strong style={{ color: '#1d4ed8' }}>Huỳnh Huy Văn</strong>, nỗ lực mang lại các sản phẩm PowerPoint thủ công chất lượng cao, phục vụ nhu cầu học tập và thuyết trình của học sinh, sinh viên — cam kết <strong style={{ color: '#1d4ed8' }}>không lạm dụng AI</strong>.
        </div>

        <h1 className="hero-title" style={{ fontSize: '50px', fontWeight: '900', lineHeight: '1.2', margin: '0 0 20px 0', color: '#0f172a' }}>
          Thiết Kế Slide & Giáo Án<br />Chuyên Nghiệp & Uy Tín
        </h1>

        <p style={{ color: '#64748b', fontSize: '17px', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto 35px' }}>
          Biến các bài thuyết trình học đường và giáo án sư phạm trở nên sinh động, khoa học và ấn tượng. Hỗ trợ nhanh chóng, cam kết hoàn thành đúng hạn 48 giờ.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#order" className="btn-action" style={{ textDecoration: 'none', padding: '16px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: '800' }}>
            🚀 ĐẶT ĐƠN NGAY
          </a>
          <a href="#services" style={{ background: '#f1f5f9', color: '#334155', textDecoration: 'none', padding: '16px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: '800', border: '1px solid #e2e8f0' }}>
            Xem Dịch Vụ
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal" style={{ padding: '50px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>
          Dịch Vụ Cung Cấp
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>Giải pháp trình chiếu tối ưu cho học sinh và giáo viên.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
          <div className="professional-card" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>💻</div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 12px 0', color: '#0f172a' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
              Thiết kế slide thuyết trình mọi môn học (Toán, Văn, Sử, Địa, Anh...). Bố cục rõ ràng, hiệu ứng Morph mượt mà giúp tự tin ghi điểm tuyệt đối trước hội đồng.
            </p>
          </div>

          <div className="professional-card" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 12px 0', color: '#0f172a' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
              Hỗ trợ thầy cô giáo soạn thảo giáo án điện tử trực quan, sinh động phục vụ cho các tiết dạy dự giờ, thi giáo viên dạy giỏi cấp trường, cấp huyện.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Order Section (Chỉ đúng 2 mục: Zalo & Gmail) */}
      <section id="order" className="reveal" style={{ padding: '50px 24px 80px', maxWidth: '700px', margin: '0 auto' }}>
        <div className="professional-card" style={{ padding: '40px', borderRadius: '28px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', margin: '0 0 8px 0', color: '#0f172a' }}>
            Liên Hệ & Gửi Đơn Nhanh
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
            Lựa chọn hình thức liên hệ dưới đây. Hệ thống sẽ tự động bật ứng dụng, không cần đăng nhập rườm rà.
          </p>

          {/* 2 Nút liên hệ chính cực kỳ uy tín */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '35px' }}>
            <button onClick={handleOpenZalo} className="btn-zalo" style={{
              padding: '16px', borderRadius: '14px', border: 'none',
              fontWeight: '800', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              💬 Chat Zalo (0399.641.646)
            </button>

            <a href={`mailto:${MY_EMAIL}`} className="btn-action" style={{
              textDecoration: 'none', padding: '16px', borderRadius: '14px',
              fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}>
              📧 Gửi Qua Gmail
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', margin: '25px 0', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', letterSpacing: '1px' }}>HOẶC ĐIỀN FORM TỰ ĐỘNG GỬI GMAIL</span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          </div>

          <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>HỌ VÀ TÊN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nhập họ tên của bạn" className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>SỐ ĐIỆN THOẠI *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>LOẠI DỊCH VỤ</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="form-input" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" className="btn-action" style={{
              width: '100%', padding: '16px', border: 'none', borderRadius: '12px',
              fontWeight: '900', fontSize: '15px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.5px'
            }}>
              📧 SOẠN & GỬI ĐƠN QUA GMAIL
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '40px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', background: '#ffffff' }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
