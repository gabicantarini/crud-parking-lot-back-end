import { service } from "../service/index.js";
import { view } from "../view/index.js"
import { CadastroComponent } from './cadastro.js'
import { ChekoutComponent } from './checkout.js'

view.getSpinner();
setTimeout(()=> {
    view.getCheckinHtml();

    let idCheckin = []
    
    service.getActivities().then((dados) => {
        dados.forEach(element => {
            if (element.checkout_at == null) {
                idCheckin.push(element.vehicle_id)
            }
        });
        getVeiculo()
    });
    
    let arrayVeiculos = []
    const getVeiculo = () => {
        service.getVeiculo().then((dados) => {
            //metodo include verifica se existe o carro na API
            dados.forEach((element) => {
                if (idCheckin.includes(element.id)) {
                    criarNovaLinha(element)
                }
                if (element.label !== null) {
                    arrayVeiculos.push(element)
                }
            })
            criarAsOpcoes(arrayVeiculos)
        })
    }
    
    
    const criarNovaLinha = (object) => {
        const table = document.getElementById('tbody')
        const NovaLinha = document.createElement('tr')
        const dadosHtml = `
            <td>${object.model}</td>
            <td>${object.label}</td>
            <td>  
                <a id="${object.id}" class="checkin__table__item" >Checkout</a>   
            </td>
            `
        NovaLinha.innerHTML = dadosHtml
    
        return table.appendChild(NovaLinha)
    }
    
    const criarAsOpcoes = (arrayVeiculos) => {
        const veiculosFiltrados = []
        //foreach para percorrer cada elemento da array
        arrayVeiculos.forEach((element) => {
            idCheckin.includes(element.id) ? //a interrogação substitui o if
                console.log("Já está estacionado") : //os dois pontos substituem o else
                veiculosFiltrados.push(element)
        })
        const select = document.getElementById('select')
        //para cada linha ele vai add um option (uma placa) e cada placa vai ter um id
        //faz as placas reinderizarem
        veiculosFiltrados.forEach((element) => {
            const option = new Option(element.label, element.id);
            select.add(option);
        })
    }
    const main = document.getElementById('root')
    //essa função permite pegar os 3 eventos
    main.addEventListener('click', (event) => {
        const button = event.path[0].innerText
        const id = event.path[0].id
        //tratamos do checkout em outro arquivo p/ melhor organização
        if (button === 'Checkout') {
            ChekoutComponent(id);
        }
        if (button === 'Checkin') {
            const select = document.getElementById('select')
            searchID(select.value)
        }
        if (button === 'Adicionar Novo') {
            CadastroComponent();
        }
    })
    
    //para verificar se o id existe
    //se não existir, não poderá ser cadastrado
    const searchID = (id) => {
        service.getVeiculo().then((dados) => {
            dados.forEach((element) => {
                if (element.id == id) {
                    checkinApi(element)
                }
            })
        })
    }
    
    const checkinApi = (objeto) => {
        service.postCheckin(objeto.label).then((dados) => {
            alert(dados.message)
            window.location.reload()
        })
    }
},600)
