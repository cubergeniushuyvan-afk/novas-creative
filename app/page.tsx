"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State quản lý form
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "14",
    service: "Slide PowerPoint học đường",
    requirements: ""
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // State tính năng cao cấp: Đổi ngôn ngữ (VI / EN) & Chế độ Sáng / Tối
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isFading, setIsFading] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
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

  // Hàm chuyển đổi ngôn ngữ mượt mà
  const toggleLanguage = () => {
    setIsFading(true);
    setTimeout(() => {
      setLang((prev) => (prev === "vi" ? "en" : "vi"));
      setIsFading(false);
    }, 350);
  };

  // Hàm đổi chế độ Sáng / Tối (Dark/Light mode)
  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert(lang === "vi" ? "Vui lòng điền Họ tên và Số điện thoại!" : "Please fill in Name and Phone!");
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
      console.log("Lỗi:", err);
    }

    const subject = encodeURIComponent(`[ĐƠN ĐẶT HÀNG MỚI] ${formData.fullName} - Novas Creative`);
    const body = encodeURIComponent(
      `✨ CÓ ĐƠN HÀNG MỚI TỪ WEBSITE ✨\n\n` +
      `- Họ tên: ${formData.fullName}\n` +
      `- SĐT/Zalo: ${formData.phone}\n` +
      `- Độ tuổi: ${formData.age}\n` +
      `- Dịch vụ: ${formData.service}\n` +
      `- Yêu cầu: ${formData.requirements || "Không có"}`
    );

    setLoading(false);
    setSuccessMsg(true);

    setTimeout(() => {
      window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
    }, 1200);
  };

  // Từ điển đa ngôn ngữ (Tiếng Việt & Tiếng Anh chuẩn xịn)
  const t = {
    vi: {
      brand: "NOVAS CREATIVE",
      tagline: "ACADEMIC STUDIO",
      navAbout: "GIỚI THIỆU",
      navServices: "DỊCH VỤ",
      navOrder: "ĐẶT ĐƠN",
      slogan: "Dự án sáng tạo bởi Huỳnh Huy Văn: Nỗ lực hỗ trợ học sinh, sinh viên nâng cao hiệu quả thuyết trình học đường mà không bị lạm dụng AI.",
      heroTitle: "Thiết Kế Slide & Giáo Án\nĐỉnh Cao Tri Thức • Chuẩn Mực",
      heroDesc: "Giải pháp trình chiếu học thuật sắc sảo, bố cục mạch lạc. Kiến tạo sự tự tin tuyệt đối trong mọi bài thuyết trình.",
      btnExplore: "🚀 ĐẶT ĐƠN NGAY",
      servicesTitle: "✨ DỊCH VỤ CHUYÊN SÂU",
      servicesDesc: "Đồ họa học thuật toàn diện phục vụ môi trường giáo dục hiện đại.",
      service1Title: "Slide PowerPoint Học Đường",
      service1Desc: "Thiết kế chuyên sâu mọi môn học với hiệu ứng Morph mượt mà, giúp bạn ghi điểm tuyệt đối trước hội đồng.",
      service2Title: "Giáo Án Điện Tử Sư Phạm",
      service2Desc: "Bài giảng trực quan sinh động hỗ trợ thầy cô giáo trong các tiết dạy dự giờ và thi giáo viên dạy giỏi.",
      orderTitle: "📋 HỆ THỐNG ĐẶT ĐƠN TỰ ĐỘNG",
      orderDesc: "Điền thông tin bên dưới, hệ thống sẽ tự động lưu vào Google Sheets.",
      labelName: "HỌ VÀ TÊN *",
      labelPhone: "SỐ ĐIỆN THOẠI / ZALO *",
      labelAge: "ĐỘ TUỔI",
      labelService: "LOẠI DỊCH VỤ",
      labelReq: "MÔ TẢ CHI TIẾT YÊU CẦU",
      btnSubmit: "🚀 XÁC NHẬN GỬI ĐƠN",
      btnSubmitting: "ĐANG XỬ LÝ...",
      successText: "🎉 ĐƠN HÀNG ĐÃ ĐƯỢC TỰ ĐỘNG LƯU VÀO GOOGLE SHEETS THÀNH CÔNG!",
      successSub: "Văn sẽ tiếp nhận và phản hồi lại bạn trong vòng tối đa 4 tiếng!",
      zaloContactText: "Hoặc liên hệ trực tiếp qua Zalo Huỳnh Huy Văn số điện thoại",
      zaloTime: "để được tư vấn (được hồi đáp trong nhiều nhất chỉ 4 tiếng)."
    },
    en: {
      brand: "NOVAS CREATIVE",
      tagline: "ACADEMIC STUDIO",
      navAbout: "ABOUT",
      navServices: "SERVICES",
      navOrder: "ORDER",
      slogan: "Creative project by Huỳnh Huy Văn: Supporting students to elevate academic presentations without AI over-reliance.",
      heroTitle: "Elite Slide & Lesson Design\nAcademic Excellence • Precision",
      heroDesc: "Sharp academic presentation solutions with cohesive layouts. Build absolute confidence in every presentation.",
      btnExplore: "🚀 ORDER NOW",
      servicesTitle: "✨ PREMIUM SERVICES",
      servicesDesc: "Comprehensive academic graphics tailored for modern educational environments.",
      service1Title: "Academic PowerPoint Slides",
      service1Desc: "In-depth design for all subjects with smooth Morph effects to help you score absolute points.",
      service2Title: "E-Lesson Plans for Teachers",
      service2Desc: "Vivid, intuitive lectures supporting teachers in model classes and teaching competitions.",
      orderTitle: "📋 AUTOMATED ORDER SYSTEM",
      orderDesc: "Fill out the info below, data will automatically sync to Google Sheets.",
      labelName: "FULL NAME *",
      labelPhone: "PHONE / ZALO *",
      labelAge: "AGE",
      labelService: "SERVICE TYPE",
      labelReq: "DETAILED REQUIREMENTS",
      btnSubmit: "🚀 CONFIRM & SEND ORDER",
      btnSubmitting: "PROCESSING...",
      successText: "🎉 ORDER AUTOMATICALLY SAVED TO GOOGLE SHEETS SUCCESSFULLY!",
      successSub: "Van will receive and respond to you within a maximum of 4 hours!",
      zaloContactText: "Or contact directly via Zalo Huỳnh Huy Văn at phone number",
      zaloTime: "for consultation (replied within a maximum of just 4 hours)."
    }
  };

  const currentText = t[lang];

  // Cấu hình màu sắc theo chế độ Light / Dark
  const isDark = theme === "dark";
  const bgMain = isDark ? "#0a0f1d" : "#f8fafc";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.85)" : "#ffffff";
  const cardBorder = isDark ? "rgba(59, 130, 246, 0.25)" : "#e2e8f0";
  const textSub = isDark ? "#94a3b8" : "#64748b";
  const inputBg = isDark ? "rgba(30, 41, 59, 0.9)" : "#f8fafc";
  const inputBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "#cbd5e1";

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgMain,
      color: textMain,
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'background-color 0.5s ease, color 0.5s ease'
    }}>
      <style>{`
        @keyframes floatHuge {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-35px) rotate(15deg) scale(1.1); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.2); }
          50% { box-shadow: 0 0 50px rgba(37, 99, 235, 0.45); }
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 15px rgba(37, 99, 235, 0.3)); }
          50% { filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.7)); }
        }

        .floating-icon-xl {
          position: absolute;
          opacity: 0.14;
          pointer-events: none;
          z-index: 0;
          animation: floatHuge 7s ease-in-out infinite;
        }

        .hero-title-main {
          font-size: 52px;
          font-weight: 900;
          line-height: 1.18;
          letter-spacing: -1px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 20%, #3b82f6 70%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleGlow 5s ease infinite;
        }

        .slogan-banner {
          background: ${isDark ? 'rgba(30, 41, 59, 0.75)' : 'rgba(239, 246, 255, 0.9)'};
          backdrop-filter: blur(16px);
          border: 1.5px solid ${isDark ? 'rgba(59, 130, 246, 0.35)' : '#bfdbfe'};
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.12);
          animation: pulseGlow 4s infinite ease-in-out;
        }

        .reveal {
          opacity: ${isFading ? 0 : 1};
          transform: translateY(${isFading ? '20px' : '0px'}) scale(${isFading ? '0.98' : '1'});
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .modern-card {
          background: ${cardBg};
          backdrop-filter: blur(20px);
          border: 1px solid ${cardBorder};
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .modern-card:hover {
          border-color: #3b82f6;
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 60px rgba(37, 99, 235, 0.2);
        }

        .btn-glow {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }
        .btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6);
        }

        .top-control-btn {
          background: ${isDark ? 'rgba(30, 41, 59, 0.8)' : '#f1f5f9'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'};
          color: ${textMain};
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }
        .top-control-btn:hover {
          border-color: #3b82f6;
          transform: translateY(-1px);
        }

        .form-input-box {
          background: ${inputBg};
          border: 1.5px solid ${inputBorder};
          color: ${textMain};
          transition: all 0.3s ease;
        }
        .form-input-box:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-main { font-size: 34px !important; }
        }
      `}</style>

      {/* Floating Icons Hoành Tráng */}
      <div className="floating-icon-xl" style={{ top: '6%', left: '3%', fontSize: '90px', animationDelay: '0s' }}>📚</div>
      <div className="floating-icon-xl" style={{ top: '15%', right: '4%', fontSize: '100px', animationDelay: '1.2s' }}>🎓</div>
      <div className="floating-icon-xl" style={{ top: '40%', left: '2%', fontSize: '80px', animationDelay: '2.5s' }}>📐</div>
      <div className="floating-icon-xl" style={{ top: '68%', right: '3%', fontSize: '95px', animationDelay: '1.8s' }}>💡</div>
      <div className="floating-icon-xl" style={{ top: '85%', left: '5%', fontSize: '85px', animationDelay: '3.2s' }}>⚡</div>

      {/* Header Uy Tín + Các nút điều khiển xịn xò (Ngôn ngữ & Dark/Light mode) */}
      <header style={{
        borderBottom: `1px solid ${cardBorder}`,
        background: isDark ? 'rgba(10, 15, 29, 0.88)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px',
        transition: 'background-color 0.5s ease, border-color 0.5s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>🎓</span> {currentText.brand} 
            <span style={{ fontSize: '10px', background: 'rgba(37, 99, 235, 0.15)', color: '#2563eb', padding: '3px 8px', borderRadius: '6px', fontWeight: '800' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '26px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '13px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '13px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '13px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navOrder}</a>
          </nav>

          {/* Cụm nút đổi Ngôn Ngữ & Đổi Sáng/Tối */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            
            {/* Nút ngôn ngữ */}
            <button onClick={toggleLanguage} className="top-control-btn" title="Chuyển ngôn ngữ / Change language">
              🌐 {lang === "vi" ? "Tiếng Việt 🇻🇳" : "English 🇬🇧"}
            </button>

            {/* Nút đổi màu nền Sáng/Tối với hiệu ứng xoay mặt trời */}
            <button 
              onClick={toggleTheme} 
              className="top-control-btn" 
              style={{ padding: '8px 12px' }}
              title="Chuyển đổi giao diện Sáng / Tối"
            >
              <span style={{ 
                display: 'inline-block', 
                transition: 'transform 0.5s ease', 
                transform: isRotating ? 'rotate(180deg)' : 'rotate(0deg)' 
              }}>
                {isDark ? "🌙" : "☀️"}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="reveal" style={{ padding: '85px 24px 50px', textAlign: 'center', maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Khẩu hiệu chuẩn xác nằm ngay dưới hoặc trên tiêu đề */}
        <div className="slogan-banner" style={{
          padding: '18px 28px', borderRadius: '22px', marginBottom: '32px',
          color: isDark ? '#cbd5e1' : '#1e40af', fontSize: '15px', fontWeight: '700', lineHeight: '1.7', display: 'inline-block',
          maxWidth: '820px'
        }}>
          💡 {currentText.slogan}
        </div>

        <h1 className="hero-title-main" style={{ margin: '0 0 22px 0', whiteSpace: 'pre-line' }}>
          {currentText.heroTitle}
        </h1>

        <p style={{ color: textSub, fontSize: '17px', lineHeight: '1.8', maxWidth: '720px', margin: '0 auto 40px' }}>
          {currentText.heroDesc}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="#order" className="btn-glow" style={{ textDecoration: 'none', padding: '16px 34px', borderRadius: '14px', fontSize: '15px', fontWeight: '900', letterSpacing: '0.5px' }}>
            {currentText.btnExplore}
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal" style={{ padding: '50px 24px', maxWidth: '1150px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', color: textMain, letterSpacing: '-0.5px' }}>
          {currentText.servicesTitle}
        </h2>
        <p style={{ textAlign: 'center', color: textSub, marginBottom: '45px', fontSize: '16px' }}>{currentText.servicesDesc}</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          <div className="modern-card" style={{ padding: '42px', borderRadius: '30px' }}>
            <div style={{ fontSize: '46px', marginBottom: '16px' }}>💻</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: textMain }}>{currentText.service1Title}</h3>
            <p style={{ color: textSub, lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              {currentText.service1Desc}
            </p>
          </div>

          <div className="modern-card" style={{ padding: '42px', borderRadius: '30px' }}>
            <div style={{ fontSize: '46px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: textMain }}>{currentText.service2Title}</h3>
            <p style={{ color: textSub, lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
              {currentText.service2Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
      <section id="order" className="reveal" style={{ padding: '50px 24px 90px', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="modern-card" style={{ padding: '48px', borderRadius: '34px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', margin: '0 0 10px 0', color: textMain }}>
            {currentText.orderTitle}
          </h2>
          <p style={{ color: textSub, fontSize: '15px', textAlign: 'center', marginBottom: '35px' }}>
            {currentText.orderDesc}
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="form-input-box" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-input-box" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input-box" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-input-box" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="form-input-box" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-glow" style={{
              width: '100%', padding: '18px', border: 'none', borderRadius: '14px',
              fontWeight: '900', fontSize: '15px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {loading ? currentText.btnSubmitting : currentText.btnSubmit}
            </button>
          </form>

          {/* Dòng liên hệ trực tiếp Zalo theo đúng yêu cầu của Văn */}
          <div style={{
            marginTop: '30px', padding: '16px 20px', borderRadius: '14px',
            background: isDark ? 'rgba(30, 41, 59, 0.6)' : '#f1f5f9', border: `1px solid ${cardBorder}`,
            textAlign: 'center', fontSize: '13.5px', color: textSub, lineHeight: '1.6'
          }}>
            💬 {currentText.zaloContactText} <strong style={{ color: '#2563eb', fontSize: '15px' }}>{MY_PHONE}</strong> {currentText.zaloTime}
          </div>

          {successMsg && (
            <div style={{
              marginTop: '22px', padding: '18px', borderRadius: '14px',
              background: isDark ? 'rgba(22, 101, 52, 0.4)' : '#dcfce7', border: '1px solid #86efac', color: isDark ? '#4ade80' : '#166534',
              textAlign: 'center', fontSize: '14px', fontWeight: '800', lineHeight: '1.6'
            }}>
              {currentText.successText}<br />
              {currentText.successSub}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${cardBorder}`, padding: '38px 24px', textAlign: 'center', color: textSub, fontSize: '13px', background: bgMain, position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE ACADEMIC STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
