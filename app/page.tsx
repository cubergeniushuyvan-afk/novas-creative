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
      { threshold: 0.08 }
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
    }, 300);
  };

  const toggleTheme = () => {
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
      heroTitle: "Thiết Kế Slide & Giáo Án\nĐỉnh Cao Tri Thức • Chuẩn Mực Học Đường",
      heroDesc: "Giải pháp trình chiếu chuyên nghiệp, chuyển động mượt mà và tư duy bố cục logic. Kiến tạo sự tự tin tuyệt đối trong mọi bài thuyết trình trước hội đồng.",
      btnExplore: "🚀 ĐẶT ĐƠN NGAY",
      servicesTitle: "🎯 HỆ THỐNG DỊCH VỤ CHUYÊN SÂU",
      servicesDesc: "Đồ họa học thuật hiện đại nâng tầm mọi nội dung học tập và giảng dạy.",
      service1Title: "Slide PowerPoint Học Đường",
      service1Desc: "Thiết kế chuyên sâu mọi môn học (Toán, Văn, Sử, Địa, Anh...). Tích hợp hiệu ứng Morph đỉnh cao giúp bạn làm chủ toàn bộ không gian thuyết trình.",
      service2Title: "Giáo Án Điện Tử Sư Phạm",
      service2Desc: "Bài giảng điện tử sinh động, tư liệu trực quan chất lượng cao đồng hành cùng thầy cô trong các tiết dạy dự giờ và thi giáo viên giỏi.",
      orderTitle: "📋 HỆ THỐNG ĐẶT ĐƠN TỰ ĐỘNG",
      orderDesc: "Thông tin sẽ được tự động đồng bộ trực tiếp vào cơ sở dữ liệu Google Sheets.",
      labelName: "HỌ VÀ TÊN *",
      labelPhone: "SỐ ĐIỆN THOẠI / ZALO *",
      labelAge: "ĐỘ TUỔI",
      labelService: "LOẠI DỊCH VỤ",
      labelReq: "MÔ TẢ CHI TIẾT YÊU CẦU",
      btnSubmit: "🚀 XÁC NHẬN GỬI ĐƠN HÀNG",
      btnSubmitting: "ĐANG ĐỒNG BỘ NGHỆ THUẬT...",
      successText: "🎉 ĐƠN HÀNG ĐÃ ĐƯỢC LƯU VÀO GOOGLE SHEETS THÀNH CÔNG!",
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
      heroTitle: "Elite Slide & Lesson Design\nAcademic Excellence • Educational Standards",
      heroDesc: "Professional presentation solutions with smooth transitions and logical layouts. Build absolute confidence in every academic presentation.",
      btnExplore: "🚀 ORDER NOW",
      servicesTitle: "🎯 SPECIALIZED SERVICE SYSTEM",
      servicesDesc: "Modern academic graphics elevating all learning and teaching materials.",
      service1Title: "Academic PowerPoint Slides",
      service1Desc: "In-depth design for all subjects with cutting-edge Morph effects to master the entire presentation stage.",
      service2Title: "E-Lesson Plans for Teachers",
      service2Desc: "Vivid digital lectures with intuitive high-quality media supporting teachers in model classes and contests.",
      orderTitle: "📋 AUTOMATED ORDER SYSTEM",
      orderDesc: "Information will be automatically synced directly into Google Sheets database.",
      labelName: "FULL NAME *",
      labelPhone: "PHONE / ZALO *",
      labelAge: "AGE",
      labelService: "SERVICE TYPE",
      labelReq: "DETAILED REQUIREMENTS",
      btnSubmit: "🚀 CONFIRM & SEND ORDER",
      btnSubmitting: "SYNCING DATA...",
      successText: "🎉 ORDER SUCCESSFULLY SAVED TO GOOGLE SHEETS!",
      successSub: "Van will receive and respond to you within a maximum of 4 hours!",
      zaloContactText: "Or contact directly via Zalo Huỳnh Huy Văn at phone number",
      zaloTime: "for consultation (replied within a maximum of just 4 hours)."
    }
  };

  const currentText = t[lang];

  const isDark = theme === "dark";
  const bgMain = isDark ? "#070b14" : "#f8fafc";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.85)" : "#ffffff";
  const cardBorder = isDark ? "rgba(59, 130, 246, 0.3)" : "#e2e8f0";
  const textSub = isDark ? "#94a3b8" : "#475569";
  const inputBg = isDark ? "rgba(30, 41, 59, 0.9)" : "#f8fafc";
  const inputBorder = isDark ? "rgba(255, 255, 255, 0.15)" : "#cbd5e1";

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgMain,
      color: textMain,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'background-color 0.6s ease, color 0.6s ease'
    }}>
      <style>{`
        @keyframes floatContinuous {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }

        @keyframes pulseGlowLoop {
          0%, 100% { box-shadow: 0 0 25px rgba(37, 99, 235, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 50px rgba(37, 99, 235, 0.5), inset 0 0 25px rgba(59, 130, 246, 0.25); border-color: rgba(96, 165, 250, 0.9); }
        }

        @keyframes titleShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .floating-art {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          animation: floatContinuous 6s ease-in-out infinite;
        }

        .hero-title-academic {
          font-size: 54px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.2px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 20%, #2563eb 60%, #0284c7 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleShimmer 6s ease infinite;
        }

        .slogan-box-art {
          background: ${isDark ? 'rgba(30, 41, 59, 0.8)' : '#eff6ff'};
          backdrop-filter: blur(20px);
          border: 2px solid ${isDark ? '#3b82f6' : '#93c5fd'};
          animation: pulseGlowLoop 4s infinite ease-in-out;
        }

        .reveal {
          opacity: ${isFading ? 0 : 1};
          transform: translateY(${isFading ? '20px' : '0px'}) scale(${isFading ? '0.98' : '1'});
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .academic-card {
          background: ${cardBg};
          backdrop-filter: blur(20px);
          border: 1.5px solid ${cardBorder};
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .academic-card:hover {
          border-color: #2563eb;
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 30px 60px rgba(37, 99, 235, 0.22);
        }

        .btn-action-glow {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
          transition: all 0.3s ease;
        }
        .btn-action-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(37, 99, 235, 0.65);
        }

        /* Nút tích hợp chữ chú thích sẵn bên trong mượt mà */
        .integrated-pill-btn {
          background: ${isDark ? 'rgba(30, 41, 59, 0.9)' : '#ffffff'};
          border: 1.5px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : '#cbd5e1'};
          color: ${textMain};
          padding: 6px 14px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }
        .integrated-pill-btn:hover {
          border-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.2);
        }

        .form-input-art {
          background: ${inputBg};
          border: 1.5px solid ${inputBorder};
          color: ${textMain};
          transition: all 0.3s ease;
        }
        .form-input-art:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.2);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-academic { font-size: 36px !important; }
        }
      `}</style>

      {/* Icon PowerPoint Chuẩn SVG Màu Cam & Icon Học Đường Nổi Bật */}
      <div className="floating-art" style={{ top: '10%', left: '4%', opacity: 0.85, animationDelay: '0s' }}>
        <div style={{ width: '80px', height: '80px', background: '#d24726', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '42px', fontWeight: '900', boxShadow: '0 15px 35px rgba(210, 71, 38, 0.4)' }}>
          P
        </div>
      </div>

      <div className="floating-art" style={{ top: '18%', right: '5%', opacity: 0.18, fontSize: '100px', animationDelay: '1.5s' }}>🎓</div>
      <div className="floating-art" style={{ top: '45%', left: '3%', opacity: 0.18, fontSize: '90px', animationDelay: '2.5s' }}>✏️</div>
      <div className="floating-art" style={{ top: '65%', right: '4%', opacity: 0.18, fontSize: '95px', animationDelay: '1.8s' }}>📚</div>
      <div className="floating-art" style={{ top: '85%', left: '5%', opacity: 0.18, fontSize: '85px', animationDelay: '3.2s' }}>📐</div>

      {/* Header Sticky Đi Xuống/Lên Cùng Người Dùng (Luôn ở đỉnh màn hình) */}
      <header style={{
        borderBottom: `1px solid ${cardBorder}`,
        background: isDark ? 'rgba(7, 11, 20, 0.92)' : 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 24px',
        transition: 'background-color 0.5s ease, border-color 0.5s ease'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Logo PowerPoint nhỏ góc header */}
            <div style={{ width: '34px', height: '34px', background: '#d24726', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: '900' }}>
              P
            </div>
            {currentText.brand} 
            <span style={{ fontSize: '11px', background: 'rgba(37, 99, 235, 0.15)', color: '#2563eb', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800' }}>{currentText.navOrder}</a>
          </nav>

          {/* Cụm nút điều khiển tích hợp chữ chú thích bên trong gọn gàng */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            
            {/* Nút ngôn ngữ */}
            <button onClick={toggleLanguage} className="integrated-pill-btn" title="Chuyển đổi ngôn ngữ">
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#2563eb' }}>
                🌐 {lang === "vi" ? "Tiếng Việt 🇻🇳" : "English 🇬🇧"}
              </span>
              <span style={{ fontSize: '10px', color: textSub, marginTop: '2px' }}>
                {lang === "vi" ? "Chuyển ngôn ngữ" : "Switch Language"}
              </span>
            </button>

            {/* Nút đổi Sáng/Tối */}
            <button onClick={toggleTheme} className="integrated-pill-btn" title="Chuyển đổi giao diện">
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#eab308' }}>
                {isDark ? "🌙 Tối" : "☀️ Sáng"}
              </span>
              <span style={{ fontSize: '10px', color: textSub, marginTop: '2px' }}>
                {lang === "vi" ? "Chuyển giao diện" : "Switch Theme"}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Hero Section: Kéo dài trang web phân bố đều chữ */}
      <section id="about" className="reveal" style={{ padding: '110px 24px 70px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Khẩu hiệu chuẩn xác lặp hiệu ứng phát sáng */}
        <div className="slogan-box-art" style={{
          padding: '22px 36px', borderRadius: '28px', marginBottom: '45px',
          color: isDark ? '#e2e8f0' : '#1e40af', fontSize: '16.5px', fontWeight: '700', lineHeight: '1.8', display: 'inline-block',
          maxWidth: '880px'
        }}>
          ✍️ "{currentText.slogan}"
        </div>

        <h1 className="hero-title-academic" style={{ margin: '0 0 30px 0', whiteSpace: 'pre-line' }}>
          {currentText.heroTitle}
        </h1>

        <p style={{ color: textSub, fontSize: '19px', lineHeight: '1.85', maxWidth: '820px', margin: '0 auto 50px' }}>
          {currentText.heroDesc}
        </p>

        <div style={{ display: 'flex', gap: '18px', justifyContent: 'center' }}>
          <a href="#order" className="btn-action-glow" style={{ textDecoration: 'none', padding: '20px 42px', borderRadius: '18px', fontSize: '17px', fontWeight: '900', letterSpacing: '0.5px' }}>
            {currentText.btnExplore}
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="reveal" style={{ padding: '80px 24px', maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '38px', fontWeight: '900', textAlign: 'center', marginBottom: '16px', color: textMain, letterSpacing: '-0.5px' }}>
          {currentText.servicesTitle}
        </h2>
        <p style={{ textAlign: 'center', color: textSub, marginBottom: '60px', fontSize: '17.5px' }}>{currentText.servicesDesc}</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '42px' }}>
          
          {/* Card 1: Slide PowerPoint có logo PowerPoint chuẩn màu cam */}
          <div className="academic-card" style={{ padding: '52px', borderRadius: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' }}>
              <div style={{ width: '56px', height: '56px', background: '#d24726', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '30px', fontWeight: '900', boxShadow: '0 10px 25px rgba(210, 71, 38, 0.35)' }}>
                P
              </div>
              <h3 style={{ fontSize: '25px', fontWeight: '900', margin: 0, color: textMain }}>{currentText.service1Title}</h3>
            </div>
            <p style={{ color: textSub, lineHeight: '1.85', fontSize: '16.5px', margin: 0 }}>
              {currentText.service1Desc}
            </p>
          </div>

          {/* Card 2: Giáo án điện tử */}
          <div className="academic-card" style={{ padding: '52px', borderRadius: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '22px' }}>
              <div style={{ fontSize: '48px' }}>🎓</div>
              <h3 style={{ fontSize: '25px', fontWeight: '900', margin: 0, color: textMain }}>{currentText.service2Title}</h3>
            </div>
            <p style={{ color: textSub, lineHeight: '1.85', fontSize: '16.5px', margin: 0 }}>
              {currentText.service2Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
      <section id="order" className="reveal" style={{ padding: '80px 24px 120px', maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="academic-card" style={{ padding: '58px', borderRadius: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', textAlign: 'center', margin: '0 0 14px 0', color: textMain }}>
            {currentText.orderTitle}
          </h2>
          <p style={{ color: textSub, fontSize: '16.5px', textAlign: 'center', marginBottom: '45px' }}>
            {currentText.orderDesc}
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="form-input-art" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-input-art" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input-art" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-input-art" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', fontSize: '16px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="form-input-art" style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', fontSize: '16px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-action-glow" style={{
              width: '100%', padding: '22px', border: 'none', borderRadius: '18px',
              fontWeight: '900', fontSize: '17px', cursor: 'pointer', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {loading ? currentText.btnSubmitting : currentText.btnSubmit}
            </button>
          </form>

          {/* Thông tin liên hệ trực tiếp Zalo chính chủ Huỳnh Huy Văn */}
          <div style={{
            marginTop: '36px', padding: '20px 24px', borderRadius: '18px',
            background: isDark ? 'rgba(30, 41, 59, 0.75)' : '#f1f5f9', border: `1.5px solid ${cardBorder}`,
            textAlign: 'center', fontSize: '14.5px', color: textSub, lineHeight: '1.7'
          }}>
            💬 {currentText.zaloContactText} <strong style={{ color: '#2563eb', fontSize: '16.5px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
          </div>

          {successMsg && (
            <div style={{
              marginTop: '28px', padding: '22px', borderRadius: '18px',
              background: isDark ? 'rgba(22, 101, 52, 0.4)' : '#dcfce7', border: '1px solid #86efac', color: isDark ? '#4ade80' : '#166534',
              textAlign: 'center', fontSize: '15.5px', fontWeight: '800', lineHeight: '1.6'
            }}>
              {currentText.successText}<br />
              {currentText.successSub}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${cardBorder}`, padding: '45px 24px', textAlign: 'center', color: textSub, fontSize: '14px', background: bgMain, position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE ACADEMIC STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
