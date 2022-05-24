const express = require('express');
const diceGameCtrl = require("../controllers/diceGameCtrl");
const { body } = require("express-validator");
const router = express.Router();

/**
 * Ruta a la página de creación de un juego
 * @example <caption>/createGame</caption>
 */
router
    .route('/')
    .post(
        body(["name","type"]).trim().escape().not().isEmpty(),diceGameCtrl.addGame)
    .get( function(req, res) {
    res.render('createGame', { title: 'Dice game' });
})

module.exports = router;
