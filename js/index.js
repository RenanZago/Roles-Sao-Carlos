document.addEventListener("DOMContentLoaded", () => {
  new TypingEffect("typing-text", "Descubra os Melhores Rolês em São Carlos");
  const filterModal = new ModalManager("filter-modal");
  setupModalCategoryButtons();
  setupApplyFiltersButton();
});

function setupModalCategoryButtons() {
  const modalCategoryButtons = document.querySelectorAll(".category-buttons a");

  modalCategoryButtons.forEach((button) => {
    button.style.setProperty("--active-color", button.dataset.color);
    button.addEventListener("click", (e) => {
      e.preventDefault();
      modalCategoryButtons.forEach((btn) => btn.classList.remove("active"));
      e.currentTarget.classList.add("active");
      setModalButtonColors();
    });
  });

  setModalButtonColors();
}

function setModalButtonColors() {
  const modalCategoryButtons = document.querySelectorAll(".category-buttons a");

  modalCategoryButtons.forEach((button) => {
    if (button.classList.contains("active")) {
      button.style.backgroundColor = button.dataset.color;
      button.style.borderColor = button.dataset.color;
    } else {
      button.style.backgroundColor = "";
      button.style.borderColor = "";
    }
  });
}

function setupApplyFiltersButton() {
  const applyFiltersBtn = document.querySelector(".apply-filters-button");

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      console.log("Aplicando filtros...");
      document.getElementById("filter-modal").classList.remove("visible");
    });
  }
}
