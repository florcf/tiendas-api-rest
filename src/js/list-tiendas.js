import { url } from './index.js';

/**
 * @description Realiza una petición HTTP, de tipo GET,
 * con el objeto XMLHttpRequest. Obtiene un array de
 * objetos con todas las tiendas. Muestra las tiendas si
 * la respuesta es positiva.
 * @author Florencia Del Castillo Fleitas
 */
function xhrGetTiendas () {
    const request = new XMLHttpRequest();
    request.responseType = 'json';

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            spinner(); // Muestra el spinner.
        }
        if (request.readyState === 4) {
            spinner(); // Oculta el spinner.
        }
        if (request.readyState === 4 && request.status === 200) {
            const tiendas = request.response;
            showTiendas(tiendas);
        }
        if (request.readyState === 4 && request.status !== 200) {
            // No se ha podido obtener la lista de tiendas.
            showErrorMessage();
        }
    });

    request.open('GET', url);
    request.send();
}

/**
 * @description Realiza una petición HTTP, de tipo GET,
 * con Fetch API. Obtiene un array de objetos con todas
 * las tiendas. Muestra las tiendas si la respuesta es
 * positiva.
 * @author Florencia Del Castillo Fleitas
 */
function fetchGetTiendas () {
    spinner();
    fetch(url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            spinner();
            showTiendas(data);
        })
        .catch(() => {
            spinner();
            showErrorMessage();
        });
}

/**
 * @description Realiza una petición HTTP, de tipo GET,
 * con jQuery Ajax. Obtiene un array de objetos con todas
 * las tiendas. Muestra las tiendas si la respuesta es
 * positiva.
 * @author Florencia Del Castillo Fleitas
 */
function jQueryGetTiendas () {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend () {
            spinner();
        },
        success: function (json) {
            showTiendas(json);
        },
        error: function () {
            showErrorMessage();
        },
        complete: function () {
            spinner();
        }
    });
}

/**
 * @description Clona y renderiza un template por cada
 * una de las tiendas para mostrar su información.
 * @author Florencia Del Castillo Fleitas
 * @param {Array} tiendas
 */
function showTiendas (tiendas) {
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

/**
 * @description Elimina los hijos de un elemento
 * si es que los tiene.
 * @author Florencia Del Castillo Fleitas
 * @param {String} selector
 */
function removeHtmlElements (selector) {
    const element = document.querySelector(selector);
    if (element.hasChildNodes()) {
        const children = [...element.children];
        children.forEach(child => {
            child.remove();
        });
    }
}

/**
 * @description Crea un elemento HTML y un nodo texto
 * para mostrar un mensaje de error.
 * @author Florencia Del Castillo Fleitas
 * @param {string} [message='Lo sentimos, ha ocurrido un error.']
 */
function showErrorMessage (message = 'Lo sentimos, ha ocurrido un error.') {
    removeHtmlElements('#tiendas');
    const tiendasElement = document.querySelector('#tiendas');
    const hElement = document.createElement('h2');
    const text = document.createTextNode(message);
    hElement.appendChild(text);
    tiendasElement.appendChild(hElement);
}

/**
 * @description Muestra u oculta el spinner
 * alternando la clase css .show-spinner.
 * @author Florencia Del Castillo Fleitas
 */
function spinner () {
    const spinner = document.querySelector('#spinner');
    spinner.classList.toggle('show-spinner');
}

export {
    xhrGetTiendas,
    fetchGetTiendas,
    jQueryGetTiendas,
    showTiendas,
    showErrorMessage,
    spinner
}
;
