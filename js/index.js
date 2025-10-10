// --- FUNCIONALIDADES ESPECÍFICAS DA PÁGINA INICIAL ---

document.addEventListener("DOMContentLoaded", () => {
  // Efeito de digitação no título
  new TypingEffect("typing-text", "Descubra os Melhores Rolês em São Carlos");

  // Gerenciamento do modal de filtros
  const filterModal = new ModalManager("filter-modal");
  
  // Configurar botões de categoria no modal
  setupModalCategoryButtons();
  
  // Configurar botão de aplicar filtros
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
      // Aqui você pode adicionar lógica para aplicar os filtros
      console.log("Aplicando filtros...");
      // Por enquanto, apenas fecha o modal
      document.getElementById("filter-modal").classList.remove("visible");
    });
  }
}

