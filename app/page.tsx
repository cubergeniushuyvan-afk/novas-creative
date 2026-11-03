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
    // Hiệu ứng lướt tới giữa màn hình tự động bừng sáng, lướt đi mờ dần
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".scroll-light-effect");
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
    setTimeout(() => setIsRotating(false), 600);
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
      statusText: "🟢 CEO Huỳnh Huy Văn đang sẵn sàng phản hồi trong < 4 giờ",
      slogan: "Dự án sáng tạo bởi Huỳnh Huy Văn: Nỗ lực hỗ trợ học sinh, sinh viên nâng cao hiệu quả thuyết trình học đường mà không bị lạm dụng AI.",
      heroTitle: "Thiết Kế Slide & Giáo Án\nĐỉnh Cao Tri Thức • Chuẩn Mực Học Đường",
      heroDesc: "Giải pháp trình chiếu đỉnh cao với tư duy bố cục logic và đồ họa chuyên sâu. Xây dựng sự tự tin tuyệt đối trước mọi hội đồng.",
      btnExplore: "🚀 ĐẶT ĐƠN NGAY",
      servicesTitle: "🎯 HỆ THỐNG DỊCH VỤ CHUYÊN SÂU",
      servicesDesc: "Đồ họa học thuật hiện đại nâng tầm mọi nội dung học tập và giảng dạy.",
      service1Title: "Slide PowerPoint Học Đường",
      service1Desc: "Thiết kế chuyên sâu mọi môn học với hiệu ứng Morph mượt mà, giúp bài thuyết trình của bạn tỏa sáng rực rỡ.",
      service2Title: "Giáo Án Điện Tử Sư Phạm",
      service2Desc: "Bài giảng sinh động, tư liệu trực quan cao cấp đồng hành cùng thầy cô trong các tiết dạy dự giờ và thi giáo viên giỏi.",
      orderTitle: "📋 HỆ THỐNG ĐẶT ĐƠN TỰ ĐỘNG",
      orderDesc: "Thông tin đơn hàng sẽ tự động đồng bộ trực tiếp vào Google Sheets an toàn tuyệt đối.",
      labelName: "HỌ VÀ TÊN *",
      labelPhone: "SỐ ĐIỆN THOẠI / ZALO *",
      labelAge: "ĐỘ TUỔI",
      labelService: "LOẠI DỊCH VỤ",
      labelReq: "MÔ TẢ CHI TIẾT YÊU CẦU",
      btnSubmit: "🚀 XÁC NHẬN GỬI ĐƠN HÀNG",
      btnSubmitting: "ĐANG ĐỒNG BỘ DỮ LIỆU...",
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
      statusText: "🟢 CEO Huỳnh Huy Văn is ready to reply in < 4 hours",
      slogan: "Creative project by Huỳnh Huy Văn: Supporting students to elevate academic presentations without AI over-reliance.",
      heroTitle: "Elite Slide & Lesson Design\nAcademic Excellence • Educational Standards",
      heroDesc: "Top-tier presentation solutions with logical layouts and specialized graphics. Build absolute confidence before any council.",
      btnExplore: "🚀 ORDER NOW",
      servicesTitle: "🎯 SPECIALIZED SERVICE SYSTEM",
      servicesDesc: "Modern academic graphics elevating all learning and teaching materials.",
      service1Title: "Academic PowerPoint Slides",
      service1Desc: "In-depth design for all subjects with smooth Morph effects to make your presentation shine brightly.",
      service2Title: "E-Lesson Plans for Teachers",
      service2Desc: "Vivid lectures and high-end visual assets supporting teachers in model classes and teaching contests.",
      orderTitle: "📋 AUTOMATED ORDER SYSTEM",
      orderDesc: "Order information will automatically sync directly into secure Google Sheets.",
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
  const bgMain = isDark ? "#060a12" : "#f8fafc";
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
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'background-color 0.6s ease, color 0.6s ease'
    }}>
      <style>{`
        @keyframes floatInfinite {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-35px) rotate(12deg) scale(1.05); }
        }

        @keyframes pulseGlowLoop {
          0%, 100% { box-shadow: 0 0 30px rgba(37, 99, 235, 0.25); border-color: rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 60px rgba(37, 99, 235, 0.6); border-color: rgba(96, 165, 250, 0.95); }
        }

        @keyframes titleShimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Hiệu ứng lướt tới giữa tầm nhìn tự bừng sáng */
        .scroll-light-effect {
          opacity: 0.3;
          transform: translateY(50px) scale(0.96);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s ease;
        }
        .scroll-light-effect.in-view {
          opacity: 1;
          transform: translateY(0px) scale(1);
          box-shadow: 0 25px 60px rgba(37, 99, 235, 0.18);
        }

        .floating-art-safe {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          animation: floatInfinite 7s ease-in-out infinite;
        }

        .hero-title-pro {
          font-size: 56px;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 15%, #2563eb 55%, #0284c7 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleShimmer 6s ease infinite;
        }

        .slogan-box-pro {
          background: ${isDark ? 'rgba(15, 23, 42, 0.85)' : '#eff6ff'};
          backdrop-filter: blur(20px);
          border: 2px solid ${isDark ? '#3b82f6' : '#93c5fd'};
          animation: pulseGlowLoop 4s infinite ease-in-out;
        }

        .card-pro {
          background: ${cardBg};
          backdrop-filter: blur(25px);
          border: 1.5px solid ${cardBorder};
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-pro:hover {
          border-color: #2563eb;
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 35px 70px rgba(37, 99, 235, 0.28);
        }

        .btn-glow-pro {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          box-shadow: 0 10px 30px rgba(37, 99, 235, 0.45);
          transition: all 0.3s ease;
        }
        .btn-glow-pro:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(37, 99, 235, 0.7);
        }

        .pill-btn-pro {
          background: ${isDark ? 'rgba(30, 41, 59, 0.9)' : '#ffffff'};
          border: 1.5px solid ${isDark ? 'rgba(59, 130, 246, 0.4)' : '#cbd5e1'};
          color: ${textMain};
          padding: 8px 16px;
          border-radius: 14px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
        }
        .pill-btn-pro:hover {
          border-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(37, 99, 235, 0.25);
        }

        .form-input-pro {
          background: inputBg;
          border: 1.5px solid ${inputBorder};
          color: ${textMain};
          transition: all 0.3s ease;
        }
        .form-input-pro:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 5px rgba(37, 99, 235, 0.3);
          background: ${isDark ? '#1e293b' : '#ffffff'};
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-pro { font-size: 36px !important; }
        }
      `}</style>

      {/* 🌟 Biểu tượng PowerPoint chuẩn ngả màu Đỏ - Cam theo đúng yêu cầu của Văn */}
      <div className="floating-art-safe" style={{ top: '12%', left: '3%', animationDelay: '0s' }}>
        <div style={{
          width: '75px', height: '75px',
          background: 'radial-gradient(circle at 30% 30%, #f97316 0%, #dc2626 65%, #991b1b 100%)',
          borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '42px', fontWeight: '900',
          boxShadow: '0 15px 35px rgba(220, 38, 38, 0.4)'
        }}>
          P
        </div>
      </div>

      <div className="floating-art-safe" style={{ top: '22%', right: '4%', opacity: 0.16, fontSize: '95px', animationDelay: '1.5s' }}>🎓</div>
      <div className="floating-art-safe" style={{ top: '50%', left: '2%', opacity: 0.16, fontSize: '85px', animationDelay: '3s' }}>✏️</div>
      <div className="floating-art-safe" style={{ top: '75%', right: '3%', opacity: 0.16, fontSize: '90px', animationDelay: '2s' }}>📚</div>

      {/* Header Sticky Mượt Mà Theo Từng Nhịp Lướt */}
      <header style={{
        borderBottom: `1px solid ${cardBorder}`,
        background: isDark ? 'rgba(6, 10, 18, 0.94)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 24px',
        transition: 'background-color 0.5s ease, border-color 0.5s ease'
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', height: '86px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '38px', height: '38px',
              background: 'radial-gradient(circle at 30% 30%, #f97316 0%, #dc2626 70%)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '20px', fontWeight: '900', boxShadow: '0 8px 20px rgba(220, 38, 38, 0.3)'
            }}>
              P
            </div>
            {currentText.brand} 
            <span style={{ fontSize: '11px', background: 'rgba(37, 99, 235, 0.15)', color: '#2563eb', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '34px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '14.5px', fontWeight: '800' }}>{currentText.navOrder}</a>
          </nav>

          {/* Cụm nút điều khiển tích hợp chú thích gọn gàng bên trong */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            
            {/* Nút Ngôn Ngữ */}
            <button onClick={toggleLanguage} className="pill-btn-pro" title="Chuyển ngôn ngữ">
              <span style={{ fontSize: '13.5px', fontWeight: '900', color: '#2563eb' }}>
                🌐 {lang === "vi" ? "Tiếng Việt 🇻🇳" : "English 🇬🇧"}
              </span>
              <span style={{ fontSize: '9.5px', color: textSub, marginTop: '2px' }}>
                {lang === "vi" ? "Chuyển ngôn ngữ" : "Switch Language"}
              </span>
            </button>

            {/* Nút Đổi Sáng/Tối kèm hiệu ứng quay 180 độ mặt trời/mặt trăng */}
            <button onClick={toggleTheme} className="pill-btn-pro" title="Chuyển đổi giao diện Sáng / Tối">
              <span style={{ 
                fontSize: '13.5px', fontWeight: '900', color: '#eab308',
                display: 'inline-block',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isRotating ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                {isDark ? "🌙 Tối" : "☀️ Sáng"}
              </span>
              <span style={{ fontSize: '9.5px', color: textSub, marginTop: '2px' }}>
                {lang === "vi" ? "Chuyển giao diện" : "Switch Theme"}
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Thanh thông báo trực tuyến độc quyền */}
      <div style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', color: 'white', textAlign: 'center', padding: '10px 20px', fontSize: '13.5px', fontWeight: '800', letterSpacing: '0.3px' }}>
        {currentText.statusText}
      </div>

      {/* Hero Section: Kéo dài trang web phân bố đều chữ, thoáng đãng */}
      <section id="about" className="scroll-light-effect" style={{ padding: '130px 24px 90px', textAlign: 'center', maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Khẩu hiệu chuẩn xác lặp hiệu ứng phát sáng */}
        <div className="slogan-box-pro" style={{
          padding: '24px 40px', borderRadius: '30px', marginBottom: '50px',
          color: isDark ? '#e2e8f0' : '#1e40af', fontSize: '17.5px', fontWeight: '700', lineHeight: '1.85', display: 'inline-block',
          maxWidth: '900px'
        }}>
          ✒️ "{currentText.slogan}"
        </div>

        <h1 className="hero-title-pro" style={{ margin: '0 0 35px 0', whiteSpace: 'pre-line' }}>
          {currentText.heroTitle}
        </h1>

        <p style={{ color: textSub, fontSize: '20px', lineHeight: '1.9', maxWidth: '860px', margin: '0 auto 60px' }}>
          {currentText.heroDesc}
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <a href="#order" className="btn-glow-pro" style={{ textDecoration: 'none', padding: '22px 46px', borderRadius: '20px', fontSize: '18px', fontWeight: '900', letterSpacing: '0.5px' }}>
            {currentText.btnExplore}
          </a>
        </div>
      </section>

      {/* Services Section: Kéo dài khoảng cách, bừng sáng khi lướt tới */}
      <section id="services" className="scroll-light-effect" style={{ padding: '100px 24px', maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '40px', fontWeight: '900', textAlign: 'center', marginBottom: '18px', color: textMain, letterSpacing: '-0.5px' }}>
          {currentText.servicesTitle}
        </h2>
        <p style={{ textAlign: 'center', color: textSub, marginBottom: '70px', fontSize: '18px' }}>{currentText.servicesDesc}</p>

        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px' }}>
          
          {/* Card 1: Slide PowerPoint kèm Icon chuẩn ngả màu đỏ cam */}
          <div className="card-pro" style={{ padding: '58px', borderRadius: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '25px' }}>
              <div style={{
                width: '64px', height: '64px',
                background: 'radial-gradient(circle at 30% 30%, #f97316 0%, #dc2626 70%)',
                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '34px', fontWeight: '900',
                boxShadow: '0 12px 30px rgba(220, 38, 38, 0.4)'
              }}>
                P
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: '900', margin: 0, color: textMain }}>{currentText.service1Title}</h3>
            </div>
            <p style={{ color: textSub, lineHeight: '1.9', fontSize: '17px', margin: 0 }}>
              {currentText.service1Desc}
            </p>
          </div>

          {/* Card 2: Giáo án điện tử */}
          <div className="card-pro" style={{ padding: '58px', borderRadius: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '25px' }}>
              <div style={{ fontSize: '52px' }}>🎓</div>
              <h3 style={{ fontSize: '26px', fontWeight: '900', margin: 0, color: textMain }}>{currentText.service2Title}</h3>
            </div>
            <p style={{ color: textSub, lineHeight: '1.9', fontSize: '17px', margin: 0 }}>
              {currentText.service2Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
      <section id="order" className="scroll-light-effect" style={{ padding: '100px 24px 140px', maxWidth: '920px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="card-pro" style={{ padding: '64px', borderRadius: '44px' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '900', textAlign: 'center', margin: '0 0 16px 0', color: textMain }}>
            {currentText.orderTitle}
          </h2>
          <p style={{ color: textSub, fontSize: '17.5px', textAlign: 'center', marginBottom: '50px' }}>
            {currentText.orderDesc}
          </p>

          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '900', color: '#2563eb', marginBottom: '10px', letterSpacing: '0.5px' }}>{currentText.labelName}</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="form-input-pro" style={{ width: '100%', padding: '20px 24px', borderRadius: '18px', fontSize: '17px', boxSizing: 'border-box' }} />
            </div>

            <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '26px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '900', color: '#2563eb', marginBottom: '10px', letterSpacing: '0.5px' }}>{currentText.labelPhone}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="form-input-pro" style={{ width: '100%', padding: '20px 24px', borderRadius: '18px', fontSize: '17px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '900', color: '#2563eb', marginBottom: '10px', letterSpacing: '0.5px' }}>{currentText.labelAge}</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-input-pro" style={{ width: '100%', padding: '20px 24px', borderRadius: '18px', fontSize: '17px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '900', color: '#2563eb', marginBottom: '10px', letterSpacing: '0.5px' }}>{currentText.labelService}</label>
              <select name="service" value={formData.service} onChange={handleChange} className="form-input-pro" style={{ width: '100%', padding: '20px 24px', borderRadius: '18px', fontSize: '17px', boxSizing: 'border-box' }}>
                <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                <option value="Giáo án điện tử">Giáo án điện tử</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '900', color: '#2563eb', marginBottom: '10px', letterSpacing: '0.5px' }}>{currentText.labelReq}</label>
              <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={5} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="form-input-pro" style={{ width: '100%', padding: '20px 24px', borderRadius: '18px', fontSize: '17px', resize: 'none', boxSizing: 'border-box' }}></textarea>
            </div>

            <button type="submit" disabled={loading} className="btn-glow-pro" style={{
              width: '100%', padding: '24px', border: 'none', borderRadius: '20px',
              fontWeight: '900', fontSize: '18px', cursor: 'pointer', marginTop: '14px', textTransform: 'uppercase', letterSpacing: '1px'
            }}>
              {loading ? currentText.btnSubmitting : currentText.btnSubmit}
            </button>
          </form>

          {/* Dòng liên hệ Zalo chính chủ Huỳnh Huy Văn */}
          <div style={{
            marginTop: '40px', padding: '22px 28px', borderRadius: '20px',
            background: isDark ? 'rgba(30, 41, 59, 0.8)' : '#f1f5f9', border: `1.5px solid ${cardBorder}`,
            textAlign: 'center', fontSize: '15px', color: textSub, lineHeight: '1.8'
          }}>
            💬 {currentText.zaloContactText} <strong style={{ color: '#2563eb', fontSize: '17.5px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
          </div>

          {successMsg && (
            <div style={{
              marginTop: '30px', padding: '24px', borderRadius: '20px',
              background: isDark ? 'rgba(22, 101, 52, 0.4)' : '#dcfce7', border: '1px solid #86efac', color: isDark ? '#4ade80' : '#166534',
              textAlign: 'center', fontSize: '16px', fontWeight: '800', lineHeight: '1.6'
            }}>
              {currentText.successText}<br />
              {currentText.successSub}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${cardBorder}`, padding: '50px 24px', textAlign: 'center', color: textSub, fontSize: '14.5px', background: bgMain, position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE ACADEMIC STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
