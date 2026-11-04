const cursor = document.getElementById('cursor');
const typographyBlock = document.querySelector('.typography-block');
const root = document.documentElement;

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

// 监听鼠标移动
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 1. 实现文字跟随的轻微视差效果
    const xOffset = (window.innerWidth / 2 - mouseX) * 0.02;
    const yOffset = (window.innerHeight / 2 - mouseY) * 0.02;
    typographyBlock.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

    // 2. 融合 color.pizza 的动态极坐标色彩算法
    const normX = mouseX / window.innerWidth;  // 0 ~ 1
    const normY = mouseY / window.innerHeight; // 0 ~ 1

    // 基础色相随 X 轴滚动 (0-360)
    const baseHue = normX * 360;
    // 第二色相：使用互补色或邻近色逻辑，这里加入 Y 轴影响，让色彩组合更丰富
    const secondaryHue = (baseHue + 140 + (normY * 40)) % 360; 

    // 生成 HSL 颜色 (高饱和度，适中的明度保证高级感)
    const dynamicColor1 = `hsl(${baseHue}, 90%, 50%)`;
    const dynamicColor2 = `hsl(${secondaryHue}, 95%, 55%)`;

    // 将动态颜色注入到 CSS 变量中
    root.style.setProperty('--color1', dynamicColor1);
    root.style.setProperty('--color2', dynamicColor2);
});

// 缓动跟随光标，让移动不僵硬
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// 鼠标悬停放大交互
document.querySelectorAll('h1, h2').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});