const { app, BrowserWindow, ipcMain } = require('electron')

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

//Escutar evento de abrir janela
let sobreWindow = null
ipcMain.on('abrir-janela-sobre', () => {

    if(sobreWindow == null){
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 220,
            // fica sempre em cima
            alwaysOnTop: true,
            // barra de maximizar, minimizar e fechar
            frame: false
        });

        sobreWindow.on('closed', () => {
            sobreWindow = null
        })
    }

    sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`)
})

//Escutar evento de fechar janela
ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close()
})