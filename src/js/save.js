const fs = require('fs');
const path = require('path');
const jsPDF = require('jspdf');
const html2canvas = require('html2canvas');
const { execSync } = require('child_process');
const isWin = process.platform === "win32";

import { destFolder, dataPath, readData, ensureFolder, normalizeInput } from './utils.js';

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const writeAndOpenPDF = (data, date, tag) => {        
    let filePath = path.resolve(destFolder, 'pdf');
    ensureFolder(filePath);

    const year = new Date(date).getFullYear();
    filePath = path.resolve(filePath, year.toString());
    ensureFolder(filePath);
    
    const month = new Date(date).getMonth();
    filePath = path.resolve(filePath, `${(month + 1)}_${months[month]}`);
    ensureFolder(filePath);

    const getId = document.querySelector('.conformidad').innerHTML;
    filePath = path.resolve(filePath, `${getId}_${tag}.pdf`);
    fs.writeFileSync(filePath, data, 'binary');
    execSync(isWin ? `start "" "${filePath}"` : `xdg-open ${filePath}`);
};

const buildPDF = (selector, orientation) => {
    return html2canvas(document.querySelector(selector))
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation,
            });
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            return pdf.output();            
        });
};

const buildData = () => {
    const inputs = Object.values(document.querySelectorAll('.auto'));
    const dataJSON = readData();
    dataJSON.id = dataJSON.id + 1;

    inputs.forEach((el) => {
        const value = el.value.trim();
        if (value) {
            const values = dataJSON[el.name] || [];
            values.push(normalizeInput(value));
            dataJSON[el.name] = [...new Set(values)];
        }

        const newEl = document.createElement('span');
        newEl.classList = `${el.tagName.toLowerCase()}-print`;
        newEl.innerHTML = normalizeInput(value);
        el.replaceWith(newEl);
    });

    return dataJSON;
};

const replaceDate = () => {
    const dateEl = document.querySelector('#date');
    const date = dateEl.value;
    const newEl = document.createElement('h2');
    newEl.innerHTML = new Date(date).toLocaleDateString();
    dateEl.replaceWith(newEl);
    return date;
}

document.querySelector('.save').addEventListener('click', () => {
    Object.values(document.querySelectorAll('.autoComplete_result')).forEach((el) => el.remove());
    Object.values(document.querySelectorAll('#autoComplete_list')).forEach((el) => el.remove());
    window.scroll(0, 0);
    document.querySelector('#loader-container').classList = '';
    const dataJSON = buildData();
    const date = replaceDate();

    ensureFolder(destFolder);
    fs.writeFileSync(dataPath, JSON.stringify(dataJSON, null, 4));

    Promise.all([
        buildPDF('.page1', 'landscape'),
        buildPDF('.page2', 'portrait')
    ]).then((results) => {
        writeAndOpenPDF(results[0], date, 'conformidad');
        writeAndOpenPDF(results[1], date, 'tarjeta');
        window.location.reload(true);
    }); 
});