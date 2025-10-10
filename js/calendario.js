// --- FUNCIONALIDADES ESPECÍFICAS DA PÁGINA DO CALENDÁRIO ---

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar o calendário
  initCalendar();
});

function initCalendar() {
  const calendarEl = document.getElementById("calendar");
  const popover = document.getElementById("event-popover");

  if (!calendarEl) return;

  const calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "pt-br",
    height: "auto",
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek",
    },
    buttonText: {
      today: "Hoje",
      month: "Mês",
      week: "Semana",
      list: "Lista",
    },
    dayHeaderFormat: { weekday: "narrow" },
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    events: [
      {
        id: 1,
        title: "Show de Calouros",
        start: "2025-11-12T19:00:00",
        color: "var(--cor-rosa)",
        url: "detalhes.html?id=1",
      },
      {
        id: 2,
        title: "Festa da Bateria",
        start: "2025-10-28T22:00:00",
        color: "var(--cor-amarelo)",
        url: "detalhes.html?id=2",
      },
      {
        id: 3,
        title: "Churrasco de Fim de Semestre",
        start: "2025-10-25T16:00:00",
        color: "var(--cor-amarelo)",
        url: "detalhes.html?id=3",
      },
      {
        id: 4,
        title: "Intro ao React Native",
        start: "2025-10-28T14:00:00",
        color: "var(--cor-azul)",
        url: "detalhes.html?id=4",
      },
      {
        id: 5,
        title: "Campeonato de Futsal",
        start: "2025-10-29T18:00:00",
        color: "var(--cor-verde)",
        url: "detalhes.html?id=5",
      },
      {
        id: 6,
        title: "Mostra de Cinema Universitária",
        start: "2025-11-05T19:30:00",
        color: "var(--cor-rosa)",
        url: "detalhes.html?id=6",
      },
      {
        id: 7,
        title: "Feira de Ciências e Tecnologia",
        start: "2025-11-10T09:00:00",
        color: "var(--cor-azul)",
        url: "detalhes.html?id=7",
      },
      {
        id: 8,
        title: "Corrida Universitária 5K",
        start: "2025-11-15T07:00:00",
        color: "var(--cor-verde)",
        url: "detalhes.html?id=8",
      },
    ],
    eventClick: function(info) {
      if (info.event.url) {
        info.jsEvent.preventDefault();
        window.location.href = info.event.url;
      }
    },
    eventMouseEnter: function (info) {
      showEventPopover(info, popover);
    },
    eventMouseLeave: function (info) {
      hideEventPopover(popover);
    },
  });

  calendar.render();
}

function showEventPopover(info, popover) {
  if (!popover) return;

  const popoverTitle = document.getElementById("popover-title");
  const popoverTime = document.getElementById("popover-time");
  
  if (popoverTitle) {
    popoverTitle.textContent = info.event.title;
    popoverTitle.style.color = info.event.backgroundColor || "var(--cor-primaria)";
  }
  
  if (popoverTime) {
    popoverTime.textContent = info.event.allDay
      ? "O dia todo"
      : info.event.start.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
  }

  popover.classList.add("visible");
  
  const eventRect = info.el.getBoundingClientRect();
  let top = eventRect.top + window.scrollY - popover.offsetHeight - 10;
  
  if (top < window.scrollY) {
    top = eventRect.bottom + window.scrollY + 10;
  }

  let left = eventRect.left + window.scrollX + eventRect.width / 2 - popover.offsetWidth / 2;
  
  if (left < 10) left = 10;
  if (left + popover.offsetWidth > window.innerWidth - 10) {
    left = window.innerWidth - popover.offsetWidth - 10;
  }

  popover.style.top = `${top}px`;
  popover.style.left = `${left}px`;
}

function hideEventPopover(popover) {
  if (popover) {
    popover.classList.remove("visible");
  }
}

