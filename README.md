# App Electron to create pdf of consent

#### Installation

Install ([node 8](https://nodejs.org/es/download/) or higher):

```
git clone https://github.com/Oyola1987/electron-pdf-generator
cd electron-pdf-generator
```

The first time it will generate a folder called `data` where the application will save the data it needs.

Another file will be created, this file called `dirdata.txt` contains the path where the `data` folder will be generated.

When `dirdata.txt` is changed, it is required to close and open the application.

By default, this folder `data` and file `dirdata.txt` will be generated in the same folder where the applicacion is running however you can edit this `dirdata.txt` file to change where the `data` folder will be created.

#### Develop

`npm run dev`

Run electron in debug mode, usefull to develop

#### Build

`npm run build`

This command generate a directory "bin" with binaries for windows and linux

#### Testing

No tests

#### Libraries

This code works with the following libraries:

* [@tarekraafat/autocomplete.js](https://www.npmjs.com/package/@tarekraafat/autocomplete.js?ref=producthunt)
* [html2canvas](https://www.npmjs.com/package/html2canvas)
* [jspdf](https://github.com/MrRio/jsPDF)
