"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("theme-purple");
  const [copiedAlert, setCopiedAlert] = useState(false);
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
    const saved = localStorage.getItem("novas_theme") || "theme-purple";
    setTheme(saved);

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
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("novas_theme", newTheme);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyPhone = () => {
    try {
      navigator.clipboard.writeText(MY_PHONE);
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 4000);
    } catch (err) {
      console.log(err);
    }
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
      `Gửi từ Landing Page Novas Creative Studio.`
    );

    window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={theme} style={{
      minHeight: '100vh',
      backgroundColor: '#070913',
      color: '#f8fafc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden',
      transition: 'all 0.5s ease',
      position: 'relative'
    }}>
      <style jsx global>{`
        :root {
          --primary-glow: #a855f7;
          --secondary-glow: #ec4899;
          --accent-cyan: #06b6d4;
          --bright-bg: rgba(255, 255, 255, 0.04);
        }
        .theme-purple {
          --primary-glow: #a855f7;
          --secondary-glow: #ec4899;
          --accent-cyan: #38bdf8;
        }
        .theme-green {
          --primary-glow: #10b981;
          --secondary-glow: #06b6d4;
          --accent-cyan: #34d399;
        }
        .theme-blue {
          --primary-glow: #3b82f6;
          --secondary-glow: #8b5cf6;
          --accent-cyan: #60a5fa;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-45px) rotate(180deg) scale(1.15); }
        }

        @keyframes glowBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes pulseBright {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 25px var(--primary-glow)); }
          50% { opacity: 0.95; filter: drop-shadow(0 0 45px var(--secondary-glow)); }
        }

        .hero-title {
          background: linear-gradient(135deg, #ffffff 10%, var(--accent-cyan) 45%, var(--secondary-glow) 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 35px rgba(168, 85, 247, 0.45));
        }

        .glow-btn-primary {
          background: linear-gradient(135deg, var(--primary-glow), var(--secondary-glow));
          box-shadow: 0 0 35px rgba(168, 85, 247, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.4);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glow-btn-primary:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 0 55px rgba(236, 72, 153, 0.75), inset 0 1px 2px rgba(255, 255, 255, 0.6);
        }

        .card-cyber-bright {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          position: relative;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-cyber-bright:hover {
          border-color: var(--accent-cyan);
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 25px 50px -10px rgba(0, 0, 0, 0.8), 0 0 35px var(--primary-glow);
        }

        .gradient-border-box {
          position: relative;
          background: rgba(15, 23, 42, 0.85);
          border-radius: 24px;
          backdrop-filter: blur(25px);
        }
        .gradient-border-box::before {
          content: "";
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          border-radius: 26px;
          background: linear-gradient(90deg, var(--primary-glow), var(--accent-cyan), var(--secondary-glow), var(--primary-glow));
          background-size: 300% 300%;
          z-index: -1;
          animation: glowBorder 6s linear infinite;
        }

        .cyber-input-bright {
          background: rgba(3, 7, 18, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .cyber-input-bright:focus {
          outline: none;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 25px var(--accent-cyan);
        }

        .reveal {
          opacity: 0;
          transform: translateY(50px) scale(0.96);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 38px !important; }
          .grid-responsive { grid-template-columns: 1fr !important; }
          .header-nav { display: none !important; }
          .mobile-padding { padding-left: 18px !important; padding-right: 18px !important; }
        }
      `}</style>

      {/* Dynamic Background Lights */}
      <div style={{
        position: 'fixed', top: '-10%', left: '20%',
        width: '650px', height: '650px',
        background: 'radial-gradient(circle, var(--primary-glow) 0%, rgba(0,0,0,0) 70%)',
        opacity: 0.35, pointerEvents: 'none', animation: 'floatOrb 12s infinite ease-in-out', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', right: '15%',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, var(--accent-cyan) 0%, rgba(0,0,0,0) 70%)',
        opacity: 0.25, pointerEvents: 'none', animation: 'floatOrb 15s infinite ease-in-out reverse', zIndex: 0
      }} />

      {/* Header Bar */}
      <header style={{
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(7, 9, 19, 0.85)', backdropFilter: 'blur(20px)',
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', height: '75px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            fontSize: '22px', fontWeight: '900', letterSpacing: '2px',
            background: 'linear-gradient(90deg, #ffffff, var(--accent-cyan))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            display: 'flex', alignItems: 'center', gap: '
