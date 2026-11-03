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
  const [isRotating, setIsRotating] = useState(false);
  const [isLangAnimating, setIsLangAnimating] = useState(false);

  const SHEETDB_API = "https://sheetdb.io/api/v1/qc91smq6sdwnd"; 
  const MY_PHONE = "0399641646";
  const MY_EMAIL = "Cubergeniushuyvan@gmail.com";

  useEffect(() => {
    // Hiệu ứng lướt cuộn: Kích hoạt ngay khi vừa chạm màn hình, không trễ nải, mượt tuyệt đối
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in-active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const slideElements = document.querySelectorAll(".slide-scroll-trigger");
    slideElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
      successText: "🎉 ĐƠN HÀNG ĐÃ ĐƯỢC LƯU VÀO GOOGLE SHEETS THÀNH CÔNG!",
      successSub: "Văn sẽ tiếp nhận và phản hồi lại bạn trong vòng tối đa 4 tiếng!",
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
      successText: "🎉 ORDER SUCCESSFULLY SAVED TO GOOGLE SHEETS!",
      successSub: "Van will receive and respond to you within a maximum of 4 hours!",
      zaloContactText: "Or contact directly via Zalo Huỳnh Huy Văn at phone number",
      zaloTime: "for consultation (replied within a maximum of just 4 hours)."
    }
  };

  const currentText = t[lang];

  const isDark = theme === "dark";
  const bgMain = isDark ? "#090d16" : "#fdfdfd";
  const textMain = isDark ? "#f8fafc" : "#0f172a";
  const cardBg = isDark ? "rgba(15, 23, 42, 0.85)" : "#ffffff";
  const cardBorder = isDark ? "rgba(59, 130, 246, 0.25)" : "#e2e8f0";
  const textSub = isDark ? "#94a3b8" : "#64748b";

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: bgMain,
      color: textMain,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      position: 'relative',
      transition: 'background-color 0.4s ease, color 0.4s ease'
    }}>
      <style>{`
        @keyframes floatBigRotate {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(14deg) scale(1.1); }
        }

        @keyframes shimmerText {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pageIntro {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0px); }
        }

        .page-intro-anim {
          animation: pageIntro 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .floating-deco-v4 {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          animation: floatBigRotate 5.5s ease-in-out infinite;
          opacity: 0.35;
        }

        {/* Hiệu ứng trượt bay vào từ hai bên cực kỳ mượt mà khi lướt tới */}
        .slide-scroll-trigger {
          opacity: 0;
          transform: translateX(-70px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .slide-scroll-trigger.right-dir {
          transform: translateX(70px);
        }
        .slide-scroll-trigger.slide-in-active {
          opacity: 1;
          transform: translateX(0px);
        }

        .lang-transition-wrap {
          opacity: ${isLangAnimating ? 0 : 1};
          transform: translateY(${isLangAnimating ? '6px' : '0px'});
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .hero-title-shimmer {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.25;
          letter-spacing: -1px;
          background: linear-gradient(135deg, ${isDark ? '#ffffff' : '#0f172a'} 20%, #2563eb 50%, #38bdf8 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 5s ease infinite;
        }

        .clean-card {
          background: ${cardBg};
          border: 1px solid ${cardBorder};
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          border-radius: 24px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clean-card:hover {
          border-color: #2563eb;
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(37, 99, 235, 0.15);
        }

        .btn-primary-clean {
          background: #2563eb;
          color: white;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
          transition: all 0.25s ease;
        }
        .btn-primary-clean:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
        }

        .control-icon-btn {
          background: ${isDark ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : '#cbd5e1'};
          color: ${textMain};
          width: 42px;
          height: 42px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          transition: all 0.2s ease;
        }
        .control-icon-btn:hover {
          border-color: #2563eb;
          transform: translateY(-1px);
        }

        .input-box-clean {
          background: ${isDark ? 'rgba(30, 41, 59, 0.7)' : '#f8fafc'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : '#cbd5e1'};
          color: ${textMain};
          transition: all 0.2s ease;
        }
        .input-box-clean:focus {
          outline: none;
          border-color: #2563eb;
          background: ${isDark ? '#0f172a' : '#ffffff'};
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        @media (max-width: 768px) {
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .hero-title-shimmer { font-size: 32px !important; }
        }
      `}</style>

      {/* 🎓 Nhân bản & Phóng to Mũ tốt nghiệp & Bút chì ở 2 bên */}
      <div className="floating-deco-v4 page-intro-anim" style={{ top: '100px', left: '3%', fontSize: '58px', animationDelay: '0s' }}>🎓</div>
      <div className="floating-deco-v4 page-intro-anim" style={{ top: '220px', left: '6%', fontSize: '46px', animationDelay: '1.5s' }}>✏️</div>
      <div className="floating-deco-v4 page-intro-anim" style={{ top: '120px', right: '3%', fontSize: '58px', animationDelay: '0.8s' }}>🎓</div>
      <div className="floating-deco-v4 page-intro-anim" style={{ top: '240px', right: '6%', fontSize: '46px', animationDelay: '2s' }}>✏️</div>

      {/* Header Cố Định Mượt Mà */}
      <header className="page-intro-anim" style={{
        borderBottom: `1px solid ${cardBorder}`,
        background: isDark ? 'rgba(9, 13, 22, 0.9)' : 'rgba(253, 253, 253, 0.9)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', height: '76px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚡ {currentText.brand} 
            <span style={{ fontSize: '10px', background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb', padding: '2px 6px', borderRadius: '6px', fontWeight: '800' }}>
              {currentText.tagline}
            </span>
          </div>

          <nav className="header-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            <a href="#about" style={{ color: textSub, textDecoration: 'none', fontSize: '13.5px', fontWeight: '700' }}>{currentText.navAbout}</a>
            <a href="#services" style={{ color: textSub, textDecoration: 'none', fontSize: '13.5px', fontWeight: '700' }}>{currentText.navServices}</a>
            <a href="#order" style={{ color: textSub, textDecoration: 'none', fontSize: '13.5px', fontWeight: '700' }}>{currentText.navOrder}</a>
          </nav>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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

      {/* Nội dung toàn trang bọc trong hiệu ứng chuyển ngôn ngữ mượt mà */}
      <div className="lang-transition-wrap">
        
        {/* Hero Section */}
        <section id="about" className="page-intro-anim" style={{ padding: '90px 24px 60px', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          
          <h1 className="hero-title-shimmer" style={{ margin: '0 0 24px 0', whiteSpace: 'pre-line' }}>
            {currentText.heroTitle}
          </h1>

          <p style={{
            color: textSub, fontSize: '16.5px', lineHeight: '1.85', maxWidth: '750px', margin: '0 auto 40px',
            fontStyle: 'italic', fontWeight: '500'
          }}>
            "{currentText.slogan}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a href="#order" className="btn-primary-clean" style={{ textDecoration: 'none', padding: '16px 36px', borderRadius: '14px', fontSize: '15px', fontWeight: '800' }}>
              {currentText.btnExplore}
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="slide-scroll-trigger" style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '900', textAlign: 'center', marginBottom: '8px', color: textMain }}>
            {currentText.servicesTitle}
          </h2>
          <p style={{ textAlign: 'center', color: textSub, marginBottom: '40px', fontSize: '14.5px' }}>{currentText.servicesDesc}</p>

          <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            
            <div className="clean-card" style={{ padding: '36px' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>💻</div>
              <h3 style={{ fontSize: '19px', fontWeight: '900', margin: '0 0 10px 0', color: textMain }}>{currentText.service1Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
                {currentText.service1Desc}
              </p>
            </div>

            <div className="clean-card" style={{ padding: '36px' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>📚</div>
              <h3 style={{ fontSize: '19px', fontWeight: '900', margin: '0 0 10px 0', color: textMain }}>{currentText.service2Title}</h3>
              <p style={{ color: textSub, lineHeight: '1.7', fontSize: '14px', margin: 0 }}>
                {currentText.service2Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Form Đặt Hàng Tự Động Lưu Google Sheets */}
        <section id="order" className="slide-scroll-trigger right-dir" style={{ padding: '60px 24px 100px', maxWidth: '760px', margin: '0 auto' }}>
          <div className="clean-card" style={{ padding: '42px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', margin: '0 0 8px 0', color: textMain }}>
              {currentText.orderTitle}
            </h2>
            <p style={{ color: textSub, fontSize: '14px', textAlign: 'center', marginBottom: '32px' }}>
              {currentText.orderDesc}
            </p>

            <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>{currentText.labelName}</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Ví dụ: Nguyễn Văn A..." className="input-box-clean" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>{currentText.labelPhone}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="039xxxxxxx" className="input-box-clean" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>{currentText.labelAge}</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>{currentText.labelService}</label>
                <select name="service" value={formData.service} onChange={handleChange} className="input-box-clean" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', boxSizing: 'border-box' }}>
                  <option value="Slide PowerPoint học đường">Slide PowerPoint học đường</option>
                  <option value="Giáo án điện tử">Giáo án điện tử</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#2563eb', marginBottom: '6px' }}>{currentText.labelReq}</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} rows={4} placeholder="Nhập môn học, chủ đề, số lượng slide..." className="input-box-clean" style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }}></textarea>
              </div>

              <button type="submit" disabled={loading} className="btn-primary-clean" style={{
                width: '100%', padding: '16px', border: 'none', borderRadius: '12px',
                fontWeight: '900', fontSize: '14px', cursor: 'pointer', marginTop: '10px', textTransform: 'uppercase'
              }}>
                {loading ? currentText.btnSubmitting : currentText.btnSubmit}
              </button>
            </form>

            <div style={{
              marginTop: '25px', padding: '16px', borderRadius: '12px',
              background: isDark ? 'rgba(30, 41, 59, 0.5)' : '#f8fafc', border: `1px solid ${cardBorder}`,
              textAlign: 'center', fontSize: '13px', color: textSub, lineHeight: '1.6'
            }}>
              💬 {currentText.zaloContactText} <strong style={{ color: '#2563eb', fontSize: '14.5px', fontWeight: '900' }}>{MY_PHONE}</strong> {currentText.zaloTime}
            </div>

            {successMsg && (
              <div style={{
                marginTop: '20px', padding: '16px', borderRadius: '12px',
                background: isDark ? 'rgba(22, 101, 52, 0.4)' : '#dcfce7', border: '1px solid #86efac', color: isDark ? '#4ade80' : '#166534',
                textAlign: 'center', fontSize: '14px', fontWeight: '800', lineHeight: '1.6'
              }}>
                {currentText.successText}<br />
                {currentText.successSub}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${cardBorder}`, padding: '35px 24px', textAlign: 'center', color: textSub, fontSize: '13px', background: bgMain, position: 'relative', zIndex: 1 }}>
        <p>© 2026 NOVAS CREATIVE STUDIO. PHÁT TRIỂN BỞI HUỲNH HUY VĂN. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}
