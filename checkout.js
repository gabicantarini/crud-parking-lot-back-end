import { service } from "../service/index.js";
import { view } from "../view/index.js"

//qnd usuário clica no checkou, vem pra cá
export const ChekoutComponent = (idParametro) => {
    view.getSpinner();
    setTimeout(()=> {
        view.getChekoutHtml();

    service.getVeiculo().then((dados) => {
        dados.forEach(element => {
            if (element.id == idParametro) {
                adicionaParametrosNaTela(element)
                buscarRegistro(idParametro) //busca o id do carro
            }
        });
    })
    },600)
}
let placa = ''
//cria linha na tabela
const adicionaParametrosNaTela = (objeto) => {
    placa = objeto.label
    const NovaLinha = document.getElementById('tbody')
    const dadosHtml = `
            <td>${objeto.owner}</td>
            <td>${objeto.model}</td>
            <td>${objeto.label}</td>
    `
    NovaLinha.innerHTML = dadosHtml;
}

const buscarRegistro = (id) => {
    service.getActivities().then((dados) => {
        dados.forEach((element) => {
            if (element.vehicle_id == id) {
                adicionaParametrosNoInput(element)
            }
        })
    })
}

//calculo da quantidade de horas que o carro ficou no estacionamento
const valorHora = 5;
const valorMinuto = valorHora / 60;
const adicionaParametrosNoInput = (element) => {
    const checkin = new Date(element.checkin_at) //converter checkin para data
    const checkout = new Date() //pega o checkout
    const tempo = checkout - checkin //para descobrir o tempo
    const hora = calculaHora(tempo) // enviamos o tempo em milissegundos para a função calculahora
    const totalApagar = (hora.minutos + (hora.horas * 60)) * valorMinuto;
   
    const inputHora = document.getElementById('totalHora')
    const inputTotal = document.getElementById('valorPagar')

    //determina a cobrança de acordo com as horas
    if (hora.minutos < 10 && hora.horas < 10)
        inputHora.value = `Tempo 0${hora.horas}:0${hora.minutos}`;

    if (hora.horas < 10)
        inputHora.value = `Tempo 0${hora.horas}:${hora.minutos}`;

    if (hora.minutos < 10)
        inputHora.value = `Tempo ${hora.horas}:0${hora.minutos}`;

    if (totalApagar < 10) {
        inputTotal.value = `R$: 0${totalApagar.toFixed(2)}`;
    } else {
        inputTotal.value = `R$: ${totalApagar.toFixed(2)}`;
    }

    //id do botão finalizar 
    const finalizar = document.getElementById('finalizar')
    finalizar.addEventListener('click', ()=> {
        const preco = document.getElementById('valorPagar').value
        const stringPreco = preco.split(" ") //split transforma o preço numa array de string
        const objeto = {
            label: placa,
            price: Number(stringPreco[1])
        }
        checkoutAPI(objeto)
    })
}
//para converter a hora em milissegundos para hora em minutos
const calculaHora = (tempoEmMilissegundos) => {
    const tempo = {
        horas: +(tempoEmMilissegundos / 3600000).toFixed(0),
        minutos: +((tempoEmMilissegundos / 60000) % 60).toFixed(0)
    }
    return tempo
}

const checkoutAPI = (objeto) => {
    service.putCheckout(objeto).then(()=> {
        window.location.href = "../checkin.html"
    })
}