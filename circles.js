document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth > 991) {
      const circles = [...document.querySelectorAll(".info-circle")];
  
      for (const circle of circles) {
        circle.onmouseenter = () => {
          showActive(circle);
        };
  
        circle.onmouseleave = () => {
          resetCircles();
        };
      }
  
      //make the highlited circle active
      function showActive(element) {
        circles.forEach((circle) => {
          circle.classList.add("shrink");
          circle.classList.remove("grow");
        });
  
        element.classList.remove("shrink");
        element.classList.add("grow");
      }
  
      function resetCircles() {
        circles.forEach((circle) => {
          circle.classList.remove("shrink");
          circle.classList.remove("grow");
        });
      }
    }
  });
  