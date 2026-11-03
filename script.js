document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. 动态数据网络背景 (Canvas)
       ========================================= */
    const canvas = document.getElementById('network-bg');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(28, 36, 255, 0.8)';
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor((width * height) / 15000); // 根据屏幕大小计算粒子数
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // 画连线
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // 距离越近，线越清晰
                    ctx.strokeStyle = `rgba(28, 36, 255, ${1 - dist / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateCanvas);
    }

    initCanvas();
    initParticles();
    animateCanvas();

    window.addEventListener('resize', () => {
        initCanvas();
        initParticles();
    });

    /* =========================================
       2. 赛博爬虫跟随逻辑
       ========================================= */
    const crawler = document.getElementById('cyber-crawler');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let crawlerX = mouseX;
    let crawlerY = mouseY;
    
    // 监听鼠标
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCrawler() {
        // 缓动跟随
        crawlerX += (mouseX - crawlerX) * 0.1;
        crawlerY += (mouseY - crawlerY) * 0.1;

        // 计算角度 (让头对准移动方向)
        const dx = mouseX - crawlerX;
        const dy = mouseY - crawlerY;
        
        // 只有在移动时才旋转，停下时不瞎转
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            // 因为 SVG 画的时候头部是在左边(0度)，所以直接应用角度
            crawler.style.transform = `translate(${crawlerX}px, ${crawlerY}px) rotate(${angle}deg)`;
        } else {
            crawler.style.transform = `translate(${crawlerX}px, ${crawlerY}px) rotate(0deg)`;
        }

        requestAnimationFrame(updateCrawler);
    }
    updateCrawler();

    /* =========================================
       3. 标题故障文字特效 (Glitch)
       ========================================= */
    const glitchText = document.querySelector('.glitch-text');
    const originalText = glitchText.innerText;
    
    setInterval(() => {
        if (Math.random() > 0.85) { // 15% 的概率触发
            const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
            let newText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() > 0.7) {
                    newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    newText += originalText[i];
                }
            }
            glitchText.innerText = newText;
            
            // 短暂变色
            glitchText.style.color = '#ff4500';
            glitchText.style.textShadow = '2px 0 #00ff88, -2px 0 #1c24ff';
            
            setTimeout(() => {
                glitchText.innerText = originalText;
                glitchText.style.color = 'var(--text-main)';
                glitchText.style.textShadow = '0 0 20px rgba(255,255,255,0.1)';
            }, 100);
        }
    }, 500);
});