document.addEventListener("DOMContentLoaded", () => {
    let cards = [...document.querySelectorAll(".home-market-card")];
    cards.shift();
  
    const tl = new gsap.timeline({
      defaults: {
        duration: 10,
        ease: "power2.out",
        stagger: {
          each: 5
        }
      },
      scrollTrigger: {
        trigger: ".home-market_stacking-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });
  
    tl.from(cards, { opacity: 0, y: "100%" }).to(
      ".home-market-card",
      { scale: 0.95, delay: 5 },
      "<"
    );
  });
  