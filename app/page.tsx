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

  // Link API SheetDB chính chủ của Huỳnh Huy Văn đã được tích hợp sẵn 100%
  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_EMAIL = "Cubergeniushuyvan@gmail.com";
  const MY_PHONE = "0399641646";

  useEffect(() => {
    // Hiệu ứng cuộn lặp đi lặp lại mượt mà (Lướt tới hiện, lướt đi ẩn)
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

    // Chuẩn bị dữ liệu để bắn tự động vào Google Sheets
    const orderData = {
      "Ngay": new Date().toLocaleString("vi-VN"),
      "Họ và tên": formData.fullName,
      "điện thoại": formData.phone,
      "độ tuổi": formData.age,
      "dịch vụ": formData.service,
      "yêu cầu": formData.requirements || "Không có"
    };

    try {
      // Gửi tự động ngầm vào Google Sheets qua SheetDB
      await fetch(SHEETDB_API, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ data: [orderData] })
      });
    } catch (err) {
      console.log("Lỗi gửi dữ liệu Sheets:", err);
    }

    // Soạn email thông báo dự phòng về Gmail của Văn
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

    // Mở hòm thư Gmail thông báo
    setTimeout(() => {
      window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    }}>
      <style>{`
        /* Hiệu ứng lặp đi lặp lại khi cuộn trang */
        .reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.97);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .clean-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          transition: all 0.35s ease;
        }
        .clean-card:hover {
          border-color: #2563eb;
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.1);
        }

        .btn-blue {
          background: #2563eb;
          color: white;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
          transition: all 0.25s ease;
        }
        .btn-blue:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
        }

        .form-control {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #0f172a;
          transition: all 0.2s ease;
        }
        .form-control:focus {
          outline: none;
          border-color: #2563eb;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title { font-size: 34px !important; }
        }
      `}</style>

      {/* Header Chuyên Nghiệp */}
      <header style={{
        borderBottom: '1px solid #e2e8f0',
        background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '19px', fontWeight: '900', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ NOVAS CREATIVE <span style={{ fontSize: '11px', background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '6px' }}>STUDIO</span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a href="#about" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>GIỚI THIỆU</a>
            <a href="#services" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>DỊCH VỤ</a>
            <a href="#order" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }}>ĐẶT ĐƠN HÀNG</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="reveal" style={{ padding: '75px 24px 45px', textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
        
        <div style={{
          background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px 22px',
          borderRadius: '20px', marginBottom: '28px', color: '#1e40af', fontSize: '14px', fontWeight: '700', lineHeight: '1.6'
        }}>
          🛡️ Dự án thiết kế độc quyền bởi <strong style={{ color: '#1d4ed8' }}>Huỳnh Huy Văn</strong> phục vụ học sinh, sinh viên — cam kết sáng tạo thủ công bằng PowerPoint, <strong style={{ color: '#1d4ed8' }}>nói không với lạm dụng AI</strong>.
        </div>

        <h1 className="hero-title" style={{ fontSize: '46px', fontWeight: '900', lineHeight: '1.25', margin: '0 0 18px 0', color: '#0f172a' }}>
          Thiết Kế Slide & Giáo Án<br />Chuyên Nghiệp • Uy Tín
        </h1>

        <p style={{ color: '#64748b', fontSize: '17px', lineHeight: '1.7', maxWidth: '680px', margin: '0 auto 35px' }}>
          Điền form đặt hàng tự động lưu trữ an toàn. Văn sẽ tiếp nhận và phản hồi nhanh chóng trong vòng <strong style={{ color: '#1d4ed8' }}>tối đa 4 tiếng</strong>!
        </p>
      </section>

      {/* Services Grid */}
      <section id="services" className="reveal" style={{ padding: '40px 24px', maxWidth: '1050px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>
          Dịch Vụ Cung Cấp
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>Tối ưu bài thuyết trình chuẩn phong cách đồ họa hiện đại.</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
          <div className="clean-card" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>💻</div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 12px 0', color: '#0f172a' }}>Slide PowerPoint Học Đường</h3>
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
              Thiết kế chuyên sâu mọi môn học (Toán, Văn, Sử, Địa, Anh...). Bố cục rõ ràng, hiệu ứng Morph mượt mà giúp bài thuyết trình nổi bật nhất lớp.
            </p>
          </div>

          <div className="clean-card" style={{ padding: '36px', borderRadius: '24px' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>📚</div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 12px 0', color: '#0f172a' }}>Giáo Án Điện Tử Sư Phạm</h3>
            <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
              Bài giảng điện tử sinh động, trực quan dành riêng cho thầy cô giáo phục vụ các tiết dạy dự giờ, thi giáo viên dạy giỏi cấp trường, cấp huyện.
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Bắn Vào Google Sheets */}
      <section id="order" className="reveal" style={{ padding: '40px 24px 80px', maxWidth: '750px', margin: '0 auto' }}>
        <div className="clean-card" style={{ padding: '42px', borderRadius: '28px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', margin: '0 0 8px 0', color: '#0f172a' }}>
            📋 HỆ THỐNG ĐẶT ĐƠN TỰ ĐỘNG
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>
            Điền thông tin bên dưới, dữ liệu sẽ được tự động lưu trữ vào hệ thống và gửi thông báo trực tiếp đến Văn.
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>HỌ VÀ TÊN CỦA BẠN *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Nhập họ và tên..." className="form-control" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>SỐ ĐIỆN THOẠI / ZALO *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-control" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>ĐỘ TUỔI</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>LOẠI DỊCH VỤ</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '800', color: '#334155', marginBottom: '6px' }}>MÔ TẢ CHI TIẾT YÊU CẦU</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Mô tả môn học, chủ đề, số lượng slide mong muốn..." className="form-control" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-blue" style={{
              width: '100%', padding: '18px', border: 'none', borderRadius: '12px',
              fontWeight: '900', fontSize: '15px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase'
            }}>
              {loading ? "ĐANG GỬI ĐƠN HÀNG..." : "🚀 GỬI ĐƠN ĐẶT HÀNG NGAY"}
            </button>
          </form>

          {successMsg && (
            <div style={{
              marginTop: '20px', padding: '16px', borderRadius: '12px',
              background: '#dcfce7', border: '1px solid #86efac', color: '#166534',
              textAlign: 'center', fontSize: '14px', fontWeight: '800', lineHeight: '1.6'
            }}>
              🎉 ĐƠN HÀNG ĐÃ ĐƯỢC TỰ ĐỘNG LƯU THÀNH CÔNG!<br />
              Văn sẽ tiếp nhận thông tin và phản hồi lại bạn trong vòng <strong>tối đa 4 tiếng</strong>!
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: '35px 24px', textAlign: 'center', color: '#64748b', fontSize: '13px', background: '#ffffff' }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
