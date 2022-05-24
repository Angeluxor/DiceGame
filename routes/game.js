const express = require('express');
const {param} = require("express-validator");
const router = express.Router();
const Game = require("../models/game");

/**
 * Ruta para acceder a un juego ya iniciado
 * @example <caption>/name/</caption>
 */
router
    .route("/:name")
    .get (GameView = async (req, res) => {
        param("name", "Name field can't be empty")
            .trim()
            .escape()
            .not()
            .isEmpty()
        const thisGame = await Game.findByGameName(req.params.name)
        if (thisGame){
            return res.render("viewGames", {
                title: thisGame.name,
                type: thisGame.type,
                player1: thisGame.gamers.player1.name,
                player2: thisGame.gamers.player2.name,
                player3: thisGame.gamers.player3.name,
                score1: thisGame.gamers.player1.score,
                score2: thisGame.gamers.player2.score,
                score3: thisGame.gamers.player3.score,
                bet1: thisGame.gamers.player1.bet,
                bet2: thisGame.gamers.player2.bet,
                bet3: thisGame.gamers.player3.bet,
                winner: thisGame.winner
            });
        }
    });

/**
 * Ruta para obtener el ganador de un juego
 * @example <caption>/name/winner</caption>
 */

router
    .route("/:name/winner")
    .get (GameView = async (req, res) => {
        param("name", "Name field can't be empty")
            .trim()
            .escape()
            .not()
            .isEmpty()
        const thisGame = await Game.findByGameName(req.params.name)
        if (thisGame){
            return res.render("viewWinner", {
                title: thisGame.name,
                type: thisGame.type,
                winnerName: thisGame.winner.name,
                winnerScore: thisGame.winner.score,
                reward: (
                    parseInt(thisGame.gamers.player1.bet, 10) +
                    parseInt(thisGame.gamers.player2.bet, 10) +
                    parseInt(thisGame.gamers.player3.bet, 10))
            });
        }
    });

module.exports = router;


