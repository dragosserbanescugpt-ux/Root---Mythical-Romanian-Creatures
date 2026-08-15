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

  // V24 — title, terminology and Root Crafting / Global Village section.
  const v24Styles = document.createElement('link');
  v24Styles.rel = 'stylesheet';
  v24Styles.href = 'css/v24.css';
  document.head.appendChild(v24Styles);

  document.title = 'Creaturi Mitologice Românești';

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = '<span class="hero-title__primary">Creaturi</span><span class="hero-title__secondary">Mitologice Românești</span>';
  }

  const oldIntro = document.querySelector('section.intro#despre');
  if (oldIntro) oldIntro.id = 'introducere';

  const hero = document.querySelector('section.hero');
  if (hero && !document.querySelector('.project-credit')) {
    const section = document.createElement('section');
    section.className = 'project-credit';
    section.id = 'despre';
    section.setAttribute('aria-labelledby', 'project-credit-title');
    section.innerHTML = `
      <div class="project-credit__ornament" aria-hidden="true">✦</div>
      <div class="project-credit__copy" data-reveal>
        <p class="eyebrow">Despre proiect</p>
        <h2 id="project-credit-title">Un bestiar digital realizat de Root Crafting pentru Global Village 2026.</h2>
        <p>Am creat acest proiect pentru a aduce creaturile mitologice românești mai aproape de public, printr-o combinație de documentare, ilustrație și design. Dacă vrei să descoperi mai multe proiecte și obiecte realizate de Root Crafting, ne găsești pe Instagram.</p>
      </div>
      <div class="project-credit__cta" data-reveal>
        <a class="project-credit__instagram" href="https://www.instagram.com/root.crafting?utm_source=qr&igsh=bXBxbDIyY3N6MjJ0" target="_blank" rel="noopener noreferrer" aria-label="Vizitează Root Crafting pe Instagram">Vizitează <strong>@root.crafting</strong> pe Instagram <span aria-hidden="true">↗</span></a>
        <p class="project-credit__small">Root Crafting · Global Village 2026</p>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  const matSource = document.querySelector('#matcalaul .creature__source');
  if (matSource) {
    matSource.innerHTML = '<span>Sursa:</span> Marcel Olinescu, Mitologie românească.';
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    let text = node.nodeValue;
    text = text.replace(/\bGrimoire\b/gi, 'Bestiar').replace(/\bGrimoir\b/gi, 'Bestiar');
    text = text.replace(/Notă:\s*această versiune[^.]*\.(?:\s*[^.]*\.)?/gi, '');
    text = text.replace(/Notă de review[^.]*\./gi, '');
    node.nodeValue = text;
  });

  // Reveal the newly inserted project section immediately when motion is reduced,
  // otherwise let the existing animation CSS display it naturally.
  document.querySelectorAll('.project-credit [data-reveal]').forEach(el => {
    if (reduceMotion) el.classList.add('is-visible');
    else requestAnimationFrame(() => el.classList.add('is-visible'));
  });
})();
