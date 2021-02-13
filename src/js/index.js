const xhrButton = document.querySelector('#xhr');
xhrButton.addEventListener('click', () => {
    xmlHttpRequest();
})

function xmlHttpRequest() {
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