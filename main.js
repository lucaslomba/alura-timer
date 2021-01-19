const { app, BrowserWindow } = require('electron')

// Inicia aplicação
app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    })

    //__dirname -> diretorio atual
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
});

// Encerrar aplicação
app.on('window-all-closed', () => {
    app.quit();
})