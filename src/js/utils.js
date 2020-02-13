const fs = require('fs');
const path = require('path');

const appPath = process.env.PORTABLE_EXECUTABLE_DIR || process.cwd();

const customDataPath = path.resolve(appPath, 'dirdata.txt');

if(!fs.existsSync(customDataPath)) {
    fs.writeFileSync(customDataPath, appPath);
}

const dirDataPath = fs.readFileSync(customDataPath).toString().trim();

export const destFolder = path.resolve(dirDataPath, 'data');
export const dataPath = path.resolve(destFolder, 'data.json');

export const ensureFolder = (folderPath) => {
    if(!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
};

ensureFolder(destFolder);    
if(!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '{"id": 0}');
}

export const readData = () => JSON.parse(fs.readFileSync(dataPath));

export const unnormalizeInput = (text) => text.trim().replace(/<br \/>/g, "\n");
export const normalizeInput = (text) => text.trim().replace(/\n/g, "<br />");