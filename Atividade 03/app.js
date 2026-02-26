/**************************************************************************
 * Objetivo: Arquivo responsável pelo recebimento de informações do usuário
 * Data: 25/02/2026 (quarta-feira)
 * Autor: Gustavo Vidal de Abreu
 * Versão: 1.0
**************************************************************************/

// Import da biblioteca de entrada de dados
const readline = require("readline");

// Criação do objeto que guarda as entradas de dados
const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Import das bibliotecas de validação e cálculos
let validacao   = require('./modulo/validacao.js')
let calculos    = require('./modulo/calculo.js')

// Import dos módulos de projetos
let imc         = require('./modulo/projetos/imc.js')
let media       = require('./modulo/projetos/media.js')
let tabuada     = require('./modulo/projetos/tabuada.js')
let fatorial    = require('./modulo/projetos/fatorial.js')
let par_impar   = require('./modulo/projetos/par_impar.js')

// Entrada do peso
entradaDeDados.question('\nDigite o peso em kg: ', function (peso) {
    let pesoInf = peso.replace(',', '.')
    let pesoVal = validacao.validarEntradaDeNumber(pesoInf)

    // Validação do peso e entrada da medicao
    if (pesoVal) {
        entradaDeDados.question('Qual formato você deseja para a altura? (m ou cm): ', function (medicao) {
            let medicaoInf = medicao.trim()
            let medicaoVal = validacao.validarEntradaDeString(medicaoInf)

            // Validação da medição e entrada da altura
            if (medicaoVal) {
                entradaDeDados.question(`Digite a altura em ${medicaoInf}: `, function (altura) {
                    let alturaInf = altura.replace(',', '.')
                    let alturaVal = validacao.validarEntradaDeNumber(alturaInf)

                    // Validação da altura e cálculo do IMC
                    if (alturaVal) {
                        let resultadoIMC = imc.calcularIMC(pesoInf, alturaInf, medicaoInf)
                        let classificacaoIMC = imc.classificarIMC(resultadoIMC)
                        
                        console.log(`\nO resultado do IMC é: ${resultadoIMC}`)
                        console.log(`Classificação do IMC: ${classificacaoIMC}`)
                        entradaDeDados.close()
                    } else {
                        console.log('Altura inválida!')
                        entradaDeDados.close()
                    }
                })
            } else {
                console.log('Medição inválida!')
                entradaDeDados.close()
            }
        })
    } else {
        console.log('Peso inválido!')
        entradaDeDados.close()
    }
})