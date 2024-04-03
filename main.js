function BuscarCep(elementId){
    
    var cep = document.getElementById(elementId).value;

    if (!ValidaCepInformado(cep)){
        return
    }
    
    const request = new XMLHttpRequest()
    request.open("GET", `https://viacep.com.br/ws/${cep}/json/`, false)
    request.send()
    
    
    const resposta = JSON.parse(request.responseText)
    result = ValidaRetornoApi(resposta)
    const textElement = document.createElement("h2")
    textElement.innerHTML = result
    const divElement = document.getElementById("retorno")
    divElement.appendChild(textElement)
    
}

function ValidaCepInformado(cep, resposta = 0){
    let regex = /[a-zA-Z]+$/;
    console.log(regex.test(cep))
    if (regex.test(cep)){
        const textElement = document.createElement("p")
        textElement.innerHTML = "Cep Inválido, favor informar apenas números"
        const divElement = document.getElementById("retorno")
        divElement.appendChild(textElement)
        return false
    }
    else if (cep.length < 8) {
        const textElement = document.createElement("p")
        textElement.innerHTML = "Cep Inválido, deve ser informado um número de 8 dígitos."
        const divElement = document.getElementById("retorno")
        divElement.appendChild(textElement)
        return false
    }
    return true
}
function ValidaRetornoApi(resposta){
    if (resposta.erro){
        return "Cep Inexistente"
    }
    else {
        return `${resposta.logradouro}, ${resposta.bairro}, ${resposta.localidade}.`
    }
}
