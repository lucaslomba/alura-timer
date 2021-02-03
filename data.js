const jsonfile = require('jsonfile-promised')
const fs = require('fs')

module.exports = {
    salvaDados(curso, tempoEstudado){
        let arquivoDoCurso = __dirname + '/data/' + curso + '.json'
        if(fs.existsSync(arquivoDoCurso)){
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado)
        }else{
            this.criaArquivoDeCurso(arquivoDoCurso, {})
                .then(()=>{
                    this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado)
                })
        }
    },

    adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado){
        let dados = {
           ultimoEstudo: new Date().toString(),
           tempo: tempoEstudado
        }

        jsonfile.writeFile(arquivoDoCurso, dados, {spaces: 2})
                .then(()=>{
                    console.log("Tempo salvo com sucuesso")
                }).catch((err)=>{
                    console.log(err)
                })
    },

    criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
                .then(()=>{
                    console.log('Arquivo criado')
                }).catch((err) => {
                    console.log(err)
                })
    },

    pegaDados(curso){
        let arquivoDoCurso = __dirname + '/data/' + curso + '.json'
        return jsonfile.readFile(arquivoDoCurso)
    }
}