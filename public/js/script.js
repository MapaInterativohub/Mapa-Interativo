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
          .bindPopup("Você está aqui");
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

// Função para criar conteúdo do popup
function criarPopupContent(dado) {
  return `
        <div class="popup-content">
        <img src="/img/ExemploDePopup.jpeg" alt="img_local" class="img_info" style="width: 300px">
        <div class="text-info">
          <h3 class="cssFont_2">${dado.nome}</h3>
          <p class="cssFont_1">${dado.breve}</p>
          <p class="cssFont_1"><strong>Endereço:</strong> ${dado.rua}, ${dado.numero} - ${dado.bairro}, ${dado.cidade} - ${dado.estado}</p>
          <p class="cssFont_1"><strong>Descrição:</strong> ${dado.descricao}</p>
          <p class="cssFont_1"><a href="mailto:${dado.email}" target="_blank">Contato</a></p>
        </div>
        </div>
        <div>
        <button class="myButton" onclick="maisInfo(${dado.id})">Ver Mais</button>
        </div>
`;
}

function maisInfo(ad){
  console.log(ad)
  fetch("http://localhost:3000/admin/pontos")
    .then((res) => res.json())
    .then((dados) => {
      dados.forEach((ponto) => {
        if (ponto.id === ad) {
          console.log(ponto)
        }
        });
});
}

// Ícones personalizados para categorias
var greenIconA = L.icon({
  iconUrl: "/img/poiter_mep/pA.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var greenIconR = L.icon({
  iconUrl: "/img/poiter_mep/pR.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

var greenIconV = L.icon({
  iconUrl: "/img/poiter_mep/pV.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

let marcadores = [];

// Função para limpar marcadores do mapa
function limparMarcadores() {
  marcadores.forEach((marker) => map.removeLayer(marker));
  marcadores = [];
}

// Função principal para filtrar e mostrar pontos
function filtrarLocais(tipo) {
  console.log("Clicado");
  limparMarcadores(); // Limpa os antigos
  console.log(tipo);

  fetch("http://localhost:3000/admin/pontos")
    .then((res) => res.json())
    .then((dados) => {
      dados.forEach((ponto) => {
        if (tipo === "todos" || ponto.categoria === tipo) {
          let popup = criarPopupContent(ponto);
          let icon;

          // Seleciona o ícone com base na categoria
          switch (ponto.categoria) {
            case "Trabalho":
              icon = greenIconR;
              break;
            case "Doação":
              icon = greenIconA;
              break;
            case "Estudos":
              icon = greenIconV;
              break;
            default:
              console.log("Categoria desconhecida:", ponto.categoria);
              return; // pula esse ponto
          }

          // Cria e adiciona o marcador
          const marker = L.marker([ponto.latitude, ponto.longitude], { icon })
            .addTo(map)
            .bindPopup(popup);
          marcadores.push(marker);
        }
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar os pontos:", error);
    });
}

// Exibe todos os pontos inicialmente
filtrarLocais("todos");
