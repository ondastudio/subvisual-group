document.addEventListener("DOMContentLoaded", () => {
    //hide nav on scroll
    const nav = document.querySelector(".nav");
    let scrollPos = window.scrollY;
  
    window.onscroll = () => {
      if (scrollPos < window.scrollY && window.scrollY > 800) {
        scrollPos = window.scrollY;
        gsap.to(nav, { opacity: 0, y: "-100%" });
      } else {
        scrollPos = window.scrollY;
        gsap.to(nav, { opacity: 1, y: "0%" });
      }
    };
  
    //animate mobile nav
    if (window.innerWidth < 768) {
      function setAnim() {
        gsap.set(".nav-line.is-1", { y: "-0.25rem" });
        gsap.set(".nav-line.is-2", { y: "0.25rem" });
      }
  
      setAnim();
  
      const openNav = new gsap.timeline({
        defaults: {
          duration: 0.5,
          ease: "power4.out"
        }
      });
      openNav.paused(true);
  
      openNav
        .to(".nav-line.is-1", { y: "0rem" })
        .to(".nav-line.is-2", { y: "0rem" }, "<")
        .to(".nav-line.is-1", { rotate: "-45deg", delay: 0.25 }, "<")
        .to(".nav-line.is-2", { rotate: "45deg" }, "<")
        .to(
          ".mb-nav-wrapper",
          {
            height: "100dvh",
            duration: 0.4,
            ease: "power3.inOut"
          },
          "<"
        )
        .from(
          [".mb-nav-link", ".mb-footer-text", ".mb-nav-row"],
          { opacity: 0, y: "-2rem", stagger: { amount: 0.125 } },
          ">"
        )
        .from(
          ".mab-nav-underline",
          { opacity: 0, width: 0, ease: "power2.in", delay: 0.3 },
          "<"
        );
  
      const button = document.querySelector(".nav-button");
  
      button.addEventListener("click", () => {
        if (button.classList.contains("is-open")) {
          openNav.timeScale(0.8);
          openNav.reverse();
          button.classList.remove("is-open");
        } else {
          openNav.timeScale(1);
          openNav.restart();
          button.classList.add("is-open");
        }
      });
    }
  });
  