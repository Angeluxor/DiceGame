/**
 * Envía la información de las apuestas al servidor
 * @param e Evento para prevenir el resultado por defecto en el formulario
 */

function roll(e) {
    e.preventDefault();
    const URL = location.href;
    const payload = {
        bet1 : document.getElementById("bet1").value,
        bet2 : document.getElementById("bet2").value,
        bet3 : document.getElementById("bet3").value,
    }
    fetch(URL, {
        method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload),
    })
        .then(
        (res) => res.json())
        .then(
        (data) => window.location.replace(`/game/${data.name}/winner`)
        )
}
