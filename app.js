const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

const admin = require("./routes/admin");
const home = require("./routes/home");
const form = require("./routes/form");

// Configurações
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", home);
app.use("/admin", admin);
app.use("/form", form);

// Outros
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
