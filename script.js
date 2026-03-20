const preloader = document.getElementById("preloader");
const siteHeader = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const scrollProgress = document.getElementById("scrollProgress");
const contactForm = document.getElementById("contactForm");
const paymentForm = document.getElementById("paymentForm");
const successModal = document.getElementById("successModal");
const contactFormStatus = document.getElementById("contactFormStatus");
const contactSubmitFrame = document.getElementById("contactSubmitFrame");
const closeModalButtons = document.querySelectorAll("[data-close-modal]");
const parallaxItems = document.querySelectorAll(".parallax");
const revealItems = document.querySelectorAll(".reveal");
const tierPanels = document.querySelectorAll("[data-tier]");
const pageSections = document.querySelectorAll("main[id], main section[id]");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const portalNavLinks = document.querySelectorAll('.portal-nav a[href^="#"]');
let contactSubmissionPending = false;
let contactSubmitButton = null;
let contactSubmitTimeout = null;
let contactFrameHandled = false;

window.addEventListener("load", () => {
  window.setTimeout(() => {
    if (preloader) preloader.classList.add("is-hidden");
  }, 900);
});

function handleHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  scrollProgress.style.width = `${Math.min(progress, 100)}%`;
}

function updateActiveNav() {
  if (!pageSections.length) return;

  let currentId = "top";

  pageSections.forEach((section) => {
    const offsetTop = section.offsetTop - 160;
    const offsetBottom = offsetTop + section.offsetHeight;

    if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
      currentId = section.id;
    }
  });

  const syncActiveState = (links) => {
    links.forEach((link) => {
      const target = link.getAttribute("href");
      link.classList.toggle("is-active", target === `#${currentId}`);
    });
  };

  if (navLinks.length) syncActiveState(navLinks);
  if (portalNavLinks.length) syncActiveState(portalNavLinks);
}

handleHeaderState();
updateScrollProgress();
updateActiveNav();
handleScrollEffects();

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function handleScrollEffects() {
  handleHeaderState();
  updateScrollProgress();
  updateActiveNav();
  const offset = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0);
    item.style.transform = `translate3d(0, ${offset * speed}px, 0)`;
  });
}

window.addEventListener("scroll", handleScrollEffects, { passive: true });

tierPanels.forEach((panel) => {
  const toggle = panel.querySelector("[data-tier-toggle]");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.contains("is-open");
    tierPanels.forEach((item) => {
      item.classList.remove("is-open");
      const button = item.querySelector("[data-tier-toggle]");
      if (button) button.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      panel.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

function setFieldError(field, message) {
  field.classList.add("is-invalid");
  const error = field.querySelector(".form-error");
  if (error) error.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove("is-invalid");
  const error = field.querySelector(".form-error");
  if (error) error.textContent = "";
}

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll(".form-field");

  fields.forEach((field) => clearFieldError(field));

  fields.forEach((field) => {
    const input = field.querySelector("input, textarea, select");
    if (!input) return;

    const value = input.type === "checkbox" ? input.checked : input.value.trim();

    if (!value) {
      isValid = false;
      setFieldError(field, "This field is required.");
      return;
    }

    if (input.name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(String(value))) {
        isValid = false;
        setFieldError(field, "Please enter a valid email address.");
      }
    }

    if ((input.name === "message" || input.name === "shortNote") && String(value).length < 12) {
      isValid = false;
      setFieldError(field, "Please provide a slightly more detailed message.");
    }
  });

  return isValid;
}

function openModal() {
  if (!successModal) return;
  successModal.classList.add("is-visible");
  successModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!successModal) return;
  successModal.classList.remove("is-visible");
  successModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

closeModalButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function setFormStatus(element, message, type = "") {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("is-success", "is-error");
  if (type) element.classList.add(type);
}

function setButtonLoading(button, isLoading, loadingLabel = "Sending...") {
  if (!button) return;
  const defaultLabel = button.dataset.defaultLabel || button.textContent.trim();

  if (!button.dataset.defaultLabel) {
    button.dataset.defaultLabel = defaultLabel;
  }

  button.disabled = isLoading;
  button.classList.toggle("is-loading", isLoading);
  button.textContent = isLoading ? loadingLabel : button.dataset.defaultLabel;
}

function finalizeContactSubmission(success, message = "") {
  if (!contactForm) return;

  if (contactSubmitTimeout) {
    window.clearTimeout(contactSubmitTimeout);
    contactSubmitTimeout = null;
  }

  contactSubmissionPending = false;
  setButtonLoading(contactSubmitButton, false);

  if (success) {
    contactForm.reset();
    setFormStatus(
      contactFormStatus,
      "Your inquiry has been sent successfully and is now queued for confidential review.",
      "is-success"
    );
    openModal();
    return;
  }

  setFormStatus(
    contactFormStatus,
    message || "We couldn't confirm delivery right now. Please try again in a moment.",
    "is-error"
  );
}

if (contactSubmitFrame) {
  contactSubmitFrame.addEventListener("load", () => {
    if (!contactSubmissionPending || contactFrameHandled) return;
    contactFrameHandled = true;
    finalizeContactSubmission(true);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(contactForm)) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    contactSubmitButton = submitButton;
    const endpoint = (contactForm.dataset.googleScriptUrl || "").trim();

    if (!endpoint) {
      setFormStatus(
        contactFormStatus,
        "Google Apps Script URL is not configured yet. Add the deployed web app URL to the form to activate sending.",
        "is-error"
      );
      return;
    }

    setButtonLoading(submitButton, true, "Sending...");
    setFormStatus(contactFormStatus, "Sending your inquiry securely...", "");

    try {
      contactForm.action = endpoint;
      contactSubmissionPending = true;
      contactFrameHandled = false;
      contactSubmitTimeout = window.setTimeout(() => finalizeContactSubmission(false), 15000);
      contactForm.submit();
    } catch (error) {
      setFormStatus(
        contactFormStatus,
        "We couldn't send your inquiry right now. Please try again in a moment.",
        "is-error"
      );
      setButtonLoading(submitButton, false);
    }
  });
}

if (paymentForm) {
  paymentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm(paymentForm)) return;

    const confidentiality = paymentForm.querySelector('input[name="confidentiality"]');
    if (confidentiality && !confidentiality.checked) {
      const wrapper = confidentiality.closest(".form-field");
      if (wrapper) setFieldError(wrapper, "You must acknowledge confidentiality.");
      return;
    }

    window.location.href = "confirmation.html";
  });
}
