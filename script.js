const cursor = document.getElementById('cursor');
const typographyBlock = document.querySelector('.typography-block');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

// 鼠标移动
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 字体视差效果 (跟随鼠标轻微移动)
    const xOffset = (window.innerWidth / 2 - mouseX) * 0.02;
    const yOffset = (window.innerHeight / 2 - mouseY) * 0.02;
    
    typographyBlock.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
});

// 缓动跟随光标
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// 鼠标悬停放大效果
document.querySelectorAll('h1, h2').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});