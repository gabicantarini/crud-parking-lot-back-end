import { CadastroComponent } from "../controller/cadastro.js";
import { FaturamentoComponent } from "../controller/faturamento.js";
import { ListaClienteComponent } from "../controller/lista-Clientes.js";
import { view } from "../view/index.js";

view.getSpinner()
    setTimeout(() => {
        view.getIndex();
    }, 600)

const link = document.getElementById('link')

link.addEventListener('click', (event) => {
    const option = event.path[0].innerText

    switch(option){
        case "Cadastro":
            CadastroComponent();
            break
        case "Clientes":
            ListaClienteComponent();
            break
        case "Checkin": 
            window.location.href = "./checkin.html"
            break
        case "Faturamento":
            FaturamentoComponent();
            break;
        default : view.getIndex()
    }
})