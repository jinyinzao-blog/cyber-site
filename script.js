// 确保网页加载完毕后再执行
document.addEventListener('DOMContentLoaded', () => {
    const crawler = document.getElementById('cyber-crawler');
    
    // 如果找不到爬虫元素，就在控制台报警，方便我们排查
    if (!crawler) {
        console.error("找不到爬虫元素！请检查 HTML 中是否有 id='cyber-crawler'");
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let crawlerX = mouseX;
    let crawlerY = mouseY;

    // 监听鼠标移动
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // 动画循环
    function animate() {
        // 缓动效果，数值越大跟得越紧
        crawlerX += (mouseX - crawlerX) * 0.15;
        crawlerY += (mouseY - crawlerY) * 0.15;

        // 应用位置
        crawler.style.left = `${crawlerX}px`;
        crawler.style.top = `${crawlerY}px`;

        requestAnimationFrame(animate);
    }

    // 启动动画
    animate();
});