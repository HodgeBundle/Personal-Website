(() => {
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const els = document.querySelectorAll('[data-reveal]');
  if (reduceMQ.matches || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  els.forEach(el => io.observe(el));
})();
