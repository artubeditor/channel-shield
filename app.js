const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const planButtons = Array.from(document.querySelectorAll("[data-plan]"));
const priceCards = Array.from(document.querySelectorAll("[data-price-card]"));
const journeyTabs = Array.from(document.querySelectorAll("[data-journey-tab]"));
const journeyCards = Array.from(document.querySelectorAll(".journey-columns article"));
const modals = Array.from(document.querySelectorAll(".modal"));

let lastFocusedElement = null;

function syncHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}

function closeMenu() {
  menu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

function setPlan(plan) {
  planButtons.forEach((button) => {
    const selected = button.dataset.plan === plan;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-selected", String(selected));
  });

  priceCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.priceCard === plan);
  });
}

function setJourneyTab(selectedTab) {
  const selectedIndex = journeyTabs.indexOf(selectedTab);

  journeyTabs.forEach((tab, index) => {
    const selected = index === selectedIndex;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });

  journeyCards.forEach((card, index) => {
    card.classList.toggle("is-selected", index === selectedIndex);
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  lastFocusedElement = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");

  const firstControl = modal.querySelector("button, a, input, textarea, select");
  firstControl?.focus();
}

function closeModal(modal) {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
  lastFocusedElement?.focus?.();
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

menuToggle?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.querySelectorAll(".nav-links a, .nav-cta, .site-footer a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

planButtons.forEach((button) => {
  button.addEventListener("click", () => setPlan(button.dataset.plan));
});

journeyTabs.forEach((tab) => {
  tab.addEventListener("click", () => setJourneyTab(tab));
});

document.querySelectorAll("[data-modal-open]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.modalOpen));
});

document.querySelectorAll("[data-modal-close]").forEach((control) => {
  control.addEventListener("click", () => {
    const modal = control.closest(".modal");
    if (modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const openedModal = modals.find((modal) => modal.classList.contains("is-open"));
  if (openedModal) {
    closeModal(openedModal);
    return;
  }

  closeMenu();
});

modals.forEach((modal) => {
  modal.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;

    const focusable = Array.from(modal.querySelectorAll("button, a, input, textarea, select"))
      .filter((element) => !element.disabled && element.offsetParent !== null);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
});

setPlan("starter");
if (journeyTabs[0]) setJourneyTab(journeyTabs[0]);
