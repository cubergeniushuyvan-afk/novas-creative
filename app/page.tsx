"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [introStep, setIntroStep] = useState(1);
  const [introMode, setIntroMode] = useState<"startup" | "submitting">("startup");

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
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Mặc định Dark Mode để thấy rõ hiệu ứng đồ họa đỉnh cao
  const [isRotating, setIsRotating] = useState(false);
  const [isLangAnimating, setIsLangAnimating] = useState(false);

  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_PHONE = "0399641646";

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroStep(2), 1400);
    const timer2 = setTimeout(() => {
      setLoadingIntro(false);
    }, 2900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (loadingIntro) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("max-anim-active");
            entry.target.classList.remove("max-anim-inactive");
          } else {
            entry.target.classList.add("max-anim-inactive");
            entry.target.classList.remove("max-anim-active");
          }
        });
      },
      { threshold: 0.15, rootMargin: "-30px 0px -30px 0px" }
    );

    const elements = document.querySelectorAll(".max-anim-trigger");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loadingIntro]);

  const toggleLanguage = () => {
    setIsLangAnimating(true);
    setTimeout(() => {
      setLang((prev) => (prev === "vi" ? "en" : "vi"));
      setIsLangAnimating(false);
    }, 250);
  };

  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 550);
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

    setIntroMode("submitting");
    setLoadingIntro(true);
    setIntroStep(1);

    setTimeout(() => setIntroStep(2), 1200);

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

    setTimeout(() => {
      setLoadingIntro(false);
      setSuccessMsg(true);

      setTimeout(() => {
        setSuccessMsg(false);
      }, 3500);
    }, 2600);
  };

  const t = {
    vi: {
      brand: "NOVAS CREATIVE",
      tagline: "STUDIO",
      navAbout: "GIỚI THIỆU",
      navServices: "DỊCH VỤ",
      navOrder: "ĐẶT ĐƠN",
      slogan: "Dự án sáng tạo bởi Huỳnh Huy Văn: Nỗ lực hỗ trợ học sinh, sinh viên nâng cao hiệu quả thuyết trình học đường mà không bị lạm dụng AI.",
      heroTitle: "Thiết Kế Slide & Giáo Án\nĐỉnh Cao Tri Thức • Chuẩn Mực Học Đường",
      btnExplore: "🚀 ĐẶT ĐƠN NGAY",
      servicesTitle: "HỆ THỐNG DỊCH VỤ CHUYÊN SÂU",
      servicesDesc: "Đồ họa học thuật hiện đại nâng tầm mọi nội dung học tập và giảng dạy.",
      service1Title: "Slide PowerPoint Học Đường",
      service1Desc: "Thiết kế chuyên sâu mọi môn học với hiệu ứng Morph mượt mà, giúp bài thuyết trình của bạn tỏa sáng rực rỡ.",
      service2Title: "Giáo Án Điện Tử Sư Phạm",
      service2Desc: "Bài giảng sinh động, tư liệu trực quan cao cấp đồng hành cùng thầy cô trong các tiết dạy dự giờ và thi giáo viên giỏi.",
      orderTitle: "HỆ THỐNG ĐẶT ĐƠN TỰ ĐỘNG",
      orderDesc: "Thông tin đơn hàng sẽ tự động đồng bộ trực tiếp vào Google Sheets an toàn tuyệt đối.",
      labelName: "HỌ VÀ TÊN *",
      labelPhone: "SỐ ĐIỆN THOẠI / ZALO *",
      labelAge: "ĐỘ TUỔI",
      labelService: "LOẠI DỊCH VỤ",
      labelReq: "MÔ TẢ CHI TIẾT YÊU CẦU",
      btnSubmit: "🚀 XÁC NHẬN GỬI ĐƠN HÀNG",
      btnSubmitting: "ĐANG ĐỒNG BỘ DỮ LIỆU...",
      successBanner: "🎉 ĐƠN THÀNH CÔNG! Cảm ơn quý khách đã tin tưởng và sẽ được liên lạc lại sớm nhất.",
      zaloContactText: "Hoặc liên hệ trực tiếp qua Zalo Huỳnh Huy Văn số điện thoại",
      zaloTime: "để được tư vấn (được hồi đáp trong nhiều nhất chỉ 4 tiếng)."
    },
    en: {
      brand: "NOVAS CREATIVE",
      tagline: "STUDIO",
      navAbout: "ABOUT",
      navServices: "SERVICES",
      navOrder: "ORDER",
      slogan: "Creative project by Huỳnh Huy Văn: Supporting students to elevate academic presentations without AI over-reliance.",
      heroTitle: "Elite Slide & Lesson Design\nAcademic Excellence • Educational Standards",
      btnExplore: "🚀 ORDER NOW",
      servicesTitle: "SPECIALIZED SERVICE SYSTEM",
      servicesDesc: "Modern academic graphics elevating all learning and teaching materials.",
      service1Title: "Academic PowerPoint Slides",
      service1Desc: "In-depth design for all subjects with smooth Morph effects to make your presentation shine brightly.",
      service2Title: "E-Lesson Plans for Teachers",
      service2Desc: "Vivid lectures and high-end visual assets supporting teachers in model classes and teaching contests.",
      orderTitle: "AUTOMATED ORDER SYSTEM",
      orderDesc: "Order information will automatically sync directly into secure Google Sheets.",
      labelName: "FULL NAME *",
      labelPhone: "PHONE / ZALO *",
      labelAge: "AGE",
      labelService: "SERVICE TYPE",
      labelReq: "DETAILED REQUIREMENTS",
      btnSubmit: "🚀 CONFIRM & SEND ORDER",
      btnSubmitting: "SYNCING DATA...",
      successBanner: "🎉 ORDER SUCCESSFUL! Thank you for trusting us, we will contact you back soon.",
      zaloContactText: "Or contact directly via Zalo Huỳnh Huy Văn at phone number",
      zaloTime: "for consultation (replied within a maximum of just 4 hours)."
    }
  };

  const currentText = t[lang];

  const isDark = theme === "dark";
  const bgMain = isDark ? "#030712" : "#f8fafc";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.75)" : "rgba(255, 255, 255, 0.85)";
  const cardBorder = isDark ? "rgba(56, 189, 248, 0.3)" : "rgba(37, 99, 235, 0.2)";
  const textSub = isDark ? "#94a3b8" : "#475569";

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgMain,
      color: textMain,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'background-color 0.5s ease, color 0.5s ease'
    }}>
      <style>{`
        /* Các quả cầu ánh sáng nền động (Ambient Glowing Orbs) */
        .ambient-orb-1 {
          position: fixed;
          top: -15vh;
          left: -10vw;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(56,189,248,0.05) 60%, transparent 100%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          animation: orbFloat1 12s ease-in-out infinite alternate;
        }
        .ambient-orb-2 {
          position: fixed;
          bottom: -15vh;
          right: -10vw;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(59,130,246,0.05) 60%, transparent 100%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          animation: orbFloat2 15s ease-in-out infinite alternate;
        }

        @keyframes orbFloat1 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes orbFloat2 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-70px, -50px) scale(1.2); }
        }

        /* Màn hình Intro điện ảnh siêu ngầu */
        .intro-loader-screen {
          position: fixed;
          inset: 0;
          background: #030712;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .intro-title {
          font-size: 52px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 20%, #38bdf8 60%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1.5px;
          opacity: 0;
          transform: translateY(35px) scale(0.92);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
        }
        .intro-title.show {
          opacity: 1;
          transform: translateY(0px) scale(1);
        }
        .intro-subtitle {
          font-size: 19px;
          font-weight: 700;
          color: #38bdf8;
          margin-top: 15px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 1.5px;
        }
        .intro-subtitle.show {
          opacity: 1;
          transform: translateY(0px);
        }

        @keyframes floatBigRotate {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-35px) rotate(16deg) scale(1.12); }
        }

        @keyframes shimmerText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .floating-deco-max {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          animation: floatBigRotate 5s ease-in-out infinite;
          opacity: 0.4;
          filter: drop-shadow(0 10px 15px rgba(56, 189, 248, 0.25));
        }

        /* Hiệu ứng đỉnh cao: Lướt tới phóng to nổi khối - Lướt qua mờ dần thu nhỏ */
        .max-anim-trigger {
          opacity: 0.15;
          transform: scale(0.88) translateY(45px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .max-anim-trigger.max-anim-active {
          opacity: 1;
          transform: scale(1) translateY(0px);
        }
        .max-anim-trigger.max-anim-inactive {
          opacity: 0.2;
          transform: scale(0.92) translateY(25px);
        }

        .lang-transition-wrap {
          opacity: ${isLangAnimating ? 0 : 1};
          transform: translateY(${isLangAnimating ? '8px' : '0px'});
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .hero-title-shimmer {
          font-size: 52px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 15%, #2563eb 50%, #38bdf8 85%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 5s ease infinite;
        }

        /* Thẻ kính đa tầng cao cấp với Neon Hover Glow */
        .clean-card {
          background: ${cardBg};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid ${cardBorder};
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
          border-radius: 28px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clean-card:hover {
          border-color: #38bdf8;
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 70px rgba(56, 189, 248, 0.22);
        }

        .btn-primary-clean {
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          color: white;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary-clean:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 16px 40px rgba(56, 189, 248, 0.6);
        }

        .control-icon-btn {
          background: ${isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc'};
          border: 1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'};
          color: ${textMain};
          width: 44px;
          height: 44px;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          font-weight: 700;
          transition: all 0.25s ease;
        }
        .control-icon-btn:hover {
          border-color: #38bdf8;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 5px 20px rgba(56, 189, 248, 0.3);
        }

        .input-box-clean {
          background: ${isDark ? 'rgba(30, 41, 59, 0.6)' : '#f8fafc'};
          border: 1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1'};
          color: ${textMain};
          transition: all 0.25s ease;
        }
        .input-box-clean:focus {
          outline: none;
          border-color: #38bdf8;
          background: ${isDark ? '#0f172a' : '#ffffff'};
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.2);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-shimmer { font-size: 34px !important; }
          .intro-title { font-size: 30px !important; padding: 0 20px; }
        }
      `}</style>

      {/* Hiệu ứng nền không gian động */}
      <div className="ambient-orb-1"></div>
      <div className="ambient-orb-2"></div>

      {/* Màn hình Intro điện ảnh ngầu lòi */}
      <div className="intro-loader-screen" style={{ opacity: loadingIntro ? 1 : 0, visibility: loadingIntro ? 'visible' : 'hidden' }}>
        <div className={`intro-title ${introStep >= 1 ? 'show' : ''}`}>
          {introMode === "startup" ? "NOVAS CREATIVE STUDIO" : "PROCESSING ORDER..."}
        </div>
        <div className={`intro-subtitle ${introStep >= 2 ? 'show' : ''}`}>
          {introMode === "startup" ? "Created by Huỳnh Huy Văn" : "Syncing to Google Sheets Successfully!"}
        </div>
      </div>

      {/* 🎓 Mũ tốt nghiệp & Bút chì lơ lửng phóng to hai bên */}
      <div className="floating-deco-max" style={{ top: '90px', left: '3%', fontSize: '62px', animationDelay: '0s' }}>🎓</div>
      <div className="floating-deco-max" style={{ top: '210px', left: '6%', fontSize: '48px', animationDelay: '1.2s' }}>✏️</div>
      <div className="floating-deco-max" style={{ top: '110px', right: '3%', fontSize: '62px', animationDelay: '0.6s' }}>🎓</div>
      <div className="floating-deco-max" style={{ top: '230px', right: '6%', fontSize: '48px', animationDelay: '1.8s' }}>✏️</div>

      {/* Header Cố Định Mượt Mà */}
      <header style={{
        borderBottom: `1px solid ${cardBorder}`,
        background: isDark ? 'rgba(3, 7, 18, 0.85)' : 'rgba(248, 250, 252, 0.85)',
        backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 28px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '19px', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚡ {currentText.brand} 
            <span style={{ fontSize: '10px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '8px', fontWeight: '800' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '14px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navOrder}</a>
          </nav>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={toggleLanguage} className="control-icon-btn" title="Chuyển ngôn ngữ">
              🌐
            </button>

            <button onClick={toggleTheme} className="control-icon-btn" title="Chuyển đổi giao diện">
              <span style={{ 
                display: 'inline-block', 
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isRotating ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                {isDark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Nội dung toàn trang */}
      <div className="lang-transition-wrap" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section */}
        <section id="about" style={{ padding: '100px 24px 70px', textAlign: 'center', maxWidth: '950px', margin: '0 auto' }}>
          
          <h1 className="hero-title-shimmer" style={{ margin: '0 0 28px 0', whiteSpace: 'pre-line' }}>
            {currentText.heroTitle}
          </h1>

          <p style={{
            color: textSub, fontSize: '17.5px', lineHeight: '1.9', maxWidth: '780px', margin: '0 auto 45px',
            fontStyle: 'italic', fontWeight: '500'
          }}>
            "{currentText.slogan}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="#order" className="btn-primary-clean" style={{ textDecoration: 'none', padding: '18px 40px', borderRadius: '16px', fontSize: '16px', fontWeight: '900', letterSpacing: '0.5px' }}>
              {currentText.btnExplore}
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-anim-trigger" style={{ padding: '70px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', marginBottom: '10px', color: textMain }}>
            {currentText.servicesTitle}
          </h2>
          <p style={{ textAlign: 'center', color: textSub, marginBottom: '45px', fontSize: '15px' }}>{currentText.servicesDesc}</p>

          <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px' }}>
            
            <div className="clean-card" style={{ padding: '40px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>💻</div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 12px 0', color: textMain }}>{currentText.service1Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.75', fontSize: '14.5px', margin: 0 }}>
                {currentText.service1Desc}
              </p>
            </div>

            <div className="clean-card" style={{ padding: '40px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>📚</div>
              <h3 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 12px 0', color: textMain }}>{currentText.service2Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.75', fontSize: '14.5px', margin: 0 }}>
                {currentText.service2Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
        <section id="order" className="max-anim-trigger" style={{ padding: '70px 24px 110px', maxWidth: '780px', margin: '0 auto' }}>
          <div className="clean-card" style={{ padding: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', margin: '0 0 10px 0', color: textMain }}>
              {currentText.orderTitle}
            </h2>
            <p style={{ color: textSub, fontSize: '14.5px', textAlign: 'center', marginBottom: '35px' }}>
              {currentText.orderDesc}
            </p>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }}>
                  <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                  <option value="Giáo án điện tử">Giáo án điện tử</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-primary-clean" style={{
                width: '100%', padding: '18px', border: 'none', borderRadius: '14px',
                fontWeight: '900', fontSize: '15px', cursor: 'pointer', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px'
              }}>
                {loading ? currentText.btnSubmitting : currentText.btnSubmit}
              </button>
            </form>

            <div style={{
              marginTop: '28px', padding: '18px', borderRadius: '14px',
              background: isDark ? 'rgba(30, 41, 59, 0.4)' : '#f1f5f9', border: `1.5px solid ${cardBorder}`,
              textAlign: 'center', fontSize: '13.5px', color: textSub, lineHeight: '1.7'
            }}>
              💬 {currentText.zaloContactText} <strong style={{ color: '#38bdf8', fontSize: '15px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
            </div>

            {successMsg && (
              <div style={{
                marginTop: '22px', padding: '18px', borderRadius: '14px',
                background: isDark ? 'rgba(22, 101, 52, 0.4)' : '#dcfce7', border: '1px solid #86efac', color: isDark ? '#4ade80' : '#166534',
                textAlign: 'center', fontSize: '14.5px', fontWeight: '800', lineHeight: '1.6', animation: 'pageIntro 0.5s ease'
              }}>
                {currentText.successBanner}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${cardBorder}`, padding: '40px 24px', textAlign: 'center', color: textSub, fontSize: '13.5px', background: bgMain, position: 'relative', zIndex: 2 }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
