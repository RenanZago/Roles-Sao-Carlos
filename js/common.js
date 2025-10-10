const AuthConfig = {
  isLoggedIn: false,
};

class HeaderManager {
  constructor() {
    this.header = document.getElementById("main-header");
    this.hamburger = document.getElementById("hamburger-menu");
    this.navMenu = document.getElementById("main-nav");
    this.mobileAuthContainer = document.getElementById("nav-auth-links-mobile");
    this.desktopAuthContainer = document.getElementById("desktop-auth-section");

    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupHamburgerMenu();
    this.setupAuthLinks();
  }

  setupScrollEffect() {
    if (this.header) {
      window.addEventListener("scroll", () => {
        this.header.classList.toggle("scrolled", window.scrollY > 20);
      });
    }
  }

  setupHamburgerMenu() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => {
        this.hamburger.classList.toggle("active");
        this.navMenu.classList.toggle("active");
      });
    }
  }

  setupAuthLinks() {
    if (AuthConfig.isLoggedIn) {
      this.setLoggedInLinks();
    } else {
      this.setLoggedOutLinks();
    }
  }

  setLoggedInLinks() {
    const addEventLink = `<a href="adicionar-evento.html">Adicionar</a>`;

    if (this.mobileAuthContainer) {
      this.mobileAuthContainer.innerHTML = `<li class="nav-action-button">${addEventLink}</li>`;
    }

    if (this.desktopAuthContainer) {
      this.desktopAuthContainer.innerHTML = `<li class="nav-action-button">${addEventLink}</li>`;
    }
  }

  setLoggedOutLinks() {
    const mobileLinks = `
      <a href="login.html">Login</a>
      <a href="cadastro.html" class="nav-register-link">Cadastro</a>
    `;

    const desktopLinks = `
      <div class="auth-dropdown">
        <button class="drop-button">Entrar</button>
        <div class="auth-dropdown-content">
          <a href="login.html">Login</a>
          <a href="cadastro.html">Cadastro</a>
        </div>
      </div>
    `;

    if (this.mobileAuthContainer) {
      this.mobileAuthContainer.innerHTML = mobileLinks;
    }

    if (this.desktopAuthContainer) {
      this.desktopAuthContainer.innerHTML = desktopLinks;
    }
  }
}

class FilterManager {
  constructor() {
    this.filterLinks = document.querySelectorAll(".filter-list a");
    this.activeBg = document.querySelector(".active-filter-bg");
    this.init();
  }

  init() {
    if (this.filterLinks.length > 0 && this.activeBg) {
      this.setupFilterLinks();
      this.moveBackground(document.querySelector(".filter-list a.active"));
    }
  }

  setupFilterLinks() {
    this.filterLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.moveBackground(link);
      });
    });
  }

  moveBackground(link) {
    if (!link) return;

    this.filterLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    this.activeBg.style.width = `${link.offsetWidth}px`;
    this.activeBg.style.left = `${link.offsetLeft}px`;
    this.activeBg.style.backgroundColor = link.dataset.color;
  }
}

class ModalManager {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.openButton = document.getElementById(`open-${modalId}`);
    this.closeButton = document.getElementById(`close-${modalId}`);

    if (this.modal) {
      this.init();
    }
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if (this.openButton) {
      this.openButton.addEventListener("click", () => this.openModal());
    }

    if (this.closeButton) {
      this.closeButton.addEventListener("click", () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }
  }

  openModal() {
    this.modal.classList.add("visible");
  }

  closeModal() {
    this.modal.classList.remove("visible");
  }
}

class TypingEffect {
  constructor(elementId, text, speed = 70) {
    this.element = document.getElementById(elementId);
    this.text = text;
    this.speed = speed;

    if (this.element) {
      this.init();
    }
  }

  init() {
    let charIndex = 0;
    const type = () => {
      if (charIndex < this.text.length) {
        this.element.textContent += this.text.charAt(charIndex++);
        setTimeout(type, this.speed);
      } else {
        const cursor =
          this.element.parentElement.querySelector(".typing-cursor");
        if (cursor) {
          cursor.style.display = "none";
        }
      }
    };
    type();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new HeaderManager();
  new FilterManager();
});
