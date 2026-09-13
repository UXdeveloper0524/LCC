(function () {
  "use strict";

  var slides = [
    { eyebrow: "Care that feels personal", title: "Your health, held with care.", copy: "Expert doctors, thoughtful treatment, and a calmer healthcare experience for every chapter of life." },
    { eyebrow: "A better way to feel well", title: "Modern medicine. Human warmth.", copy: "From your first hello to your follow-up, every detail is designed around you." },
    { eyebrow: "One trusted care team", title: "Everything you need, under one roof.", copy: "A connected team of specialists working together to help you live your healthiest life." }
  ];

  var specialties = [
    { name: "Family Medicine", number: "01", copy: "Whole-person care for you and the people you love, from everyday health to long-term wellbeing.", image: "images/life-care-profile.jpg" },
    { name: "Women\u2019s Health", number: "02", copy: "Specialist care that meets women where they are, through every season of life.", image: "images/life-care-gallery.jpg" },
    { name: "Internal Medicine", number: "03", copy: "Clear answers and connected care for the health concerns that matter most.", image: "images/life-care-hero.jpg" },
    { name: "Pediatrics", number: "04", copy: "A gentle, reassuring environment where little ones can grow up feeling their best.", image: "images/life-care-doctors.jpg" }
  ];

  var reviews = [
    { name: "Sara A.", initials: "SA", copy: "The whole experience felt considered, from the warm welcome to the way my doctor listened. I never felt rushed." },
    { name: "Michael R.", initials: "MR", copy: "A beautiful clinic with an even better team. Everything was clear, kind, and handled with real professionalism." },
    { name: "Priya N.", initials: "PN", copy: "Finally, healthcare that feels human. The follow-up was just as thoughtful as the appointment itself." }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var on = function (element, event, handler) { if (element) element.addEventListener(event, handler); };
  var navIds = ["home", "about", "specialties", "doctors", "packages", "contact"];

  /* ---------- navigation ---------- */
  var drawer = $("drawer");
  var drawerBackdrop = $("drawerBackdrop");
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    if (drawerBackdrop) drawerBackdrop.hidden = true;
  }
  on($("menuOpen"), "click", function () {
    if (!drawer) return;
    drawer.classList.add("is-open");
    if (drawerBackdrop) drawerBackdrop.hidden = false;
  });
  on($("menuClose"), "click", closeDrawer);
  on(drawerBackdrop, "click", closeDrawer);

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-jump]");
    if (!trigger) return;
    var target = document.getElementById(trigger.getAttribute("data-jump"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    closeDrawer();
  });

  var header = $("siteHeader");
  var navButtons = document.querySelectorAll(".desktop-nav button");
  var isInternal = document.body.classList.contains("is-internal");

  function onScroll() {
    if (!header) return;
    if (isInternal) {
      header.classList.add("site-header--solid");
      return;
    }
    var closestId = "home";
    var closestDistance = Infinity;
    navIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;
      var distance = Math.abs(section.getBoundingClientRect().top - 130);
      if (distance < closestDistance) { closestDistance = distance; closestId = id; }
    });
    header.classList.toggle("site-header--scrolled", closestId !== "home");
    navButtons.forEach(function (button) {
      button.classList.toggle("is-active", button.getAttribute("data-jump") === closestId);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  on($("backTop"), "click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- hero carousel (home) ---------- */
  var heroImages = document.querySelectorAll(".hero-image");
  var heroDots = document.querySelectorAll("#heroDots button");
  var heroCopy = $("heroCopy");
  var activeSlide = 0;
  function showSlide(index) {
    if (!heroCopy) return;
    activeSlide = (index + slides.length) % slides.length;
    var slide = slides[activeSlide];
    heroImages.forEach(function (image, i) { image.classList.toggle("is-active", i === activeSlide); });
    heroDots.forEach(function (dot, i) { dot.classList.toggle("is-active", i === activeSlide); });
    $("heroEyebrow").textContent = slide.eyebrow;
    $("heroTitle").textContent = slide.title;
    $("heroText").textContent = slide.copy;
    heroCopy.style.animation = "none";
    void heroCopy.offsetWidth;
    heroCopy.style.animation = "";
  }
  heroDots.forEach(function (dot) {
    dot.addEventListener("click", function () { showSlide(Number(dot.getAttribute("data-slide"))); });
  });
  if (heroCopy) setInterval(function () { showSlide(activeSlide + 1); }, 7000);

  /* ---------- booking form ---------- */
  var dateInput = $("bookingDate");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
  var form = $("bookingForm");
  var formError = $("formError");
  on(form, "submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      if (formError) {
        formError.textContent = "Please fill in the required details so we can find the right appointment for you.";
        formError.hidden = false;
      }
      var invalid = form.querySelector(":invalid");
      if (invalid) invalid.focus();
      return;
    }
    if (formError) formError.hidden = true;
    $("bookingPanel").hidden = true;
    $("bookingSuccess").hidden = false;
    $("bookingSuccess").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  on($("bookingReset"), "click", function () {
    form.reset();
    $("bookingSuccess").hidden = true;
    $("bookingPanel").hidden = false;
  });

  /* ---------- specialties (home) ---------- */
  var specialtyButtons = document.querySelectorAll("#specialtyList button");
  var specialtyIndex = 0;
  function showSpecialty(index) {
    var image = $("specialtyImage");
    if (!image) return;
    specialtyIndex = (index + specialties.length) % specialties.length;
    var item = specialties[specialtyIndex];
    specialtyButtons.forEach(function (button, i) { button.classList.toggle("is-active", i === specialtyIndex); });
    image.src = item.image;
    image.alt = item.name;
    image.style.animation = "none";
    void image.offsetWidth;
    image.style.animation = "";
    $("specialtyNumber").textContent = item.number;
    $("specialtyName").textContent = item.name;
    $("specialtyCopy").textContent = item.copy;
  }
  specialtyButtons.forEach(function (button) {
    button.addEventListener("click", function () { showSpecialty(Number(button.getAttribute("data-specialty"))); });
  });
  on($("specialtyPrev"), "click", function () { showSpecialty(specialtyIndex - 1); });
  on($("specialtyNext"), "click", function () { showSpecialty(specialtyIndex + 1); });

  /* ---------- reviews (home) ---------- */
  var reviewIndex = 0;
  function showReview(index) {
    if (!$("reviewCopy")) return;
    reviewIndex = (index + reviews.length) % reviews.length;
    var review = reviews[reviewIndex];
    $("reviewInitials").textContent = review.initials;
    $("reviewName").textContent = review.name;
    $("reviewCopy").textContent = "\u201C" + review.copy + "\u201D";
    $("reviewCount").textContent = "0" + (reviewIndex + 1) + " / 0" + reviews.length;
  }
  on($("reviewPrev"), "click", function () { showReview(reviewIndex - 1); });
  on($("reviewNext"), "click", function () { showReview(reviewIndex + 1); });

  /* ---------- instagram load more (home) ---------- */
  var extras = document.querySelectorAll(".insta-extra");
  var loadMore = $("loadMore");
  var expanded = false;
  on(loadMore, "click", function () {
    expanded = !expanded;
    extras.forEach(function (tile) { tile.hidden = !expanded; tile.classList.add("is-visible"); });
    loadMore.childNodes[0].nodeValue = expanded ? "Show less " : "Load more ";
  });

  /* ---------- doctor filters ---------- */
  var filterRow = $("doctorFilters");
  var doctorGrid = $("doctorGrid");
  if (filterRow && doctorGrid) {
    var pills = filterRow.querySelectorAll(".filter-pill");
    var cards = doctorGrid.querySelectorAll(".doctor-card");
    var emptyState = $("doctorEmpty");
    filterRow.addEventListener("click", function (event) {
      var pill = event.target.closest(".filter-pill");
      if (!pill) return;
      var value = pill.getAttribute("data-filter");
      pills.forEach(function (item) {
        var isActive = item === pill;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      var visible = 0;
      cards.forEach(function (card) {
        var match = value === "all" || card.getAttribute("data-tag") === value;
        card.hidden = !match;
        if (match) { visible += 1; card.classList.add("is-visible"); }
      });
      if (emptyState) emptyState.hidden = visible !== 0;
    });
  }

  /* ---------- accordions ---------- */
  document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
    accordion.addEventListener("click", function (event) {
      var trigger = event.target.closest(".accordion-trigger");
      if (!trigger) return;
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      var isOpen = trigger.getAttribute("aria-expanded") === "true";
      accordion.querySelectorAll(".accordion-trigger").forEach(function (other) {
        other.setAttribute("aria-expanded", "false");
        var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
        if (otherPanel) otherPanel.hidden = true;
      });
      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        if (panel) panel.hidden = false;
      }
    });
  });

  /* ---------- modals ---------- */
  var lightboxModal = $("lightboxModal");
  var videoModal = $("videoModal");
  function openModal(modal) { if (!modal) return; modal.hidden = false; document.body.style.overflow = "hidden"; }
  function closeModals() {
    if (lightboxModal) lightboxModal.hidden = true;
    if (videoModal) videoModal.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (event) {
    var tile = event.target.closest("[data-lightbox]");
    if (tile && lightboxModal) {
      $("lightboxImage").src = tile.getAttribute("data-lightbox");
      $("lightboxImage").alt = tile.getAttribute("data-title") || "Life Care Clinic";
      $("lightboxTitle").textContent = tile.getAttribute("data-title") || "Life Care Clinic";
      openModal(lightboxModal);
      return;
    }
    if (event.target.closest("[data-close-modal]") || event.target.classList.contains("modal-backdrop")) closeModals();
  });
  on($("videoOpen"), "click", function () { openModal(videoModal); });
  on($("videoBook"), "click", function () {
    closeModals();
    var contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "contact.html";
  });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") { closeModals(); closeDrawer(); } });

  /* ---------- scroll reveal ---------- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (element) { observer.observe(element); });
})();
