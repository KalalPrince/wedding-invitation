/**
 * Main Application Logic for Malviya Family Wedding Invitation
 * Handles language switching, view routing, countdowns, calendar integration,
 * sharing, blessings book, and animations.
 */

(function () {
  'use strict';

  // Application State
  const state = {
    lang: localStorage.getItem('wedding_lang') || 'en',
    currentView: 'home',
    envelopeOpened: sessionStorage.getItem('invitation_opened') === 'true',
    activeTimelineFilter: 'all',
    blessings: []
  };

  // Pre-seeded blessings to give a warm, community feel
  const DEFAULT_BLESSINGS = [
    {
      name: "गोपाललाल जी एवं परिवार (उदयपुर)",
      city: "उदयपुर",
      message: "दोनों वर-वधू को जीवन के इस नए सफर की अनंत मंगलकामनाएं। प्रभु श्री देवनारायणजी की कृपा सदैव बनी रहे।",
      timestamp: "24 Oct 2026"
    },
    {
      name: "Shri Rajesh & Sunita Mehta",
      city: "Ahmedabad",
      message: "Heartiest congratulations to the Malviya family! Wishing Jaimin & Monika, and Gayatri & Aditya a lifetime of boundless love, happiness, and prosperity.",
      timestamp: "25 Oct 2026"
    },
    {
      name: "समस्त सिद्धावत परिवार (ननाणा)",
      city: "गाँव ननाणा",
      message: "भांजे और भांजी के विवाह की कोटि-कोटि बधाई। मंगलमय जीवन की ढेर सारी शुभकामनाएं।",
      timestamp: "25 Oct 2026"
    }
  ];

  // Route and section mapping
  const ROUTE_MAP = {
    // Top-level views
    'home': { view: 'home', targetId: 'home' },
    'jaimin-monika': { view: 'jaimin-monika', targetId: 'jaimin-monika' },
    'gayatri-aditya': { view: 'gayatri-aditya', targetId: 'gayatri-aditya' },

    // In-page sections on the home view (canonical IDs and aliases)
    'shagunTimelineSection': { view: 'home', targetId: 'shagunTimelineSection' },
    'ceremonies': { view: 'home', targetId: 'shagunTimelineSection' },
    'familySection': { view: 'home', targetId: 'familySection' },
    'family': { view: 'home', targetId: 'familySection' },
    'venuesSection': { view: 'home', targetId: 'venuesSection' },
    'venues': { view: 'home', targetId: 'venuesSection' },
    'blessingsSection': { view: 'home', targetId: 'blessingsSection' },
    'blessings': { view: 'home', targetId: 'blessingsSection' },
    'weddingCardsSection': { view: 'home', targetId: 'weddingCardsSection' },
    'weddings': { view: 'home', targetId: 'weddingCardsSection' }
  };

  // Initialize App
  function init() {
    loadStoredBlessings();
    bindEvents();
    setLanguage(state.lang, false);
    startCountdowns();
    setupAudioUI();
    renderTimeline(state.activeTimelineFilter);
    renderBlessings();
    initScrollSpy();

    // Check if initial URL points to a specific view or section
    const initialHash = (window.location.hash || '').replace(/^#/, '').trim();
    if (initialHash && initialHash !== 'home') {
      openEnvelope(false);
      navigateTo(initialHash, false, false);
    } else {
      if (state.envelopeOpened) {
        openEnvelope(false);
      }
      navigateTo('home', false, false);
    }
  }

  // --- LANGUAGE SWITCHING ---
  function setLanguage(lang, persist = true) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    state.lang = lang;
    if (persist) {
      localStorage.setItem('wedding_lang', lang);
    }

    document.documentElement.lang = lang;
    const t = TRANSLATIONS[lang];

    // Update document title & meta
    document.title = t.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update the single global language switcher button
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      const isEn = lang === 'en';
      const currentName = isEn ? 'English' : 'हिन्दी';
      const targetName = isEn ? 'हिन्दी' : 'English';

      langBtn.innerHTML = `
        <span class="lang-flag" aria-hidden="true">🕉️</span>
        <span class="lang-toggle-text">
          <span class="lang-badge ${isEn ? 'active-lang' : ''}" data-lang-code="en">EN</span>
          <span class="lang-sep">|</span>
          <span class="lang-badge ${!isEn ? 'active-lang' : ''}" data-lang-code="hi">हिन्दी</span>
        </span>
      `;
      langBtn.setAttribute('title', isEn ? 'Switch to हिन्दी / भाषा बदलें' : 'Switch to English / अंग्रेज़ी में बदलें');
      langBtn.setAttribute('aria-label', `Language switcher: ${currentName} active. Click to switch to ${targetName}.`);
    }

    // Update audio button tooltip / label for active language
    const audioBtn = document.getElementById('audioToggleBtn');
    const audioTooltip = document.getElementById('audioTooltip');
    if (audioBtn) {
      const isPlaying = window.weddingAudio && window.weddingAudio.isPlaying;
      const isEn = lang === 'en';
      const label = isPlaying
        ? (isEn ? 'Pause Padharo Mhare Desh' : 'पधारो म्हारे देश रोकें')
        : (isEn ? 'Play Padharo Mhare Desh' : 'पधारो म्हारे देश बजाएं');
      audioBtn.setAttribute('title', label);
      audioBtn.setAttribute('aria-label', label);
      if (audioTooltip) audioTooltip.textContent = label;
    }

    // Re-render language-dependent dynamic sections across entire site
    renderWeddingCards();
    renderTimeline(state.activeTimelineFilter);
    renderFamilySection();
    renderVenuesSection();
    renderDedicatedViews();
    renderBlessings();
  }

  // Toggle between English and Hindi
  function toggleLanguage() {
    const newLang = state.lang === 'en' ? 'hi' : 'en';
    setLanguage(newLang, true);
    showToast(newLang === 'hi' ? 'भाषा बदलकर हिन्दी कर दी गई है' : 'Language switched to English');
  }

  // Programmatic navigation lock to prevent scroll spy jitter during smooth scroll
  let isProgrammaticNav = false;
  let navLockTimer = null;

  // --- CENTRALIZED NAVIGATION & ROUTING ---
  function navigateTo(targetKey, pushHash = true, smooth = true) {
    const rawKey = (targetKey || '').replace(/^#/, '').trim();
    const key = rawKey || 'home';
    const route = ROUTE_MAP[key] || { view: 'home', targetId: key };
    const targetView = route.view || 'home';
    const targetElementId = route.targetId;

    const viewChanged = state.currentView !== targetView;
    state.currentView = targetView;

    // Toggle view containers
    const homeView = document.getElementById('homeView');
    const jaiminView = document.getElementById('jaiminView');
    const gayatriView = document.getElementById('gayatriView');

    if (homeView) homeView.classList.toggle('active-view', targetView === 'home');
    if (jaiminView) jaiminView.classList.toggle('active-view', targetView === 'jaimin-monika');
    if (gayatriView) gayatriView.classList.toggle('active-view', targetView === 'gayatri-aditya');

    // Close mobile menu if open
    closeMobileMenu();

    // Update active nav link immediately
    const navHighlightKey = (targetView !== 'home') ? targetView : (targetElementId || 'home');
    setActiveNavLink(navHighlightKey);

    // Lock scroll spy while smooth scrolling
    isProgrammaticNav = true;
    clearTimeout(navLockTimer);
    navLockTimer = setTimeout(() => {
      isProgrammaticNav = false;
    }, 900);

    // Update browser URL hash if requested
    if (pushHash && rawKey) {
      if (window.location.hash !== `#${rawKey}`) {
        if (history.pushState) {
          history.pushState(null, '', `#${rawKey}`);
        } else {
          window.location.hash = `#${rawKey}`;
        }
      }
    }

    // Scroll action with sticky header offset
    const performScroll = () => {
      if (!targetElementId || targetElementId === 'home' || targetElementId === 'homeView') {
        window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
        setActiveNavLink('home');
      } else {
        const targetEl = document.getElementById(targetElementId);
        if (targetEl) {
          const header = document.querySelector('.site-header');
          const headerOffset = header ? header.offsetHeight + 14 : 86;
          const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: smooth ? 'smooth' : 'auto'
          });
          setActiveNavLink(targetElementId);
        } else {
          window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
          setActiveNavLink('home');
        }
      }
    };

    if (viewChanged) {
      requestAnimationFrame(() => {
        setTimeout(performScroll, 50);
      });
    } else {
      performScroll();
    }
  }

  // Update active state on navigation bar links
  function setActiveNavLink(key) {
    let canonical = key;
    if (key === 'shagunTimelineSection' || key === 'ceremonies') canonical = 'shagunTimelineSection';
    else if (key === 'familySection' || key === 'family') canonical = 'familySection';
    else if (key === 'venuesSection' || key === 'venues') canonical = 'venuesSection';
    else if (key === 'blessingsSection' || key === 'blessings') canonical = 'blessingsSection';
    else if (key === 'jaiminView' || key === 'jaimin-monika') canonical = 'jaimin-monika';
    else if (key === 'gayatriView' || key === 'gayatri-aditya') canonical = 'gayatri-aditya';
    else if (key === 'homeView' || key === 'home') canonical = 'home';

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/^#/, '');
      const dataNav = link.getAttribute('data-nav') || link.getAttribute('data-view');
      const isActive = (href === canonical || dataNav === canonical || (canonical === 'home' && (href === 'home' || dataNav === 'home')));
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // ScrollSpy to automatically highlight current section on home view
  function initScrollSpy() {
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (state.currentView !== 'home' || isProgrammaticNav) return;
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        if (state.currentView !== 'home' || isProgrammaticNav) return;

        const scrollY = window.pageYOffset;
        if (scrollY < 200) {
          setActiveNavLink('home');
          return;
        }

        const sections = [
          { id: 'blessingsSection', nav: 'blessingsSection' },
          { id: 'venuesSection', nav: 'venuesSection' },
          { id: 'familySection', nav: 'familySection' },
          { id: 'shagunTimelineSection', nav: 'shagunTimelineSection' }
        ];

        for (const sec of sections) {
          const el = document.getElementById(sec.id);
          if (el) {
            const top = el.getBoundingClientRect().top + scrollY;
            if (scrollY >= top - 130) {
              setActiveNavLink(sec.nav);
              break;
            }
          }
        }
      }, 50);
    }, { passive: true });
  }

  // --- ENVELOPE / OPENING EXPERIENCE ---
  function openEnvelope(triggerPetals = true) {
    const envelope = document.getElementById('royalEnvelopeCover');
    if (envelope) {
      envelope.classList.add('envelope-opened');
      setTimeout(() => {
        envelope.style.display = 'none';
      }, 700);
    }
    state.envelopeOpened = true;
    sessionStorage.setItem('invitation_opened', 'true');

    if (triggerPetals) {
      triggerPetalShower(35);
    }

    // Call audio.play() directly from the user's tap handler and handle its returned promise
    if (window.weddingAudio && typeof window.weddingAudio.play === 'function') {
      if (!window.weddingAudio.userExplicitlyPaused && !window.weddingAudio.isPlaying) {
        const p = window.weddingAudio.play(true);
        if (p && typeof p.catch === 'function') {
          p.catch(() => {});
        }
      }
    }
  }

  function resetEnvelope() {
    const envelope = document.getElementById('royalEnvelopeCover');
    if (envelope) {
      envelope.style.display = 'flex';
      setTimeout(() => {
        envelope.classList.remove('envelope-opened');
      }, 10);
    }
    state.envelopeOpened = false;
    sessionStorage.setItem('invitation_opened', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- COUNTDOWN TIMERS ---
  function startCountdowns() {
    function update() {
      const now = new Date().getTime();

      // Jaimin's Wedding: 26 Nov 2026, 07:15 AM IST
      const jaiminDate = new Date('2026-11-26T07:15:00+05:30').getTime();
      const diffJaimin = jaiminDate - now;

      // Gayatri's Wedding: 29 Nov 2026, 11:15 AM IST
      const gayatriDate = new Date('2026-11-29T11:15:00+05:30').getTime();
      const diffGayatri = gayatriDate - now;

      updateTimerDisplay('jm', diffJaimin);
      updateTimerDisplay('ga', diffGayatri);
    }

    update();
    setInterval(update, 1000);
  }

  function updateTimerDisplay(prefix, diff) {
    const isEn = state.lang === 'en';
    const cardEl = document.getElementById(`${prefix}-timer-container`);

    if (diff <= 0) {
      if (cardEl) {
        cardEl.innerHTML = `<div class="wedding-started-badge">${isEn ? 'Celebrations in Progress! ✨' : 'मांगलिक उत्सव जारी है! ✨'}</div>`;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const dEl = document.getElementById(`${prefix}-days`);
    const hEl = document.getElementById(`${prefix}-hours`);
    const mEl = document.getElementById(`${prefix}-mins`);
    const sEl = document.getElementById(`${prefix}-secs`);

    if (dEl) dEl.textContent = String(days).padStart(2, '0');
    if (hEl) hEl.textContent = String(hours).padStart(2, '0');
    if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
    if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
  }

  // --- RENDER WEDDING CARDS (HOMEPAGE) ---
  function renderWeddingCards() {
    const isEn = state.lang === 'en';
    const jm = WEDDING_DATA.weddings.jaimin;
    const ga = WEDDING_DATA.weddings.gayatri;

    // Jaimin Card
    const jmTitle = document.getElementById('jm-card-title');
    const jmDate = document.getElementById('jm-card-date');
    const jmDesc = document.getElementById('jm-card-desc');
    if (jmTitle) jmTitle.textContent = isEn ? `${jm.groom.fullNameEn} & ${jm.bride.fullNameEn}` : `${jm.groom.fullNameHi} संग ${jm.bride.fullNameHi}`;
    if (jmDate) jmDate.textContent = isEn ? jm.dateFormattedEn : jm.dateFormattedHi;
    if (jmDesc) {
      jmDesc.textContent = isEn
        ? "Hast Melap: 26 Nov, 11:00 AM - 3:00 PM • Barat departs to Nardas Ka Guda"
        : "हस्त मेलाप: 26 नव., दोपहर 11 से 3 बजे • बारात प्रस्थान नरदास का गुड़ा";
    }

    // Gayatri Card
    const gaTitle = document.getElementById('ga-card-title');
    const gaDate = document.getElementById('ga-card-date');
    const gaDesc = document.getElementById('ga-card-desc');
    if (gaTitle) gaTitle.textContent = isEn ? `${ga.bride.fullNameEn} & ${ga.groom.fullNameEn}` : `${ga.bride.fullNameHi} संग ${ga.groom.fullNameHi}`;
    if (gaDate) gaDate.textContent = isEn ? ga.dateFormattedEn : ga.dateFormattedHi;
    if (gaDesc) {
      gaDesc.textContent = isEn
        ? "Panigrahan Sanskar: 29 Nov, Auspicious Time • Barat arrives from Village Binol"
        : "पाणिग्रहण संस्कार: 29 नव., शुभ वेला में • बारात आगमन गाँव बिनोल से";
    }
  }

  // --- RENDER DEDICATED WEDDING VIEWS ---
  function renderDedicatedViews() {
    const isEn = state.lang === 'en';
    const jmData = WEDDING_DATA.weddings.jaimin;
    const gaData = WEDDING_DATA.weddings.gayatri;

    // --- JAIMIN VIEW ---
    const jaiminCeremoniesContainer = document.getElementById('jaiminCeremoniesList');
    if (jaiminCeremoniesContainer) {
      jaiminCeremoniesContainer.innerHTML = jmData.ceremonies.map(c => `
        <div class="ceremony-card">
          <div class="ceremony-header">
            <span class="ceremony-icon">🪔</span>
            <div>
              <h3 class="ceremony-title">${isEn ? c.nameEn : c.nameHi}</h3>
              <p class="ceremony-date-badge">${isEn ? c.dateEn : c.dateHi}</p>
            </div>
          </div>
          <div class="ceremony-body">
            <p class="ceremony-time"><strong>${isEn ? 'Auspicious Time:' : 'शुभ समय:'}</strong> ${isEn ? c.timeEn : c.timeHi}</p>
            <p class="ceremony-venue"><strong>${isEn ? 'Venue:' : 'स्थान:'}</strong> ${isEn ? c.venueNameEn : c.venueNameHi}</p>
            ${c.noteEn ? `<p class="ceremony-note"><strong>${isEn ? 'Note:' : 'नोट:'}</strong> ${isEn ? c.noteEn : c.noteHi}</p>` : ''}
            ${c.descEn ? `<p class="ceremony-desc">${isEn ? c.descEn : c.descHi}</p>` : ''}
          </div>
        </div>
      `).join('');
    }

    // --- GAYATRI VIEW ---
    const gayatriCeremoniesContainer = document.getElementById('gayatriCeremoniesList');
    if (gayatriCeremoniesContainer) {
      gayatriCeremoniesContainer.innerHTML = gaData.ceremonies.map(c => `
        <div class="ceremony-card">
          <div class="ceremony-header">
            <span class="ceremony-icon">🌸</span>
            <div>
              <h3 class="ceremony-title">${isEn ? c.nameEn : c.nameHi}</h3>
              <p class="ceremony-date-badge">${isEn ? c.dateEn : c.dateHi}</p>
            </div>
          </div>
          <div class="ceremony-body">
            <p class="ceremony-time"><strong>${isEn ? 'Auspicious Time:' : 'शुभ समय:'}</strong> ${isEn ? c.timeEn : c.timeHi}</p>
            <p class="ceremony-venue"><strong>${isEn ? 'Venue:' : 'स्थान:'}</strong> ${isEn ? c.venueNameEn : c.venueNameHi}</p>
            ${c.noteEn ? `<p class="ceremony-note"><strong>${isEn ? 'Note:' : 'नोट:'}</strong> ${isEn ? c.noteEn : c.noteHi}</p>` : ''}
            ${c.descEn ? `<p class="ceremony-desc">${isEn ? c.descEn : c.descHi}</p>` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // --- RENDER TIMELINE (SHAGUN KE PAL) ---
  function renderTimeline(filter = 'all') {
    state.activeTimelineFilter = filter;
    const isEn = state.lang === 'en';
    const container = document.getElementById('timelineContainer');
    if (!container) return;

    let items = WEDDING_DATA.shagunTimeline;
    if (filter === 'jaimin') {
      items = items.filter(i => i.category === 'jaimin' || i.category === 'joint');
    } else if (filter === 'gayatri') {
      items = items.filter(i => i.category === 'gayatri' || i.category === 'joint' || i.category === 'memorial');
    } else if (filter === 'joint') {
      items = items.filter(i => i.category === 'joint' || i.category === 'memorial');
    }

    container.innerHTML = items.map((item, index) => {
      let icon = '🪔';
      let tagLabel = isEn ? 'Family Ritual' : 'मांगलिक रस्म';
      if (item.category === 'jaimin') {
        icon = '👑';
        tagLabel = isEn ? "Jaimin's Marriage" : "जैमिन का विवाह";
      } else if (item.category === 'gayatri') {
        icon = '🪷';
        tagLabel = isEn ? "Gayatri's Marriage" : "गायत्री का विवाह";
      } else if (item.category === 'memorial') {
        icon = '🙏';
        tagLabel = isEn ? "Ganga Prasadi" : "गंगोज";
      }

      return `
        <div class="timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}">
          <div class="timeline-marker">${icon}</div>
          <div class="timeline-content">
            <span class="timeline-tag">${tagLabel}</span>
            <div class="timeline-date">${isEn ? item.dateFormattedEn : item.dateFormattedHi}</div>
            <h3 class="timeline-title">${isEn ? item.nameEn : item.nameHi}</h3>
            <p class="timeline-time"><strong>⏰ ${isEn ? 'Time:' : 'समय:'}</strong> ${isEn ? item.timeEn : item.timeHi}</p>
            <p class="timeline-desc">${isEn ? item.descEn : item.descHi}</p>
            <p class="timeline-venue"><strong>📍 ${isEn ? 'Venue:' : 'स्थान:'}</strong> ${item.venue}</p>
          </div>
        </div>
      `;
    }).join('');

    // Update active filter button class
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
    });
  }

  // --- RENDER FAMILY SECTION ---
  function renderFamilySection() {
    const isEn = state.lang === 'en';
    const fam = WEDDING_DATA.family;

    // Nimantrak
    const nimantrakContainer = document.getElementById('nimantrakContainer');
    if (nimantrakContainer) {
      nimantrakContainer.innerHTML = `
        <div class="family-card nimantrak-card">
          <div class="card-ornament">⚜️</div>
          <h3 class="family-card-title">${isEn ? fam.nimantrak.titleEn : fam.nimantrak.titleHi}</h3>
          <ul class="nimantrak-list">
            ${fam.nimantrak.members.map(m => `<li><strong>${isEn ? m.nameEn : m.nameHi}</strong></li>`).join('')}
          </ul>
          <p class="location-badge">${isEn ? fam.nimantrak.noteEn : fam.nimantrak.noteHi}</p>
          <p class="family-address">${isEn ? fam.nimantrak.residenceEn : fam.nimantrak.residenceHi}</p>
          <div class="contact-numbers">
            <p class="contact-label">${isEn ? 'Contact & RSVP:' : 'संपर्क सूत्र:'}</p>
            <div class="phone-chips">
              ${fam.nimantrak.phones.map(phone => `
                <a href="tel:+91${phone}" class="phone-chip">
                  <span class="phone-icon">📞</span> ${phone}
                </a>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // Vineet & Vishesh Prarthi
    const vineetContainer = document.getElementById('vineetContainer');
    if (vineetContainer) {
      vineetContainer.innerHTML = `
        <div class="family-card">
          <h4 class="family-subcard-title">${isEn ? fam.vineet.titleEn : fam.vineet.titleHi}</h4>
          <p class="family-member-highlight"><strong>${isEn ? fam.vineet.membersEn : fam.vineet.membersHi}</strong></p>
          <p class="family-address">${isEn ? fam.vineet.residenceEn : fam.vineet.residenceHi}</p>
          
          <div class="divider-gold"></div>

          <h4 class="family-subcard-title">${isEn ? fam.visheshPrarthi.titleEn : fam.visheshPrarthi.titleHi}</h4>
          <ul class="simple-members-list">
            ${fam.visheshPrarthi.members.map(m => `<li>${isEn ? m.nameEn : m.nameHi}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Darshanabhilashi
    const darshanContainer = document.getElementById('darshanabhilashiContainer');
    if (darshanContainer) {
      darshanContainer.innerHTML = `
        <div class="family-card wide-card">
          <h3 class="family-card-title">${isEn ? fam.darshanabhilashi.titleEn : fam.darshanabhilashi.titleHi}</h3>
          <div class="names-grid">
            ${fam.darshanabhilashi.members.map(m => `<span class="name-pill">${isEn ? m.nameEn : m.nameHi}</span>`).join('')}
          </div>
          <p class="family-closing-note"><strong>${isEn ? fam.darshanabhilashi.familyNoteEn : fam.darshanabhilashi.familyNoteHi}</strong></p>
        </div>
      `;
    }

    // Jamai Paksh
    const jamaiContainer = document.getElementById('jamaiPakshContainer');
    if (jamaiContainer) {
      jamaiContainer.innerHTML = `
        <div class="family-card">
          <h3 class="family-card-title">${isEn ? fam.jamaiPaksh.titleEn : fam.jamaiPaksh.titleHi}</h3>
          <ul class="jamai-list">
            ${fam.jamaiPaksh.members.map(m => `<li>🌸 ${isEn ? m.en : m.hi}</li>`).join('')}
          </ul>
        </div>
      `;
    }

    // Nanihal Paksh
    const nanihalContainer = document.getElementById('nanihalPakshContainer');
    if (nanihalContainer) {
      nanihalContainer.innerHTML = `
        <div class="family-card">
          <h3 class="family-card-title">${isEn ? fam.nanihalPaksh.titleEn : fam.nanihalPaksh.titleHi}</h3>
          <p class="nanihal-members">${isEn ? fam.nanihalPaksh.eldersEn : fam.nanihalPaksh.eldersHi}</p>
          <div class="village-highlight">
            ⚜️ <strong>${isEn ? fam.nanihalPaksh.villageEn : fam.nanihalPaksh.villageHi}</strong>
          </div>
        </div>
      `;
    }

    // Pratishthan
    const pratishthanContainer = document.getElementById('pratishthanContainer');
    if (pratishthanContainer) {
      pratishthanContainer.innerHTML = `
        <div class="family-card pratishthan-card">
          <h3 class="family-card-title">${isEn ? fam.pratishthan.titleEn : fam.pratishthan.titleHi}</h3>
          <div class="firms-grid">
            ${fam.pratishthan.firms.map(f => `
              <div class="firm-item">
                <span class="firm-icon">🏛️</span>
                <h4>${isEn ? f.nameEn : f.nameHi}</h4>
                <p class="firm-location">${isEn ? f.locationEn : f.locationHi}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  // --- RENDER VENUES ---
  function renderVenuesSection() {
    const isEn = state.lang === 'en';
    const container = document.getElementById('venuesContainer');
    if (!container) return;

    container.innerHTML = WEDDING_DATA.venues.map(v => `
      <div class="venue-card">
        <div class="venue-badge">📍 ${isEn ? 'Auspicious Location' : 'मांगलिक स्थल'}</div>
        <h3 class="venue-title">${isEn ? v.titleEn : v.titleHi}</h3>
        <p class="venue-events"><strong>${isEn ? 'Events:' : 'आयोजन:'}</strong> ${isEn ? v.descriptionEn : v.descriptionHi}</p>
        <p class="venue-address"><strong>${isEn ? 'Address:' : 'पता:'}</strong> ${isEn ? v.addressEn : v.addressHi}</p>
        
        <div class="venue-verification">
          <span class="verification-tag">ℹ️ ${isEn ? 'Card Verified Details' : 'पत्रिका अनुसार विवरण'}</span>
          <p class="verification-text">${isEn ? v.verificationNoteEn : v.verificationNoteHi}</p>
        </div>

        <a href="https://www.google.com/maps/search/?api=1&query=${v.mapsQuery}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary map-btn">
          <span class="btn-icon">🗺️</span> ${isEn ? 'Open in Google Maps' : 'गूगल मैप्स पर देखें'}
        </a>
      </div>
    `).join('');
  }

  // --- AUDIO UI SETUP ---
  function setupAudioUI() {
    const audioBtn = document.getElementById('audioToggleBtn');
    const audioWaves = document.getElementById('audioWaves');
    const audioTooltip = document.getElementById('audioTooltip');

    if (!audioBtn) return;

    if (window.weddingAudio) {
      window.weddingAudio.onStateChange = (isPlaying) => {
        const isEn = state.lang === 'en';
        audioBtn.classList.toggle('playing', isPlaying);
        if (audioWaves) audioWaves.classList.toggle('animate-waves', isPlaying);
        const label = isPlaying
          ? (isEn ? 'Pause Padharo Mhare Desh' : 'पधारो म्हारे देश रोकें')
          : (isEn ? 'Play Padharo Mhare Desh' : 'पधारो म्हारे देश बजाएं');
        audioBtn.setAttribute('title', label);
        audioBtn.setAttribute('aria-label', label);
        if (audioTooltip) {
          audioTooltip.textContent = label;
        }
      };

      const handleAudioToggle = (e) => {
        if (e) {
          e.stopPropagation();
          if (e.type === 'touchend') {
            e.preventDefault();
          }
        }
        window.weddingAudio.toggle();
        const isEn = state.lang === 'en';
        showToast(window.weddingAudio.isPlaying
          ? (isEn ? '🎵 Playing Rajasthani Folk: Padharo Mhare Desh' : '🎵 राजस्थानी लोक धुन: पधारो म्हारे देश जारी')
          : (isEn ? '⏸️ Music Paused' : '⏸️ संगीत रोका गया')
        );
      };

      audioBtn.addEventListener('click', handleAudioToggle);
      audioBtn.addEventListener('touchend', handleAudioToggle, { passive: false });

      // Initialize audio engine (hooks events and executes autoplay attempt)
      window.weddingAudio.init();
    }
  }

  // --- PETAL SHOWER ANIMATION ---
  function triggerPetalShower(count = 30) {
    const container = document.getElementById('petalContainer');
    if (!container) return;

    // Support reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const petalTypes = ['rose-red', 'rose-pink', 'marigold-gold', 'jasmine-white'];
    
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      const type = petalTypes[Math.floor(Math.random() * petalTypes.length)];
      petal.className = `falling-petal petal-${type}`;

      const left = Math.random() * 100;
      const size = 12 + Math.random() * 16;
      const duration = 4 + Math.random() * 5;
      const delay = Math.random() * 3;
      const rotation = Math.random() * 360;

      petal.style.left = `${left}vw`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.3}px`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;
      petal.style.transform = `rotate(${rotation}deg)`;

      container.appendChild(petal);

      // Clean up after animation finishes
      setTimeout(() => {
        petal.remove();
      }, (duration + delay) * 1000);
    }
  }

  // --- BLESSINGS BOOK ---
  function loadStoredBlessings() {
    try {
      const saved = localStorage.getItem('wedding_blessings');
      state.blessings = saved ? JSON.parse(saved) : DEFAULT_BLESSINGS;
    } catch (e) {
      state.blessings = DEFAULT_BLESSINGS;
    }
  }

  function saveBlessing(name, city, message) {
    const isEn = state.lang === 'en';
    const newBlessing = {
      name: name.trim(),
      city: city ? city.trim() : (isEn ? "Well-wisher" : "शुभेच्छु"),
      message: message.trim(),
      timestamp: new Date().toLocaleDateString(isEn ? 'en-US' : 'hi-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    state.blessings.unshift(newBlessing);
    try {
      localStorage.setItem('wedding_blessings', JSON.stringify(state.blessings));
    } catch (e) {}

    renderBlessings();
    triggerPetalShower(20);
    showToast(isEn ? 'Your blessing has been sent with love!' : 'आपकी मंगलकामनाएं सप्रेम प्रेषित की गईं!');
  }

  function renderBlessings() {
    const isEn = state.lang === 'en';
    const list = document.getElementById('blessingsList');
    if (!list) return;

    if (!state.blessings || state.blessings.length === 0) {
      list.innerHTML = `<p class="empty-blessings">${isEn ? 'Be the first to shower your blessings!' : 'सर्वप्रथम अपना आशीर्वाद प्रेषित करें!'}</p>`;
      return;
    }

    list.innerHTML = state.blessings.slice(0, 8).map(b => `
      <div class="blessing-card">
        <p class="blessing-quote">“${escapeHtml(b.message)}”</p>
        <div class="blessing-author-bar">
          <span class="blessing-author">✨ ${escapeHtml(b.name)}</span>
          <span class="blessing-location">${b.city ? escapeHtml(b.city) + ' • ' : ''}${b.timestamp}</span>
        </div>
      </div>
    `).join('');
  }

  // --- SHARING MODAL & ACTIONS ---
  function openShareModal(targetWedding = 'both') {
    const modal = document.getElementById('shareModal');
    if (!modal) return;

    modal.setAttribute('data-target', targetWedding);
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeShareModal() {
    const modal = document.getElementById('shareModal');
    if (!modal) return;
    modal.classList.remove('modal-visible');
    document.body.style.overflow = '';
  }

  function getShareText(target = 'both') {
    const isEn = state.lang === 'en';
    const url = window.location.origin + window.location.pathname;

    if (target === 'jaimin') {
      return isEn
        ? `🌸 Wedding Invitation 🌸\nYou are cordially invited to celebrate the wedding of Chi. Jaimin & Sau. Ka. Monika on Thursday, 26 November 2026.\nHost: Malviya Family, Dholi Mangri (Deogarh, Rajasthan).\nView digital kankotri & schedule: ${url}#jaimin-monika`
        : `🌸 शुभ विवाह आमंत्रण 🌸\nमालविया परिवार की ओर से चि. जैमिन संग सौ.कां. मोनिका के शुभ विवाह (26 नवम्बर 2026, गुरुवार) पर आप सपरिवार सादर आमंत्रित हैं।\nडिजिटल कंकौत्री एवं कार्यक्रम देखें: ${url}#jaimin-monika`;
    } else if (target === 'gayatri') {
      return isEn
        ? `🌸 Wedding Invitation 🌸\nYou are cordially invited to celebrate the wedding of Sau. Ka. Gayatri (Shilpa) & Chi. Aditya on Sunday, 29 November 2026.\nHost: Malviya Family, Dholi Mangri (Deogarh, Rajasthan).\nView digital kankotri & schedule: ${url}#gayatri-aditya`
        : `🌸 शुभ विवाह आमंत्रण 🌸\nमालविया परिवार की ओर से सौ.कां. गायत्री (शिल्पा) संग चि. आदित्य के शुभ विवाह (29 नवम्बर 2026, रविवार) पर आप सपरिवार सादर आमंत्रित हैं।\nडिजिटल कंकौत्री एवं कार्यक्रम देखें: ${url}#gayatri-aditya`;
    } else {
      return isEn
        ? `🌸 Auspicious Wedding & Ganga Prasadi Invitation 🌸\nThe Malviya Family warmly invites you to celebrate the weddings of:\n👑 Jaimin & Monika (26 Nov 2026, Thu)\n🪷 Gayatri (Shilpa) & Aditya (29 Nov 2026, Sun)\nVenue: Dholi Mangri, Tehsil Deogarh, Dist. Rajsamand, Rajasthan.\nPlease visit our digital invitation: ${url}`
        : `🌸 शुभविवाह एवं गंगा प्रसादी आमंत्रण 🌸\nमालविया परिवार आपका हार्दिक स्वागत करता है:\n👑 चि. जैमिन संग सौ.कां. मोनिका (26-11-2026, गुरुवार)\n🪷 सौ.कां. गायत्री संग चि. आदित्य (29-11-2026, रविवार)\nस्थान: धोली मंगरी, तह. देवगढ़, जिला राजसमन्द, राजस्थान।\nडिजिटल पत्रिका देखें: ${url}`;
    }
  }

  function shareViaWhatsapp(target = 'both') {
    const text = encodeURIComponent(getShareText(target));
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, '_blank');
  }

  function shareViaNative(target = 'both') {
    const isEn = state.lang === 'en';
    const text = getShareText(target);
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: isEn ? 'Malviya Family Wedding Invitation' : 'मालविया परिवार शुभ विवाह आमंत्रण',
        text: text,
        url: url
      }).catch(() => {});
    } else {
      copyToClipboard(url);
    }
  }

  function copyToClipboard(text) {
    const isEn = state.lang === 'en';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(isEn ? 'Link copied to clipboard!' : 'लिंक कॉपी हो गया!');
      }).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const isEn = state.lang === 'en';
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand('copy');
      showToast(isEn ? 'Link copied to clipboard!' : 'लिंक कॉपी हो गया!');
    } catch (e) {}
    document.body.removeChild(input);
  }

  // --- CALENDAR INTEGRATION ---
  function openCalendarModal(target = 'jaimin') {
    const modal = document.getElementById('calendarModal');
    if (!modal) return;
    modal.setAttribute('data-target', target);
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    if (!modal) return;
    modal.classList.remove('modal-visible');
    document.body.style.overflow = '';
  }

  function addGoogleCalendar(weddingKey) {
    let title, dates, details, location;

    if (weddingKey === 'jaimin') {
      title = "Shubh Vivah: Chi. Jaimin & Sau. Ka. Monika (Malviya Family)";
      // 2026-11-26 07:00 IST to 2026-11-26 16:00 IST -> UTC: 20261126T013000Z / 20261126T103000Z
      dates = "20261126T013000Z/20261126T103000Z";
      details = "Auspicious wedding of Jaimin & Monika. Barat departs 7:15 AM to Nardas Ka Guda. Hast Melap 11:00 AM to 3:00 PM.";
      location = "Dholi Mangri, Deogarh / Nardas Ka Guda, Rajasthan";
    } else {
      title = "Shubh Vivah: Sau. Ka. Gayatri & Chi. Aditya (Malviya Family)";
      // 2026-11-29 09:00 IST to 2026-11-29 18:00 IST -> UTC: 20261129T033000Z / 20261129T123000Z
      dates = "20261129T033000Z/20261129T123000Z";
      details = "Auspicious wedding of Gayatri (Shilpa) & Aditya. Barat Swagat, Panigrahan Sanskar & Priti Bhoj. Also Gangoj commemoration.";
      location = "Dholi Mangri (Kalalo ki Aanti), Tehsil Deogarh, Dist. Rajsamand, Rajasthan";
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(gCalUrl, '_blank');
  }

  function downloadIcsFile(weddingKey) {
    let title, startDate, endDate, description, location;

    if (weddingKey === 'jaimin') {
      title = "Shubh Vivah: Jaimin and Monika";
      startDate = "20261126T071500";
      endDate = "20261126T160000";
      description = "Wedding of Chi. Jaimin & Sau. Ka. Monika. Hast Melap at Nardas Ka Guda. Malviya Family.";
      location = "Nardas Ka Guda, Rajasthan";
    } else {
      title = "Shubh Vivah: Gayatri and Aditya";
      startDate = "20261129T090000";
      endDate = "20261129T180000";
      description = "Wedding of Sau. Ka. Gayatri & Chi. Aditya. Panigrahan & Priti Bhoj at Dholi Mangri. Malviya Family.";
      location = "Dholi Mangri, Deogarh, Rajsamand, Rajasthan";
    }

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Malviya Family//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${weddingKey}-wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(msg) {
    let toast = document.getElementById('weddingToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'weddingToast';
      toast.className = 'wedding-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('toast-active');
    setTimeout(() => {
      toast.classList.remove('toast-active');
    }, 3200);
  }

  // --- MOBILE NAVIGATION ---
  function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('mobileMenuToggle');
    if (nav && toggle) {
      const isOpen = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen);
    }
  }

  function closeMobileMenu() {
    const nav = document.getElementById('mainNav');
    const toggle = document.getElementById('mobileMenuToggle');
    if (nav && toggle) {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Helper escape
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      })[m];
    });
  }

  // --- BIND ALL USER EVENTS ---
  function bindEvents() {
    // Single language toggle click
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }

    // Envelope open click & touch handlers for mobile touchscreens
    const handleEnvelopeOpen = (e) => {
      if (e && e.type === 'touchend') {
        e.preventDefault();
      }
      openEnvelope(true);
    };

    const openBtn = document.getElementById('openInvitationBtn');
    if (openBtn) {
      openBtn.addEventListener('click', handleEnvelopeOpen);
      openBtn.addEventListener('touchend', handleEnvelopeOpen, { passive: false });
    }
    const waxSeal = document.getElementById('waxSealBtn');
    if (waxSeal) {
      waxSeal.addEventListener('click', handleEnvelopeOpen);
      waxSeal.addEventListener('touchend', handleEnvelopeOpen, { passive: false });
    }
    const reopenCoverBtn = document.getElementById('reopenCoverBtn');
    if (reopenCoverBtn) {
      reopenCoverBtn.addEventListener('click', resetEnvelope);
    }

    // Petal shower toggle
    const petalBtn = document.getElementById('petalShowerBtn');
    if (petalBtn) {
      petalBtn.addEventListener('click', () => {
        triggerPetalShower(35);
        showToast(state.lang === 'en' ? '🌸 Showering fragrant petals!' : '🌸 मंगलमय पुष्प वर्षा!');
      });
    }

    // Unified Navigation Link Handler (all navbar links, brand, and in-page hash links)
    document.querySelectorAll('a[href^="#"], [data-nav], [data-view-target]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href') || '';
        const dataNav = link.getAttribute('data-nav');
        const dataTarget = link.getAttribute('data-view-target');
        const target = (dataTarget || dataNav || href).replace(/^#/, '').trim();

        if (!target) return;

        e.preventDefault();
        openEnvelope(false);
        navigateTo(target, true, true);
      });
    });

    // Browser Back / Forward & direct hash navigation listener
    window.addEventListener('hashchange', () => {
      const hash = (window.location.hash || '').replace(/^#/, '').trim();
      if (hash) {
        openEnvelope(false);
        navigateTo(hash, false, true);
      } else {
        navigateTo('home', false, true);
      }
    });

    // Mobile menu toggle ("....")
    const mobileToggle = document.getElementById('mobileMenuToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const nav = document.getElementById('mainNav');
      if (nav && nav.classList.contains('nav-open')) {
        if (!nav.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Close mobile menu and modals with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeShareModal();
        closeCalendarModal();
      }
    });

    // Timeline Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        renderTimeline(filter);
      });
    });

    // Blessing Form Submission
    const blessingForm = document.getElementById('blessingForm');
    if (blessingForm) {
      blessingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('guestName');
        const cityInput = document.getElementById('guestCity');
        const msgInput = document.getElementById('guestMessage');

        if (!nameInput.value.trim() || !msgInput.value.trim()) {
          showToast(state.lang === 'en' ? 'Please fill in your name and blessing!' : 'कृपया अपना नाम एवं मंगलकामनाएं दर्ज करें!');
          return;
        }

        saveBlessing(nameInput.value, cityInput.value, msgInput.value);
        msgInput.value = '';
      });
    }

    // Share buttons on homepage cards
    const shareJmBtn = document.getElementById('shareJmBtn');
    if (shareJmBtn) {
      shareJmBtn.addEventListener('click', () => shareViaWhatsapp('jaimin'));
    }
    const shareGaBtn = document.getElementById('shareGaBtn');
    if (shareGaBtn) {
      shareGaBtn.addEventListener('click', () => shareViaWhatsapp('gayatri'));
    }

    // General Share Modal Triggers
    document.querySelectorAll('.trigger-share-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target-wedding') || 'both';
        openShareModal(target);
      });
    });

    const closeShare = document.getElementById('closeShareModal');
    if (closeShare) closeShare.addEventListener('click', closeShareModal);

    const shareModalWhatsapp = document.getElementById('shareModalWhatsapp');
    if (shareModalWhatsapp) {
      shareModalWhatsapp.addEventListener('click', () => {
        const target = document.getElementById('shareModal').getAttribute('data-target') || 'both';
        shareViaWhatsapp(target);
      });
    }

    const shareModalNative = document.getElementById('shareModalNative');
    if (shareModalNative) {
      shareModalNative.addEventListener('click', () => {
        const target = document.getElementById('shareModal').getAttribute('data-target') || 'both';
        shareViaNative(target);
      });
    }

    const shareModalCopy = document.getElementById('shareModalCopy');
    if (shareModalCopy) {
      shareModalCopy.addEventListener('click', () => {
        copyToClipboard(window.location.href);
      });
    }

    // Calendar Modal Triggers
    document.querySelectorAll('.trigger-cal-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target-wedding') || 'jaimin';
        openCalendarModal(target);
      });
    });

    const closeCal = document.getElementById('closeCalendarModal');
    if (closeCal) closeCal.addEventListener('click', closeCalendarModal);

    const gCalJaimin = document.getElementById('gCalJaiminBtn');
    if (gCalJaimin) {
      gCalJaimin.addEventListener('click', () => addGoogleCalendar('jaimin'));
    }

    const gCalGayatri = document.getElementById('gCalGayatriBtn');
    if (gCalGayatri) {
      gCalGayatri.addEventListener('click', () => addGoogleCalendar('gayatri'));
    }

    const icsJaimin = document.getElementById('icsJaiminBtn');
    if (icsJaimin) {
      icsJaimin.addEventListener('click', () => downloadIcsFile('jaimin'));
    }

    const icsGayatri = document.getElementById('icsGayatriBtn');
    if (icsGayatri) {
      icsGayatri.addEventListener('click', () => downloadIcsFile('gayatri'));
    }

    // Modal background click close
    window.addEventListener('click', (e) => {
      const shareModal = document.getElementById('shareModal');
      const calModal = document.getElementById('calendarModal');
      if (e.target === shareModal) closeShareModal();
      if (e.target === calModal) closeCalendarModal();
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
