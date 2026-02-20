// js/app.js
// This is your CONTROLLER — connects data to UI

// ========== AUTO-LOAD PROJECTS ==========
function loadProjects() {
  const container = document.getElementById("project-list");

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "work";

    // Build tags HTML
    const tagsHTML = project.tags
      .map(tag => `<span style="background:rgba(58,113,255,0.2);color:#3a71ff;padding:2px 8px;border-radius:4px;font-size:0.75rem;">${tag}</span>`)
      .join(" ");

    card.innerHTML = `
      <img src="${project.image}" 
           alt="${project.title}"
           onerror="this.src='https://placehold.co/400x250/06152c/3a71ff/FFF?text=${encodeURIComponent(project.title)}'">
      <div class="layer">
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
        <div style="margin-bottom:12px">${tagsHTML}</div>
        <a href="${project.link}" target="_blank" title="View Project">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// ========== TAB SYSTEM ==========
function opentab(event, tabName) {
  // Remove active from ALL tabs
  document.querySelectorAll(".tab-links").forEach(link => {
    link.classList.remove("active-link");
  });
  document.querySelectorAll(".tab-contents").forEach(content => {
    content.classList.remove("active-tab");
  });

  // Activate clicked tab
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

// ========== MOBILE MENU ==========
function openmenu() {
  document.getElementById("sidemenu").classList.add("open");
}
function closemenu() {
  document.getElementById("sidemenu").classList.remove("open");
}

// Close menu when a link is clicked
document.querySelectorAll("#sidemenu a").forEach(link => {
  link.addEventListener("click", closemenu);
});

// ========== CONTACT FORM ==========
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Stop page reload

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const msg     = document.getElementById("form-msg");

  // Basic validation
  if (!name || !email || !message) {
    msg.style.color = "#e74c3c";
    msg.textContent = "❌ Please fill in all fields.";
    return;
  }

  // Success (in real project you'd send to a backend)
  msg.style.color = "#4CAF50";
  msg.textContent = `✅ Thanks ${name}! Message received. I'll reply soon.`;
  this.reset();

  // Clear message after 4 seconds
  setTimeout(() => { msg.textContent = ""; }, 4000);
});

// ========== STICKY NAV SHADOW ==========
window.addEventListener("scroll", function() {
  const nav = document.getElementById("header");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.3)";
  }
});

// ========== INIT ==========
// Run when page loads
loadProjects();


// ===========================
// IMAGE SLIDER
// ===========================
(function () {
  const slides = document.querySelectorAll(".slide");
  const dots   = document.querySelectorAll(".dot");
  let current  = 0;
  let timer;

  function goToSlide(index) {
    // Remove active from current
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");

    // Set new current
    current = index;

    // Add active to new slide
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function nextSlide() {
    const next = (current + 1) % slides.length; // Loop back to 0
    goToSlide(next);
  }

  function startAuto() {
    timer = setInterval(nextSlide, 2000); // Every 3 second
  }

  function stopAuto() {
    clearInterval(timer);
  }

  // Pause on hover — good UX!
  document.querySelector(".img-slider").addEventListener("mouseenter", stopAuto);
  document.querySelector(".img-slider").addEventListener("mouseleave", startAuto);
  
  // Make goToSlide global so dots onclick works
  window.goToSlide = function(index) {
    stopAuto();       // Reset timer when user clicks
    goToSlide(index);
    startAuto();
  };

  // Start automatically
  startAuto();
})();
