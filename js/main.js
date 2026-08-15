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

  // English editorial pass: keep Romanian names in the bilingual titles and aliases,
  // but use the agreed English names in the descriptive copy. Strigoi, Samca and
  // Mătcălău remain Romanian. Romanian cultural terms are glossed in parentheses.
  if (isEnglish) {
    const replaceText = (root, replacements) => {
      if (!root) return;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        let text = node.nodeValue;
        replacements.forEach(([pattern, replacement]) => {
          text = text.replace(pattern, replacement);
        });
        node.nodeValue = text;
      });
    };

    replaceText(document.querySelector('.intro__copy'), [
      [/Balauri/g, 'Dragons']
    ]);

    const storyEdits = {
      ielele: [
        [/\bIele\b/g, 'Enchanted Maidens'],
        [/hora/g, 'hora (a traditional Romanian circle dance)'],
        [/“pocire” — supernatural affliction or disfigurement —/g, 'pocire (a traditional Romanian belief in supernatural affliction or disfigurement)'],
        [/Doamna Irodia/g, 'Lady Irodia']
      ],
      ursitoarele: [
        [/The Ursitoare/g, 'The Fates'],
        [/the Ursitoare/g, 'the Fates'],
        [/eldest Ursitoare/g, 'eldest Fate'],
        [/third Ursitoare/g, 'third Fate'],
        [/\bUrsitoare\b/g, 'Fate'],
        [/Soartea/g, 'Fate'],
        [/Moartea/g, 'Death']
      ],
      'muma-padurii': [
        [/Muma Pădurii is/g, 'The Mother of the Forest is'],
        [/attributed to Muma Pădurii/g, 'attributed to the Mother of the Forest'],
        [/“pocire,”/g, 'pocire (a traditional Romanian belief in supernatural affliction or disfigurement),']
      ],
      'zanele-bune': [
        [/the Zânele Bune/g, 'the Good Fairies'],
        [/a Zână a Zânelor/g, 'a Queen of the Fairies'],
        [/the zmei/g, 'the Ogres'],
        [/the Zâne are/g, 'the Good Fairies are']
      ],
      brehnele: [
        [/The Brehne occupy/g, 'The Brehne Spirits occupy'],
        [/than the Iele or Strigoi/g, 'than the Enchanted Maidens or Strigoi'],
        [/the Brehne\./g, 'the Brehne Spirits.'],
        [/“mischievous spiriduși.”/g, '“mischievous imps.”'],
        [/the Spiriduș presented separately/g, 'the Imp presented separately']
      ],
      'stima-apei': [
        [/Știma Apei is/g, 'The Water Spirit is'],
        [/with an altiță and/g, 'with an altiță (an embroidered shoulder panel specific to Romanian folk dress) and'],
        [/its own știmă\./g, 'its own water spirit.'],
        [/During drought, Știma emerges/g, 'During drought, the Water Spirit emerges']
      ],
      'sarpele-casei': [
        [/Șarpele Casei is/g, 'The Guardian House Snake is']
      ],
      samca: [
        [/“samcă” or “spasm.”/g, 'samcă (the traditional Romanian name for an illness attributed to Samca) or “spasm.”']
      ],
      'ceasul-cel-rau': [
        [/Ceasul cel Rău shows/g, 'The Evil Hour shows'],
        [/The Ceasurile Rele are/g, 'The Evil Hours are'],
        [/It can “poci” a person, meaning that it can cause a physical or spiritual disturbance attributed to a supernatural encounter\./g, 'It can cause pocire (a traditional Romanian term for a supernatural physical or spiritual affliction).'],
        [/touched by Ceasul cel Rău/g, 'touched by the Evil Hour']
      ],
      varcolacul: [
        [/The Vârcolac of Romanian traditions/g, 'The Werewolf of Romanian traditions'],
        [/the action of the Vârcolac/g, 'the action of the Werewolf'],
        [/a human vârcolac/g, 'a human werewolf'],
        [/the vârcolac approaches/g, 'the werewolf approaches'],
        [/Beliefs about the Vârcolac/g, 'Beliefs about the Werewolf']
      ],
      stafia: [
        [/Stafia is presented/g, 'The Ghost is presented'],
        [/Stafia is defined/g, 'the Ghost is defined'],
        [/Stafia becomes/g, 'the Ghost becomes'],
        [/connects Stafia/g, 'connects the Ghost']
      ],
      zburatorul: [
        [/Zburătorul is/g, 'The Flyer is'],
        [/a scaly balaur/g, 'a scaly dragon'],
        [/called “lipitură” or even “Zburătorul.”/g, 'called lipitură (a traditional Romanian term for an affliction attributed to the Flyer), or even “Zburătorul” (literally “the Flyer”).'],
        [/Zburătorul thus belongs/g, 'The Flyer thus belongs']
      ],
      zmeul: [
        [/The Zmeu of fairy tales/g, 'The Ogre of fairy tales'],
        [/the Balaur/g, 'the Dragon'],
        [/adversaries of Făt-Frumos/g, 'adversaries of Făt-Frumos (the archetypal handsome hero of Romanian fairy tales)'],
        [/Zmei live/g, 'Ogres live'],
        [/The Zmeoaica, the maternal figure of their kind,/g, 'The Zmeoaica (the female or maternal ogre),'],
        [/The Zmeu belongs/g, 'The Ogre belongs'],
        [/the fight with Făt-Frumos/g, 'the fight with the hero'],
        [/the Zmeu is often/g, 'the Ogre is often']
      ],
      balaurul: [
        [/the Balaur has/g, 'the Dragon has'],
        [/between the balauri of stories and the balauri of the clouds/g, 'between the Dragons of stories and the Dragons of the clouds'],
        [/The fairy-tale Balaur/g, 'The fairy-tale Dragon'],
        [/balauri rise/g, 'Dragons rise'],
        [/controlled by Solomonari/g, 'controlled by Weather Sorcerers'],
        [/road of the Balauri/g, 'road of the Dragons'],
        [/birth of the Balaur/g, 'birth of the Dragon'],
        [/transform into a Balaur/g, 'transform into a Dragon']
      ],
      solomonarul: [
        [/Solomonarul is/g, 'The Weather Sorcerer is'],
        [/future Solomonari/g, 'future Weather Sorcerers'],
        [/school called Solomanță,/g, 'school called Solomanță (a hidden school of magical initiation),'],
        [/control clouds and Balauri/g, 'control clouds and Dragons'],
        [/a Balaur and directs/g, 'a Dragon and directs'],
        [/book of “solomonărie”/g, 'book of solomonărie (the magical lore of the Weather Sorcerers)'],
        [/draw a Balaur/g, 'draw a Dragon'],
        [/The Solomonar may/g, 'The Weather Sorcerer may'],
        [/other Solomonari/g, 'other Weather Sorcerers']
      ],
      spiridusul: [
        [/Olinescu’s Spiriduș/g, 'Olinescu’s Imp'],
        [/called “anciu” in Bukovina/g, 'called anciu (a traditional Bukovinian term for a lucky coin) in Bukovina'],
        [/a spiriduș or to be a spiriduș itself/g, 'an imp or to be an imp itself']
      ],
      'piaza-rea': [
        [/Piaza Rea is/g, 'The Evil Omen is'],
        [/as Piaza Rea having/g, 'as the Evil Omen having'],
        [/embodiments of Piaza Rea/g, 'embodiments of the Evil Omen'],
        [/Olinescu opposes Piaza Rea to Piaza Bună/g, 'Olinescu contrasts the Evil Omen with the Good Omen']
      ],
      'marti-seara': [
        [/Marți-seara is/g, 'The Tuesday-Night Crone is']
      ],
      matcalaul: [
        [/the practice of “mâtcălirea”/g, 'the practice of mâtcălirea (a Romanian ritual of forming ceremonial sisterhood)']
      ]
    };

    Object.entries(storyEdits).forEach(([id, replacements]) => {
      replaceText(document.querySelector(`#${id} .creature__story`), replacements);
    });

    replaceText(document.querySelector('#solomonarul .creature__tagline'), [
      [/Balauri/g, 'Dragons']
    ]);
  }

  document.querySelectorAll('.project-credit [data-reveal]').forEach(el => {
    if (reduceMotion) el.classList.add('is-visible');
    else requestAnimationFrame(() => el.classList.add('is-visible'));
  });

  const languageMarkup = () => `
      <a href="${roUrl}" data-lang-choice="ro" class="${isEnglish ? '' : 'is-active'}" lang="ro"${isEnglish ? '' : ' aria-current="page"'}>RO</a>
      <span aria-hidden="true">/</span>
      <a href="${enUrl}" data-lang-choice="en" class="${isEnglish ? 'is-active' : ''}" lang="en"${isEnglish ? ' aria-current="page"' : ''}>EN</a>`;

  const headerInner = document.querySelector('.site-header__inner');
  if (headerInner && !document.querySelector('.language-switch--header')) {
    const switcher = document.createElement('div');
    switcher.className = 'language-switch language-switch--header';
    switcher.setAttribute('aria-label', isEnglish ? 'Choose language' : 'Alege limba');
    switcher.innerHTML = languageMarkup();
    headerInner.appendChild(switcher);
  }

  if (mainNav && !mainNav.querySelector('.language-switch--menu')) {
    const menuSwitcher = document.createElement('div');
    menuSwitcher.className = 'language-switch language-switch--menu';
    menuSwitcher.setAttribute('aria-label', isEnglish ? 'Choose language' : 'Alege limba');
    menuSwitcher.innerHTML = languageMarkup();
    mainNav.appendChild(menuSwitcher);
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
