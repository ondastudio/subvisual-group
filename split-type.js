document.addEventListener("DOMContentLoaded", () => {
    //split type anim
    const text = new SplitType(".split-type", {
      types: "lines, words",
      lineClass: "line-wrapper",
      wordClass: "line-item"
    });
  
    const lines = [...document.querySelectorAll(".line-wrapper")];
  
    for (const line of lines) {
      const words = line.querySelectorAll(".line-item");
  
      gsap.set(words, { opacity: 0, y: "50%" });
  
      let st = ScrollTrigger.create({
        trigger: line,
        start: "top bottom-=20vh",
        onEnter: () => {
          gsap.to(words, {
            opacity: 1,
            y: "0%",
            duration: 0.8,
            ease: "power2.out",
            stagger: { each: 0.05 }
          });
  
          st.kill();
        }
      });
    }
  });
  