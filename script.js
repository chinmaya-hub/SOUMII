/* =========================================================
   EREMIKA FOREVER
   Main Website JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      navLinks.classList.toggle("open");

      menuToggle.classList.toggle("active");

    });


    // Close menu after clicking a link

    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

      link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.classList.remove("active");

      });

    });

  }


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".section-label, .intro-grid, .stat, .latest-card, .quote-section, .explore-card, .final-content"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {

    element.classList.add("scroll-reveal");

    revealObserver.observe(element);

  });


  /* =======================================================
     ANIMATED COUNTERS
     ======================================================= */

  function animateCounter(element, target, duration = 1500) {

    if (!element) return;

    let start = 0;

    const startTime = performance.now();


    function update(currentTime) {

      const elapsed = currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);


      // Smooth ease-out

      const eased =
        1 - Math.pow(1 - progress, 3);


      const value =
        Math.floor(start + (target - start) * eased);


      element.textContent =
        String(value).padStart(2, "0");


      if (progress < 1) {

        requestAnimationFrame(update);

      } else {

        element.textContent =
          String(target).padStart(2, "0");

      }

    }


    requestAnimationFrame(update);

  }


  /* =======================================================
     COUNTER OBSERVER
     ======================================================= */

  const statsSection =
    document.querySelector(".stats");


  let countersStarted = false;


  if (statsSection) {

    const statsObserver =
      new IntersectionObserver(
        entries => {

          if (
            entries[0].isIntersecting &&
            !countersStarted
          ) {

            countersStarted = true;


            /*
             * Temporary values.
             *
             * Later these will automatically come
             * from your diary/game data.
             */

            animateCounter(
              document.getElementById("memoryCount"),
              12
            );


            animateCounter(
              document.getElementById("gameCount"),
              7
            );


            animateCounter(
              document.getElementById("dayCount"),
              31
            );

          }

        },
        {
          threshold: 0.3
        }
      );


    statsObserver.observe(statsSection);

  }


  /* =======================================================
     PARALLAX ORB
     ======================================================= */

  const orb =
    document.querySelector(".hero-orb");


  if (orb && window.innerWidth > 900) {

    window.addEventListener(
      "mousemove",
      event => {

        const x =
          (event.clientX / window.innerWidth - 0.5);

        const y =
          (event.clientY / window.innerHeight - 0.5);


        orb.style.transform =
          `
          translate(
            ${x * 18}px,
            calc(-45% + ${y * 18}px)
          )
          `;

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     MOUSE GLOW
     ======================================================= */

  const glow =
    document.createElement("div");

  glow.className =
    "cursor-glow";

  document.body.appendChild(glow);


  if (window.innerWidth > 900) {

    window.addEventListener(
      "mousemove",
      event => {

        glow.style.left =
          `${event.clientX}px`;

        glow.style.top =
          `${event.clientY}px`;

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     LINK HOVER EFFECT
     ======================================================= */

  const interactiveElements =
    document.querySelectorAll(
      "a, button, .explore-card"
    );


  interactiveElements.forEach(element => {

    element.addEventListener(
      "mouseenter",
      () => {

        document.body.classList.add(
          "hovering"
        );

      }
    );


    element.addEventListener(
      "mouseleave",
      () => {

        document.body.classList.remove(
          "hovering"
        );

      }
    );

  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const year =
    document.querySelector(
      ".footer-bottom span"
    );


  if (year) {

    year.textContent =
      `© ${new Date().getFullYear()}`;

  }


  /* =======================================================
     PAGE LOAD
     ======================================================= */

  document.body.classList.add(
    "page-loaded"
  );


  /* =======================================================
     PAGE TRANSITIONS
     ======================================================= */

  const pageLinks =
    document.querySelectorAll(
      "a[href]"
    );


  pageLinks.forEach(link => {

    const href =
      link.getAttribute("href");


    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:")
    ) {
      return;
    }


    link.addEventListener(
      "click",
      event => {

        event.preventDefault();


        document.body.classList.add(
          "page-exit"
        );


        setTimeout(() => {

          window.location.href =
            href;

        }, 350);

      }
    );

  });


});
