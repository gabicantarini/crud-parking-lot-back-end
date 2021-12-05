import { service } from "../service/index.js"
import { view } from "../view/index.js"

export const CadastroComponent = () => {
    view.getSpinner(); //configuração dos milissegundos do spinner

    setTimeout(() => {
        const label = []
        service.getVeiculo().then((dados) => {
            dados.forEach(element => {
                if (element.label != null) {
                    label.push(element.label)
                }
            });
        })

        view.getCadastroHtml();

        const formulario = document.getElementById("formulario")
        formulario.addEventListener('submit', function (event) {
            event.preventDefault()

            const cadastroCliente = {
                owner: document.getElementById('name').value,
                model: document.getElementById('modelo').value,
                type: document.getElementById('tipo').value,
                label: document.getElementById('placa').value,
                observation: document.getElementById('observacoes').value
            }

            if (label.includes(cadastroCliente.label)) {
                return alert(`Essa placa: ${cadastroCliente.label} já existe no banco.`)
            } else {
                formulario.reset()
                service.postVeiculo(cadastroCliente)
            }
        })

        const cancelar = document.getElementById("cancelar");
        cancelar.addEventListener('click', (event) => {
            event.preventDefault();
            formulario.reset();
        })
    }, 600)


}