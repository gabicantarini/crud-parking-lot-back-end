import { service } from "../service/index.js"
import { view } from "../view/index.js"
import { AtualizaComponent } from "./atualiza.js"
import { CadastroComponent } from "./cadastro.js";


//view. para importar todo o view criado no index.js
export const ListaClienteComponent = () => {
    view.getSpinner();
    setTimeout(()=> {
        view.getListaClientesHtml()

        //forEach serve para buscar cada elemtno dentro da array
    service.getVeiculo().then((dados) => {
        dados.forEach((element) => {
            //se os dados forem nulo, pula
            //se os dados forem diferentes de nulo, considera
            if (element.owner !== null && element.label !== null) {
                criarNovaLinha(element.owner, element.model, element.label, element.type, element.observation, element.id)
            }
        });
    })

        //captar os sons do html
    const table = document.getElementById('tbody')
    table.addEventListener('click', (event) => {
        const button = event.path[0].innerText
        const id = event.path[0].id
        
        if(button === 'Editar'){
           AtualizaComponent(id);
        }
        if(button === 'Excluir'){
            deletar(id)
        }
        if(button === 'Novo'){
           CadastroComponent();
        }
    })
    },600)

}

 //busca tabela do html e add uma nova linha abaixo
const criarNovaLinha = (cliente, modelo, placa, tipo, observacoes, id) => {
    const table = document.getElementById('tbody')
    const NovaLinha = document.createElement('tr')
    const dadosHtml = `
        <td class="none">${cliente}</td>
        <td>${modelo}</td>
        <td>${placa}</td>
        <td class="none">${tipo}</td>
        <td class="none">${observacoes}</td>

        <td>               
            <div class="lista-cliente__container__button">
                <a id="${id}" class="lista-cliente__table__button">Editar</a>
                <a id="${id}" class="lista-cliente__table__button">Excluir</a>
            </div>
        </td>
        `
    NovaLinha.innerHTML = dadosHtml
    return table.appendChild(NovaLinha)
}

const deletar = (id) => {
    service.deletaVeiculo(id).then(()=> {
        ListaClienteComponent();
    })
}