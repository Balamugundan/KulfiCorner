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

        // Trigger reveal animations on any cards inside target panel with subtle stagger
        const panelReveals = targetPanel.querySelectorAll('.reveal');
        panelReveals.forEach(function (el, index) {
            setTimeout(function() {
                el.classList.add('is-visible');
            }, Math.min(index * 35, 250));
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

    // Handle initial hash in URL (e.g. index.html#store from another page)
    if (window.location.hash && window.location.hash.length > 1) {
        setTimeout(function () {
            const targetId = window.location.hash.substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const navbar = document.querySelector(".navbar");
                const navHeight = navbar ? navbar.offsetHeight : 90;
                const elementPosition = targetEl.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, 150);
    }


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
       5. STORE LOCATIONS INTERACTIVITY & SEARCH
       Single Data Source: window.KULFI_LOCATIONS (43 Current + 11 Upcoming = 54)
       ========================================================================== */

    const searchInput = document.getElementById("locSearchInput");
    const searchClearBtn = document.getElementById("locSearchClear");
    const noResultsEl = document.getElementById("locNoResults");
    const currentGroupEl = document.getElementById("currentGroup");
    const upcomingGroupEl = document.getElementById("upcomingGroup");
    const currentViewAllWrap = document.getElementById("currentViewAllWrap");
    const upcomingViewAllWrap = document.getElementById("upcomingViewAllWrap");
    const viewAllCurrentBtn = document.getElementById("viewAllCurrentBtn");
    const viewAllUpcomingBtn = document.getElementById("viewAllUpcomingBtn");
    const viewAllLocBtn = document.getElementById("viewAllLocBtn");
    const allCards = document.querySelectorAll(".loc-card");

    let isCurrentExpanded = false;
    let isUpcomingExpanded = false;

    // Toggle Current Locations (Initial 12 -> 43 -> 12)
    if (viewAllCurrentBtn) {
        viewAllCurrentBtn.addEventListener("click", function () {
            isCurrentExpanded = !isCurrentExpanded;
            const currentExtras = currentGroupEl ? currentGroupEl.querySelectorAll(".loc-card.loc-extra") : [];
            currentExtras.forEach(function (card) {
                card.classList.toggle("is-hidden", !isCurrentExpanded);
            });
            viewAllCurrentBtn.textContent = isCurrentExpanded ? "SHOW LESS \u2212" : "VIEW ALL LOCATIONS +";
            if (!isCurrentExpanded && currentGroupEl) {
                const navbar = document.querySelector(".navbar");
                const navH = navbar ? navbar.offsetHeight : 80;
                window.scrollTo({ top: currentGroupEl.offsetTop - navH - 20, behavior: "smooth" });
            }
        });
    }

    // Toggle Upcoming Locations (Initial 6 -> 11 -> 6)
    if (viewAllUpcomingBtn) {
        viewAllUpcomingBtn.addEventListener("click", function () {
            isUpcomingExpanded = !isUpcomingExpanded;
            const upcomingExtras = upcomingGroupEl ? upcomingGroupEl.querySelectorAll(".loc-card.loc-extra") : [];
            upcomingExtras.forEach(function (card) {
                card.classList.toggle("is-hidden", !isUpcomingExpanded);
            });
            viewAllUpcomingBtn.textContent = isUpcomingExpanded ? "SHOW LESS \u2212" : "VIEW ALL LOCATIONS +";
            if (!isUpcomingExpanded && upcomingGroupEl) {
                const navbar = document.querySelector(".navbar");
                const navH = navbar ? navbar.offsetHeight : 80;
                window.scrollTo({ top: upcomingGroupEl.offsetTop - navH - 20, behavior: "smooth" });
            }
        });
    }

    // General View All button fallback if present
    if (viewAllLocBtn) {
        viewAllLocBtn.addEventListener("click", function () {
            const isAnyExpanded = isCurrentExpanded || isUpcomingExpanded;
            isCurrentExpanded = !isAnyExpanded;
            isUpcomingExpanded = !isAnyExpanded;
            document.querySelectorAll(".loc-card.loc-extra").forEach(function (card) {
                card.classList.toggle("is-hidden", isAnyExpanded);
            });
            viewAllLocBtn.textContent = isAnyExpanded ? "VIEW ALL LOCATIONS +" : "SHOW LESS \u2212";
            if (viewAllCurrentBtn) viewAllCurrentBtn.textContent = isAnyExpanded ? "VIEW ALL LOCATIONS +" : "SHOW LESS \u2212";
            if (viewAllUpcomingBtn) viewAllUpcomingBtn.textContent = isAnyExpanded ? "VIEW ALL LOCATIONS +" : "SHOW LESS \u2212";
        });
    }

    // Card click highlighting
    allCards.forEach(function (card) {
        card.addEventListener("click", function (e) {
            if (e.target.closest("a") || e.target.closest("button")) {
                return;
            }
            allCards.forEach(function (c) { c.classList.remove("active-card"); });
            card.classList.add("active-card");
        });
    });

    // Real-Time Search Filter
    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const q = e.target.value.trim().toLowerCase();
            if (searchClearBtn) {
                searchClearBtn.style.display = q.length > 0 ? "flex" : "none";
            }

            if (q.length > 0) {
                if (currentViewAllWrap) currentViewAllWrap.style.display = "none";
                if (upcomingViewAllWrap) upcomingViewAllWrap.style.display = "none";
                if (viewAllLocBtn && viewAllLocBtn.parentElement) viewAllLocBtn.parentElement.style.display = "none";

                let currentMatches = 0;
                let upcomingMatches = 0;

                allCards.forEach(function (card) {
                    const city = (card.dataset.city || card.querySelector(".loc-card-title")?.textContent || "").toLowerCase();
                    const match = city.indexOf(q) !== -1;
                    card.classList.toggle("is-hidden", !match);
                    if (match) {
                        if (card.dataset.status === "upcoming" || card.classList.contains("upcoming")) {
                            upcomingMatches++;
                        } else {
                            currentMatches++;
                        }
                    }
                });

                if (currentGroupEl) currentGroupEl.style.display = currentMatches > 0 ? "block" : "none";
                if (upcomingGroupEl) upcomingGroupEl.style.display = upcomingMatches > 0 ? "block" : "none";

                const totalMatches = currentMatches + upcomingMatches;
                if (noResultsEl) {
                    noResultsEl.style.display = totalMatches === 0 ? "block" : "none";
                    if (totalMatches === 0) {
                        noResultsEl.textContent = "No location found.";
                    }
                }
            } else {
                if (currentViewAllWrap) currentViewAllWrap.style.display = "block";
                if (upcomingViewAllWrap) upcomingViewAllWrap.style.display = "block";
                if (viewAllLocBtn && viewAllLocBtn.parentElement) viewAllLocBtn.parentElement.style.display = "block";
                if (currentGroupEl) currentGroupEl.style.display = "block";
                if (upcomingGroupEl) upcomingGroupEl.style.display = "block";
                if (noResultsEl) noResultsEl.style.display = "none";

                // Restore cards based on expansion state
                const currentCards = currentGroupEl ? currentGroupEl.querySelectorAll(".loc-card") : [];
                currentCards.forEach(function (card) {
                    const isExtra = card.classList.contains("loc-extra");
                    card.classList.toggle("is-hidden", isExtra && !isCurrentExpanded);
                });

                const upcomingCards = upcomingGroupEl ? upcomingGroupEl.querySelectorAll(".loc-card") : [];
                upcomingCards.forEach(function (card) {
                    const isExtra = card.classList.contains("loc-extra");
                    card.classList.toggle("is-hidden", isExtra && !isUpcomingExpanded);
                });
            }
        });

        if (searchClearBtn) {
            searchClearBtn.addEventListener("click", function () {
                searchInput.value = "";
                searchInput.dispatchEvent(new Event("input"));
                searchInput.focus();
            });
        }
    }
    /* ==========================================================================
       6. SEND ENQUIRY FORM — WEB3FORMS INTEGRATION
       Email: kulficorner.official@gmail.com
       ========================================================================== */

    const WEB3FORMS_ACCESS_KEY = "5ca510ad-cd6a-4498-ba1a-3d9605162957";

    const contactForm = document.getElementById("contactForm");
    const formSuccess = document.getElementById("formSuccess");
    const formError = document.getElementById("formError");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("contactName");
            const phoneInput = document.getElementById("contactPhone");
            const emailInput = document.getElementById("contactEmail");
            const messageInput = document.getElementById("contactMessage");
            const submitBtn = contactForm.querySelector(".form-submit-btn") || contactForm.querySelector("button[type='submit']");

            const name = nameInput ? nameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !message) {
                if (formError) {
                    formError.textContent = "Please fill in all required fields.";
                    formError.style.display = "block";
                }
                if (formSuccess) formSuccess.style.display = "none";
                return;
            }

            // Hide any previous status messages
            if (formSuccess) formSuccess.style.display = "none";
            if (formError) formError.style.display = "none";

            // Button loading state
            let originalBtnHtml = "";
            if (submitBtn) {
                originalBtnHtml = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'SENDING... <span style="display:inline-block;animation:spin 1s infinite linear;">⌛</span>';
            }

            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: "New Enquiry - Kulfi Corner",
                from_name: "Kulfi Corner Website",
                name: name,
                phone: phone || "Not provided",
                email: email || "Not provided",
                message: message
            };

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.status === 200 || data.success) {
                    if (formSuccess) {
                        formSuccess.textContent = "✓ Thank you! Your enquiry has been sent successfully.";
                        formSuccess.style.display = "block";
                    }
                    if (formError) formError.style.display = "none";
                    contactForm.reset();

                    setTimeout(function () {
                        if (formSuccess) formSuccess.style.display = "none";
                    }, 8000);
                } else {
                    throw new Error(data.message || "Form submission failed");
                }
            } catch (err) {
                console.error("Web3Forms Enquiry Error:", err);
                if (formError) {
                    formError.textContent = "Something went wrong. Please try again.";
                    formError.style.display = "block";
                }
                if (formSuccess) formSuccess.style.display = "none";
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    }


    /* ==========================================================================
       7. SHARE YOUR EXPERIENCE FORM — WEB3FORMS INTEGRATION
       Email: kulficorner.official@gmail.com
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
            const expErrorEl = document.getElementById("expError");
            if (expErrorEl && expErrorEl.textContent.includes("rating")) {
                expErrorEl.style.display = "none";
            }
        });
    });

    const expSubmitBtn = document.getElementById("expSubmitBtn");
    const expSuccess = document.getElementById("expSuccess");
    const expError = document.getElementById("expError");

    if (expSubmitBtn) {
        expSubmitBtn.addEventListener("click", async function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("expName");
            const messageInput = document.getElementById("expMessage");

            const name = nameInput ? nameInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            // Validate Star Rating first
            if (selectedRating === 0) {
                if (expError) {
                    expError.textContent = "Please select a rating.";
                    expError.style.display = "block";
                }
                if (expSuccess) expSuccess.style.display = "none";
                return;
            }

            if (!name || !message) {
                if (expError) {
                    expError.textContent = "Please enter your name and review.";
                    expError.style.display = "block";
                }
                if (expSuccess) expSuccess.style.display = "none";
                return;
            }

            // Hide previous messages
            if (expSuccess) expSuccess.style.display = "none";
            if (expError) expError.style.display = "none";

            // Loading state
            let originalBtnHtml = expSubmitBtn.innerHTML;
            expSubmitBtn.disabled = true;
            expSubmitBtn.innerHTML = 'SUBMITTING... <span style="display:inline-block;animation:spin 1s infinite linear;">⌛</span>';

            const starSymbols = "★".repeat(selectedRating) + "☆".repeat(5 - selectedRating);
            const ratingText = `${selectedRating} (${starSymbols})`;

            const payload = {
                access_key: WEB3FORMS_ACCESS_KEY,
                subject: "New Customer Review - Kulfi Corner",
                from_name: "Kulfi Corner Website",
                name: name,
                rating: ratingText,
                review: message,
                message: `KULFI CORNER — CUSTOMER REVIEW\n\nName: ${name}\nRating: ${ratingText}\nReview: ${message}`
            };

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.status === 200 || data.success) {
                    if (expSuccess) {
                        expSuccess.textContent = "✓ Thank you for sharing your experience!";
                        expSuccess.style.display = "block";
                    }
                    if (expError) expError.style.display = "none";

                    // Reset form
                    if (nameInput) nameInput.value = "";
                    if (messageInput) messageInput.value = "";
                    selectedRating = 0;
                    stars.forEach(function (s) { s.classList.remove("star-active"); });

                    setTimeout(function () {
                        if (expSuccess) expSuccess.style.display = "none";
                    }, 8000);
                } else {
                    throw new Error(data.message || "Review submission failed");
                }
            } catch (err) {
                console.error("Web3Forms Review Error:", err);
                if (expError) {
                    expError.textContent = "Something went wrong. Please try again.";
                    expError.style.display = "block";
                }
                if (expSuccess) expSuccess.style.display = "none";
            } finally {
                expSubmitBtn.disabled = false;
                expSubmitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

});

/* ================================================================
   KULFI CORNER — UI POLISH ENHANCEMENTS
   Added for premium animation experience
   ================================================================ */
(function() {
    'use strict';

    // 1. Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);

    // 2. Navbar Scroll State & Scroll Progress Bar Update
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const winScroll = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / docHeight) * 100;
                progressBar.style.width = scrolled + '%';

                if (winScroll > 50) {
                    document.body.classList.add('scrolled');
                } else {
                    document.body.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    window.dispatchEvent(new Event('scroll'));

    // 3. Enhanced Page Load Sequence
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    });
    // Fallback if DOMContentLoaded already fired
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    }

    // 4. Smooth Form Success/Error Message Display
    const msgObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'style') {
                const el = mutation.target;
                if (el.style.display === 'block') {
                    el.classList.add('msg-animated');
                } else if (el.style.display === 'none') {
                    el.classList.remove('msg-animated');
                }
            }
        });
    });

    const msgElements = [
        document.getElementById('formSuccess'),
        document.getElementById('formError'),
        document.getElementById('expSuccess'),
        document.getElementById('expError')
    ];

    msgElements.forEach(el => {
        if (el) {
            msgObserver.observe(el, { attributes: true, attributeFilter: ['style'] });
        }
    });

    // 5. Star Rating Click Enhancement
    const stars = document.querySelectorAll('.exp-star');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            this.classList.add('star-clicked');
            setTimeout(() => {
                this.classList.remove('star-clicked');
            }, 300);
        });
    });

    // 6. Smooth Location Card Expand/Collapse
    const viewAllBtns = document.querySelectorAll('.view-all-loc-btn, .view-more-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                const container = this.closest('.store-group-wrap') || this.closest('.store-location-group') || this.closest('.location-section') || document;
                if (container) {
                    const visibleCards = container.querySelectorAll('.loc-card:not(.is-hidden), .location-card:not(.is-hidden)');
                    let delay = 0;
                    visibleCards.forEach(card => {
                        if (!card.classList.contains('loc-revealed')) {
                            setTimeout(() => {
                                card.classList.add('loc-revealed');
                            }, delay);
                            delay += 60;
                        }
                    });
                }
            }, 10);
        });
    });

    // 7. Footer Reveal
    const footer = document.querySelector('.main-footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('is-visible');
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        footerObserver.observe(footer);
    }

    // 8. Process Steps Stagger
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        const processObserver = new IntersectionObserver((entries) => {
            let delay = 0;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transitionDelay = `${delay}ms`;
                        entry.target.classList.add('is-revealed'); 
                    }, 10);
                    delay += 150;
                    processObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        processSteps.forEach(step => processObserver.observe(step));
    }

})();
