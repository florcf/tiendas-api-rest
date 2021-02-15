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

    request.open('GET', 'http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/lista-de-tiendas');

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            // Spinner
        }
        if (request.readyState === 4 && request.status === 200) {
            const tiendas = request.response;
            showTiendas(tiendas);
        }
    });

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
    fetch('http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/lista-de-tiendas', { method: 'GET' })
        .then(response => response.json())
        .then(data => showTiendas(data))
        .catch(error => console.log(error));
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
        url: 'http://localhost:8080/EmprInfRs_DelCastilloFlorencia/webresourcesFlor/tienda/lista-de-tiendas',
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            showTiendas(json);
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

export {
    xhrGetTiendas,
    fetchGetTiendas,
    jQueryGetTiendas,
    showTiendas
}
;
