import { readData, unnormalizeInput } from './utils.js';

const dataJSON = readData();

const createAutocomplete = (idSelector, key) => {
    const selector = `#${idSelector}`;

    new autoComplete({
        data: {
            src: dataJSON[key] || [],
            cache: false
        },
        searchEngine: 'loose',
        debounce: 300,
        threshold: 2,
        maxResults: 5,                 
        highlight: true,  
        selector,
        resultsList: {
            render: true
        },
        onSelection: ({ selection }) => {
            const el = document.querySelector(selector);
            el.value = unnormalizeInput(selection.value);
            el.dispatchEvent(new CustomEvent('change-value'));
        }
    });
};

const inputs = Object.values(document.querySelectorAll('.auto'));

inputs.forEach((el) => {
    el.addEventListener('focus', () => {
        Object.values(document.querySelectorAll('.autoComplete_result')).forEach((el) => el.remove());
    })
    createAutocomplete(el.id, el.name);
});
