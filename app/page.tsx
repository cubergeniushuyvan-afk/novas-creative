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
  const [theme, setTheme] = useState<"light" | "dark">("light"); 
  const [isRotating, setIsRotating] = useState(false);
  const [isLangAnimating, setIsLangAnimating] = useState(false);

  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_PHONE = "0399641646";

  useEffect(() => {
    const timer1 = setTimeout(() => setIntroStep(2), 1800);
    const timer2 = setTimeout(() => {
      setLoadingIntro(false);
    }, 3800);

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
            entry.target.classList.add("flash-anim-active");
            entry.target.classList.remove("flash-anim-inactive");
          } else {
            entry.target.classList.add("flash-anim-inactive");
            entry.target.classList.remove("flash-anim-active");
          }
        });
      },
      { threshold: 0.12, rootMargin: "-20px 0px -20px 0px" }
    );

    const elements = document.querySelectorAll(".flash-anim-trigger");
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

    setTimeout(() => setIntroStep(2), 1500);

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
    }, 3200);
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
      zaloTime: "để được tư vấn (được hồi đáp trong nhiều nhất chỉ 4 tiếng).",
      meter1: "ĐỘ MƯỢT HIỆU ỨNG",
      meter2: "CHUẨN MỰC HỌC THUẬT",
      meter3: "TỐC ĐỘ ĐỒNG BỘ"
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
      zaloTime: "for consultation (replied within a maximum of just 4 hours).",
      meter1: "ANIMATION SMOOTHNESS",
      meter2: "ACADEMIC STANDARDS",
      meter3: "SYNC VELOCITY"
    }
  };

  const currentText = t[lang];

  const isDark = theme === "dark";
  const bgMain = isDark ? "#020617" : "#f8fafc";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(255, 255, 255, 0.92)";
  const cardBorder = isDark ? "rgba(56, 189, 248, 0.35)" : "rgba(37, 99, 235, 0.22)";
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
        .flash-grid-bg {
          position: fixed;
          inset: 0;
          background-image: radial-gradient(${isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(37, 99, 235, 0.08)'} 1px, transparent 1px);
          background-size: 32px 32px;
          z-index: 0;
          pointer-events: none;
        }

        .ambient-orb-light-1 {
          position: fixed; top: -200px; left: -150px; width: 600px; height: 600px;
          background: radial-gradient(circle, ${isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(186, 230, 253, 0.65)'} 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none; animation: orbSmooth1 14s ease-in-out infinite alternate;
        }
        .ambient-orb-light-2 {
          position: fixed; bottom: -200px; right: -150px; width: 650px; height: 650px;
          background: radial-gradient(circle, ${isDark ? 'rgba(99, 102, 241, 0.18)' : 'rgba(191, 219, 254, 0.65)'} 0%, transparent 70%);
          border-radius: 50%; z-index: 0; pointer-events: none; animation: orbSmooth2 16s ease-in-out infinite alternate;
        }

        @keyframes orbSmooth1 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(90px, 70px) scale(1.2); }
        }
        @keyframes orbSmooth2 {
          0% { transform: translate(0px, 0px) scale(1); }
          100% { transform: translate(-100px, -80px) scale(1.25); }
        }

        /* INTRO ĐIỆN ẢNH ĐỈNH CAO: Cục Rubik 3D & Icon PPT 2D quay quanh tâm */
        .intro-loader-screen {
          position: fixed; inset: 0; background: #020617; z-index: 9999;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .orbit-container {
          position: relative; width: 240px; height: 240px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 25px;
        }

        /* Quỹ đạo quay vòng tròn 360 độ */
        @keyframes orbitRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .orbit-ring {
          position: absolute; inset: 0;
          border: 2px dashed rgba(56, 189, 248, 0.3);
          border-radius: 50%;
          animation: orbitRotate 4s linear infinite;
        }

        .orbit-item-1 {
          position: absolute; top: -20px; font-size: 45px;
          animation: spinItem 4s linear infinite;
        }
        .orbit-item-2 {
          position: absolute; bottom: -20px; font-size: 45px;
          animation: spinItem 4s linear infinite;
        }

        @keyframes spinItem {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }

        .center-logo-box {
          font-size: 55px; filter: drop-shadow(0 0 20px rgba(56,189,248,0.6));
        }

        .intro-title {
          font-size: 48px; font-weight: 900;
          background: linear-gradient(135deg, #ffffff 10%, #38bdf8 60%, #2563eb 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          letter-spacing: -1.5px; opacity: 0; transform: translateY(30px) scale(0.95);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); text-align: center;
        }
        .intro-title.show { opacity: 1; transform: translateY(0px) scale(1); }

        .intro-subtitle {
          font-size: 18px; font-weight: 800; color: #38bdf8; margin-top: 15px;
          opacity: 0; transform: translateY(20px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          letter-spacing: 2px; text-transform: uppercase;
        }
        .intro-subtitle.show { opacity: 1; transform: translateY(0px); }

        /* Hiệu ứng lơ lửng vô cực hình số 8 của các icon web */
        @keyframes infinityFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(15px, -28px) rotate(10deg) scale(1.1); }
          50% { transform: translate(-12px, -45px) rotate(-8deg) scale(1.15); }
          75% { transform: translate(-18px, -20px) rotate(8deg) scale(1.06); }
        }

        .floating-deco-flash {
          position: absolute; pointer-events: none; z-index: 1;
          animation: infinityFloat 6s ease-in-out infinite;
          opacity: ${isDark ? 0.5 : 0.88};
          filter: drop-shadow(0 12px 20px rgba(37, 99, 235, 0.25));
        }

        .flash-anim-trigger {
          opacity: 0.15; transform: scale(0.88) translateY(45px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .flash-anim-trigger.flash-anim-active {
          opacity: 1; transform: scale(1) translateY(0px);
        }
        .flash-anim-trigger.flash-anim-inactive {
          opacity: 0.2; transform: scale(0.92) translateY(25px);
        }

        .lang-transition-wrap {
          opacity: ${isLangAnimating ? 0 : 1};
          transform: translateY(${isLangAnimating ? '8px' : '0px'});
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .hero-title-flash {
          font-size: 54px; font-weight: 900; line-height: 1.22; letter-spacing: -2px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 20%, #2563eb 60%, #0284c7 90%);
          background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        /* Thang đo hiệu ứng chất lừ (Metric Badges) */
        .metrics-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          max-width: 850px; margin: 40px auto 0;
        }
        .metric-card {
          background: ${cardBg}; border: 1.5px solid ${cardBorder};
          border-radius: 20px; padding: 20px; text-align: center;
          box-shadow: 0 10px 30px rgba(37,99,235,0.06);
          transition: transform 0.3s ease;
        }
        .metric-card:hover { transform: translateY(-5px); border-color: #2563eb; }
        .metric-num { font-size: 28px; font-weight: 900; color: #2563eb; margin-bottom: 5px; }
        .metric-label { font-size: 12.5px; font-weight: 800; color: ${textSub}; text-transform: uppercase; }

        .clean-card {
          background: ${cardBg}; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid ${cardBorder}; box-shadow: 0 20px 50px rgba(37, 99, 235, 0.08);
          border-radius: 30px; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clean-card:hover {
          border-color: #2563eb; transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 70px rgba(37, 99, 235, 0.18);
        }

        .btn-primary-clean {
          background: linear-gradient(135deg, #2563eb, #0284c7); color: white;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-primary-clean:hover {
          transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 40px rgba(37, 99, 235, 0.5);
        }

        .control-icon-btn {
          background: ${isDark ? 'rgba(30, 41, 59, 0.85)' : '#ffffff'};
          border: 1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : '#cbd5e1'};
          color: ${textMain}; width: 46px; height: 46px; border-radius: 14px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          font-size: 19px; font-weight: 700; transition: all 0.25s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        .control-icon-btn:hover {
          border-color: #2563eb; transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 20px rgba(37, 99, 235, 0.25);
        }

        .input-box-clean {
          background: ${isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff'};
          border: 1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'};
          color: ${textMain}; transition: all 0.25s ease;
        }
        .input-box-clean:focus {
          outline: none; border-color: #2563eb; background: ${isDark ? '#0f172a' : '#ffffff'};
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.18);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-flash { font-size: 34px !important; }
          .intro-title { font-size: 28px !important; padding: 0 20px; }
          .metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Họa tiết nền & Orbs */}
      <div className="flash-grid-bg"></div>
      <div className="ambient-orb-light-1"></div>
      <div className="ambient-orb-light-2"></div>

      {/* INTRO ĐIỆN ẢNH 3D XỊN XÒ (Rubik 3D & Icon PPT quay quanh tâm) */}
      <div className="intro-loader-screen" style={{ opacity: loadingIntro ? 1 : 0, visibility: loadingIntro ? 'visible' : 'hidden' }}>
        <div className="orbit-container">
          <div className="orbit-ring">
            <div className="orbit-item-1">🧩</div>
            <div className="orbit-item-2">📊</div>
          </div>
          <div className="center-logo-box">⚡</div>
        </div>

        <div className={`intro-title ${introStep >= 1 ? 'show' : ''}`}>
          {introMode === "startup" ? "NOVAS CREATIVE STUDIO" : "PROCESSING ORDER..."}
        </div>
        <div className={`intro-subtitle ${introStep >= 2 ? 'show' : ''}`}>
          {introMode === "startup" ? "Created by Huỳnh Huy Văn" : "Syncing to Google Sheets Successfully!"}
        </div>
      </div>

      {/* 🎓 Icon học đường bay lơ lửng vô cực quanh web */}
      <div className="floating-deco-flash" style={{ top: '80px', left: '3%', fontSize: '64px', animationDelay: '0s' }}>🎓</div>
      <div className="floating-deco-flash" style={{ top: '210px', left: '6%', fontSize: '48px', animationDelay: '1.2s' }}>✏️</div>
      <div className="floating-deco-flash" style={{ top: '380px', left: '2.5%', fontSize: '52px', animationDelay: '2.4s' }}>📚</div>
      <div className="floating-deco-flash" style={{ top: '95px', right: '3%', fontSize: '64px', animationDelay: '0.6s' }}>🧩</div>
      <div className="floating-deco-flash" style={{ top: '225px', right: '6%', fontSize: '48px', animationDelay: '1.8s' }}>💡</div>
      <div className="floating-deco-flash" style={{ top: '400px', right: '3%', fontSize: '52px', animationDelay: '3s' }}>📊</div>

      {/* Header Cố Định */}
      <header style={{
        borderBottom: `1.5px solid ${cardBorder}`,
        background: isDark ? 'rgba(2, 6, 23, 0.88)' : 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 1000, padding: '0 32px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '82px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚡ {currentText.brand} 
            <span style={{ fontSize: '11px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '4px 10px', borderRadius: '10px', fontWeight: '900' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '35px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>{currentText.navOrder}</a>
          </nav>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button onClick={toggleLanguage} className="control-icon-btn" title="Chuyển ngôn ngữ">🌐</button>
            <button onClick={toggleTheme} className="control-icon-btn" title="Chuyển giao diện">
              <span style={{ display: 'inline-block', transition: 'transform 0.5s ease', transform: isRotating ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isDark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Nội dung toàn trang */}
      <div className="lang-transition-wrap" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Hero Section */}
        <section id="about" style={{ padding: '95px 24px 60px', textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
          
          <h1 className="hero-title-flash" style={{ margin: '0 0 25px 0', whiteSpace: 'pre-line' }}>
            {currentText.heroTitle}
          </h1>

          <p style={{
            color: textSub, fontSize: '18px', lineHeight: '1.9', maxWidth: '800px', margin: '0 auto 35px',
            fontStyle: 'italic', fontWeight: '600'
          }}>
            "{currentText.slogan}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <a href="#order" className="btn-primary-clean" style={{ textDecoration: 'none', padding: '18px 42px', borderRadius: '18px', fontSize: '16.5px', fontWeight: '900', letterSpacing: '0.5px' }}>
              {currentText.btnExplore}
            </a>
          </div>

          {/* Thang đo hiệu ứng đồ họa xịn xò (Performance Metrics) */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-num">99.9%</div>
              <div className="metric-label">{currentText.meter1}</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">100%</div>
              <div className="metric-label">{currentText.meter2}</div>
            </div>
            <div className="metric-card">
              <div className="metric-num">&lt; 0.1s</div>
              <div className="metric-label">{currentText.meter3}</div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="flash-anim-trigger" style={{ padding: '75px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', textAlign: 'center', marginBottom: '10px', color: textMain }}>
            {currentText.servicesTitle}
          </h2>
          <p style={{ textAlign: 'center', color: textSub, marginBottom: '48px', fontSize: '15.5px' }}>{currentText.servicesDesc}</p>

          <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
            <div className="clean-card" style={{ padding: '42px' }}>
              <div style={{ fontSize: '42px', marginBottom: '16px' }}>💻</div>
              <h3 style={{ fontSize: '21px', fontWeight: '900', margin: '0 0 12px 0', color: textMain }}>{currentText.service1Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.8', fontSize: '15px', margin: 0 }}>{currentText.service1Desc}</p>
            </div>

            <div className="clean-card" style={{ padding: '42px' }}>
              <div style={{ fontSize: '42px', marginBottom: '16px' }}>📚</div>
              <h3 style={{ fontSize: '21px', fontWeight: '900', margin: '0 0 12px 0', color: textMain }}>{currentText.service2Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.8', fontSize: '15px', margin: 0 }}>{currentText.service2Desc}</p>
            </div>
          </div>
        </section>

        {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
        <section id="order" className="flash-anim-trigger" style={{ padding: '75px 24px 115px', maxWidth: '780px', margin: '0 auto' }}>
          <div className="clean-card" style={{ padding: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', margin: '0 0 10px 0', color: textMain }}>
              {currentText.orderTitle}
            </h2>
            <p style={{ color: textSub, fontSize: '14.5px', textAlign: 'center', marginBottom: '36px' }}>
              {currentText.orderDesc}
            </p>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
              </div>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', boxSizing: 'border-box' }}>
                  <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                  <option value="Giáo án điện tử">Giáo án điện tử</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '900', color: '#2563eb', marginBottom: '8px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="input-box-clean" style={{ width: '100%', padding: '16px 18px', borderRadius: '14px', fontSize: '15px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-primary-clean" style={{
                width: '100%', padding: '18px', border: 'none', borderRadius: '14px',
                fontWeight: '900', fontSize: '15.5px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px'
              }}>
                {loading ? currentText.btnSubmitting : currentText.btnSubmit}
              </button>
            </form>

            <div style={{
              marginTop: '30px', padding: '18px', borderRadius: '14px',
              background: isDark ? 'rgba(30, 41, 59, 0.4)' : '#f1f5f9', border: `1.5px solid ${cardBorder}`,
              textAlign: 'center', fontSize: '13.5px', color: textSub, lineHeight: '1.7'
            }}>
              💬 {currentText.zaloContactText} <strong style={{ color: '#2563eb', fontSize: '15px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
            </div>

            {successMsg && (
              <div style={{
                marginTop: '22px', padding: '18px', borderRadius: '14px',
                background: isDark ? 'rgba(22, 101, 52, 0.45)' : '#dcfce7', border: '1.5px solid #86efac', color: isDark ? '#4ade80' : '#166534',
                textAlign: 'center', fontSize: '15px', fontWeight: '900', lineHeight: '1.6'
              }}>
                {currentText.successBanner}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1.5px solid ${cardBorder}`, padding: '42px 24px', textAlign: 'center', color: textSub, fontSize: '13.5px', background: bgMain, position: 'relative', zIndex: 2 }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
