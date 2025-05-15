const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/addlocais',(req,res)=>{
    res.render("formulario_add_locais",{
        layout:"main_admin",
        css:["style-form.css"],
        js:["script-formulario.js","script-map.js","script-busca-de-locais.js"]
    });
});
router.get('/gerenciarlocais',(req,res)=>{
    res.render("gerencia_locais",{
        layout:"main_admin",
        css:["style-card.css"],
        // js:["script.js","script-btn-menu.js"]
    });
});

router.get('/pontos', (req, res) => {
    const filePath = path.join(__dirname, 'dados_locais.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo JSON:", err);
            return res.status(500).json({ erro: 'Erro ao ler o arquivo JSON' });
        }

        try {
            const json = JSON.parse(data);
            res.json(json);
        } catch (e) {
            console.error("Erro ao fazer parse do JSON:", e);
            res.status(500).json({ erro: 'Erro ao fazer parse do JSON' });
        }
    });
});


module.exports = router