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
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isRotating, setIsRotating] = useState(false);
  const [isLangAnimating, setIsLangAnimating] = useState(false);

  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_PHONE = "0399641646";

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroStep(2), 1600);
    const timer2 = setTimeout(() => {
      setLoadingIntro(false);
    }, 3200);

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

    setTimeout(() => setIntroStep(2), 1400);

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
    }, 2900);
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
  const bgMain = isDark ? "#020617" : "#f8fafc";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.82)" : "rgba(255, 255, 255, 0.9)";
  const cardBorder = isDark ? "rgba(56, 189, 248, 0.4)" : "rgba(37, 99, 235, 0.25)";
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
        /* Lưới không gian 3D quét sáng nền (Cyberpunk Grid Background) */
        .cyber-grid {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(56, 189, 248, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
          background-size: 45px 45px;
          z-index: 0;
          pointer-events: none;
        }

        .ambient-orb-1 {
          position: fixed;
          top: -15vh;
          left: -10vw;
          width: 55vw;
          height: 55vw;
          background: radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(56,189,248,0.08) 60%, transparent 100%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          animation: orbFloat1 10s ease-in-out infinite alternate;
        }
        .ambient-orb-2 {
          position: fixed;
          bottom: -15vh;
          right: -10vw;
          width: 55vw;
          height: 55vw;
          background: radial-gradient(circle, rgba(147,51,234,0.22) 0%, rgba(59,130,246,0.08) 60%, transparent 100%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          animation: orbFloat2 13s ease-in-out infinite alternate;
        }

        @keyframes orbFloat1 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(80px, 60px) scale(1.2); }
        }
        @keyframes orbFloat2 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-90px, -70px) scale(1.25); }
        }

        /* Màn hình Intro Điện Ảnh Rầm Rộ 200% */
        .intro-loader-screen {
          position: fixed;
          inset: 0;
          background: #020617;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .intro-title {
          font-size: 56px;
          font-weight: 900;
          background: linear-gradient(135deg, #ffffff 15%, #38bdf8 55%, #818cf8 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -2px;
          opacity: 0;
          transform: translateY(40px) scale(0.9);
          transition: all 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          filter: drop-shadow(0 0 35px rgba(56, 189, 248, 0.4));
        }
        .intro-title.show {
          opacity: 1;
          transform: translateY(0px) scale(1);
        }
        .intro-subtitle {
          font-size: 20px;
          font-weight: 800;
          color: #38bdf8;
          margin-top: 18px;
          opacity: 0;
          transform: translateY(25px);
          transition: all 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
        }
        .intro-subtitle.show {
          opacity: 1;
          transform: translateY(0px);
        }

        @keyframes floatBigRotateMax {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-40px) rotate(18deg) scale(1.15); }
        }

        @keyframes shimmerText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .floating-deco-max200 {
          position: absolute;
          pointer-events: none;
          z-index: 1;
          animation: floatBigRotateMax 4.5s ease-in-out infinite;
          opacity: 0.5;
          filter: drop-shadow(0 15px 25px rgba(56, 189, 248, 0.4));
        }

        .max-anim-trigger {
          opacity: 0.1;
          transform: scale(0.85) translateY(55px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .max-anim-trigger.max-anim-active {
          opacity: 1;
          transform: scale(1) translateY(0px);
        }
        .max-anim-trigger.max-anim-inactive {
          opacity: 0.15;
          transform: scale(0.9) translateY(30px);
        }

        .lang-transition-wrap {
          opacity: ${isLangAnimating ? 0 : 1};
          transform: translateY(${isLangAnimating ? '10px' : '0px'});
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .hero-title-shimmer {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -2px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 10%, #2563eb 45%, #38bdf8 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 4.5s ease infinite;
        }

        .clean-card {
          background: ${cardBg};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 2px solid ${cardBorder};
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
          border-radius: 32px;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clean-card:hover {
          border-color: #38bdf8;
          transform: translateY(-10px) scale(1.015);
          box-shadow: 0 35px 90px rgba(56, 189, 248, 0.3);
        }

        .btn-primary-clean {
          background: linear-gradient(135deg, #2563eb, #38bdf8);
          color: white;
          box-shadow: 0 12px 35px rgba(37, 99, 235, 0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary-clean:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 20px 50px rgba(56, 189, 248, 0.7);
        }

        .control-icon-btn {
          background: ${isDark ? 'rgba(30, 41, 59, 0.85)' : '#f8fafc'};
          border: 2px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1'};
          color: ${textMain};
          width: 48px;
          height: 48px;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          transition: all 0.25s ease;
        }
        .control-icon-btn:hover {
          border-color: #38bdf8;
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 8px 25px rgba(56, 189, 248, 0.4);
        }

        .input-box-clean {
          background: ${isDark ? 'rgba(30, 41, 59, 0.7)' : '#f8fafc'};
          border: 2px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'};
          color: ${textMain};
          transition: all 0.25s ease;
        }
        .input-box-clean:focus {
          outline: none;
          border-color: #38bdf8;
          background: ${isDark ? '#0f172a' : '#ffffff'};
          box-shadow: 0 0 0 5px rgba(56, 189, 248, 0.25);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-shimmer { font-size: 36px !important; }
          .intro-title { font-size: 32px !important; padding: 0 20px; }
        }
      `}</style>

      {/* Lưới không gian Cyber Grid & Orbs */}
      <div className="cyber-grid"></div>
      <div className="ambient-orb-1"></div>
      <div className="ambient-orb-2"></div>

      {/* Màn hình Intro Điện Ảnh Rầm Rộ 200% */}
      <div className="intro-loader-screen" style={{ opacity: loadingIntro ? 1 : 0, visibility: loadingIntro ? 'visible' : 'hidden' }}>
        <div className={`intro-title ${introStep >= 1 ? 'show' : ''}`}>
          {introMode === "startup" ? "NOVAS CREATIVE STUDIO" : "PROCESSING ORDER..."}
        </div>
        <div className={`intro-subtitle ${introStep >= 2 ? 'show' : ''}`}>
          {introMode === "startup" ? "Created by Huỳnh Huy Văn" : "Syncing to Google Sheets Successfully!"}
        </div>
      </div>

      {/* 🎓 Mũ tốt nghiệp & Bút chì lơ lửng phóng to rầm rộ hai bên */}
      <div className="floating-deco-max200" style={{ top: '80px', left: '2.5%', fontSize: '68px', animationDelay: '0s' }}>🎓</div>
      <div className="floating-deco-max200" style={{ top: '210px', left: '5.5%', fontSize: '52px', animationDelay: '1s' }}>✏️</div>
      <div className="floating-deco-max200" style={{ top: '100px', right: '2.5%', fontSize: '68px', animationDelay: '0.5s' }}>🎓</div>
      <div className="floating-deco-max200" style={{ top: '230px', right: '5.5%', fontSize: '52px', animationDelay: '1.5s' }}>✏️</div>

      {/* Header Cố Định Mượt Mà */}
      <header style={{
        borderBottom: `2px solid ${cardBorder}`,
        background: isDark ? 'rgba(2, 6, 23, 0.88)' : 'rgba(248, 250, 252, 0.88)',
        backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 32px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '10px', filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.3))' }}>
            ⚡ {currentText.brand} 
            <span style={{ fontSize: '11px', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '4px 10px', borderRadius: '10px', fontWeight: '900' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800', transition: 'color 0.2s' }}>{currentText.navOrder}</a>
          </nav>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
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
        <section id="about" style={{ padding: '110px 24px 80px', textAlign: 'center', maxWidth: '980px', margin: '0 auto' }}>
          
          <h1 className="hero-title-shimmer" style={{ margin: '0 0 30px 0', whiteSpace: 'pre-line' }}>
            {currentText.heroTitle}
          </h1>

          <p style={{
            color: textSub, fontSize: '18.5px', lineHeight: '1.95', maxWidth: '820px', margin: '0 auto 50px',
            fontStyle: 'italic', fontWeight: '600'
          }}>
            "{currentText.slogan}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="#order" className="btn-primary-clean" style={{ textDecoration: 'none', padding: '20px 45px', borderRadius: '18px', fontSize: '17px', fontWeight: '900', letterSpacing: '1px' }}>
              {currentText.btnExplore}
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="max-anim-trigger" style={{ padding: '80px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '900', textAlign: 'center', marginBottom: '12px', color: textMain }}>
            {currentText.servicesTitle}
          </h2>
          <p style={{ textAlign: 'center', color: textSub, marginBottom: '50px', fontSize: '16px' }}>{currentText.servicesDesc}</p>

          <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
            
            <div className="clean-card" style={{ padding: '45px' }}>
              <div style={{ fontSize: '44px', marginBottom: '18px' }}>💻</div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: textMain }}>{currentText.service1Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
                {currentText.service1Desc}
              </p>
            </div>

            <div className="clean-card" style={{ padding: '45px' }}>
              <div style={{ fontSize: '44px', marginBottom: '18px' }}>📚</div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 14px 0', color: textMain }}>{currentText.service2Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.8', fontSize: '15px', margin: 0 }}>
                {currentText.service2Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
        <section id="order" className="max-anim-trigger" style={{ padding: '80px 24px 120px', maxWidth: '800px', margin: '0 auto' }}>
          <div className="clean-card" style={{ padding: '52px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', margin: '0 0 12px 0', color: textMain }}>
              {currentText.orderTitle}
            </h2>
            <p style={{ color: textSub, fontSize: '15px', textAlign: 'center', marginBottom: '40px' }}>
              {currentText.orderDesc}
            </p>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="input-box-clean" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '15.5px', boxSizing: 'border-box' }} />
              </div>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="input-box-clean" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '15.5px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '15.5px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '15.5px', boxSizing: 'border-box' }}>
                  <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                  <option value="Giáo án điện tử">Giáo án điện tử</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="input-box-clean" style={{ width: '100%', padding: '18px 20px', borderRadius: '16px', fontSize: '15.5px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-primary-clean" style={{
                width: '100%', padding: '20px', border: 'none', borderRadius: '16px',
                fontWeight: '900', fontSize: '16px', cursor: 'pointer', marginTop: '14px', textTransform: 'uppercase', letterSpacing: '1px'
              }}>
                {loading ? currentText.btnSubmitting : currentText.btnSubmit}
              </button>
            </form>

            <div style={{
              marginTop: '32px', padding: '20px', borderRadius: '16px',
              background: isDark ? 'rgba(30, 41, 59, 0.5)' : '#f1f5f9', border: `2px solid ${cardBorder}`,
              textAlign: 'center', fontSize: '14px', color: textSub, lineHeight: '1.75'
            }}>
              💬 {currentText.zaloContactText} <strong style={{ color: '#38bdf8', fontSize: '15.5px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
            </div>

            {successMsg && (
              <div style={{
                marginTop: '25px', padding: '20px', borderRadius: '16px',
                background: isDark ? 'rgba(22, 101, 52, 0.45)' : '#dcfce7', border: '2px solid #86efac', color: isDark ? '#4ade80' : '#166534',
                textAlign: 'center', fontSize: '15px', fontWeight: '900', lineHeight: '1.6', animation: 'pageIntro 0.5s ease'
              }}>
                {currentText.successBanner}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: `2px solid ${cardBorder}`, padding: '45px 24px', textAlign: 'center', color: textSub, fontSize: '14px', background: bgMain, position: 'relative', zIndex: 2 }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
