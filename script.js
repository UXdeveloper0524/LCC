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
  var navIds = ["home", "about", "specialties", "doctors", "packages", "contact"];

  /* ---------- navigation ---------- */
  var drawer = $("drawer");
  var drawerBackdrop = $("drawerBackdrop");
  function closeDrawer() { drawer.classList.remove("is-open"); drawerBackdrop.hidden = true; }
  $("menuOpen").addEventListener("click", function () { drawer.classList.add("is-open"); drawerBackdrop.hidden = false; });
  $("menuClose").addEventListener("click", closeDrawer);
  drawerBackdrop.addEventListener("click", closeDrawer);

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-jump]");
    if (!trigger) return;
    var target = document.getElementById(trigger.getAttribute("data-jump"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
    closeDrawer();
  });

  var header = $("siteHeader");
  var navButtons = document.querySelectorAll(".desktop-nav button");
  function onScroll() {
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

  $("backTop").addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });

  /* ---------- hero carousel ---------- */
  var heroImages = document.querySelectorAll(".hero-image");
  var heroDots = document.querySelectorAll("#heroDots button");
  var heroCopy = $("heroCopy");
  var activeSlide = 0;
  function showSlide(index) {
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
  setInterval(function () { showSlide(activeSlide + 1); }, 7000);

  /* ---------- booking form ---------- */
  var dateInput = $("bookingDate");
  dateInput.min = new Date().toISOString().split("T")[0];
  var form = $("bookingForm");
  var formError = $("formError");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      formError.textContent = "Please fill in the required details so we can find the right appointment for you.";
      formError.hidden = false;
      var invalid = form.querySelector(":invalid");
      if (invalid) invalid.focus();
      return;
    }
    formError.hidden = true;
    $("bookingPanel").hidden = true;
    $("bookingSuccess").hidden = false;
  });
  $("bookingReset").addEventListener("click", function () {
    form.reset();
    $("bookingSuccess").hidden = true;
    $("bookingPanel").hidden = false;
  });

  /* ---------- specialties ---------- */
  var specialtyButtons = document.querySelectorAll("#specialtyList button");
  var specialtyIndex = 0;
  function showSpecialty(index) {
    specialtyIndex = (index + specialties.length) % specialties.length;
    var item = specialties[specialtyIndex];
    specialtyButtons.forEach(function (button, i) { button.classList.toggle("is-active", i === specialtyIndex); });
    var image = $("specialtyImage");
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
  $("specialtyPrev").addEventListener("click", function () { showSpecialty(specialtyIndex - 1); });
  $("specialtyNext").addEventListener("click", function () { showSpecialty(specialtyIndex + 1); });

  /* ---------- reviews ---------- */
  var reviewIndex = 0;
  function showReview(index) {
    reviewIndex = (index + reviews.length) % reviews.length;
    var review = reviews[reviewIndex];
    $("reviewInitials").textContent = review.initials;
    $("reviewName").textContent = review.name;
    $("reviewCopy").textContent = "\u201C" + review.copy + "\u201D";
    $("reviewCount").textContent = "0" + (reviewIndex + 1) + " / 0" + reviews.length;
  }
  $("reviewPrev").addEventListener("click", function () { showReview(reviewIndex - 1); });
  $("reviewNext").addEventListener("click", function () { showReview(reviewIndex + 1); });

  /* ---------- instagram load more ---------- */
  var extras = document.querySelectorAll(".insta-extra");
  var loadMore = $("loadMore");
  var expanded = false;
  loadMore.addEventListener("click", function () {
    expanded = !expanded;
    extras.forEach(function (tile) { tile.hidden = !expanded; tile.classList.add("is-visible"); });
    loadMore.childNodes[0].nodeValue = expanded ? "Show less " : "Load more ";
  });

  /* ---------- modals ---------- */
  var lightboxModal = $("lightboxModal");
  var videoModal = $("videoModal");
  function openModal(modal) { modal.hidden = false; document.body.style.overflow = "hidden"; }
  function closeModals() { lightboxModal.hidden = true; videoModal.hidden = true; document.body.style.overflow = ""; }

  document.addEventListener("click", function (event) {
    var tile = event.target.closest("[data-lightbox]");
    if (tile) {
      $("lightboxImage").src = tile.getAttribute("data-lightbox");
      $("lightboxImage").alt = tile.getAttribute("data-title");
      $("lightboxTitle").textContent = tile.getAttribute("data-title");
      openModal(lightboxModal);
      return;
    }
    if (event.target.closest("[data-close-modal]") || event.target.classList.contains("modal-backdrop")) closeModals();
  });
  $("videoOpen").addEventListener("click", function () { openModal(videoModal); });
  $("videoBook").addEventListener("click", function () {
    closeModals();
    var contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
  });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") { closeModals(); closeDrawer(); } });

  /* ---------- scroll reveal ---------- */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (element) { observer.observe(element); });
})();
