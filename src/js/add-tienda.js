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

    request.addEventListener('readystatechange', () => {
        if (request.readyState >= 1 && request.readyState <= 3) {
            formButtonFeedback();
        }
        if (request.readyState === 4 && request.status === 204) {
            list.xhrGetTiendas();
        }
        if (request.readyState === 4 && request.status !== 204) {
            list.showErrorMessage('No se ha podido añadir la tienda.');
        }
        if (request.readyState === 4) {
            resetForm();
        }
    });

    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
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
    formButtonFeedback();
    fetch(url, options).then(response => response.status).then(data => {
        if (data === 204) {
            resetForm();
            list.fetchGetTiendas();
        }
    }).catch(() => {
        resetForm();
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
            formButtonFeedback();
        },
        success: function () {
            list.jQueryGetTiendas();
        },
        error: function () {
            list.showErrorMessage('No se ha podido añadir la tienda.');
        },
        complete: function () {
            resetForm();
        }
    });
}

/**
 * @description Cambia el botón de añadir tienda
 * para dar feedback al usuario mientras se realiza
 * la petición.
 * @author Florencia Del Castillo Fleitas
 * @param {string} [icon='fas fa-circle-notch fa-spin']
 * @param {string} [text=' Cargando...']
 * @param {boolean} [state=true]
 */
function formButtonFeedback (icon = 'fas fa-circle-notch fa-spin', text = ' Cargando...', state = true) {
    const addButton = document.querySelector('#add-tienda');
    addButton.firstElementChild.className = icon;
    addButton.lastElementChild.textContent = text;
    addButton.disabled = state;
}

/**
 * @description Deja el formulario como en su
 * estado inicial.
 * @author Florencia Del Castillo Fleitas
 */
function resetForm () {
    const form = document.querySelector('form');
    form.reset();
    const textInputs = [...document.querySelectorAll('form input[type="text"]')];
    textInputs.forEach(input => {
        input.classList.remove('valid-input');
    });
    formButtonFeedback('', ' Añadir Tienda', false);
}

export {
    xhrAddTienda,
    fetchAddTienda,
    jQueryAddTienda
}
;
