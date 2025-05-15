document.getElementById("meuFormulario").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const dados = Object.fromEntries(formData.entries());

  await fetch("http://localhost:3000/form/addlocais", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  });
  console.log(dados)

  alert("Dados enviados com sucesso!");
});