import { url } from './index.js';
import { showTiendas, showErrorMessage } from './list-tiendas.js';

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

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            searchButtonFeedBack();
        } else {
            searchButtonFeedBack('fas fa-times');
        }
        if (request.readyState === 4 && request.status === 200) {
            const tienda = request.response;
            showTiendas([tienda]);
        }
        if (request.readyState === 4 && request.status !== 200) {
            showErrorMessage('Tienda no encontrada.');
        }
    });

    request.open('GET', `${url}${id}`);
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
    searchButtonFeedBack();
    fetch(`${url}${id}`, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            if (data.length > 0) {
                showTiendas([JSON.parse(data)]);
            } else {
                showErrorMessage('Tienda no encontrada.');
            }
            searchButtonFeedBack('fas fa-times');
        })
        .catch(() => {
            showErrorMessage('Tienda no encontrada.');
            searchButtonFeedBack('fas fa-times');
        });
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
        url: `${url}${id}`,
        type: 'GET',
        dataType: 'json',
        beforeSend () {
            searchButtonFeedBack();
        },
        success: function (json) {
            if (json !== undefined) {
                showTiendas([json]);
            } else {
                showErrorMessage('Tienda no encontrada.');
            }
        },
        error: function () {
            showErrorMessage('Tienda no encontrada.');
        },
        complete: function () {
            searchButtonFeedBack('fas fa-times');
        }
    });
}

/**
 * @description Cambia el icono del botón
 * de búsqueda.
 * @author Florencia Del Castillo Fleitas
 * @param {string} [icon='fas fa-circle-notch fa-spin']
 */
function searchButtonFeedBack (icon = 'fas fa-circle-notch fa-spin') {
    const searchBtnIcon = document.querySelector('#search-btn > i');
    searchBtnIcon.className = icon;
}

export {
    xhrGetTiendaById,
    fetchGetTiendaById,
    jQueryGetTiendaById
}
;
