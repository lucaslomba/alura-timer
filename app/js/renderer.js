// IPC -> internal process comunication
const { ipcRenderer } = require('electron')
const timer = require('./timer')
const data = require('../../data')

let linkSobre = document.querySelector('#link-sobre')
let botaoPlay = document.querySelector('.botao-play')
let tempo = document.querySelector('.tempo')
let curso = document.querySelector('.curso')
let botaoAdicionar = document.querySelector('.botao-adicionar')
let campoAdicionar = document.querySelector('.campo-adicionar')

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
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} foi parado!`,
            icon: 'img/icon.png'
        })
    }else{
        timer.iniciar(tempo)
        play = true
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} foi iniciado!`,
            icon: 'img/icon.png'
        })
    }
    imagens = imagens.reverse() 
    botaoPlay.src = imagens[0]
})

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
    timer.parar(curso.textContent)
    data.pegaDados(nomeCurso)
    .then((dados) => {
        tempo.textContent = dados.tempo
    }).catch((err) => {
        tempo.textContent = "00:00:00"
    })
    curso.textContent = nomeCurso;
})

botaoAdicionar.addEventListener('click', function(){

    if(campoAdicionar.value == ''){
        new Notification('Alura Timer', {
            body: `Erro ao adicionar o curso!`,
            icon: 'img/icon.png'
        })

        return;
    }

    let novoCurso = campoAdicionar.value
    curso.textContent = novoCurso
    tempo.textContent = '00:00:00'
    campoAdicionar.value =''
    ipcRenderer.send('curso-adicionado', novoCurso)
})

ipcRenderer.on('atalho-iniciar-parar', () => {
    let click = new MouseEvent('click');
    botaoPlay.dispatchEvent(click)
})