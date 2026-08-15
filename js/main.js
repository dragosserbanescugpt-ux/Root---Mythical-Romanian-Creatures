(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const revealElements = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const closeButton = lightbox?.querySelector('.lightbox__close');

  document.querySelectorAll('[data-lightbox-src]').forEach(button => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage || typeof lightbox.showModal !== 'function') return;

      lightboxImage.src = button.dataset.lightboxSrc;
      lightboxImage.alt = button.dataset.lightboxAlt || '';
      lightbox.showModal();
    });
  });

  closeButton?.addEventListener('click', () => {
    lightbox.close();
  });

  lightbox?.addEventListener('click', event => {
    const rect = lightbox.getBoundingClientRect();
    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInside) {
      lightbox.close();
    }
  });
})();
