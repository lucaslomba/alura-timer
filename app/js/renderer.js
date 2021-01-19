// IPC -> internal process comunication
const { ipcRenderer } = require('electron')

let linkSobre = document.querySelector('#link-sobre')
let botaoPlay = document.querySelector('.botao-play')

linkSobre.addEventListener('click', function (){
    ipcRenderer.send('abrir-janela-sobre')
})


let imagens = ['img/play-button.svg', 'img/stop-button.svg']
botaoPlay.addEventListener('click', function(){
    imagens = imagens.reverse() 
    botaoPlay.src = imagens[0]
})