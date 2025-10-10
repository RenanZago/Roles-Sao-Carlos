document.addEventListener("DOMContentLoaded", () => {
  const eventos = [
    {
      id: 1,
      title: "Show de Calouros no CAASO",
      date: "2025-11-12T19:00:00.000Z",
      durationHours: 4,
      organizer: "CAASO",
      category: "Cultural",
      description:
        "Venha ver os novos talentos da universidade se apresentando no palco do CAASO. Muita música, dança e diversão garantida para todos.",
      imageUrl:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1074&q=80",
      location: {
        name: "Centro Acadêmico Armando de Salles Oliveira",
        latitude: -22.004,
        longitude: -47.894,
      },
      price: 0,
      ticketPlatform: null,
      ageRating: "Livre",
    },
    {
      id: 2,
      title: "Festa da Bateria",
      date: "2025-10-28T22:00:00.000Z",
      durationHours: 6,
      organizer: "Bateria UFSCar",
      category: "Festa",
      description:
        "A maior festa universitária do ano! Prepare-se para uma noite inesquecível com a melhor batucada da região. Shows ao vivo, DJs e muita integração.",
      imageUrl:
        "https://media.discordapp.net/attachments/991113790450049074/1425942691622949076/Gemini_Generated_Image_d3y4oqd3y4oqd3y4.png?ex=68e96c1e&is=68e81a9e&hm=f7e82bb51bc25e2038a85d00039e36a39231e5b8d61d7f017d486f20ede36419&=&format=webp&quality=lossless&width=1364&height=713",
      location: {
        name: "Em frente ao ginásio",
        latitude: -22.0028,
        longitude: -47.8931,
      },
      price: 25.0,
      ticketPlatform: "Sympla",
      ageRating: "Maiores de 18 anos",
    },
  ];
  const eventData = eventos[Math.floor(Math.random() * eventos.length)];
  const startDate = new Date(eventData.date);
  const endDate = new Date(
    startDate.getTime() + eventData.durationHours * 60 * 60 * 1000
  );
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Sao_Paulo",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  };
  document.getElementById(
    "event-hero-image"
  ).style.backgroundImage = `url('${eventData.imageUrl}')`;
  document.getElementById("event-category").textContent = eventData.category;
  document.getElementById("event-title").textContent = eventData.title;
  document.getElementById("event-date").textContent = new Intl.DateTimeFormat(
    "pt-BR",
    dateOptions
  ).format(startDate);
  document.getElementById(
    "event-time"
  ).textContent = `${startDate.toLocaleTimeString(
    "pt-BR",
    timeOptions
  )} – ${endDate.toLocaleTimeString("pt-BR", timeOptions)}`;
  document.getElementById("event-location").textContent =
    eventData.location.name;
  document.getElementById("event-description").textContent =
    eventData.description;
  document.getElementById("event-organizer").textContent = eventData.organizer;
  document.getElementById("event-age-rating").textContent = eventData.ageRating;
  document.getElementById(
    "event-map"
  ).src = `https://maps.google.com/maps?q=-22.0028,-47.8931&hl=pt-BR&z=15&output=embed`;
  const priceInfo = document.getElementById("price-info");
  const ticketInfo = document.getElementById("ticket-info");
  const buyTicketButton = document.getElementById("buy-ticket-button");
  if (eventData.price === 0) {
    priceInfo.innerHTML = "<strong>Preço:</strong> Gratuito";
    ticketInfo.style.display = "none";
    buyTicketButton.style.display = "none";
  } else {
    document.getElementById(
      "event-price"
    ).textContent = `A partir de R$ ${eventData.price
      .toFixed(2)
      .replace(".", ",")}`;
    document.getElementById(
      "event-tickets"
    ).textContent = `Online via ${eventData.ticketPlatform}`;
  }
});
