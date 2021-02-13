const xhrButton = document.querySelector('#xhr');
xhrButton.addEventListener('click', () => {
    xhrGetTiendas();
})

function xhrGetTiendas() {
    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.open('GET', 'http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/lista-de-tiendas');
    request.send();

    request.addEventListener("readystatechange", () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            // Spinner
        }
        if (request.readyState === 4 && request.status === 200) {
            // request.response
            const tiendas = [...request.response];
            console.log(tiendas)
            showTiendas(tiendas);
        }
    });
}

const fetchButton = document.querySelector('#fetch');
fetchButton.addEventListener('click', () => {
    fetchGetTiendas()
})

function fetchGetTiendas() {
    fetch('http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/lista-de-tiendas', { method: 'GET' })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

const jQueryButton = document.querySelector('#jquery');
jQueryButton.addEventListener('click', () => {
    jQueryGetTiendas();
})

function jQueryGetTiendas() {
    $.ajax({
        url: 'http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/lista-de-tiendas',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json)
        }
    });
}

function showTiendas(tiendas) {
    const tiendaTemplate = document.querySelector('#tienda-template');
    const tiendasElement = document.querySelector('#tiendas');
    removeHtmlElements('#tiendas');
    tiendas.forEach(tienda => {
        const nameElement = tiendaTemplate.content.querySelector('h2');
        nameElement.textContent = tienda.nombreTienda;
        const addressElement = tiendaTemplate.content.querySelector('p');
        addressElement.textContent = `${tienda.direccion} (${tienda.localidad})`;
        const phoneElement = tiendaTemplate.content.querySelector('p:last-child');
        phoneElement.textContent = tienda.telefono;
        const cloneTiendaTemplate = document.importNode(tiendaTemplate.content, true);
        tiendasElement.appendChild(cloneTiendaTemplate);
    });
}

function removeHtmlElements(selector) {
    const element = document.querySelector(selector);
    if (element.hasChildNodes()) {
        const children = [...element.children];
        children.forEach(child => {
            child.remove();
        });
    }
}