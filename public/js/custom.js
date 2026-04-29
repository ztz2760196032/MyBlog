// 这里编写自定义js脚本；将被静态引入到页面中
// 蹲守 #header-cover 直到它出现，然后启动滚动模糊
(function init() {
  const img = document.getElementById('header-cover');
  if (img) {
    // 找到了！启动特效
    (function startEffect(img) {
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
    })(img);
  } else {
    // 还没出现，100 毫秒后再找一次
    setTimeout(init, 100);
  }
})();
