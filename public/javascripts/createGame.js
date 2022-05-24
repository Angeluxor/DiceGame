/**
 * Envía la información del juego al servidor
 * @param e Evento para prevenir el resultado por defecto en el formulario
 */

function send(e) {
    e.preventDefault();
    const URL = location.href;
    const highDice = document.querySelector("#High_dice")
    const lowDice = document.querySelector("#Low_dice")
    const payload = {
        name: document.querySelector("#Game_name").value,
        type: highDice.checked ? highDice.value : lowDice.value,
        gamers: {
            player1: {
                id: (self.crypto.randomUUID()), name: document.querySelector("#Player1_name").value, bet: 0, score: 0
            }, player2: {
                id: (self.crypto.randomUUID()), name: document.querySelector("#Player2_name").value, bet: 0, score: 0
            }, player3: {
                id: (self.crypto.randomUUID()), name: document.querySelector("#Player3_name").value, bet: 0, score: 0
            },
        },
        inProgress: true,
        winner: {
            id: "", name: ""
        }
    }

    fetch(URL, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload),
    }).then((res) => res.json()).then((data) => window.location.replace(`/startGame/${data.name}`))
}