'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// Custom Select / Filtering
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCat = filterItems[i].dataset.category.toLowerCase().trim();
    if (selectedValue === "all" || selectedValue === itemCat) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase().trim();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Contact form verification
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetNav = (this.getAttribute("data-nav-target") || this.innerText).toLowerCase().trim();

    for (let j = 0; j < pages.length; j++) {
      const pageName = pages[j].dataset.page.toLowerCase().trim();
      if (targetNav === pageName || (targetNav === 'projects' && pageName === 'portfolio')) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        if (navigationLinks[j]) navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// Project Details Data & Dynamic Modal System
const projectsData = {
  skillpath: {
    title: "SkillPath",
    subtitle: "AI-Powered Skill Tracker & Career Development Platform",
    category: "AI Application",
    featured: true,
    github: "https://github.com/milan1533/SkillPath_App",
    techStack: ["Flutter", "Dart", "Google Gemini API", "Hive", "REST API", "FL Chart"],
    description: "SkillPath is an AI-powered career development platform that helps users monitor learning progress, evaluate skills, and generate personalized learning roadmaps using Google Gemini AI.",
    highlights: [
      "Developed an AI-powered application to track learning progress and evaluate career readiness.",
      "Integrated Google Gemini API using REST APIs to generate personalized learning roadmaps and skill recommendations.",
      "Implemented Hive database for secure offline storage of user profiles, courses, and progress data.",
      "Built interactive dashboards with FL Chart to visualize learning progress and performance metrics.",
      "Collaborated in a team during the Corp Connect Hackathon to design and develop the application."
    ],
    challenges: "Handling real-time AI response streaming and complex JSON parsing while maintaining offline state synchronization with Hive.",
    solution: "Architected custom data mappers and local cache repositories to ensure seamless offline access and fluid FL Chart visualizations.",
    future: "Voice-guided AI recommendations, real-time mock interviews, and automated PDF export of career roadmaps.",
    screenshots: [
      "./assets/images/projects/skillpath.svg",
      "./assets/images/projects/skillpath.svg",
      "./assets/images/projects/skillpath.svg"
    ]
  },
  primebuilder: {
    title: "PrimeBuilder",
    subtitle: "Civil Construction Portfolio & Lead Management App",
    category: "Flutter • Firebase",
    featured: false,
    github: "https://github.com/milan1533/PrimeBuilder_App",
    techStack: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Provider", "SharedPreferences"],
    description: "PrimeBuilder is a Flutter-based civil construction portfolio and lead management application designed to showcase construction projects, company services, and client information. It includes secure authentication, project management, and an inquiry system for handling customer leads efficiently.",
    highlights: [
      "Developed a Flutter application to showcase civil construction projects, services, and company portfolio.",
      "Integrated Firebase Authentication and Cloud Firestore for secure user management and project data storage.",
      "Designed responsive onboarding, authentication, project showcase, and profile management modules.",
      "Implemented Provider state management with a scalable feature-based project structure.",
      "Built an inquiry system for managing client leads and improving communication workflows."
    ],
    challenges: "Handling high-resolution construction media assets and multi-step inquiry workflows efficiently across varied network speeds.",
    solution: "Modularized project architecture into feature packages with Provider state management and Cloud Firestore query indexing with local cache.",
    future: "AR/VR 3D project visualization, push notifications for lead updates, and automated quotation generator.",
    screenshots: [
      "./assets/images/projects/primebuilder.svg",
      "./assets/images/projects/primebuilder.svg",
      "./assets/images/projects/primebuilder.svg"
    ]
  },
  invitex: {
    title: "InviteX",
    subtitle: "Private Real-Time Messaging Application",
    category: "Chat Application",
    featured: false,
    github: "https://github.com/milan1533/inviteX",
    techStack: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Firebase Storage", "Provider", "SQLite"],
    description: "InviteX is a private real-time messaging application built with Flutter and Firebase. It supports secure authentication, instant messaging, media sharing, offline storage, and a modern responsive interface.",
    highlights: [
      "Developed a private real-time messaging application using Flutter and Firebase.",
      "Implemented real-time one-to-one chat with Cloud Firestore for instant message synchronization.",
      "Integrated Firebase Authentication and Firebase Storage for secure login and media sharing.",
      "Added offline data persistence using SQLite to improve performance and user experience.",
      "Designed a modern, responsive UI using reusable Flutter widgets and Provider state management."
    ],
    challenges: "Maintaining message order consistency between local SQLite storage and remote Cloud Firestore synchronization during network drops.",
    solution: "Engineered a dual-layer sync mechanism: storing chat drafts and history locally via SQLite while leveraging Firestore real-time streams upon reconnection.",
    future: "End-to-End Encryption (E2EE), audio/video calling integration, and group message search.",
    screenshots: [
      "./assets/images/projects/invitex.svg",
      "./assets/images/projects/invitex.svg",
      "./assets/images/projects/invitex.svg"
    ]
  },
  spendnote: {
    title: "SpendNote",
    subtitle: "Personal Expense & Notes Management App",
    category: "Productivity",
    featured: false,
    github: "https://github.com/milan1533/spnednote_app",
    techStack: ["Flutter", "Dart", "SQLite", "SharedPreferences", "Material Design"],
    description: "SpendNote is an offline-first Flutter application for managing expenses and daily notes with categorized records, analytics, and local database storage.",
    highlights: [
      "Developed a cross-platform mobile application for managing personal expenses and daily notes.",
      "Implemented SQLite for offline data storage with complete CRUD operations for expenses and notes.",
      "Integrated SharedPreferences for user session management and profile persistence.",
      "Designed responsive and reusable UI components following a modular Flutter architecture.",
      "Built real-time expense summaries and categorized records to simplify personal finance tracking."
    ],
    challenges: "Computing aggregate expense summaries dynamically in SQLite without causing UI frame drops during smooth scrolling.",
    solution: "Optimized SQLite queries with indexed columns and executed aggregate computations off the UI thread.",
    future: "Google Drive backup/restore, PDF summary report export, and budget alert limits.",
    screenshots: [
      "./assets/images/projects/spendnote.svg",
      "./assets/images/projects/spendnote.svg",
      "./assets/images/projects/spendnote.svg"
    ]
  },
  bmi: {
    title: "BMI Calculator",
    subtitle: "Health Monitoring Application",
    category: "Health",
    featured: false,
    github: "https://github.com/milan1533/BMI-App",
    techStack: ["Flutter", "Dart", "Material Design"],
    description: "A Flutter application for calculating Body Mass Index with health category classification, smooth animations, and a clean Material Design interface.",
    highlights: [
      "Developed a cross-platform BMI Calculator application using Flutter and Dart.",
      "Implemented BMI calculation logic with automatic health category classification based on user inputs.",
      "Designed a responsive interface with reusable custom widgets for improved code maintainability.",
      "Added input validation and smooth navigation with an animated splash screen.",
      "Built a clean and user-friendly UI following Material Design principles."
    ],
    challenges: "Ensuring interactive input controls (height/weight selectors) remain visually fluid and responsive on different device screen densities.",
    solution: "Utilized custom animated widgets and Material 3 design constraints for responsive layout scaling.",
    future: "Historical BMI progress graphs, daily water intake tracker, and personalized health recommendations.",
    screenshots: [
      "./assets/images/projects/bmi.svg",
      "./assets/images/projects/bmi.svg",
      "./assets/images/projects/bmi.svg"
    ]
  }
};

// Modal DOM elements
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

  if (data.featured) {
    modalFeaturedTag.style.display = "inline-flex";
  } else {
    modalFeaturedTag.style.display = "none";
  }

  modalDescription.innerText = data.description;
  modalGithubBtn.href = data.github;

  // Tech stack badges
  modalTechBadges.innerHTML = data.techStack.map(t => `<span class="tech-badge">${t}</span>`).join('');

  // Highlights list
  modalHighlights.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

  // Challenge & Solution & Future
  modalChallenge.innerText = data.challenges;
  modalSolution.innerText = data.solution;
  modalFuture.innerText = data.future;

  // Gallery
  if (data.screenshots && data.screenshots.length > 0) {
    modalMainImage.src = data.screenshots[0];
    modalThumbsContainer.innerHTML = data.screenshots.map((imgSrc, index) => `
      <div class="modal-thumb ${index === 0 ? 'active' : ''}" onclick="switchModalImage(this, '${imgSrc}')">
        <img src="${imgSrc}" alt="Screenshot ${index + 1}">
      </div>
    `).join('');
  }

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.switchModalImage = function (thumbElem, imgSrc) {
  if (modalMainImage) modalMainImage.src = imgSrc;
  const thumbs = modalThumbsContainer.querySelectorAll(".modal-thumb");
  thumbs.forEach(t => t.classList.remove("active"));
  thumbElem.classList.add("active");
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

// Lightbox Fullscreen Image Viewer Logic
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

if (modalMainImage) {
  modalMainImage.addEventListener("click", function () {
    const currentTitle = modalTitle ? modalTitle.innerText : "Project Screenshot";
    window.openLightbox(this.src, currentTitle);
  });
}

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

// =========================================================================
// 🔴 FULL 100% DYNAMIC SUPABASE CMS INTEGRATION
// =========================================================================
const PUBLIC_SUPABASE_URL = "https://fgetdklcraijnnfbccal.supabase.co";
const PUBLIC_SUPABASE_KEY = "sb_publishable_QulD4xqKUR536zixPMn4lA_0OnqL5wu";

(async function initFullSupabaseCMS() {
  const sbUrl = localStorage.getItem('sb_url') || PUBLIC_SUPABASE_URL;
  const sbKey = localStorage.getItem('sb_key') || PUBLIC_SUPABASE_KEY;

  if (!sbUrl || !sbKey || !window.supabase) return;

  // Hydrate local cached avatar immediately if available
  const cachedAvatar = localStorage.getItem('custom_avatar_url');
  const sidebarAvatar = document.getElementById('sidebarAvatarImage');
  if (cachedAvatar && sidebarAvatar) {
    sidebarAvatar.src = cachedAvatar;
  }

  try {
    const supabaseClient = window.supabase.createClient(sbUrl, sbKey, { auth: { persistSession: false } });

    // --- 1. Hydrate Profile Settings ---
    const { data: profileData } = await supabaseClient.from('profile_settings').select('*').limit(1);
    if (profileData && profileData.length > 0) {
      const p = profileData[0];
      const avatarImg = document.getElementById('sidebarAvatarImage');
      const nameTxt = document.getElementById('sidebarNameText');
      const roleTxt = document.getElementById('sidebarRoleText');
      const emailLink = document.getElementById('sidebarEmailLink');
      const phoneLink = document.getElementById('sidebarPhoneLink');
      const locationTxt = document.getElementById('sidebarLocationText');
      const bioSec = document.getElementById('aboutBioText');

      if (p.avatar_url && avatarImg && p.avatar_url.trim() !== '') {
        const localCached = localStorage.getItem('custom_avatar_url');
        if (p.avatar_url.startsWith('data:') || p.avatar_url.startsWith('http') || !localCached) {
          avatarImg.src = p.avatar_url;
          localStorage.setItem('custom_avatar_url', p.avatar_url);
        }
      }
      if (p.name && nameTxt) { nameTxt.innerText = p.name; nameTxt.title = p.name; }
      if (p.role && roleTxt) roleTxt.innerText = p.role;
      if (p.email && emailLink) { emailLink.innerText = p.email; emailLink.href = "mailto:" + p.email; }
      if (p.phone && phoneLink) { phoneLink.innerText = p.phone; phoneLink.href = "tel:" + p.phone.replace(/\s+/g, ''); }
      if (p.location && locationTxt) locationTxt.innerText = p.location;
      if (p.about_text && bioSec) {
        bioSec.innerHTML = p.about_text.split('\n\n').map(para => `<p>${para}</p>`).join('');
      }

      if (p.resume_url) {
        document.querySelectorAll('.btn-download-cv').forEach(a => {
          a.href = p.resume_url;
          a.setAttribute('target', '_blank');
          if (p.resume_url.startsWith('data:application/pdf') || p.resume_url.endsWith('.pdf')) {
            a.setAttribute('download', (p.name ? p.name.replace(/\s+/g, '_') : 'Milan') + '_Resume.pdf');
          }
        });
      }
    }

    // --- 2. Hydrate Services ("What I'm Doing") ---
    const { data: servicesData } = await supabaseClient.from('services').select('*').order('created_at', { ascending: false });
    if (servicesData && servicesData.length > 0) {
      const servicesContainer = document.querySelector('.service-list');
      if (servicesContainer) {
        servicesContainer.innerHTML = servicesData.map(s => `
          <li class="service-item">
            <div class="service-icon-box" style="font-size: 32px;">
              ${s.icon_url && (s.icon_url.startsWith('http') || s.icon_url.startsWith('./') || s.icon_url.startsWith('data:'))
                ? `<img src="${s.icon_url}" width="40" alt="${s.title}">`
                : (s.icon_url || '📱')}
            </div>
            <div class="service-content-box">
              <h4 class="h4 service-item-title">${s.title}</h4>
              <p class="service-item-text">${s.description}</p>
            </div>
          </li>
        `).join('');
      }
    }

    // --- 3. Hydrate Skills ---
    const { data: skillsData } = await supabaseClient.from('skills').select('*').order('created_at', { ascending: false });
    if (skillsData && skillsData.length > 0) {
      const skillsContainer = document.querySelector('.skills-list');
      if (skillsContainer) {
        skillsContainer.innerHTML = skillsData.map(sk => `
          <li class="skills-item">
            <div class="title-wrapper">
              <h5 class="h5">${sk.title}</h5>
              <data value="${sk.percentage}">${sk.percentage}%</data>
            </div>
            <div class="skill-progress-bg">
              <div class="skill-progress-fill" style="width: ${sk.percentage}%;"></div>
            </div>
          </li>
        `).join('');
      }
    }

    // --- 4. Hydrate Projects ---
    const { data: dbProjects } = await supabaseClient.from('projects').select('*').order('created_at', { ascending: false });
    if (dbProjects && dbProjects.length > 0) {
      const projectListContainer = document.querySelector(".project-list");
      if (projectListContainer) {
        dbProjects.forEach((item, index) => {
          const pId = 'sp_proj_' + (item.id || index);
          const catLower = (item.category || 'applications').toLowerCase().trim();
          const techList = Array.isArray(item.tech_stack) ? item.tech_stack : (item.tech_stack ? item.tech_stack.split(',') : ['Flutter']);
          const screenshotsList = (Array.isArray(item.screenshots) && item.screenshots.length > 0)
            ? item.screenshots
            : [item.image_url || './assets/images/project-1.jpg'];

          projectsData[pId] = {
            title: item.title || 'Project',
            subtitle: item.subtitle || '',
            category: item.category || 'Applications',
            featured: false,
            github: item.github || '#',
            techStack: techList,
            description: item.description || 'Project managed via local admin panel.',
            highlights: [item.description || 'Custom project'],
            challenges: 'N/A',
            solution: 'N/A',
            future: 'N/A',
            screenshots: screenshotsList
          };

          const li = document.createElement('li');
          li.className = 'project-item active';
          li.setAttribute('data-filter-item', '');
          li.setAttribute('data-category', catLower);

          li.innerHTML = `
            <div class="project-card-custom">
              <span class="featured-badge ongoing-badge">🟢 Ongoing</span>
              <div class="project-img-box-custom" onclick="openProjectModal('${pId}')">
                <img src="${item.image_url || './assets/images/project-1.jpg'}" alt="${item.title}" onerror="this.onerror=null; this.src='./assets/images/project-1.jpg';" loading="lazy">
              </div>
              <h3 class="project-title-custom">${item.title}</h3>
              <p class="project-category-custom">${item.category}</p>
              <div class="project-actions">
                ${item.github ? `<a href="${item.github}" target="_blank" rel="noopener noreferrer" class="btn-github"><ion-icon name="logo-github"></ion-icon> GitHub</a>` : ''}
                <button class="btn-details" onclick="openProjectModal('${pId}')">
                  Details <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
              </div>
            </div>
          `;

          projectListContainer.prepend(li);
        });
      }
    }

    // --- 5. Hydrate Blogs ---
    const { data: blogData } = await supabaseClient.from('blogs').select('*').order('created_at', { ascending: false });
    if (blogData && blogData.length > 0) {
      const blogContainer = document.querySelector('.blog-posts-list');
      if (blogContainer) {
        blogContainer.innerHTML = blogData.map(b => `
          <li class="blog-post-item">
            <a href="#">
              <figure class="blog-banner-box">
                <img src="${b.image_url || './assets/images/blog-1.jpg'}" alt="${b.title}" loading="lazy">
              </figure>
              <div class="blog-content">
                <div class="blog-meta">
                  <p class="blog-category">${b.category || 'Development'}</p>
                  <span class="dot"></span>
                  <time datetime="${b.date}">${b.date || ''}</time>
                </div>
                <h3 class="h3 blog-item-title">${b.title}</h3>
                <p class="blog-text">${b.content ? b.content.substring(0, 100) + '...' : ''}</p>
              </div>
            </a>
          </li>
        `).join('');
      }
    }

    // --- 6. Hydrate Resume Timelines (Education, Experience, Featured Projects, Certifications) ---
    const { data: timelineData } = await supabaseClient.from('resume_timeline').select('*').order('created_at', { ascending: false });
    if (timelineData && timelineData.length > 0) {
      const renderList = (type, targetId) => {
        const items = timelineData.filter(i => i.section_type === type);
        const container = document.getElementById(targetId);
        if (!container || items.length === 0) return;
        container.innerHTML = items.map(i => `
          <li class="timeline-item">
            <h4 class="h4 timeline-item-title">${i.title}</h4>
            ${i.subtitle ? `<p style="color: var(--light-gray-70); font-size: 13.5px; font-weight: 500;">${i.subtitle}</p>` : ''}
            ${i.duration ? `<span>${i.duration}</span>` : ''}
            ${i.description ? `<p class="timeline-text">${i.description}</p>` : ''}
            ${i.link_url ? `
              <div style="margin-top: 6px;">
                <a href="${i.link_url}" target="_blank" rel="noopener noreferrer" style="color: var(--orange-yellow-crayola); font-size: 12.5px; font-weight: 500; display: inline-flex; align-items: center; gap: 4px;">
                  <ion-icon name="open-outline"></ion-icon> View Link / Certificate
                </a>
              </div>
            ` : ''}
          </li>
        `).join('');
      };

      renderList('education', 'dynamicEducationTimeline');
      renderList('experience', 'dynamicExperienceTimeline');
      renderList('featured_project', 'dynamicFeaturedProjectsTimeline');
      renderList('certification', 'dynamicCertificationsTimeline');
    }

    // --- 7. Contact Form Submissions Listener ---
    const contactForm = document.querySelector("[data-form]");
    if (contactForm) {
      contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const nameInput = contactForm.querySelector("[name='fullname']") || contactForm.querySelector("input[type='text']");
        const emailInput = contactForm.querySelector("[name='email']") || contactForm.querySelector("input[type='email']");
        const msgInput = contactForm.querySelector("[name='message']") || contactForm.querySelector("textarea");
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

          alert("Thank you! Your message has been sent successfully to Milan's Admin Inbox.");
          contactForm.reset();
        } catch (err) {
          alert("Failed to send message: " + err.message);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Send Message";
          }
        }
      });
    }

  } catch (err) {
    console.log("Supabase Dynamic CMS notice:", err.message);
  }
})();