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

const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
const successCard = document.getElementById("contact-success");

const isLocalPreview =
  window.location.protocol === "file:" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost";

function showSuccess() {
  if (!form || !successCard) return;
  form.hidden = true;
  successCard.hidden = false;
  successCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setSubmittingState(button, submitting) {
  if (!button) return;
  button.disabled = submitting;
  button.textContent = submitting ? "Sending..." : "Request access";
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const encoded = new URLSearchParams(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
    ).toString();

    setSubmittingState(submitButton, true);

    try {
      if (isLocalPreview) {
        await new Promise((resolve) => setTimeout(resolve, 350));
        showSuccess();
        return;
      }

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encoded,
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      showSuccess();
    } catch {
      if (note) {
        note.innerHTML =
          'Could not submit. Email <a href="mailto:support@clearledgr.com?subject=Clearledgr%20access%20request">support@clearledgr.com</a> and we will follow up.';
      }
    } finally {
      setSubmittingState(submitButton, false);
    }
  });
}
