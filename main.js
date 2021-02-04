const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron')
const data = require('./data')
const templateGenarator = require('./template')

let mainWindow = null
let tray = null

// Inicia aplicação
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400
    })

    tray = new Tray(__dirname + '/app/img/icon-tray.png');
    let template = templateGenarator.geraTrayTemplate(mainWindow)
    let trayMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(trayMenu);

    let templateMenu = templateGenarator.geraMenuPrincipalTemplate(app)
    let menuPrincipal = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menuPrincipal)

    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
        mainWindow.send('atalho-iniciar-parar');
    });

    //Iniciando com devTools aberto
    //mainWindow.openDevTools()

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

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.salvaDados(curso, tempoEstudado)
})

ipcMain.on('curso-adicionado', (event, novoCurso) => {
    let novoTemplate = templateGenarator.adionaCursoNoTray(novoCurso, mainWindow)
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate)
    tray.setContextMenu(novoTrayMenu);
})