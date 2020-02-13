
import './autocomplete.js';
import './save.js';
import { readData, normalizeInput } from './utils.js';

// DATE
const updateDate = (date) => {
    const el = document.querySelector('#fab-date');
    el.innerHTML = new Date(date).toLocaleDateString();
}

const inputDate = document.querySelector('#date');
inputDate.valueAsDate = new Date();
updateDate(inputDate.value);

inputDate.addEventListener('change', ({ target }) => {
    updateDate(target.value);
});
// DATE ENDED

// TEXTAREA
const reactiveInputs = (selector) => {
    const elInput = document.querySelector(selector);
    const elText = document.querySelector(`${selector}-text`);
    const fn = ({ target }) => elText.innerHTML = normalizeInput(target.value);

    elInput.addEventListener('change-value', fn);
    elInput.addEventListener('change', fn);
};

reactiveInputs('#prescriptor');
reactiveInputs('#paciente');
// TEXTAREA ENDED

// ID
const pad = function(num) {
    const n = 8;
    return new Array(n).join('0').slice((n || 2) * -1) + num;
};

const idFormatted = pad(readData().id + 1);
Object.values(document.querySelectorAll('.conformidad')).forEach((el) => el.innerHTML = idFormatted);
// ID ENDED
