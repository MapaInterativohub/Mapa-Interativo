const express = require("express");
const router = express.Router();

router.get('/home',(req,res)=>{
    res.render("map",{
        css:["style.css","css-info-local.css"],
        js:["script.js","script-btn-menu.js"]
    });
});

module.exports = router