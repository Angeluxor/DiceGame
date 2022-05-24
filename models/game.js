const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/**
 * Define el esquema que sirve de modelo a cada juego
 */
const gameSchema = new Schema({
    name: String,
    type: String,
    gamers: {
        player1: {
            id: String,
            name: String,
            bet: String,
            score: String
            },
        player2: {
            id: String,
            name: String,
            bet: String,
            score: String
            },
        player3: {
            id: String,
            name: String,
            bet: String,
            score: String
            }
        },
    inProgress: Boolean,
    winner: {
        id: String,
        name: String,
        reward: String,
        score: String
        }
});

/**
 * Encuentra un juego usando el atributo name como filtro
 */

gameSchema.statics.findByGameName = function (name) {
    return this.findOne({ name: name });
};

module.exports = mongoose.model("Game", gameSchema);