// 这里编写自定义js脚本；将被静态引入到页面中
// 滚动模糊 - 封面动态效果
// 等待页面元素完全加载后，再执行滚动模糊特效
document.addEventListener('DOMContentLoaded', function () {
  const img = document.getElementById('header-cover');
  if (!img) {
    console.warn('未找到 #header-cover 元素，滚动模糊特效未启动');
    return;
  }

  function updateBlur() {
    const rect = img.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom <= 0 || rect.top >= windowHeight) {
      img.style.filter = 'blur(8px)';
      img.style.opacity = '0.2';
      return;
    }

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const totalHeight = rect.height;
    const visibleRatio = Math.max(0, Math.min(1, visibleHeight / totalHeight));

    const blur = (1 - visibleRatio) * 8;
    const opacity = 0.3 + visibleRatio * 0.7;

    img.style.filter = `blur(${blur}px)`;
    img.style.opacity = opacity;
    img.style.transition = 'none';
  }

  window.addEventListener('scroll', updateBlur, { passive: true });
  window.addEventListener('resize', updateBlur, { passive: true });
  updateBlur();
});
