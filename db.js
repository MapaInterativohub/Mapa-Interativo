const { Sequelize } = require("sequelize");  // Nome correto da classe

const sequelize = new Sequelize("serve", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar: " + erro);
  });
