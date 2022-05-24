const express = require('express');
const {param} = require("express-validator");
const router = express.Router();
const Game = require("../models/game");
const diceGameCtrl = require("../controllers/diceGameCtrl");
const {getWinner} = require("../controllers/diceGameCtrl");

/**
 * Ruta para iniciar una partida ya creada
 * @example <caption>/game/</caption>
 */
router
    .route("/:name")
    .post(diceGameCtrl.startGame)
    .get (GameView = async (req, res) => {
        param("name", "Name field can't be empty")
            .trim()
            .escape()
            .not()
            .isEmpty()
        const thisGame = await Game.findByGameName(req.params.name)
        if (thisGame){
        return res.render("startGame", {
                title: thisGame.name,
                type: thisGame.type,
                player1: thisGame.gamers.player1.name,
                player2: thisGame.gamers.player2.name,
                player3: thisGame.gamers.player3.name,
                score1: thisGame.gamers.player1.score,
                score2: thisGame.gamers.player2.score,
                score3: thisGame.gamers.player3.score,
        });
        }
      });


module.exports = router;

