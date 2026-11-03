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

  const toggleLanguage = () => {
    setIsFading(true);
    setTimeout(() => {
      setLang((prev) => (prev === "vi" ? "en" : "vi"));
      setIsFading(false);
    }, 350);
  };

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

  const t = {
    vi: {
      brand: "NOVAS CREATIVE",
      tagline: "ACADEMIC LAB",
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
      tagline: "ACADEMIC LAB",
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

  const isDark = theme === "dark";
  const bgMain = isDark ? "#060913" : "#f8fafc";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.9)" : "#ffffff";
  const cardBorder = isDark ? "rgba(59, 130, 246, 0.35)" : "#cbd5e1";
  const textSub = isDark ? "#94a3b8" : "#475569";
  const inputBg = isDark ? "rgba(30, 41, 59, 0.95)" : "#ffffff";
  const inputBorder = isDark ? "rgba(255, 255, 255, 0.15)" : "#94a3b8";

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
        @keyframes floatMega {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-45px) rotate(18deg) scale(1.15); }
        }

        @keyframes pulseNeon {
          0%, 100% { box-shadow: 0 0 35px rgba(37, 99, 235, 0.25); border-color: rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 60px rgba(59, 130, 246, 0.6); border-color: rgba(96, 165, 250, 0.8); }
        }

        @keyframes titleHyperGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(37, 99, 235, 0.4)); }
          50% { filter: drop-shadow(0 0 45px rgba(59, 130, 246, 0.9)); }
        }

        .floating-icon-mega {
          position: absolute;
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
          animation: floatMega 6.5s ease-in-out infinite;
        }

        .hero-title-hyper {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -1.5px;
          font-family: Georgia, serif;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 15%, #3b82f6 60%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleHyperGlow 4s ease infinite;
        }

        .slogan-box-hyper {
          background: ${isDark ? 'rgba(15, 23, 42, 0.85)' : 'rgba(239, 246, 255, 0.95)'};
          backdrop-filter: blur(20px);
          border: 2px solid ${isDark ? '#3b82f6' : '#93c5fd'};
          box-shadow: 0 20px 45px rgba(37, 99, 235, 0.2);
          animation: pulseNeon 3.5s infinite ease-in-out;
          font-family: 'Times New Roman', Times, serif;
          font-style: italic;
        }

        .reveal {
          opacity: ${isFading ? 0 : 1};
          transform: translateY(${isFading ? '25px' : '0px'}) scale(${isFading ? '0.97' : '1'});
          transition: opacity 0.35s ease, transform 0.35s ease;
        }

        .card-hyper {
          background: ${cardBg};
          backdrop-filter: blur(25px);
          border: 1.5px solid ${cardBorder};
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card-hyper:hover {
          border-color: #2563eb;
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 35px 70px rgba(37, 99, 235, 0.28);
        }

        .btn-hyper-glow {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.5);
          transition: all 0.3s ease;
        }
        .btn-hyper-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.75);
        }

        .control-pill {
          background: ${isDark ? 'rgba(30, 41, 59, 0.9)' : '#f1f5f9'};
          border: 1.5px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : '#cbd5e1'};
          color: ${textMain};
          padding: 8px 14px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
        }
        .control-pill:hover {
          border-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(37, 99, 235, 0.2);
        }

        .form-box-hyper {
          background: ${inputBg};
          border: 1.5px solid ${inputBorder};
          color: ${textMain};
          transition: all 0.3s ease;
        }
        .form-box-hyper:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.25);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-hyper { font-size: 38px !important; }
        }
      `}</style>

      {/* Floating Icon Khổng Lồ Khắp Màn Hình (Bút chì, Món tốt nghiệp, PowerPoint, Sách, Thước...) */}
      <div className="floating-icon-mega" style={{ top: '5%', left: '2%', fontSize: '110px', animationDelay: '0s' }}>🎓</div>
      <div className="floating-icon-mega" style={{ top: '12%', right: '3%', fontSize: '120px', animationDelay: '1.5s' }}>📊</div>
      <div className="floating-icon-mega" style={{ top: '32%', left: '1%', fontSize: '100px', animationDelay: '3s' }}>✏️</div>
      <div className="floating-icon-mega" style={{ top: '55%', right: '2%', fontSize: '115px', animationDelay: '2s' }}>📚</div>
      <div className="floating-icon-mega" style={{ top: '78%', left: '4%', fontSize: '105px', animationDelay: '4s' }}>📐</div>
      <div className="floating-icon-mega" style={{ top: '90%', right: '5%', fontSize: '110px', animationDelay: '1s' }}>💡</div>

      {/* Header Uy Tín + Nút điều khiển có ghi chú rõ ràng */}
      <header style={{
        borderBottom: `1px solid ${cardBorder}`,
        background: isDark ? 'rgba(6, 9, 19, 0.9)' : 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px',
        transition: 'background-color 0.5s ease, border-color 0.5s ease'
      }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '30px' }}>🎓</span> {currentText.brand} 
            <span style={{ fontSize: '11px', background: 'rgba(37, 99, 235, 0.15)', color: '#2563eb', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>{currentText.navOrder}</a>
          </nav>

          {/* Các nút chuyển đổi có chú thích cực rõ */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            
            {/* Nút ngôn ngữ */}
            <div style={{ textAlign: 'right' }}>
              <button onClick={toggleLanguage} className="control-pill" title="Chuyển đổi ngôn ngữ">
                🌐 {lang === "vi" ? "Tiếng Việt 🇻🇳" : "English 🇬🇧"}
              </button>
              <span style={{ fontSize: '10px', color: '#3b82f6', fontWeight: '700' }}>Chuyển ngôn ngữ</span>
            </div>

            {/* Nút đổi Sáng/Tối */}
            <div style={{ textAlign: 'right' }}>
              <button onClick={toggleTheme} className="control-pill" style={{ padding: '8px 14px' }} title="Chuyển đổi giao diện">
                <span style={{ display: 'inline-block', transition: 'transform 0.5s ease', transform: isRotating ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  {isDark ? "🌙" : "☀️"}
                </span>
                <span>{isDark ? "Tối" : "Sáng"}</span>
              </button>
              <span style={{ fontSize: '10px', color: '#3b82f6', fontWeight: '700' }}>Chuyển đổi giao diện</span>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" className="reveal" style={{ padding: '90px 24px 50px', textAlign: 'center', maxWidth: '950px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Khẩu hiệu độc quyền với font nghệ thuật, trọn vẹn ý nghĩa */}
        <div className="slogan-box-hyper" style={{
          padding: '22px 34px', borderRadius: '26px', marginBottom: '38px',
          color: isDark ? '#e2e8f0' : '#1e3a8a', fontSize: '17px', fontWeight: '700', lineHeight: '1.8', display: 'inline-block',
          maxWidth: '850px'
        }}>
          ✒️ "{currentText.slogan}"
        </div>

        <h1 className="hero-title-hyper" style={{ margin: '0 0 24px 0', whiteSpace: 'pre-line' }}>
          {currentText.heroTitle}
        </h1>

        <p style={{ color: textSub, fontSize: '18px', lineHeight: '1.85', maxWidth: '780px', margin: '0 auto 42px', fontFamily: 'serif' }}>
          {currentText.heroDesc}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="#order" className="btn-hyper-glow" style={{ textDecoration: 'none', padding: '18px 38px', borderRadius: '16px', fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>
            {currentText.btnExplore}
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal" style={{ padding: '55px 24px', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900', textAlign: 'center', marginBottom: '14px', color: textMain, letterSpacing: '-0.5px' }}>
          {currentText.servicesTitle}
        </h2>
        <p style={{ textAlign: 'center', color: textSub, marginBottom: '50px', fontSize: '17px' }}>{currentText.servicesDesc}</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '38px' }}>
          <div className="card-hyper" style={{ padding: '48px', borderRadius: '34px' }}>
            <div style={{ fontSize: '52px', marginBottom: '18px' }}>📊</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 16px 0', color: textMain }}>{currentText.service1Title}</h3>
            <p style={{ color: textSub, lineHeight: '1.85', fontSize: '16px', margin: 0, fontFamily: 'serif' }}>
              {currentText.service1Desc}
            </p>
          </div>

          <div className="card-hyper" style={{ padding: '48px', borderRadius: '34px' }}>
            <div style={{ fontSize: '52px', marginBottom: '18px' }}>🎓</div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 16px 0', color: textMain }}>{currentText.service2Title}</h3>
            <p style={{ color: textSub, lineHeight: '1.85', fontSize: '16px', margin: 0, fontFamily: 'serif' }}>
              {currentText.service2Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
      <section id="order" className="reveal" style={{ padding: '55px 24px 95px', maxWidth: '840px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="card-hyper" style={{ padding: '52px', borderRadius: '38px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center', margin: '0 0 12px 0', color: textMain }}>
            {currentText.orderTitle}
          </h2>
          <p style={{ color: textSub, fontSize: '16px', textAlign: 'center', marginBottom: '40px' }}>
            {currentText.orderDesc}
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="form-box-hyper" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-box-hyper" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-box-hyper" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-box-hyper" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="form-box-hyper" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '16px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-hyper-glow" style={{
              width: '100%', padding: '20px', border: 'none', borderRadius: '16px',
              fontWeight: '900', fontSize: '16px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {loading ? currentText.btnSubmitting : currentText.btnSubmit}
            </button>
          </form>

          {/* Dòng liên hệ trực tiếp Zalo */}
          <div style={{
            marginTop: '32px', padding: '18px 22px', borderRadius: '16px',
            background: isDark ? 'rgba(30, 41, 59, 0.7)' : '#f1f5f9', border: `1.5px solid ${cardBorder}`,
            textAlign: 'center', fontSize: '14px', color: textSub, lineHeight: '1.7', fontFamily: 'serif'
          }}>
            💬 {currentText.zaloContactText} <strong style={{ color: '#2563eb', fontSize: '16px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
          </div>

          {successMsg && (
            <div style={{
              marginTop: '25px', padding: '20px', borderRadius: '16px',
              background: isDark ? 'rgba(22, 101, 52, 0.4)' : '#dcfce7', border: '1px solid #86efac', color: isDark ? '#4ade80' : '#166534',
              textAlign: 'center', fontSize: '15px', fontWeight: '800', lineHeight: '1.6'
            }}>
              {currentText.successText}<br />
              {currentText.successSub}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${cardBorder}`, padding: '42px 24px', textAlign: 'center', color: textSub, fontSize: '13.5px', background: bgMain, position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE ACADEMIC STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
