// --- FUNCIONALIDADES ESPECÍFICAS DA PÁGINA DO MAPA ---

document.addEventListener("DOMContentLoaded", function () {
  initMap();
});

function initMap() {
  // Coordenadas do centro de São Carlos
  const saoCarlosCenter = [-22.0177, -47.8913];

  // Inicializa o mapa
  const map = L.map("map").setView(saoCarlosCenter, 14);

  // Adiciona a camada de mapa (tiles)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Criação dos ícones coloridos
  const icons = createMapIcons();

  let userLocation = null;

  // Botão customizado para voltar à localização do usuário
  const locateControl = createLocateControl(map, userLocation);
  map.addControl(locateControl);

  // Lógica de geolocalização
  setupGeolocation(map, userLocation, locateControl);

  // Adiciona marcadores dos eventos
  addEventMarkers(map, icons);
}

function createMapIcons() {
  return {
    amarelo: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    azul: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    verde: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    rosa: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    primaria: new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
  };
}

function createLocateControl(map, userLocation) {
  const LocateControl = L.Control.extend({
    options: {
      position: "topleft",
    },
    onAdd: function (map) {
      const container = L.DomUtil.create(
        "div",
        "leaflet-bar leaflet-control leaflet-control-locate"
      );
      const link = L.DomUtil.create("a", "", container);
      link.href = "#";
      link.title = "Voltar para minha localização";

      container.style.display = "none";

      L.DomEvent.on(link, "click", function (ev) {
        L.DomEvent.stopPropagation(ev);
        L.DomEvent.preventDefault(ev);
        if (userLocation) {
          map.flyTo(userLocation, 15);
        }
      });
      return container;
    },
  });

  return new LocateControl();
}

function setupGeolocation(map, userLocation, locateControl) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        userLocation = [lat, lon];

        // Mostra o botão de localização
        document.querySelector(".leaflet-control-locate").style.display = "block";

        // Adiciona um círculo azul no mapa para indicar a posição do usuário
        L.circleMarker(userLocation, {
          radius: 8,
          fillColor: "#3388ff",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.9,
        })
          .addTo(map)
          .bindPopup("<b>Você está aqui!</b>")
          .openPopup();

        // Centraliza o mapa na localização do usuário
        map.setView(userLocation, 15);
      },
      () => {
        console.log("Não foi possível obter a sua localização.");
      }
    );
  }
}

function addEventMarkers(map, icons) {
  const eventos = [
    {
      id: 1,
      coords: [-21.9849, -47.8819],
      title: "Show de Calouros",
      description: "Categoria: Cultural",
      category: "Cultural",
      colorName: "rosa",
      cssColorVar: "var(--cor-rosa)",
    },
    {
      id: 2,
      coords: [-22.0028, -47.8931],
      title: "Festa da Bateria",
      description: "Categoria: Festa",
      category: "Festa",
      colorName: "amarelo",
      cssColorVar: "var(--cor-amarelo)",
    },
    {
      id: 3,
      coords: [-21.9855, -47.8823],
      title: "Churrasco de Fim de Semestre",
      description: "Categoria: Festa",
      category: "Festa",
      colorName: "amarelo",
      cssColorVar: "var(--cor-amarelo)",
    },
    {
      id: 4,
      coords: [-21.9866, -47.8805],
      title: "Intro ao React Native",
      description: "Categoria: Acadêmico",
      category: "Acadêmico",
      colorName: "azul",
      cssColorVar: "var(--cor-azul)",
    },
    {
      id: 5,
      coords: [-21.9902, -47.8809],
      title: "Campeonato de Futsal",
      description: "Categoria: Esporte",
      category: "Esporte",
      colorName: "verde",
      cssColorVar: "var(--cor-verde)",
    },
    {
      id: 6,
      coords: [-22.004, -47.894],
      title: "Mostra de Cinema Universitária",
      description: "Categoria: Cultural",
      category: "Cultural",
      colorName: "rosa",
      cssColorVar: "var(--cor-rosa)",
    },
    {
      id: 7,
      coords: [-21.9849, -47.8819],
      title: "Feira de Ciências e Tecnologia",
      description: "Categoria: Acadêmico",
      category: "Acadêmico",
      colorName: "azul",
      cssColorVar: "var(--cor-azul)",
    },
    {
      id: 8,
      coords: [-21.9818, -47.8808],
      title: "Corrida Universitária 5K",
      description: "Categoria: Esporte",
      category: "Esporte",
      colorName: "verde",
      cssColorVar: "var(--cor-verde)",
    },
  ];

  eventos.forEach((evento) => {
    const marker = L.marker(evento.coords, {
      icon: icons[evento.colorName],
    }).addTo(map);

    const popupContent = `<strong style="color: ${evento.cssColorVar}">${evento.title}</strong><br>${evento.description}<br><a href="detalhes.html?id=${evento.id}">Ver detalhes</a>`;

    marker.bindPopup(popupContent);
  });
}

