import { showTiendas } from './list-tiendas.js';

/**
 * @description Realiza una petición HTTP, de tipo GET,
 * con el objeto XMLHttpRequest. Obtiene una tienda en
 * formato JSON al pasarle un id. Muestra la tienda si
 * la respuesta es positiva.
 * @author Florencia Del Castillo Fleitas
 * @param {String} id
 */
function xhrGetTiendaById (id) {
    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.open('GET', `http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/${id}`);

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            // Spinner
        }
        if (request.readyState === 4 && request.status === 200) {
            const tienda = request.response;
            showTiendas([tienda]);
        }
    });

    request.send();
}

/**
 * @description Realiza una petición HTTP, de tipo GET,
 * con Fetch API. Obtiene una tienda en formato JSON al
 * pasarle un id. Muestra la tienda si la respuesta es
 * positiva.
 * @author Florencia Del Castillo Fleitas
 * @param {String} id
 */
function fetchGetTiendaById (id) {
    fetch(`http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/${id}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => showTiendas([data]))
        .catch(error => console.log(error));
}

/**
 * @description Realiza una petición HTTP, de tipo GET,
 * con jQuery Ajax. Obtiene una tienda en formato JSON al
 * pasarle un id. Muestra la tienda si la respuesta es
 * positiva.
 * @author Florencia Del Castillo Fleitas
 * @param {String} id
 */
function jQueryGetTiendaById (id) {
    $.ajax({
        url: `http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/${id}`,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            showTiendas([json]);
        }
    });
}

export {
    xhrGetTiendaById,
    fetchGetTiendaById,
    jQueryGetTiendaById
}
;
