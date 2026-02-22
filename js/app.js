// js/app.js
// CONTROLLER — connects data to UI

// ============================================
// PROJECT CARDS
// ============================================

const typeBadge = {
  android: { icon: "fa-brands fa-android", label: "Android", color: "#3ddc84" },
  web:     { icon: "fa-solid fa-globe",    label: "Web",     color: "#3a71ff" },
  design:  { icon: "fa-solid fa-pen-ruler", label: "Design", color: "#ff6b6b" }
};

function loadProjects() {
  const container = document.getElementById("project-list");
  container.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "work";

    // Tags
    const tagsHTML = project.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join("");

    // Type badge (Android / Web)
    const badge = typeBadge[project.type] || typeBadge["web"];
    const badgeHTML = `
      <span class="type-badge" style="color:${badge.color}; border-color:${badge.color}50;">
        <i class="${badge.icon}"></i> ${badge.label}
      </span>`;

    card.innerHTML = `
      <img
        src="${project.image}"
        alt="${project.title}"
        onerror="this.src='https://via.placeholder.com/400x250/06152c/3a71ff?text=${encodeURIComponent(project.title)}'">
      <div class="layer">
        <div class="layer-top">${badgeHTML}</div>
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div class="tags-row">${tagsHTML}</div>
        <a href="${project.link}" target="_blank" title="View Project">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// ============================================
// TAB SYSTEM
// ============================================
function opentab(event, tabName) {
  document.querySelectorAll(".tab-links").forEach(link => {
    link.classList.remove("active-link");
  });
  document.querySelectorAll(".tab-contents").forEach(content => {
    content.classList.remove("active-tab");
  });
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

// ============================================
// MOBILE MENU
// ============================================
function openmenu() {
  document.getElementById("sidemenu").classList.add("open");
}
function closemenu() {
  document.getElementById("sidemenu").classList.remove("open");
}

// Close menu when any nav link clicked
document.querySelectorAll("#sidemenu a").forEach(link => {
  link.addEventListener("click", closemenu);
});

// ============================================
// CONTACT FORM
// ============================================
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg     = document.getElementById("form-msg");

  if (!name || !email || !message) {
    msg.style.color = "#e74c3c";
    msg.textContent = "❌ Please fill in all fields.";
    return;
  }

  msg.style.color = "#4CAF50";
  msg.textContent = `✅ Thanks ${name}! Message received. I'll reply soon.`;
  this.reset();

  setTimeout(() => { msg.textContent = ""; }, 4000);
});

// ============================================
// STICKY NAV SHADOW ON SCROLL
// ============================================
window.addEventListener("scroll", function() {
  const nav = document.getElementById("header");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.5)";
  } else {
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.3)";
  }
});

// ============================================
// IMAGE SLIDER
// ============================================
(function () {
  const slides = document.querySelectorAll(".slide");
  const dots   = document.querySelectorAll(".dot");
  let current  = 0;
  let timer;

  // Guard: stop if no slider found on page
  if (!slides.length || !dots.length) return;

  function goToSlide(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    goToSlide(next);
  }

  function startAuto() {
    timer = setInterval(nextSlide, 2000);
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // Pause on hover
  document.querySelector(".img-slider").addEventListener("mouseenter", stopAuto);
  document.querySelector(".img-slider").addEventListener("mouseleave", startAuto);

  // Global — for onclick in HTML dots
  window.goToSlide = function(index) {
    stopAuto();
    goToSlide(index);
    startAuto();
  };

  startAuto();
})();

// ============================================
// INIT — Run on page load
// ============================================
loadProjects();