document.addEventListener("DOMContentLoaded", function () {
    const customSelect = document.querySelector(".custom-select");
    const customSelectTrigger = customSelect.querySelector(".custom-select-trigger");
    const customOptions = customSelect.querySelectorAll(".custom-option");
    const hiddenInput = document.getElementById("selected-option");
    const customButton = document.querySelector(".btn");
    const c = ["∧"]

    customSelectTrigger.addEventListener("click", function () {
      customSelect.classList.toggle("open");
      c.push(customButton.textContent)
      customButton.textContent = c[0];
      c.shift();
    });

    customOptions.forEach(option => {
      option.addEventListener("click", function () {
        customSelectTrigger.childNodes[1].textContent = this.textContent;
        hiddenInput.value = this.getAttribute("data-value");
        customSelect.classList.remove("open");
        c.push(customButton.textContent)
        customButton.textContent = c[0];
        c.shift();
      });
    });

    document.addEventListener("click", function (event) {
      if (!customSelect.contains(event.target)) {
        customSelect.classList.remove("open");
      }
    });
  });