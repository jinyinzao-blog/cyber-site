// 确保 DOM 加载完成后再执行
document.addEventListener('DOMContentLoaded', () => {
    const crawler = document.getElementById('cyber-crawler');
    if (!crawler) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let crawlerX = mouseX;
    let crawlerY = mouseY;
    let angle = 0;

    // 监听鼠标位置
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 动画循环 (缓动效果)
    function animate() {
        // 计算当前坐标与目标坐标的距离
        let dx = mouseX - crawlerX;
        let dy = mouseY - crawlerY;
        
        // 缓动公式：每次移动距离的 15%
        crawlerX += dx * 0.15;
        crawlerY += dy * 0.15;

        // 当鼠标移动时，计算旋转角度让爬虫指向移动方向
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            angle = Math.atan2(dy, dx) * 180 / Math.PI;
        }

        // 应用移动和旋转
        crawler.style.transform = `translate(${crawlerX}px, ${crawlerY}px) translate(-50%, -50%) rotate(${angle}deg)`;

        requestAnimationFrame(animate);
    }

    // 启动动画
    animate();
});