const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// ——— Sticky nav: show border on scroll ———
const topbar = document.querySelector(".topbar-frame");
if (topbar) {
  window.addEventListener("scroll", () => {
    topbar.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });
}

// ——— Carousel scroll indicators ———
function initCarouselIndicator(trackEl, fillEl) {
  if (!trackEl || !fillEl) return;
  trackEl.addEventListener("scroll", () => {
    const maxScroll = trackEl.scrollWidth - trackEl.clientWidth;
    if (maxScroll <= 0) return;
    const progress = trackEl.scrollLeft / maxScroll;
    fillEl.style.transform = `translateX(${progress * 200}%)`;
  });
}

initCarouselIndicator(
  document.querySelector("#feature-carousel .feature-carousel__track"),
  document.getElementById("carousel-fill")
);

initCarouselIndicator(
  document.getElementById("smart-carousel-track"),
  document.getElementById("smart-carousel-fill")
);

// ——— Hero typewriter (Streak-style) ———
const typewriterEl = document.getElementById("hero-typewriter");
const typewriterWords = ["AP", "finance", "controller", "shared services", "procurement"];

if (typewriterEl) {
  let wordIndex = 0;
  let charIndex = typewriterWords[0].length;
  let isErasing = false;

  function typeStep() {
    const currentWord = typewriterWords[wordIndex];

    if (!isErasing) {
      // Typing
      charIndex++;
      typewriterEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex >= currentWord.length) {
        // Done typing — pause then erase
        isErasing = true;
        setTimeout(typeStep, 2000);
        return;
      }
      setTimeout(typeStep, 40);
    } else {
      // Erasing
      charIndex--;
      typewriterEl.textContent = currentWord.slice(0, charIndex);

      if (charIndex <= 0) {
        // Done erasing — move to next word
        isErasing = false;
        wordIndex = (wordIndex + 1) % typewriterWords.length;
        setTimeout(typeStep, 200);
        return;
      }
      setTimeout(typeStep, 40);
    }
  }

  // Start after initial delay
  setTimeout(() => {
    isErasing = true;
    typeStep();
  }, 1500);
}

const reveals = document.querySelectorAll(".reveal");

if (reveals.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((node) => revealObserver.observe(node));
} else {
  reveals.forEach((node) => node.classList.add("visible"));
}

// The homepage in-page demo form was removed when the marketing
// site moved off Netlify Forms; demo requests now route through
// /contact.html (which posts JSON to api.clearledgr.com/leads).
