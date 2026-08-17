/* =========================================================
   SHEEN VINCENT TINOY
   PERFORMANCE OPTIMIZED JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();

    initTheme();

    initMobileMenu();

    initSmoothNavigation();

    initScrollEffects();

    initRevealAnimations();

    initSkillBars();

    initTypingEffect();

    initContactForm();

    initCursor();

    initBackToTop();

    initActiveNavigation();

    initYear();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("loader");

    if (!loader) return;


    const hideLoader = () => {

        window.setTimeout(() => {

            loader.classList.add("hidden");

        }, 700);

    };


    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );

    }

}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const toggle =
        document.getElementById("themeToggle");

    if (!toggle) return;


    const icon =
        toggle.querySelector("i");


    const savedTheme =
        localStorage.getItem("portfolio-theme");


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeIcon();


    toggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "portfolio-theme",
                dark ? "dark" : "light"
            );


            updateThemeIcon();

        }
    );


    function updateThemeIcon() {

        const dark =
            document.body.classList.contains(
                "dark-mode"
            );


        if (!icon) return;


        icon.className =
            dark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById("menuButton");

    const menu =
        document.getElementById("navMenu");

    if (!button || !menu) return;


    button.addEventListener(
        "click",
        () => {

            menu.classList.toggle("open");

        }
    );


    menu.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "open"
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !menu.contains(event.target) &&
                !button.contains(event.target)
            ) {

                menu.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute("href");


                if (
                    !id ||
                    id === "#"
                ) return;


                const target =
                    document.querySelector(id);


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   SCROLL EFFECTS
   IMPORTANT:
   Uses requestAnimationFrame instead of
   running expensive DOM work every scroll event.
========================================================= */

function initScrollEffects() {

    const header =
        document.getElementById("header");

    const backTop =
        document.getElementById("backTop");


    let ticking = false;


    const update =
        () => {

            const y =
                window.scrollY;


            if (header) {

                header.classList.toggle(
                    "scrolled",
                    y > 40
                );

            }


            if (backTop) {

                backTop.classList.toggle(
                    "show",
                    y > 500
                );

            }


            ticking = false;

        };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    update
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    update();

}


/* =========================================================
   REVEAL ANIMATIONS
   IntersectionObserver is much cheaper than
   checking every element during scroll.
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        elements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                root: null,

                rootMargin:
                    "0px 0px -60px 0px",

                threshold: 0.05
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   SKILL BARS
========================================================= */

function initSkillBars() {

    const progressBars =
        document.querySelectorAll(
            ".progress"
        );


    if (!progressBars.length) return;


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const bar =
                        entry.target;


                    const value =
                        bar.dataset.progress ||
                        "0";


                    const fill =
                        bar.querySelector("span");


                    if (fill) {

                        requestAnimationFrame(
                            () => {

                                fill.style.width =
                                    `${value}%`;

                            }
                        );

                    }


                    observer.unobserve(
                        bar
                    );

                });

            },
            {
                threshold: 0.25
            }
        );


    progressBars.forEach(bar => {

        observer.observe(bar);

    });

}


/* =========================================================
   TYPING EFFECT
========================================================= */

function initTypingEffect() {

    const element =
        document.getElementById(
            "typingText"
        );


    if (!element) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const words = [
        "Frontend Developer",
        "UI Enthusiast",
        "Problem Solver",
        "Creative Coder"
    ];


    if (reducedMotion) {

        element.textContent =
            words[0];

        return;

    }


    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function type() {

        const current =
            words[wordIndex];


        if (!deleting) {

            characterIndex++;

            element.textContent =
                current.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex >=
                current.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    1400
                );

                return;

            }

        } else {

            characterIndex--;

            element.textContent =
                current.substring(
                    0,
                    characterIndex
                );


            if (
                characterIndex <= 0
            ) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

            }

        }


        setTimeout(
            type,
            deleting ? 45 : 75
        );

    }


    type();

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );

    const status =
        document.getElementById(
            "formStatus"
        );


    if (!form || !status) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            if (
                !name ||
                !email ||
                !message
            ) {

                status.textContent =
                    "Please complete all required fields.";

                status.style.color =
                    "#ef4444";

                return;

            }


            status.textContent =
                "Message form validated successfully. Connect this form to a backend or email service to actually send messages.";

            status.style.color =
                "var(--primary)";


            form.reset();

        }
    );

}


/* =========================================================
   CURSOR
   Uses requestAnimationFrame.
   This prevents mousemove from causing
   excessive layout updates.
========================================================= */

function initCursor() {

    const cursor =
        document.getElementById(
            "cursorGlow"
        );


    if (!cursor) return;


    const touchDevice =
        window.matchMedia(
            "(hover: none)"
        ).matches;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        touchDevice ||
        reducedMotion
    ) {

        cursor.style.display =
            "none";

        return;

    }


    let mouseX = -300;
    let mouseY = -300;

    let currentX = -300;
    let currentY = -300;

    let animationFrame = null;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            if (!animationFrame) {

                animationFrame =
                    requestAnimationFrame(
                        animateCursor
                    );

            }

        },
        {
            passive: true
        }
    );


    function animateCursor() {

        currentX +=
            (mouseX - currentX) * .18;

        currentY +=
            (mouseY - currentY) * .18;


        cursor.style.left =
            `${currentX}px`;

        cursor.style.top =
            `${currentY}px`;


        if (
            Math.abs(mouseX - currentX) > .5 ||
            Math.abs(mouseY - currentY) > .5
        ) {

            animationFrame =
                requestAnimationFrame(
                    animateCursor
                );

        } else {

            animationFrame =
                null;

        }

    }

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    if (!button) return;


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
   IntersectionObserver instead of scroll calculations.
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !links.length
    ) return;


    const linkMap =
        new Map();


    links.forEach(link => {

        const id =
            link.getAttribute("href");


        if (id) {

            linkMap.set(
                id.substring(1),
                link
            );

        }

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    links.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const active =
                        linkMap.get(
                            entry.target.id
                        );


                    if (active) {

                        active.classList.add(
                            "active"
                        );

                    }

                });

            },
            {
                rootMargin:
                    "-30% 0px -60% 0px",

                threshold: 0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   EXTRA PERFORMANCE:
   PAUSE HEAVY ANIMATIONS WHEN TAB IS HIDDEN
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);