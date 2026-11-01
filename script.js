const crawler = document.getElementById('cyber-crawler');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let crawlerX = mouseX;
let crawlerY = mouseY;

// 监听鼠标位置
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// 让爬虫追赶鼠标（缓动动画）
function updateCrawler() {
    crawlerX += (mouseX - crawlerX) * 0.15;
    crawlerY += (mouseY - crawlerY) * 0.15;

    // 计算旋转角度
    const angle = Math.atan2(mouseY - crawlerY, mouseX - crawlerX) * 180 / Math.PI;

    // 移动爬虫，并居中对齐鼠标
    crawler.style.transform = `translate(${crawlerX - 40}px, ${crawlerY - 40}px) rotate(${angle}deg)`;

    requestAnimationFrame(updateCrawler);
}

// 启动动画
updateCrawler();

// 标题故障艺术效果
const glitchText = document.querySelector('.glitch-text');
setInterval(() => {
    if(Math.random() > 0.9) {
        glitchText.style.textShadow = `
            ${Math.random()*10 - 5}px 0 0 red, 
            ${Math.random()*10 - 5}px 0 0 blue
        `;
        setTimeout(() => {
            glitchText.style.textShadow = 'none';
        }, 100);
    }
}, 200);