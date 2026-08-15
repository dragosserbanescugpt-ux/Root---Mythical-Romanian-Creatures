(() => {
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const assetPrefix = isEnglish ? '../' : '';
  const roUrl = isEnglish ? '../' : './';
  const enUrl = isEnglish ? './' : './en/';
  const languageKey = 'bestiar-language';

  let savedLanguage = null;
  try {
    savedLanguage = localStorage.getItem(languageKey);
  } catch (_) {
    savedLanguage = null;
  }

  if (savedLanguage === 'en' && !isEnglish) {
    window.location.replace(`${enUrl}${window.location.hash || ''}`);
    return;
  }
  if (savedLanguage === 'ro' && isEnglish) {
    window.location.replace(`${roUrl}${window.location.hash || ''}`);
    return;
  }

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

  // V24/V25 — title, terminology, Root Crafting section and bilingual UI.
  const v24Styles = document.createElement('link');
  v24Styles.rel = 'stylesheet';
  v24Styles.href = `${assetPrefix}css/v24.css`;
  document.head.appendChild(v24Styles);

  document.title = isEnglish ? 'Romanian Mythological Creatures' : 'Creaturi Mitologice Românești';

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = isEnglish
      ? '<span class="hero-title__primary">Romanian</span><span class="hero-title__secondary">Mythological Creatures</span>'
      : '<span class="hero-title__primary">Creaturi</span><span class="hero-title__secondary">Mitologice Românești</span>';
  }

  if (!isEnglish) {
    const oldIntro = document.querySelector('section.intro#despre');
    if (oldIntro) oldIntro.id = 'introducere';
  }

  const hero = document.querySelector('section.hero');
  if (hero && !document.querySelector('.project-credit')) {
    const section = document.createElement('section');
    section.className = 'project-credit';
    section.id = isEnglish ? 'about' : 'despre';
    section.setAttribute('aria-labelledby', 'project-credit-title');
    section.innerHTML = isEnglish
      ? `
      <div class="project-credit__ornament" aria-hidden="true">✦</div>
      <div class="project-credit__copy" data-reveal>
        <p class="eyebrow">About the project</p>
        <h2 id="project-credit-title">A digital bestiary created by Root Crafting for Global Village 2026.</h2>
        <p>We created this project to bring Romanian mythological creatures closer to the public through a combination of research, illustration and design. If you would like to discover more projects and objects made by Root Crafting, you can find us on Instagram.</p>
      </div>
      <div class="project-credit__cta" data-reveal>
        <a class="project-credit__instagram" href="https://www.instagram.com/root.crafting?utm_source=qr&igsh=bXBxbDIyY3N6MjJ0" target="_blank" rel="noopener noreferrer" aria-label="Visit Root Crafting on Instagram">Visit <strong>@root.crafting</strong> on Instagram <span aria-hidden="true">↗</span></a>
        <p class="project-credit__small">Root Crafting · Global Village 2026</p>
      </div>`
      : `
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

  if (!isEnglish) {
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
  }

  document.querySelectorAll('.project-credit [data-reveal]').forEach(el => {
    if (reduceMotion) el.classList.add('is-visible');
    else requestAnimationFrame(() => el.classList.add('is-visible'));
  });

  const headerInner = document.querySelector('.site-header__inner');
  if (headerInner && !document.querySelector('.language-switch')) {
    const switcher = document.createElement('div');
    switcher.className = 'language-switch';
    switcher.setAttribute('aria-label', isEnglish ? 'Choose language' : 'Alege limba');
    switcher.innerHTML = `
      <a href="${roUrl}" data-lang-choice="ro" class="${isEnglish ? '' : 'is-active'}" lang="ro"${isEnglish ? '' : ' aria-current="page"'}>RO</a>
      <span aria-hidden="true">/</span>
      <a href="${enUrl}" data-lang-choice="en" class="${isEnglish ? 'is-active' : ''}" lang="en"${isEnglish ? ' aria-current="page"' : ''}>EN</a>`;
    headerInner.appendChild(switcher);
  }

  document.querySelectorAll('[data-lang-choice]').forEach(link => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem(languageKey, link.dataset.langChoice);
      } catch (_) {}
    });
  });

  if (!savedLanguage) {
    const modal = document.createElement('div');
    modal.className = 'language-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'language-modal-title');
    modal.innerHTML = `
      <div class="language-modal__panel">
        <div class="language-modal__ornament" aria-hidden="true">✦</div>
        <p class="eyebrow">Romanian Mythology</p>
        <h2 id="language-modal-title">Choose your language</h2>
        <p class="language-modal__subtitle">Alege limba în care vrei să explorezi bestiarul.</p>
        <div class="language-modal__actions">
          <button type="button" data-modal-language="ro"><span aria-hidden="true">🇷🇴</span><strong>Română</strong></button>
          <button type="button" data-modal-language="en"><span aria-hidden="true">🇬🇧</span><strong>English</strong></button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    document.body.classList.add('language-modal-open');

    const chooseLanguage = language => {
      try {
        localStorage.setItem(languageKey, language);
      } catch (_) {}

      const alreadyThere = (language === 'en' && isEnglish) || (language === 'ro' && !isEnglish);
      if (alreadyThere) {
        modal.remove();
        document.body.classList.remove('language-modal-open');
        return;
      }

      window.location.href = language === 'en' ? enUrl : roUrl;
    };

    modal.querySelectorAll('[data-modal-language]').forEach(button => {
      button.addEventListener('click', () => chooseLanguage(button.dataset.modalLanguage));
    });

    requestAnimationFrame(() => modal.querySelector('[data-modal-language="ro"]')?.focus());
  }
})();
