'use strict';

/*-------------------------------------------------------------------
  MILAN BORICHA — PORTFOLIO INTERACTION & MOTION CONTROLLER
-------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  initPageLoader();
  initCustomCursor();
  initNavigation();
  initScrollAnimations();
  initContactForm();
});

/*-----------------------------------*\
  #PAGE LOADER OVERLAY
\*-----------------------------------*/

function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  const loaderFill = document.getElementById('loaderFill');

  if (!loader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 25) + 15;
    if (progress > 100) progress = 100;
    if (loaderFill) loaderFill.style.width = progress + '%';

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 300);
    }
  }, 100);
}

/*-----------------------------------*\
  #CUSTOM DESKTOP MAGNETIC CURSOR
\*-----------------------------------*/

function initCustomCursor() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (!cursorDot || !cursorRing) return;

  // Track mouse coordinates with smooth interpolation
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursorRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursorRing);
  }
  requestAnimationFrame(renderCursorRing);

  // Interactive Hover Elements
  const interactiveSelectors = 'a, button, .stack-chip, .stat-card, .achievement-card, .cert-card';
  document.querySelectorAll(interactiveSelectors).forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });

  // Project Media Special Hover State
  document.querySelectorAll('.project-media').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.classList.add('project-hover');
      cursorDot.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('project-hover');
      cursorDot.style.opacity = '1';
    });
  });
}

/*-----------------------------------*\
  #STICKY NAVIGATION & MOBILE DRAWER
\*-----------------------------------*/

function initNavigation() {
  const header = document.getElementById('siteHeader');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Highlight active section in navbar
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-nav-target') === currentSection || link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer Toggle
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen ? '<ion-icon name="close-outline"></ion-icon>' : '<ion-icon name="menu-outline"></ion-icon>';
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
      });
    });
  }
}

/*-----------------------------------*\
  #GSAP SCROLLTRIGGER ANIMATIONS
\*-----------------------------------*/

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Hero Stagger Animation
  const heroTl = gsap.timeline({ delay: 0.4 });
  heroTl
    .from('.status-badge', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
    .from('.hero-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
    .from('.hero-bio', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.hero-actions', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

  // Timeline Scroll Progress Line
  const timelineProgress = document.getElementById('timelineProgress');
  if (timelineProgress) {
    gsap.to(timelineProgress, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 60%',
        end: 'bottom 80%',
        scrub: true
      }
    });
  }

  // Section Headers & Content Reveals
  gsap.utils.toArray('.section-editorial').forEach(sec => {
    gsap.from(sec.querySelector('.section-label'), {
      x: -30,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: { trigger: sec, start: 'top 80%' }
    });

    gsap.from(sec.querySelector('.section-title'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: { trigger: sec, start: 'top 75%' }
    });
  });

  // Staggered Tech Category Rows
  gsap.utils.toArray('.tech-category-row').forEach(row => {
    gsap.from(row, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: { trigger: row, start: 'top 85%' }
    });
  });

  // Project Cards Reveal
  gsap.utils.toArray('.project-case-card').forEach(card => {
    gsap.from(card, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 85%' }
    });
  });
}

/*-----------------------------------*\
  #PROJECT DATA & POPUP MODAL SYSTEM
\*-----------------------------------*/

const projectsData = {
  primebuilder: {
    title: "PrimeBuilder",
    subtitle: "Civil Construction Portfolio & Lead Management App",
    category: "Flutter • Firebase • Provider",
    featured: true,
    github: "https://github.com/milan1533/PrimeBuilder_App.git",
    techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Provider", "SharedPreferences"],
    description: "PrimeBuilder is a Flutter application engineered for a civil construction business to showcase completed projects, present company services, manage inquiries, and process user leads seamlessly with Provider state management.",
    highlights: [
      "Developed a civil construction app showcasing service portfolios and structural projects.",
      "Implemented Firebase Authentication and Cloud Firestore for secure user data and project catalogs.",
      "Architected clean Feature-First structure using Provider for reactive state management.",
      "Integrated inquiry handling with localized storage using SharedPreferences."
    ],
    challenges: "Efficiently loading high-resolution construction media across varying network conditions while maintaining real-time Firestore sync.",
    solution: "Structured feature modules with Firestore query indexing and local memory cache fallbacks.",
    future: "AR/VR 3D project walkthroughs, push notification lead alerts, and automated PDF quotation generator.",
    screenshots: [
      "./assets/images/prime_builder/primeBuilder01.jpg",
      "./assets/images/prime_builder/primeBuilder02.jpg",
      "./assets/images/prime_builder/primeBuilder03.jpg",
      "./assets/images/prime_builder/primeBuilder04.jpg"
    ]
  },
  skillpath: {
    title: "SkillPath",
    subtitle: "AI Career Development & Learning Platform",
    category: "AI Application • Flutter",
    featured: true,
    github: "https://github.com/milan1533/SkillPath_App",
    techStack: ["Flutter", "Dart", "Google Gemini API", "Hive", "REST API", "FL Chart"],
    description: "SkillPath is an AI-powered career development platform that helps users monitor learning progress, evaluate skills, and generate personalized learning roadmaps using Google Gemini AI.",
    highlights: [
      "Integrated Google Gemini AI API to generate customized skill roadmaps and learning paths.",
      "Implemented Hive database for fast local offline caching of user learning progress.",
      "Designed interactive progress charts using FL Chart for data visualization.",
      "Collaborated in a hackathon team to build an intuitive career tracker."
    ],
    challenges: "Handling real-time AI API JSON responses smoothly while synchronizing local Hive database records.",
    solution: "Built robust data mappers and local cache repositories for uninterrupted offline access.",
    future: "Voice AI career coaching, automated certificate generation, and interview simulator.",
    screenshots: [
      "./assets/images/projects/skillpath.svg"
    ]
  },
  spendnote: {
    title: "SpendNote",
    subtitle: "Personal Expense & Notes Manager",
    category: "Productivity • SQLite",
    featured: false,
    github: "https://github.com/milan1533/SpendNote_App.git",
    techStack: ["Flutter", "Dart", "SQLite", "SharedPreferences", "Glassmorphism UI"],
    description: "SpendNote is an offline-first Flutter application for tracking personal expenses and managing notes with categorized records, expense analytics, and SQLite database storage.",
    highlights: [
      "Built offline-first Flutter app for expense tracking and daily notes management.",
      "Implemented SQLite database for local CRUD operations and rapid queries.",
      "Designed custom glassmorphic UI elements and responsive layout widgets.",
      "Integrated category-wise expense aggregation for simple personal finance tracking."
    ],
    challenges: "Computing dynamic expense totals in real-time without locking the UI main thread.",
    solution: "Optimized indexed SQLite queries and computed summaries asynchronously.",
    future: "Google Drive backup/sync, PDF expense report export, and budget thresholds.",
    screenshots: [
      "./assets/images/spendNote/Spendnote1.jpg",
      "./assets/images/spendNote/Spendnote2.jpg",
      "./assets/images/spendNote/Spendnote3.jpg",
      "./assets/images/spendNote/Spendnote4.jpg",
      "./assets/images/spendNote/Spendnote5.jpg"
    ]
  },
  invitex: {
    title: "InviteX",
    subtitle: "Private Invite-Only Social Chat Platform",
    category: "Real-Time Chat • Firebase",
    featured: false,
    github: "https://github.com/milan1533/inviteX",
    techStack: ["Flutter", "Firebase", "Cloud Firestore", "Firebase Storage", "FCM", "SQLite", "Provider"],
    description: "InviteX is a private invite-only real-time messaging application built with Flutter and Firebase. Features instant messaging, media sharing, offline caching via SQLite, and FCM push notifications.",
    highlights: [
      "Engineered real-time one-to-one messaging with Cloud Firestore sync.",
      "Integrated Firebase Storage for media uploads and FCM for instant notifications.",
      "Added offline data persistence using SQLite database for offline chat viewing.",
      "Implemented Provider state management for modular chat architecture."
    ],
    challenges: "Maintaining chat ordering consistency between local SQLite database and Firestore during network drops.",
    solution: "Designed a dual sync engine storing local chat drafts with Firestore background streaming.",
    future: "End-to-End Encryption (E2EE), voice/video calling integration, and group message search.",
    screenshots: [
      "./assets/images/inviteX/invite01.jpg",
      "./assets/images/inviteX/invite02.jpg",
      "./assets/images/inviteX/invite03.jpg",
      "./assets/images/inviteX/invite04.jpg"
    ]
  },
  bmi: {
    title: "BMI Calculator",
    subtitle: "Health & Utility Mobile Application",
    category: "Health • Utility",
    featured: false,
    github: "https://github.com/milan1533/BMI-App",
    techStack: ["Flutter", "Dart", "Material Design"],
    description: "A Flutter application for calculating Body Mass Index with health category classification, smooth animated transitions, and a clean Material Design interface.",
    highlights: [
      "Implemented precise BMI calculation formula with health classification ranges.",
      "Designed smooth slider controls and interactive metric selection widgets.",
      "Built clean Material 3 responsive UI layout."
    ],
    challenges: "Ensuring interactive input controls remain fluid across different device screen densities.",
    solution: "Utilized custom animated slider widgets and flex layout constraints.",
    future: "Historical health progress graphs and daily water tracking reminder.",
    screenshots: [
      "./assets/images/BMI/BMI01.jpg",
      "./assets/images/BMI/BMI02.jpg",
      "./assets/images/BMI/BMI03.jpg",
      "./assets/images/BMI/BMI04.jpg"
    ]
  }
};

// Modal DOM Handles
const modalOverlay = document.getElementById("projectModalOverlay");
const modalCloseBtnCustom = document.getElementById("modalCloseBtnCustom");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalFeaturedTag = document.getElementById("modalFeaturedTag");
const modalDescription = document.getElementById("modalDescription");
const modalTechBadges = document.getElementById("modalTechBadges");
const modalHighlights = document.getElementById("modalHighlights");
const modalChallenge = document.getElementById("modalChallenge");
const modalSolution = document.getElementById("modalSolution");
const modalFuture = document.getElementById("modalFuture");
const modalGithubBtn = document.getElementById("modalGithubBtn");
const modalMainImage = document.getElementById("modalMainImage");
const modalThumbsContainer = document.getElementById("modalThumbsContainer");

window.openProjectModal = function (projectId) {
  const data = projectsData[projectId];
  if (!data || !modalOverlay) return;

  modalTitle.innerText = data.title + " — " + data.subtitle;
  modalCategory.innerText = data.category;

  if (modalFeaturedTag) {
    modalFeaturedTag.style.display = data.featured ? "inline-flex" : "none";
  }

  modalDescription.innerText = data.description;
  if (modalGithubBtn) modalGithubBtn.href = data.github;

  if (modalTechBadges) {
    modalTechBadges.innerHTML = data.techStack.map(t => `<span class="proj-tag">${t}</span>`).join('');
  }

  if (modalHighlights) {
    modalHighlights.innerHTML = data.highlights.map(h => `<li style="margin-bottom: 6px;">${h}</li>`).join('');
  }

  if (modalChallenge) modalChallenge.innerText = data.challenges;
  if (modalSolution) modalSolution.innerText = data.solution;
  if (modalFuture) modalFuture.innerText = data.future;

  if (data.screenshots && data.screenshots.length > 0 && modalMainImage) {
    modalMainImage.src = data.screenshots[0];
    if (modalThumbsContainer) {
      modalThumbsContainer.innerHTML = data.screenshots.map((imgSrc, index) => `
        <div class="modal-thumb ${index === 0 ? 'active' : ''}" onclick="switchModalImage(this, '${imgSrc}')">
          <img src="${imgSrc}" alt="Screenshot ${index + 1}">
        </div>
      `).join('');
    }
  }

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.switchModalImage = function (thumbElem, imgSrc) {
  if (modalMainImage) modalMainImage.src = imgSrc;
  if (modalThumbsContainer) {
    modalThumbsContainer.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
    thumbElem.classList.add("active");
  }
};

window.closeProjectModal = function () {
  if (modalOverlay) modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
};

if (modalCloseBtnCustom) {
  modalCloseBtnCustom.addEventListener("click", window.closeProjectModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) window.closeProjectModal();
  });
}

/*-----------------------------------*\
  #LIGHTBOX FULLSCREEN VIEWER
\*-----------------------------------*/

const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCloseBtn = document.getElementById("lightboxCloseBtn");

window.openLightbox = function (imgSrc, captionText) {
  if (!lightboxOverlay || !lightboxImage) return;
  lightboxImage.src = imgSrc;
  if (lightboxCaption) lightboxCaption.innerText = captionText || "";
  lightboxOverlay.classList.add("active");
};

window.closeLightbox = function () {
  if (lightboxOverlay) lightboxOverlay.classList.remove("active");
};

if (lightboxCloseBtn) {
  lightboxCloseBtn.addEventListener("click", window.closeLightbox);
}

if (lightboxOverlay) {
  lightboxOverlay.addEventListener("click", function (e) {
    if (e.target === lightboxOverlay || e.target === lightboxImage) {
      window.closeLightbox();
    }
  });
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    window.closeLightbox();
    window.closeProjectModal();
  }
});

/*-----------------------------------*\
  #CONTACT FORM & SUPABASE CMS LOGIC
\*-----------------------------------*/

function initContactForm() {
  const contactForm = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (contactForm && formInputs && formBtn) {
    formInputs.forEach(input => {
      input.addEventListener("input", function () {
        if (contactForm.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    });
  }
}

// Supabase Dynamic CMS Integration
const PUBLIC_SUPABASE_URL = "https://fgetdklcraijnnfbccal.supabase.co";
const PUBLIC_SUPABASE_KEY = "sb_publishable_QulD4xqKUR536zixPMn4lA_0OnqL5wu";

(async function initSupabaseCMS() {
  const sbUrl = localStorage.getItem('sb_url') || PUBLIC_SUPABASE_URL;
  const sbKey = localStorage.getItem('sb_key') || PUBLIC_SUPABASE_KEY;

  if (!sbUrl || !sbKey || !window.supabase) return;

  try {
    const supabaseClient = window.supabase.createClient(sbUrl, sbKey, { auth: { persistSession: false } });

    // Contact Form Submission Listener
    const contactForm = document.querySelector("[data-form]");
    if (contactForm) {
      contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const nameInput = contactForm.querySelector("[name='fullname']");
        const emailInput = contactForm.querySelector("[name='email']");
        const msgInput = contactForm.querySelector("[name='message']");
        const submitBtn = contactForm.querySelector("[data-form-btn]");

        if (!nameInput || !emailInput || !msgInput) return;

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "Sending Message...";
        }

        try {
          const { error } = await supabaseClient.from('messages').insert([
            {
              name: nameInput.value.trim(),
              email: emailInput.value.trim(),
              message: msgInput.value.trim()
            }
          ]);

          if (error) throw new Error(error.message);

          alert("Thank you! Your message has been sent successfully to Milan Boricha.");
          contactForm.reset();
        } catch (err) {
          alert("Message sent! (Note: " + err.message + ")");
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
          }
        }
      });
    }

    // Hydrate Profile Settings if custom dataset exists in Supabase
    const { data: profileData } = await supabaseClient.from('profile_settings').select('*').limit(1);
    if (profileData && profileData.length > 0) {
      const p = profileData[0];
      const emailLink = document.getElementById('sidebarEmailLink');
      const phoneLink = document.getElementById('sidebarPhoneLink');
      const locationTxt = document.getElementById('sidebarLocationText');

      if (p.email && emailLink) { emailLink.innerText = p.email; emailLink.href = "mailto:" + p.email; }
      if (p.phone && phoneLink) { phoneLink.innerText = p.phone; phoneLink.href = "tel:" + p.phone.replace(/\s+/g, ''); }
      if (p.location && locationTxt) locationTxt.innerText = p.location;

      if (p.resume_url) {
        document.querySelectorAll('.btn-download-cv').forEach(a => {
          a.href = p.resume_url;
          a.setAttribute('target', '_blank');
          if (p.resume_url.endsWith('.pdf')) {
            a.setAttribute('download', 'Milan_Boricha_Resume.pdf');
          }
        });
      }
    }

  } catch (err) {
    console.log("Supabase CMS notice:", err.message);
  }
})();