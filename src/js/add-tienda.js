import { url } from './index.js';
import * as list from './list-tiendas.js';

/**
 * @description Realiza una petición de tipo POST,
 * con el objeto XMLHttpRequest para añadir una tienda.
 * Si la respuesta es correcta, se muestra la lista
 * actualizada.
 * @author Florencia Del Castillo Fleitas
 * @param {JSON} tienda
 */
function xhrAddTienda (tienda) {
    const request = new XMLHttpRequest();

    request.open('POST', url);

    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            // Spinner
        }
        if (request.readyState === 4 && request.status === 204) {
            list.xhrGetTiendas();
        }
        if (request.readyState === 4 && request.status !== 204) {
            list.showErrorMessage('No se ha podido añadir la tienda.');
        }
    });

    request.send(JSON.stringify(tienda));
}

/**
 * @description Realiza una petición de tipo POST,
 * con fetch API, para añadir una tienda. Si la respuesta
 * es correcta, se muestra la lista actualizada.
 * @author Florencia Del Castillo Fleitas
 * @param {JSON} tienda
 */
function fetchAddTienda (tienda) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tienda)
    };
    fetch(url, options).then(response => response.status).then(data => {
        if (data === 204) {
            list.fetchGetTiendas();
        }
    }).catch(() => {
        list.showErrorMessage('No se ha podido añadir la tienda.');
    });
}

/**
 * @description Realiza una petición de tipo POST
 * con jQuery Ajax para añadir una tienda. Si la
 * respuesta es correcta, se muestra la lista
 * actualizada.
 * @author Florencia Del Castillo Fleitas
 * @param {String} tienda
 */
function jQueryAddTienda (tienda) {
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(tienda),
        contentType: 'application/json; charset=UTF-8',
        beforeSend () {
            // Spinner
        },
        success: function () {
            list.jQueryGetTiendas();
        },
        error: function () {
            list.showErrorMessage('No se ha podido añadir la tienda.');
        }
    });
}

export {
    xhrAddTienda,
    fetchAddTienda,
    jQueryAddTienda
}
;
