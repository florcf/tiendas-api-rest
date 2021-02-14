import * as request from './list-tiendas.js';


/** @type {String} */
/** Tipo de petición seleccionada por el usuario. */
let requestType = '';

/** @type {HTMLButtonElement} */
const xhrButton = document.querySelector('#xhr');
xhrButton.addEventListener('click', () => {
    requestType = 'xhr';
    request.xhrGetTiendas();
})

/** @type {HTMLButtonElement} */
const fetchButton = document.querySelector('#fetch');
fetchButton.addEventListener('click', () => {
    requestType = 'fetch';
    request.fetchGetTiendas()
})

/** @type {HTMLButtonElement} */
const jQueryButton = document.querySelector('#jquery');
jQueryButton.addEventListener('click', () => {
    requestType = 'jquery';
    request.jQueryGetTiendas();
})


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
})

/** @type {HTMLInputElement} */
const addTiendaBtn = document.querySelector('#add-tienda');
addTiendaBtn.addEventListener('click', () => {
    formValidity();
})

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
function addInputsEvent() {
    formTextInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInput(input);
        })
    });
}

/**
 * @description Verifica si el formulario cumple
 * con todas las validaciones. Si algún input no cumple
 * todas las validaciones, se vuelve a llamar a la función
 * checkInput para todos ellos.
 * @author Florencia Del Castillo Fleitas
 */
function formValidity() {
    if (!form.checkValidity()) {
        formTextInputs.forEach(input => {
            checkInput(input);
        });
    } else {
        // Método POST
    }
}

/**
 * @description Valida cada uno de los inputs.
 * Muestra mensajes de error y añade o elimina
 * las clases css necesarias.
 * @author Florencia Del Castillo Fleitas
 * @param {*} element
 */
function checkInput(element) {
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
 * @param {*} element
 * @param {string} [text='Campo obligatorio.']
 */
function showMessage(element, text = 'Campo obligatorio.') {
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
 * @param {*} element
 */
function removeMessage(element) {
    if (element.hasChildNodes()) {
        const children = [...element.children];
        children.forEach(child => {
            child.remove();
        });
    }
}