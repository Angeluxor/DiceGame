/**
 * Importa un modelo Mongoose para Game
 */
const game = require("../models/game");

/**
 * Importa una función que regresa el resultado de una validación
 */
const {validationResult} = require("express-validator");
const Game = require("../models/game");

/**
 * Obtiene los datos del juego, crea un nuevo juego y lo almacena
 */

exports.addGame = async (req, res) => {
    if (ValidationError(req, res)) {
        return null;
    }
    try {
        const newGame = new game({
            name: req.body.name,
            type: req.body.type,
            gamers: req.body.gamers,
            inProgress: req.body.inProgress,
            winner: req.body.winner,
        });
        newGame.save((err, game) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.status(200).json(game);
        });
    } catch (error) {
        if (error) return res.status(500).send(error.message);
    }
};

/**
 * Inicia el juego almacenando las apuestas de los jugadores y generando el puntaje para cada uno que permite determinar el ganador
 */

exports.startGame = async (req, res) => {
    if (ValidationError(req, res)) {
        return null;
    }
    const thisGame = await Game.findByGameName(req.params.name)
    const  {type: type} = thisGame
    if (thisGame) {
        try {
            const payload = {
                gamers: {
                    player1: {
                        id: thisGame.gamers.player1.id,
                        name: thisGame.gamers.player1.name,
                        bet: req.body.bet1,
                        score: Math.floor(Math.random() * 6) + 1
                    }, player2: {
                        id: thisGame.gamers.player2.id,
                        name: thisGame.gamers.player2.name,
                        bet: req.body.bet2,
                        score: Math.floor(Math.random() * 6) + 1
                    }, player3: {
                        id: thisGame.gamers.player3.id,
                        name: thisGame.gamers.player3.name,
                        bet: req.body.bet3,
                        score: Math.floor(Math.random() * 6) + 1
                    }
                },
                inProgress: false
            };
            game.findOneAndUpdate({name: thisGame.name}, getWinner(payload), {new: true}, (err, game) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
                return res.status(200).json(game);
            });
        } catch (error) {
            if (error) return res.status(500).send(error.message);
        }
    } else {
        alert("Game not found")
    }
};

/**
 * Maneja errores de validación creando un objeto de tipo error con el código y el mensaje correspondiente según la situación
 * @returns {*} Envía una respuesta con un arreglo que contiene los errores hallados
 */
function ValidationError(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
}

function getWinner(payload, type) {

    const {score: score1} = payload.gamers.player1
    const {score: score2} = payload.gamers.player2
    const {score: score3} = payload.gamers.player3
    let winner;

    if (type==="High dice"){
        if (score1 > score2 && score1 > score3) {
            winner = {...payload.gamers.player1}
            } else if (score2 > score3) {
                winner = {...payload.gamers.player2}
                } else if (score3 > score2) {
                    winner = {...payload.gamers.player3}
                }
        return {...payload, winner}
    }
    else {
        if (score1 < score2 && score1 < score3) {
            winner = {...payload.gamers.player1}
        } else if (score2 < score3) {
            winner = {...payload.gamers.player2}
        } else if (score3 < score2) {
            winner = {...payload.gamers.player3}
        }
        return {...payload, winner}
    }
}




