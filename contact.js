document.addEventListener("DOMContentLoaded", () => {
    const inputs = [...document.querySelectorAll(".form-input")];
  
    for (const input of inputs) {
      input.oninput = () => {
        if (input.value) {
          input.classList.add("is-active");
        } else {
          input.classList.remove("is-active");
        }
      };
    }
  });
  