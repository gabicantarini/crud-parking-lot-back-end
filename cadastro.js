import { postVeiculo } from "../service/index.js";

const formulario = document.getElementById("formulario")
formulario.addEventListener('submit', function(event) {
    event.preventDefault()

    const cadastroCliente = {
        owner: document.getElementById("nome").value,
        model: document.getElementById("modelo").value,
        label: document.getElementById("placa").value,
        type: document.getElementById("tipo").value,
        description: document.getElementById("observacoes").value,
    }
    postVeiculo(cadastroCliente)
    //console.log(cadastroCliente)
});