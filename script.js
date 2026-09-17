/* ==========================================================================
   KULFI CORNER — MAIN SCRIPT
   Smooth Continuous Scrolling, Category Tabs, ScrollSpy, Reveal Animations
   ========================================================================== */

/* Global Category / Format Switcher */
window.switchKulfiTab = function (format) {
    // 1. Update Tab Buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(function (btn) {
        if (btn.getAttribute('data-format') === format) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 2. Update Format Highlight Card Buttons
    const formatCards = document.querySelectorAll('.format-card');
    formatCards.forEach(function (card) {
        const btn = card.querySelector('.format-select-btn');
        if (card.getAttribute('data-target-tab') === format) {
            if (btn) btn.classList.add('active-btn');
        } else {
            if (btn) btn.classList.remove('active-btn');
        }
    });

    // 3. Switch Format Panels
    const panels = document.querySelectorAll('.format-panel');
    panels.forEach(function (panel) {
        panel.classList.remove('active-panel');
    });

    const targetPanel = document.getElementById('panel-' + format);
    if (targetPanel) {
        targetPanel.classList.add('active-panel');

        // Trigger reveal animations on any cards inside target panel
        const panelReveals = targetPanel.querySelectorAll('.reveal');
        panelReveals.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }
};


document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. MOBILE MENU TOGGLE & AUTO-CLOSE
       ========================================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            const isExpanded = navMenu.classList.toggle("show");
            menuToggle.setAttribute("aria-expanded", isExpanded);
        });

        // Close mobile menu when clicking outside
        document.addEventListener("click", function (e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains("show")) {
                navMenu.classList.remove("show");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    }


    /* ==========================================================================
       2. SMOOTH SCROLLING WITH PRECISE NAVBAR OFFSET
       ========================================================================== */

    const scrollLinks = document.querySelectorAll('.nav-link, .hero-btn, .details-btn, .story-cta-btn, .cta-banner-primary, .cta-banner-secondary, .promise-btn, .coming-btn, .view-all-btn, .footer-links a');

    scrollLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const href = link.getAttribute("href");

            // Only handle internal hash anchor links on current page
            if (href && href.startsWith("#") && href.length > 1) {
                const targetId = href.substring(1);
                const targetEl = document.getElementById(targetId);

                if (targetEl) {
                    e.preventDefault();

                    const navbar = document.querySelector(".navbar");
                    const navHeight = navbar ? navbar.offsetHeight : 90;

                    const elementPosition = targetEl.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Close mobile menu after clicking
                    if (navMenu && navMenu.classList.contains("show")) {
                        navMenu.classList.remove("show");
                        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
                    }
                }
            }
        });
    });


    /* ==========================================================================
       3. ACTIVE NAVBAR ITEM (SCROLLSPY)
       ========================================================================== */

    const sections = [
        { id: "home", link: document.querySelector('.nav-link[href="#home"]') },
        { id: "our-kulfis", link: document.querySelector('.nav-link[href="#our-kulfis"]') },
        { id: "our-story", link: document.querySelector('.nav-link[href="#our-story"]') },
        { id: "how-we-make", link: document.querySelector('.nav-link[href="#how-we-make"]') },
        { id: "store", link: document.querySelector('.nav-link[href="#store"]') },
        { id: "contact", link: document.querySelector('.nav-link[href="#contact"]') }
    ];

    function updateActiveNavLink() {
        const navbar = document.querySelector(".navbar");
        const navHeight = navbar ? navbar.offsetHeight : 90;
        const scrollPosition = window.pageYOffset + navHeight + 80;

        let currentSectionId = "";

        sections.forEach(function (sec) {
            const el = document.getElementById(sec.id);
            if (el) {
                const top = el.offsetTop;
                const height = el.offsetHeight;
                if (scrollPosition >= top && scrollPosition < top + height) {
                    currentSectionId = sec.id;
                }
            }
        });

        if (window.pageYOffset < 150) {
            currentSectionId = "home";
        }

        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 80) {
            currentSectionId = "contact";
        }

        sections.forEach(function (sec) {
            if (sec.link) {
                if (sec.id === currentSectionId) {
                    sec.link.classList.add("active");
                } else {
                    sec.link.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", updateActiveNavLink, { passive: true });
    updateActiveNavLink();


    /* ==========================================================================
       4. SUBTLE SCROLL REVEAL ANIMATIONS (IntersectionObserver)
       ========================================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.10,
            rootMargin: "0px 0px -30px 0px"
        });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }


    /* ==========================================================================
       5. LEAFLET STORE MAP INITIALIZATION
       ========================================================================== */

    const mapContainer = document.getElementById("kulfiMap");

    if (mapContainer && typeof L !== "undefined") {
        const locations = [
            { name: "Kulfi Corner — Thanjavur", city: "Thanjavur", lat: 10.7870, lng: 79.1378 },
            { name: "Kulfi Corner — Kumbakonam", city: "Kumbakonam", lat: 10.9602, lng: 79.3845 },
            { name: "Kulfi Corner — Coimbatore", city: "Coimbatore", lat: 11.0168, lng: 76.9558 },
            { name: "Kulfi Corner — Ooty", city: "Ooty", lat: 11.4102, lng: 76.6950 }
        ];

        const map = L.map("kulfiMap", {
            center: [10.8, 78.2],
            zoom: 7,
            scrollWheelZoom: false
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18
        }).addTo(map);

        const kulfiIcon = L.divIcon({
            className: "kulfi-map-marker",
            html: '<div class="marker-pin"><span>🍦</span></div>',
            iconSize: [40, 48],
            iconAnchor: [20, 48],
            popupAnchor: [0, -50]
        });

        locations.forEach(function (loc) {
            L.marker([loc.lat, loc.lng], { icon: kulfiIcon })
                .addTo(map)
                .bindPopup(
                    '<div class="map-popup"><strong>' + loc.name + '</strong><br>' +
                    '<span>' + loc.city + ', Tamil Nadu</span><br>' +
                    '<a href="https://maps.google.com/?q=' + loc.city + ',Tamil+Nadu" target="_blank" rel="noopener">Open in Google Maps</a></div>',
                    { maxWidth: 220 }
                );
        });

        const cards = document.querySelectorAll(".location-card");
        cards.forEach(function (card) {
            card.addEventListener("click", function () {
                const lat = parseFloat(card.dataset.lat);
                const lng = parseFloat(card.dataset.lng);
                map.setView([lat, lng], 13, { animate: true });

                const mapWrap = document.querySelector(".store-map-wrap");
                if (mapWrap && window.innerWidth <= 1000) {
                    const navbar = document.querySelector(".navbar");
                    const navHeight = navbar ? navbar.offsetHeight : 90;
                    window.scrollTo({
                        top: mapWrap.offsetTop - navHeight - 10,
                        behavior: "smooth"
                    });
                }
            });
        });
    }


    /* ==========================================================================
       6. CONTACT FORM INTERACTIVITY (Frontend-only)
       ========================================================================== */

    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");

    if (contactForm && formSuccess) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("contactName").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (name && message) {
                formSuccess.style.display = "block";
                contactForm.reset();
                setTimeout(function () {
                    formSuccess.style.display = "none";
                }, 5000);
            }
        });
    }


    /* ==========================================================================
       7. FEEDBACK STAR RATING & EXPERIENCE SUBMISSION (Frontend-only)
       ========================================================================== */

    const stars = document.querySelectorAll(".exp-star");
    let selectedRating = 0;

    stars.forEach(function (star) {
        star.addEventListener("mouseover", function () {
            const val = parseInt(star.dataset.val);
            stars.forEach(function (s, i) {
                s.classList.toggle("star-active", i < val);
            });
        });

        star.addEventListener("mouseout", function () {
            stars.forEach(function (s, i) {
                s.classList.toggle("star-active", i < selectedRating);
            });
        });

        star.addEventListener("click", function () {
            selectedRating = parseInt(star.dataset.val);
            stars.forEach(function (s, i) {
                s.classList.toggle("star-active", i < selectedRating);
            });
        });
    });

    const expSubmitBtn = document.getElementById("expSubmitBtn");
    const expSuccess = document.getElementById("expSuccess");

    if (expSubmitBtn && expSuccess) {
        expSubmitBtn.addEventListener("click", function () {
            const name = document.getElementById("expName").value.trim();
            const message = document.getElementById("expMessage").value.trim();

            if (name && message) {
                expSuccess.style.display = "block";
                document.getElementById("expName").value = "";
                document.getElementById("expMessage").value = "";
                selectedRating = 0;
                stars.forEach(function (s) { s.classList.remove("star-active"); });

                setTimeout(function () {
                    expSuccess.style.display = "none";
                }, 5000);
            }
        });
    }

});
