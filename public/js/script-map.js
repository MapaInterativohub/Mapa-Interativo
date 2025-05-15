// Criar o mapa centralizado em São Paulo
var map = L.map("map", {
  center: [-20.2949, -40.3475],
  zoom: 15,
  zoomControl: false, // Remove o controle de zoom padrão
});

// Adicionar camada do OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Adicionar controle de zoom
L.control
  .zoom({
    position: "bottomright",
  })
  .addTo(map);

// Ícone do usuário (opcional)
const userIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/4049/4049768.png", // exemplo
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Adiciona marcador da localização
let userMarker;

// Observar localização em tempo real
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Atualiza a posição do mapa
      map.setView([lat, lon], 16);

      // Atualiza ou cria marcador
      if (userMarker) {
        userMarker.setLatLng([lat, lon]);
      } else {
        userMarker = L.marker([lat, lon], { icon: userIcon })
          .addTo(map)
          .bindPopup("Você está aqui")
      }
    },
    (error) => {
      console.error("Erro ao obter localização:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    }
  );
} else {
  alert("Geolocalização não suportada no seu navegador.");
}