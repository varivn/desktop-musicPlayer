const electron = require('electron');

const {app, BrowserWindow} = electron;
let win;

app.on('ready', () => {
    win = new BrowserWindow({
        width:450,
        height:500,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    win.loadFile('index.html');
    
})