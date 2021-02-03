// IPC -> internal process comunication
const { ipcRenderer } = require('electron')
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre')
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')

window.onload = () => {
    console.log("onload")
    data.pegaDados(curso.textContent)
        .then((dados) => {
            console.log(dados)
            tempo.textContent = dados.tempo
        })
}

linkSobre.addEventListener('click', function (){
    ipcRenderer.send('abrir-janela-sobre')
})


let imagens = ['img/play-button.svg', 'img/stop-button.svg']
let play = false
botaoPlay.addEventListener('click', function(){
    if(play){
        timer.parar(curso.textContent)
        play = false
    }else{
        timer.iniciar(tempo)
        play = true
    }
    imagens = imagens.reverse() 
    botaoPlay.src = imagens[0]
})