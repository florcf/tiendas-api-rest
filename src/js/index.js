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