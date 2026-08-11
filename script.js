async function loadHTML(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Fehler beim Laden von ${filePath}`);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

// PROJECT SLIDER - INDEX VARIABLE
let projectSliderIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
  await loadHTML('header', 'header.html');
  await loadHTML('footer', 'footer.html');
  setupHeaderMenu();
  createCookieBanner();
  initProjectSlider();
});

function setupHeaderMenu() {
  const burger = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
function createCookieBanner() {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('evnCookieConsent') === 'accepted') return;

  const banner = document.createElement('div');
  banner.className = 'cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = `
    <p class="cookie-banner__text">Wir verwenden Cookies, um diese Website zu verbessern und Ihre Auswahl für AGB und Datenschutz zu speichern. Durch Klick auf „Akzeptieren“ stimmen Sie unseren <a href="AGB.html">AGB</a> und der <a href="datenschutz.html">Datenschutzerklärung</a> zu.</p>
    <button class="cookie-banner__btn" type="button">Akzeptieren</button>
  `;

  document.body.appendChild(banner);
  banner.querySelector('button').addEventListener('click', () => {
    localStorage.setItem('evnCookieConsent', 'accepted');
    banner.remove();
  });
}
// ═══════════════════════════════════════════════════════════════════════════════
// PROJECT SLIDER - Instagram-ähnlicher Slider für Projekte
// ═══════════════════════════════════════════════════════════════════════════════

function initProjectSlider() {
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  const dots = document.querySelectorAll('.slider-dots .dot');

  if (!prevBtn || !nextBtn) return; // Slider nicht auf dieser Seite

  // Event Listener für Navigation Buttons
  prevBtn.addEventListener('click', () => changeProjectSlide(-1));
  nextBtn.addEventListener('click', () => changeProjectSlide(1));

  // Event Listener für Dots
  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const slideNum = parseInt(e.target.dataset.slide);
      projectSliderIndex = slideNum;
      showProjectSlide(projectSliderIndex);
    });
  });

  // Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      changeProjectSlide(-1);
    }
    if (e.key === 'ArrowRight') {
      changeProjectSlide(1);
    }
  });

  // Initial anzeigen
  showProjectSlide(projectSliderIndex);
}

function changeProjectSlide(n) {
  projectSliderIndex += n;
  showProjectSlide(projectSliderIndex);
}

function showProjectSlide(n) {
  const slides = document.querySelectorAll('.slider-item');
  const dots = document.querySelectorAll('.slider-dots .dot');

  if (slides.length === 0) return;

  // Loop-Effekt anwenden
  let index = n;
  if (index >= slides.length) {
    index = 0;
  }
  if (index < 0) {
    index = slides.length - 1;
  }

  projectSliderIndex = index;

  // Alle Slides und Dots deaktivieren
  slides.forEach((slide) => slide.classList.remove('active'));
  dots.forEach((dot) => dot.classList.remove('active'));

  // Aktive Slide und Dot aktivieren
  slides[projectSliderIndex].classList.add('active');
  dots[projectSliderIndex].classList.add('active');
}