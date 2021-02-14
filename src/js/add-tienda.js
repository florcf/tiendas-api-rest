import * as list from './list-tiendas.js';

function xhrAddTienda (tienda) {
    const request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/crear-tienda');

    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            // Spinner
        }
        if (request.readyState === 4 && request.status === 204) {
            list.xhrGetTiendas();
        }
    });

    request.send(JSON.stringify(tienda));
}

function fetchAddTienda (tienda) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tienda)
    };
    fetch('http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/crear-tienda', options).then(response => response.status).then(data => {
        if (data === 204) {
            list.fetchGetTiendas();
        }
    }).catch(error => console.log(error));
}

function jQueryAddTienda (tienda) {
    $.ajax({
        url: 'http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/crear-tienda',
        type: 'POST',
        data: JSON.stringify(tienda),
        // dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function () {
            list.jQueryGetTiendas();
        }
    });
}

export {
    xhrAddTienda,
    fetchAddTienda,
    jQueryAddTienda
}
;
