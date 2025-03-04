import * as list from './list-tiendas.js';
import * as add from './add-tienda.js';
import * as search from './search-tienda.js';

export const url = 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/';

/** @type {String} */
/** Tipo de petición seleccionada por el usuario. */
let requestType = '';

/** @type {HTMLButtonElement} */
const xhrButton = document.querySelector('#xhr');
xhrButton.addEventListener('click', () => {
    requestType = 'xhr';
    list.xhrGetTiendas();
});

/** @type {HTMLButtonElement} */
const fetchButton = document.querySelector('#fetch');
fetchButton.addEventListener('click', () => {
    requestType = 'fetch';
    list.fetchGetTiendas();
});

/** @type {HTMLButtonElement} */
const jQueryButton = document.querySelector('#jquery');
jQueryButton.addEventListener('click', () => {
    requestType = 'jquery';
    list.jQueryGetTiendas();
});

/**
 * Formulario Nueva Tienda
 */
/** @type {HTMLFormElement} */
const form = document.forms[0];

/** @type {HTMLButtonElement} */
const newTiendaBtn = document.querySelector('#new-tienda');
newTiendaBtn.addEventListener('click', () => {
    // Alterna la clase css que hace visible el formulario.
    form.classList.toggle('show-form');
    addInputsEvent();
});

/** @type {HTMLInputElement} */
const addTiendaBtn = document.querySelector('#add-tienda');
addTiendaBtn.addEventListener('click', () => {
    formValidity();
});

/**
 * Array de inputs de tipo texto del formulario
 * para añadir una tienda nueva.
 */
const formTextInputs = [...document.forms[0]];
/**
 * Elimina el último elemento del array,
 * el botón de enviar.
 */
formTextInputs.pop();

/**
 * @description Añade el evento de tipo input a cada
 * uno de los inputs del formulario.
 * @author Florencia Del Castillo Fleitas
 */
function addInputsEvent () {
    formTextInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInput(input);
        });
    });
}

/**
 * @description Verifica si el formulario cumple
 * con todas las validaciones. Si algún input no cumple
 * todas las validaciones, se vuelve a llamar a la función
 * checkInput para todos ellos.
 * @author Florencia Del Castillo Fleitas
 */
function formValidity () {
    if (!form.checkValidity()) {
        formTextInputs.forEach(input => {
            checkInput(input);
        });
    } else {
        // Método POST
        const tienda = {
            nombreTienda: formTextInputs[0].value,
            direccion: formTextInputs[1].value,
            localidad: formTextInputs[2].value,
            telefono: formTextInputs[3].value
        };
        if (requestType === 'xhr') {
            add.xhrAddTienda(tienda);
        } else if (requestType === 'fetch') {
            add.fetchAddTienda(tienda);
        } else if (requestType === 'jquery') {
            add.jQueryAddTienda(tienda);
        }
    }
}

/**
 * @description Valida cada uno de los inputs.
 * Muestra mensajes de error y añade o elimina
 * las clases css necesarias.
 * @author Florencia Del Castillo Fleitas
 * @param {HTMLInputElement} element
 */
function checkInput (element) {
    const validity = element.validity;
    const errorElement = element.nextElementSibling;
    if (validity.valueMissing) {
        showMessage(errorElement);
        element.classList.add('invalid-input');
    } else if (validity.patternMismatch) {
        showMessage(errorElement, 'El teléfono debe tener 9 cifras y empezar por 6, 8 ó 9.');
        element.classList.add('invalid-input');
    } else {
        removeMessage(errorElement);
        element.classList.remove('invalid-input');
        element.classList.add('valid-input');
    }
}

/**
 * @description Crea un elemento de tipo span y un nodo
 * texto con un mensaje de error, y lo añade al DOM.
 * @author Florencia Del Castillo Fleitas
 * @param {HTMLDivElement} element
 * @param {string} [text='Campo obligatorio.']
 */
function showMessage (element, text = 'Campo obligatorio.') {
    removeMessage(element);
    const spanElement = document.createElement('span');
    const message = document.createTextNode(text);
    spanElement.appendChild(message);
    element.appendChild(spanElement);
}

/**
 * @description Elimina el elemento que muestra el
 * mensaje de error de un input.
 * @author Florencia Del Castillo Fleitas
 * @param {HTMLDivElement} element
 */
function removeMessage (element) {
    if (element.hasChildNodes()) {
        const children = [...element.children];
        children.forEach(child => {
            child.remove();
        });
    }
}

/**
 * BUSCAR TIENDA
 */
/** @type {HTMLButtonElement} */
const searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', () => {
    if (searchButton.firstElementChild.className === 'fas fa-search') {
        /** @type {String} */
        const id = document.querySelector('#tienda-id').value.trim();
        if (id.length !== 0) {
            if (requestType === 'xhr') {
                search.xhrGetTiendaById(id);
            } else if (requestType === 'fetch') {
                search.fetchGetTiendaById(id);
            } else if (requestType === 'jquery') {
                search.jQueryGetTiendaById(id);
            }
        } /* else {
            list.showErrorMessage('Tienda no encontrada.');
            searchButton.firstElementChild.className = 'fas fa-search';
        } */
    } else {
        removeSearchResult();
    }
});

/**
 * @description Devuelve el input y el botón de búsqueda
 * a su estado inicial y muestra la lista de tiendas
 * según la elección del usuario.
 * @author Florencia Del Castillo Fleitas
 */
function removeSearchResult () {
    const idInput = document.querySelector('#tienda-id');
    idInput.value = '';
    searchButton.firstElementChild.className = 'fas fa-search';
    if (requestType === 'xhr') {
        list.xhrGetTiendas();
    } else if (requestType === 'fetch') {
        list.fetchGetTiendas();
    } else if (requestType === 'jquery') {
        list.jQueryGetTiendas();
    }
}
