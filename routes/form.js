const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Middleware para interpretar JSON
router.use(express.json());

router.post('/addlocais', (req, res) => {
    const dados = req.body;

    const caminhoArquivo = path.join(__dirname, "dados_locais.json");

    // Verifica se o arquivo já existe
    let conteudo = [];
    if (fs.existsSync(caminhoArquivo)) {
        const existente = fs.readFileSync(caminhoArquivo);
        conteudo = JSON.parse(existente);
    }
    var totalItens = conteudo.length;

    dados.ad = totalItens++

    conteudo.push(dados);
    

    fs.writeFileSync(caminhoArquivo, JSON.stringify(conteudo, null, 2));

    console.log(conteudo);

    res.status(200).send({ mensagem: "Dados salvos com sucesso!" });
});


module.exports = router;
