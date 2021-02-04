const data = require('./data')
const { ipcMain } = require('electron')

module.exports = {
    templateInicial: null,

    geraTrayTemplate(win){
        let template = [
            {
                label: 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let cursos = data.pegaNomeDosCursos()
        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso)
                }
            }

            template.push(menuItem)
        })

        this.templateInicial = template
        return template
    },

    adionaCursoNoTray(nomeCurso, win){
        this.templateInicial.push({
            label: nomeCurso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', nomeCurso)
            }
        })

        return this.templateInicial;
    },

    geraMenuPrincipalTemplate(app){
        let templateMenu = [
            {
                label: 'Window',
                submenu: [
                    {
                        role: 'minimize'
                    },
                    {
                        role: 'close'
                    }
                ]
            },
            {
                label: 'View',
                submenu: [
                    {
                        role: 'reload'
                    },
                    {
                        role: 'toggledevtools'
                    }
                ]
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o Alura Timer',
                        //accelerator => Define um atalho
                        accelerator: 'CommandOrControl+I',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre')
                        }
                    }
                ]
            }
        ]
    
        // Corrigindo menu para MACOS
        if(process.platform == 'darwin'){
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    {
                        label: 'Estou rodando no Mac'
                    }
                ]
            })
        }

        return templateMenu
    }
}