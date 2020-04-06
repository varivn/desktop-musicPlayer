const electron = require('electron');

const {app, BrowserWindow, Tray, Menu, ipcMain, Notification} = electron;
let win;
let tray;
let notification;

app.on('ready', () => {
    if(process.platform == "darwin"){
        app.dock.hide();
    }
    win = new BrowserWindow({
        width:450,
        height:500,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        resizable: false,
        skipTaskbar: true
    })
    
    win.hide();
    win.loadFile('index.html');
    tray = new Tray('./images/iconTemplate.png');

    tray.setToolTip('Tray MPlayer');

    tray.on('click', (event, bounds) => {
        
        let {x,y} = bounds;
        let {width, height} = win.getBounds();

        if(win.isVisible()){
            win.hide();
        }else{

            if(process.platform != 'darwin'){
                x = (x - width/2) - 100;
                y = y - height;
            }else{
                x = x - width/2;
            }

            win.setBounds({
                x,
                y,
                width,
                height
            })
            win.show();

        }
    })

    tray.on('right-click', () => {
        let template = [{role : 'quit'}];
        const menu = Menu.buildFromTemplate(template);
        tray.popUpContextMenu(menu);
    })

    win.on('blur', () => {
        win.hide();
    })

})

ipcMain.on('playing', (event, song) => {
    if(Notification.isSupported()){
        notification = new Notification({
            title: 'Now Playing',
            body: song,
            silent: true
        })
        notification.show();
    }
})