import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, Quote } from 'lucide-react';

// --- Components ---

// Services Accordion Component
const ServicesAccordion = () => {
  const [activeId, setActiveId] = useState('shooting');

  const services = [
    {
      id: 'shooting',
      category: 'SHOOTING',
      categoryJa: '撮影',
      title: '各種撮影',
      desc: 'ポートレート、宣材、アーティスティックな作品撮りまで。\nあなたの魅力を最大限に引き出す、プロフェッショナルな撮影体験を提供します。\nその他なんでも撮ります。動画もご相談ください。',
      imgSrc: 'images/serabi.jpg',
      href: 'shooting.html',
      activeScale: 'scale-105',
      inactiveScale: 'scale-110'
    },
    {
      id: 'project',
      category: 'PROJECT',
      categoryJa: '企画',
      title: 'POWER TIDE',
      desc: '日本海の恵みを遊び尽くす大人のプレミアムな撮影会。\n北海道でしか味わえない極上の体験を今すぐブッキングしてください。',
      imgSrc: 'images/powertide.png',
      href: 'https://powertide.design4qol.com',
      activeScale: 'scale-90',
      inactiveScale: 'scale-95'
    },
    {
      id: 'community',
      category: 'COMMUNITY',
      categoryJa: 'コミュニティ',
      title: 'Lens & Logos',
      subtitle: '~見つめる写真のはじめ型~',
      desc: '「写真」の最終目的は、飾られること。考えさせること。拠り所になること。ではないだろうかという仮説を元に鑑賞することから始めてみようというコミュニティサイト。',
      imgSrc: 'images/lensandlogos.png',
      href: 'https://ppsg.design4qol.com',
      activeScale: 'scale-105',
      inactiveScale: 'scale-110'
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto mb-32 px-4 md:px-0">
      <div className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-2 md:gap-4">
        {services.map((item) => {
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className="group relative overflow-hidden rounded-sm transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer flex flex-col justify-end border border-white/5 hover:border-white/20"
              style={{ flex: isActive ? '3 1 0%' : '1 1 0%' }}
            >
              {/* 背景画像（透明度と拡大縮小の役割をdivとimgで分離） */}
              <div 
                className="absolute inset-0 w-full h-full transition-opacity duration-1000"
                style={{ opacity: isActive ? 0.4 : 0.05 }}
              >
                <img 
                  src={item.imgSrc} 
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${isActive ? item.activeScale : item.inactiveScale}`} 
                />
              </div>
              
              {/* オーバーレイ */}
              <div className={`absolute inset-0 transition-colors duration-700 ${isActive ? 'bg-gradient-to-t from-[#02040a]/80 via-[#02040a]/10 to-transparent' : 'bg-[#02040a]/20'}`}></div>
              
              {/* コンテンツ */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
                {/* カテゴリバッジ */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs tracking-[0.2em] font-bold transition-colors duration-500 ${isActive ? 'text-gold' : 'text-gray-400'}`}>
                    {item.category}
                  </span>
                  <span className={`text-[10px] border px-2 py-0.5 rounded-sm transition-colors duration-500 ${isActive ? 'border-gold/50 text-gold/80' : 'border-gray-500/50 text-gray-500'}`}>
                    {item.categoryJa}
                  </span>
                </div>
                
                {/* タイトル */}
                <h2 className={`font-normal tracking-wider transition-all duration-500 whitespace-pre-line drop-shadow-lg ${isActive ? 'text-3xl md:text-4xl mb-4 text-white' : 'text-xl md:text-2xl mb-0 text-gray-300 group-hover:text-white'}`}>
                  {item.title}
                  {item.subtitle && (
                    <span className="block text-[0.5em] mt-1 opacity-80">{item.subtitle}</span>
                  )}
                </h2>

                {/* 詳細説明 & リンク */}
                <div 
                  className={`overflow-hidden transition-all duration-700 ease-in-out flex flex-col justify-end ${isActive ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                >
                  <p className="text-sm text-gray-300 leading-relaxed font-sans mb-6 whitespace-pre-line">
                    {item.desc}
                  </p>
                  <div>
                    <a 
                      href={item.href} 
                      className="inline-block text-xs tracking-widest border-b border-white/30 hover:border-gold hover:text-gold pb-1 transition-all text-white"
                    >
                      VIEW MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Contact Modal Component
const ContactModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.contactName.value;
    const email = form.contactEmail.value;
    const message = form.contactMessage.value;
    
    const to = 'studioushio@design4qol.com';
    const subject = encodeURIComponent('【Studio Ushio】お問い合わせ');
    const body = encodeURIComponent(`お名前: ${name}\nメールアドレス: ${email}\n\nお問い合わせ内容:\n${message}`);
    
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    
    onClose();
    setTimeout(() => form.reset(), 300);
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`glass-panel w-full max-w-lg p-8 md:p-10 relative transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl md:text-3xl mb-8 font-light tracking-widest text-center">CONTACT</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <input 
              type="text" 
              id="contactName" 
              name="contactName"
              placeholder="お名前" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
          <div>
            <input 
              type="email" 
              id="contactEmail" 
              name="contactEmail"
              placeholder="メールアドレス" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors"
            />
          </div>
          <div>
            <textarea 
              id="contactMessage" 
              name="contactMessage"
              placeholder="お問い合わせ内容" 
              rows="6" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-colors resize-none"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="mt-4 px-10 py-4 bg-white text-black text-sm tracking-[0.2em] hover:bg-gray-200 transition-colors duration-300"
          >
            メーラーを起動して送信
          </button>
        </form>
      </div>
    </div>
  );
};


// --- Main Application ---
export default function App() {
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Canvas Animation Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let waves = [];
    let stars = [];
    let lighthouse;
    let animationFrameId;

    // --- 重力レンズ（特異点）のパラメータ ---
    let gravityParams = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 3,
      time: 0,
      mass: 8000,
      eventHorizon: 20,
      lastMouseTime: 0
    };

    const handleMouseMove = (e) => {
      gravityParams.targetX = e.clientX;
      gravityParams.targetY = e.clientY;
      gravityParams.lastMouseTime = Date.now();
    };
    window.addEventListener('mousemove', handleMouseMove);

    function applyGravityLens(x, y, gx, gy, mass, eventHorizon) {
      const dx = x - gx;
      const dy = y - gy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist === 0) return { x, y };

      let finalDist;
      if (dist < eventHorizon) {
        finalDist = eventHorizon;
      } else {
        const effect = mass / dist;
        finalDist = dist + effect;
      }
      
      return {
        x: gx + (dx / dist) * finalDist,
        y: gy + (dy / dist) * finalDist
      };
    }

    class Star {
      constructor() {
        this.init();
      }
      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.75;
        this.radius = Math.random() * 1.5 + 0.2;
        this.baseAlpha = Math.random() * 0.7 + 0.1;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = (Math.random() * 0.005 + 0.002) * (Math.random() < 0.5 ? 1 : -1);
      }
      update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha > this.baseAlpha + 0.2 || this.alpha < this.baseAlpha - 0.2 || this.alpha < 0) {
          this.twinkleSpeed *= -1;
        }
        this.alpha = Math.max(0, Math.min(1, this.alpha));
      }
      draw(gx, gy, mass, horizon) {
        const warped = applyGravityLens(this.x, this.y, gx, gy, mass, horizon);
        ctx.beginPath();
        ctx.arc(warped.x, warped.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    class Wave {
      constructor(y, amplitude, wavelength, speed, color) {
        this.y = y;
        this.amplitude = amplitude;
        this.wavelength = wavelength;
        this.speed = speed;
        this.color = color;
        this.offset = Math.random() * 100;
      }
      draw(gx, gy, mass, horizon) {
        ctx.beginPath();
        ctx.moveTo(0, height + 500);
        
        for (let x = 0; x <= width; x += 15) {
          const y = this.y + 
                    Math.sin((x + this.offset) * this.wavelength) * this.amplitude +
                    Math.sin((x + this.offset * 0.5) * this.wavelength * 0.5) * (this.amplitude * 0.5);
          
          const warped = applyGravityLens(x, y, gx, gy, mass * 0.3, horizon);
          ctx.lineTo(warped.x, warped.y);
        }
        
        ctx.lineTo(width, height + 500);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        this.offset += this.speed;
      }
    }

    class Lighthouse {
      constructor() {
        this.angle = 0;
        this.rotationSpeed = 0.005;
      }
      updateAndDraw(gx, gy, mass, horizon) {
        const cx = width * 0.8;
        const cy = height * 0.4;
        const logoImg = logoRef.current;
        
        if (logoImg) {
          const rect = logoImg.getBoundingClientRect();
          if (rect.top < height && rect.bottom > 0) {
            const logoX = rect.left + rect.width / 2;
            const logoY = rect.top + rect.height / 2;
            const angleToLogo = Math.atan2(logoY - cy, logoX - cx);
            
            let currentAngle = this.angle % (Math.PI * 2);
            if (currentAngle > Math.PI) currentAngle -= Math.PI * 2;
            if (currentAngle < -Math.PI) currentAngle += Math.PI * 2;

            let diff = Math.abs(currentAngle - angleToLogo);
            if (diff > Math.PI) diff = Math.PI * 2 - diff;

            const hitThreshold = 0.4; 
            if (diff < hitThreshold) {
              const intensity = 1 - (diff / hitThreshold);
              logoImg.style.filter = `drop-shadow(0 0 ${20 + intensity * 60}px rgba(255, 255, 255, ${0.5 + intensity * 0.5})) brightness(${1 + intensity * 0.5})`;
            } else {
              logoImg.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.3)) brightness(1)';
            }
          }
        }

        const beamLength = Math.max(width, height) * 2;
        const beamWidth = 0.4;
        const steps = 40; 

        // Main beam
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, beamLength);
        gradient.addColorStop(0, 'rgba(255, 255, 240, 0.4)');
        gradient.addColorStop(0.1, 'rgba(255, 255, 240, 0.1)'); 
        gradient.addColorStop(1, 'rgba(255, 255, 240, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        const startWarped = applyGravityLens(cx, cy, gx, gy, mass, horizon);
        ctx.moveTo(startWarped.x, startWarped.y);

        for (let i = 1; i <= steps; i++) {
            const r = (beamLength / steps) * i;
            const px = cx + Math.cos(this.angle - beamWidth / 2) * r;
            const py = cy + Math.sin(this.angle - beamWidth / 2) * r;
            const warped = applyGravityLens(px, py, gx, gy, mass, horizon);
            ctx.lineTo(warped.x, warped.y);
        }
        for (let i = 1; i <= steps; i++) {
            const a = (this.angle - beamWidth / 2) + (beamWidth / steps) * i;
            const px = cx + Math.cos(a) * beamLength;
            const py = cy + Math.sin(a) * beamLength;
            const warped = applyGravityLens(px, py, gx, gy, mass, horizon);
            ctx.lineTo(warped.x, warped.y);
        }
        for (let i = steps - 1; i >= 0; i--) {
            const r = (beamLength / steps) * i;
            const px = cx + Math.cos(this.angle + beamWidth / 2) * r;
            const py = cy + Math.sin(this.angle + beamWidth / 2) * r;
            const warped = applyGravityLens(px, py, gx, gy, mass, horizon);
            ctx.lineTo(warped.x, warped.y);
        }
        ctx.closePath();
        ctx.fill();

        // Opposite faint light
        const oppGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, beamLength * 0.5);
        oppGradient.addColorStop(0, 'rgba(200, 220, 255, 0.05)');
        oppGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
        
        ctx.fillStyle = oppGradient;
        ctx.beginPath();
        const oppStartWarped = applyGravityLens(cx, cy, gx, gy, mass, horizon);
        ctx.moveTo(oppStartWarped.x, oppStartWarped.y);
        
        for (let i = 1; i <= steps; i++) {
            const r = (beamLength * 0.5 / steps) * i;
            const px = cx + Math.cos(Math.PI + this.angle - beamWidth / 4) * r;
            const py = cy + Math.sin(Math.PI + this.angle - beamWidth / 4) * r;
            const warped = applyGravityLens(px, py, gx, gy, mass, horizon);
            ctx.lineTo(warped.x, warped.y);
        }
        for (let i = 1; i <= steps; i++) {
            const a = (Math.PI + this.angle - beamWidth / 4) + (beamWidth * 0.5 / steps) * i;
            const px = cx + Math.cos(a) * beamLength * 0.5;
            const py = cy + Math.sin(a) * beamLength * 0.5;
            const warped = applyGravityLens(px, py, gx, gy, mass, horizon);
            ctx.lineTo(warped.x, warped.y);
        }
        for (let i = steps - 1; i >= 0; i--) {
            const r = (beamLength * 0.5 / steps) * i;
            const px = cx + Math.cos(Math.PI + this.angle + beamWidth / 4) * r;
            const py = cy + Math.sin(Math.PI + this.angle + beamWidth / 4) * r;
            const warped = applyGravityLens(px, py, gx, gy, mass, horizon);
            ctx.lineTo(warped.x, warped.y);
        }
        ctx.closePath();
        ctx.fill();

        // Light source glow
        const glowWarped = applyGravityLens(cx, cy, gx, gy, mass, horizon);
        const glow = ctx.createRadialGradient(glowWarped.x, glowWarped.y, 0, glowWarped.x, glowWarped.y, 40);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(glowWarped.x, glowWarped.y, 40, 0, Math.PI * 2);
        ctx.fill();

        this.angle += this.rotationSpeed;
      }
    }

    const initStars = () => {
      stars = [];
      const starCount = Math.floor(width * height / 2000); 
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    const initWaves = () => {
      waves = [];
      waves.push(new Wave(height * 0.7, 30, 0.003, 0.5, 'rgba(10, 20, 40, 0.5)'));
      waves.push(new Wave(height * 0.8, 40, 0.005, 0.8, 'rgba(5, 10, 25, 0.7)'));
      waves.push(new Wave(height * 0.9, 50, 0.007, 1.2, 'rgba(2, 5, 15, 0.9)'));
    };

    const drawSingularity = (gx, gy, horizon) => {
      // Aura
      const auraRadius = horizon * 5;
      const auraGrad = ctx.createRadialGradient(gx, gy, horizon, gx, gy, auraRadius);
      auraGrad.addColorStop(0, 'rgba(0, 0, 0, 0.9)');
      auraGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.beginPath();
      ctx.arc(gx, gy, auraRadius, 0, Math.PI * 2);
      ctx.fillStyle = auraGrad;
      ctx.fill();

      // Black hole
      ctx.beginPath();
      ctx.arc(gx, gy, horizon, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(5, 10, 20, 0.8)';
      ctx.stroke();
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
      initWaves();
      lighthouse = new Lighthouse();
      gravityParams.x = width / 2;
      gravityParams.y = height / 3;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      if (now - gravityParams.lastMouseTime > 3000) {
        gravityParams.time += 0.005;
        gravityParams.targetX = width / 2 + Math.cos(gravityParams.time) * (width / 3);
        gravityParams.targetY = height / 3 + Math.sin(gravityParams.time * 0.7) * (height / 4);
      }
      
      gravityParams.x += (gravityParams.targetX - gravityParams.x) * 0.03;
      gravityParams.y += (gravityParams.targetY - gravityParams.y) * 0.03;

      const gx = gravityParams.x;
      const gy = gravityParams.y;
      const mass = gravityParams.mass;
      const horizon = gravityParams.eventHorizon;

      // 1. Stars
      ctx.globalCompositeOperation = 'source-over';
      stars.forEach(star => {
        star.update();
        star.draw(gx, gy, mass, horizon);
      });
      
      // 2. Lighthouse beam
      ctx.globalCompositeOperation = 'screen';
      if(lighthouse) lighthouse.updateAndDraw(gx, gy, mass, horizon);

      // 3. Waves
      ctx.globalCompositeOperation = 'source-over';
      waves.forEach(wave => wave.draw(gx, gy, mass, horizon));

      // 4. Singularity
      ctx.globalCompositeOperation = 'source-over';
      drawSingularity(gx, gy, horizon);

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleLogoError = (e) => {
    e.target.onerror = null;
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgMTUwIj48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZGMtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSdzZXJpZicgZm9udC1zaXplPSI4MCIgZmlsbD0id2hpdGUiIGxldHRlci1zcGFjaW5nPSIxMCI+U3R1ZGlvIFVzaGlvPC90ZXh0Pjwvc3ZnPg==';
  };

  return (
    <div className="antialiased min-h-screen flex flex-col font-mincho text-gray-100 selection:bg-blue-900 selection:text-white">
      {/* Global & Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@200;400;600&family=Zen+Old+Mincho:wght@400;700&display=swap');
        
        body {
          font-family: 'Zen Old Mincho', 'Noto Serif JP', serif;
          background: linear-gradient(to bottom, #010203 0%, #030814 100%);
          overflow-x: hidden;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }

        .glass-panel {
          background: rgba(10, 15, 30, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glass-panel:hover {
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(20, 30, 50, 0.7);
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }
        
        .text-gold { color: #d4af37; }
        .border-gold { border-color: #d4af37; }
        
        #logo-img {
          transition: filter 0.1s linear;
          will-change: filter;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
      `}</style>

      {/* Background Canvas */}
      <canvas 
        ref={canvasRef} 
        id="searchlight-canvas" 
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      ></canvas>

      {/* Header / Hero Section */}
      <header className="relative w-full h-[80vh] flex flex-col justify-center items-center text-center px-4">
        <div className="animate-fade-in z-10 mix-blend-screen flex flex-col items-center">
          <p className="text-sm md:text-base tracking-[0.3em] text-blue-200/60 mb-8 uppercase">
            Photography & Creative Space
          </p>
          
          <div className="mb-6 relative">
            <img 
              ref={logoRef}
              id="logo-img" 
              src="images/studioushio.png" 
              alt="Studio Ushio" 
              className="max-w-[32vw] w-auto h-auto md:max-w-[230px] object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              onError={handleLogoError}
            />
          </div>

          <p className="text-lg md:text-xl font-light tracking-widest mt-8 text-blue-100/80">
            深淵を照らす光。<br className="md:hidden" />静寂に響く鼓動。
          </p>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 text-white">
          <ChevronDown size={24} strokeWidth={1} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto py-20 z-10">
        
        {/* Services Accordion Section */}
        <ServicesAccordion />

        {/* PR Comments */}
        <section className="max-w-3xl mx-auto text-center px-4 mb-16">
          <div className="mb-8 flex flex-col items-center">
            <Quote size={48} className="mb-6 opacity-50 text-gray-400" />
            <h4 className="text-xl md:text-2xl font-light mb-8 tracking-widest text-blue-50">「凪と荒波、その狭間で。」</h4>
          </div>
          
          <p className="text-gray-300 leading-loose text-sm md:text-base font-sans text-justify md:text-center">
            Studio Ushioは、真夜中の海のような静謐な空間です。<br />
            そこは、あなたの中に眠る「まだ見ぬ自分」と出会うための場所。<br /><br />
            その海原を照らすのは岬の灯りでしょうか、星の輝きでしょうか、やがてのぼる朝日でしょうか。<br />
            外の世界の喧騒を遮断し、被写体とカメラマンが呼吸を合わせる濃密な時間。<br />
            深い闇の中から、あなたの本質を鮮やかに浮かび上がらせます。<br /><br />
            特別な日の記念にも、日常の記録にも、アート作品の創作にも。<br />
            Studio Ushioで、深淵なる写真体験を。
          </p>

          <div className="mt-12">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-10 py-3 border border-white/30 text-sm tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              CONTACT US
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-12 px-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs tracking-widest mt-auto z-10 bg-black/80 backdrop-blur-md">
        <div className="mb-6 md:mb-0">
          <a href="https://design4qol.com" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
            <img src="images/logo2.png" alt="Design4QoL" className="h-8 w-auto" />
          </a>
        </div>
        <div className="text-center md:text-right">
          <p className="mb-2 text-gray-400">Studio Ushio</p>
          <p>&copy; 2026 MiLio, LLC All Rights Reserved.</p>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
    </div>
  );
}