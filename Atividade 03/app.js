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

// Import das bibliotecas de cálculos, formatação e validação
let calculos   = require('./modulo/calculo.js')
let formatacao = require('./modulo/formatacao.js')
let validacao  = require('./modulo/validacao.js')

// Entrada do tipo de calculadora que o usuário deseja utilizar
entradaDeDados.question('\nQual calculadora você deseja utilizar? (IMC, Média, Tabuada, Fatorial ou Par/Ímpar): ', function (tipoCalculadora) {
    let tipoCalculadoraInf  = tipoCalculadora.trim().toUpperCase()
    let tipoCalculadoraVal1 = validacao.validarEntradaDeString(tipoCalculadoraInf)
    let tipoCalculadoraVal2 = validacao.validarTipoDeCalculadora(tipoCalculadoraInf)

    if (tipoCalculadoraVal1 && tipoCalculadoraVal2) {
        let calculadora = formatacao.formatarTipoDeCalculadora(tipoCalculadoraInf)
        if (calculadora === 'IMC') {
            // Entrada do peso
            entradaDeDados.question('\nDigite o peso em kg: ', function (peso) {
                let pesoInf = peso.replace(',', '.')
                let pesoVal = validacao.validarEntradaDeNumber(pesoInf)

                // Validação do peso e entrada da medição
                if (pesoVal) {
                    entradaDeDados.question('Qual formato você deseja para a altura? (metros ou centímetros): ', function (medicao) {
                        let medicaoInf  = medicao.trim().toUpperCase()
                        let medicaoVal1 = validacao.validarEntradaDeString(medicaoInf)
                        let medicaoVal2 = validacao.validarMedicaoDeAltura(medicaoInf)

                        // Validação da medição e entrada da altura
                        if (medicaoVal1 && medicaoVal2) {
                            entradaDeDados.question(`Digite a altura em ${medicaoInf}: `, function (altura) {
                                let alturaInf = altura.replace(',', '.')
                                let alturaVal = validacao.validarEntradaDeNumber(alturaInf)

                                // Validação da altura e cálculo do IMC
                                if (alturaVal) {
                                    let resultadoIMC     = calculos.calcularIMC(pesoInf, alturaInf, medicaoInf)
                                    let classificacaoIMC = formatacao.formatarClassificacaoImc(resultadoIMC)

                                    console.log(`\nO resultado do IMC é: ${resultadoIMC}`)
                                    console.log(`Classificação do IMC: ${classificacaoIMC}`)
                                    entradaDeDados.close()
                                } else {
                                    console.log('\nAltura inválida!')
                                    entradaDeDados.close()
                                }
                            })
                        } else {
                            console.log('\nMedição inválida!')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('\nPeso inválido!')
                    entradaDeDados.close()
                }
            })
        } else if (calculadora === 'MÉDIA') {
            // Entrada do nome do professor
            entradaDeDados.question('\nDigite o nome do professor: ', function (nomeProfessor) {
                let nomeProfInf      = nomeProfessor.trim()
                let nomeProfessorVal = validacao.validarEntradaDeString(nomeProfInf)

                // Entrada do gênero do professor
                if (nomeProfessorVal) {
                    entradaDeDados.question('Digite o gênero do professor (MASCULINO ou FEMININO): ', function (generoProfessor) {
                        let generoProfInf  = generoProfessor.trim()
                        let generoProfVal1 = validacao.validarEntradaDeString(generoProfInf)
                        let generoProfVal2 = validacao.validarGenero(generoProfInf)
                        let sexoProfessor  = formatacao.formatarGeneroProfessor(generoProfessor)
                        
                        // Entrada do nome do aluno
                        if (generoProfVal1 && generoProfVal2) {
                            entradaDeDados.question('\nDigite o nome do aluno: ', function (nomeAluno) {
                                let nomeAlunoInf = nomeAluno.trim()
                                let nomeAlunoVal = validacao.validarEntradaDeString(nomeAlunoInf)

                                // Entrada do gênero do aluno
                                if (nomeAlunoVal) {
                                    entradaDeDados.question('Digite o gênero do aluno (MASCULINO ou FEMININO): ', function (generoAluno) {
                                        let generoAlunoInf  = generoAluno.trim()
                                        let generoAlunoVal1 = validacao.validarEntradaDeString(generoAlunoInf)
                                        let generoAlunoVal2 = validacao.validarGenero(generoAlunoInf)
                                        let sexoAluno       = formatacao.formatarGeneroAluno(generoAlunoInf)
                                        
                                        // Entrada do nome do curso
                                        if (generoAlunoVal1 && generoAlunoVal2) {
                                            entradaDeDados.question('\nDigite o nome do curso: ', function (nomeCurso) {
                                                let nomeCursoInf = nomeCurso.trim()
                                                let nomeCursoVal = validacao.validarEntradaDeString(nomeCursoInf)

                                                // Entrada da disciplina
                                                if (nomeCursoVal) {
                                                    entradaDeDados.question('Digite a disciplina: ', function (disciplina) {
                                                        let disciplinaInf = disciplina.trim()
                                                        let disciplinaVal = validacao.validarEntradaDeString(disciplinaInf)

                                                        // Entrada e validação das notas
                                                        if (disciplinaVal) {
                                                            console.log('\nAs notas devem ser entre 0 e 100. Use ponto ou vírgula para separar as casas decimais.')
                                                            entradaDeDados.question('Digite a primeira nota: ', function (nota1) {
                                                                let nota1Inf  = nota1.replace(',', '.')
                                                                let nota1Val1 = validacao.validarEntradaDeNumber(nota1Inf)
                                                                let nota1Val2 = validacao.validarTamanhoDaNota(nota1Inf)

                                                                if (nota1Val1 && nota1Val2) {
                                                                    entradaDeDados.question('Digite a segunda nota: ', function (nota2) {
                                                                        let nota2Inf  = nota2.replace(',', '.')
                                                                        let nota2Val1 = validacao.validarEntradaDeNumber(nota2Inf)
                                                                        let nota2Val2 = validacao.validarTamanhoDaNota(nota2Inf)

                                                                        if (nota2Val1 && nota2Val2) {
                                                                            entradaDeDados.question('Digite a terceira nota: ', function (nota3) {
                                                                                let nota3Inf  = nota3.replace(',', '.')
                                                                                let nota3Val1 = validacao.validarEntradaDeNumber(nota3Inf)
                                                                                let nota3Val2 = validacao.validarTamanhoDaNota(nota3Inf)

                                                                                if (nota3Val1 && nota3Val2) {
                                                                                    entradaDeDados.question('Digite a quarta nota: ', function (nota4) {
                                                                                        let nota4Inf  = nota4.replace(',', '.')
                                                                                        let nota4Val1 = validacao.validarEntradaDeNumber(nota4Inf)
                                                                                        let nota4Val2 = validacao.validarTamanhoDaNota(nota4Inf)

                                                                                        if (nota4Val1 && nota4Val2) {
                                                                                            let mediaFinal = calculos.calcularMedia(nota1Inf, nota2Inf, nota3Inf, nota4Inf)
                                                                                            let situacao   = formatacao.formatarMediaFinal(mediaFinal)
                                                                                            let texto      = formatacao.formatarSaidaMedia(situacao, 0, mediaFinal, 0, nomeCursoInf, disciplinaInf, nomeProfInf, nomeAlunoInf, sexoProfessor, sexoAluno, nota1Inf, nota2Inf, nota3Inf, nota4Inf, 0)
                                                                                            
                                                                                            if (situacao === 'recuperação') {
                                                                                                entradaDeDados.question('Digite a nota da recuperação: ', function (notaRecuperacao) {
                                                                                                    let notaRecuperacaoInf  = notaRecuperacao.replace(',', '.')
                                                                                                    let notaRecuperacaoVal1 = validacao.validarEntradaDeNumber(notaRecuperacaoInf)
                                                                                                    let notaRecuperacaoVal2 = validacao.validarTamanhoDaNota(notaRecuperacaoInf)
                                                                                                    
                                                                                                    if (notaRecuperacaoVal1 && notaRecuperacaoVal2) {
                                                                                                        let mediaRecuperacao = calculos.calcularMediaRecuperativa(mediaFinal, notaRecuperacaoInf)
                                                                                                        let situacaoFinal    = formatacao.formatarMediaRecuperativa(mediaRecuperacao)
                                                                                                        let texto            = formatacao.formatarSaidaMedia(situacao, situacaoFinal, mediaFinal, mediaRecuperacao, nomeCursoInf, disciplinaInf, nomeProfInf, nomeAlunoInf, sexoProfessor, sexoAluno, nota1Inf, nota2Inf, nota3Inf, nota4Inf, notaRecuperacaoInf)

                                                                                                        console.log(texto)
                                                                                                        entradaDeDados.close()
                                                                                                    } else {
                                                                                                        console.log('Nota de recuperação inválida!')
                                                                                                        entradaDeDados.close()
                                                                                                    }
                                                                                                })
                                                                                            } else {
                                                                                                console.log(texto)
                                                                                            }
                                                                                        } else {
                                                                                            console.log('\nNota 4 inválida!')
                                                                                            entradaDeDados.close()
                                                                                        }
                                                                                    })
                                                                                } else {
                                                                                    console.log('\nNota 3 inválida!')
                                                                                    entradaDeDados.close()
                                                                                }
                                                                            })
                                                                        } else {
                                                                            console.log('\nNota 2 inválida!')
                                                                            entradaDeDados.close()
                                                                        }
                                                                    })
                                                                } else {
                                                                    console.log('\nNota 1 inválida!')
                                                                    entradaDeDados.close()
                                                                }
                                                            })
                                                        } else {
                                                            console.log('\nDisciplina inválida!')
                                                            entradaDeDados.close()
                                                        }
                                                    })
                                                } else {
                                                    console.log('\nNome do curso inválido!')
                                                    entradaDeDados.close()
                                                }
                                            })
                                        } else {
                                            console.log('\nGênero inserido inválido!')
                                            entradaDeDados.close()
                                        }
                                    })
                                } else {
                                    console.log('\nNome do aluno inválido!')
                                    entradaDeDados.close()
                                }
                            })
                        } else {
                            console.log('\nGênero inserido inválido!')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('\nPermitido a entrada somente de letras!')
                    entradaDeDados.close()
                }
            })
        } else if (calculadora === 'TABUADA') {
            // Entrada do número para a primeira tabuada
            entradaDeDados.question('\nDigite um número maior que 1 para ser a primeira tabuada: ', function (numero) {
                let numero1Inf  = numero.trim()
                let numero1Val1 = validacao.validarEntradaDeNumber(numero1Inf)
                let numero1Val2 = validacao.validarNumeroParaTabuada(numero1Inf)

                // Validação do número e entrada do segundo número para a tabuada
                if (numero1Val1 && numero1Val2) {
                    entradaDeDados.question(`Digite um número maior que ${numero1Inf} para ser sequenciado até a tabuada final: `, function (numero2) {
                        let numero2Inf  = numero2.trim()
                        let numero2Val1 = validacao.validarEntradaDeNumber(numero2Inf)
                        let numero2Val2 = validacao.validarNumeroParaTabuada(numero2Inf)
                        let numero2Val3 = validacao.serMaior(numero2Inf, numero1Inf)

                        // Validação do segundo número e entrada do contador para a tabuada
                        if (numero2Val1 && numero2Val2 && numero2Val3) {
                            entradaDeDados.question('Digite um número para ser o 1º contador da tabuada: ', function (multiplicador) {
                                let contador1Inf  = multiplicador.trim()
                                let contador1Val1 = validacao.validarEntradaDeNumber(contador1Inf)
                                let contador1Val2 = validacao.serMaior(contador1Inf, -1)

                                // Validação do contador e entrada do contador final para a tabuada
                                if (contador1Val1 && contador1Val2) {
                                    entradaDeDados.question('Digite um número para ser o contador final da tabuada: ', function (contadorFinal) {
                                        let contador2Inf  = contadorFinal.trim()
                                        let contador2Val1 = validacao.validarEntradaDeNumber(contador2Inf)
                                        let contador2Val2 = validacao.serMaior(contador2Inf, contador1Inf)

                                        // Validação do contador final e cálculo da tabuada
                                        if (contador2Val1 && contador2Val2) {
                                            let resultadoTabuada = formatacao.formatarTabuada(numero1Inf, numero2Inf, contador1Inf, contador2Inf)

                                            console.log(`\nTabuada de ${numero1Inf} a ${numero2Inf} sequenciada de ${contador1Inf} a ${contador2Inf}:`)
                                            console.log(resultadoTabuada)
                                            entradaDeDados.close()
                                        } else {
                                            console.log('\nNúmero inválido ou menor que o primeiro contador!')
                                            entradaDeDados.close()
                                        }
                                    })
                                } else {
                                    console.log('\nNúmero inválido ou menor que zero!')
                                    entradaDeDados.close()
                                }
                            })
                        } else {
                            console.log('\nNúmero inválido ou menor que o primeiro!')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('\nNúmero inválido!')
                    entradaDeDados.close()
                }
            })
        } else if (calculadora === 'FATORIAL') {
            // Entrada do número para o cálculo do fatorial
            entradaDeDados.question('\nDigite um número inteiro maior que 1 para calcular o fatorial: ', function (numeroFatorial) {
                let numeroFatInf  = numeroFatorial.trim().replace(/!/g, '')
                let numeroFatVal1 = validacao.validarEntradaDeNumber(numeroFatInf)
                let numeroFatVal2 = validacao.validarNumeroInteiro(numeroFatInf)
                let numeroFatVal3 = validacao.serMaior(numeroFatInf, 1)

                // Validação do número para o cálculo do fatorial
                if (numeroFatVal1 && numeroFatVal2 && numeroFatVal3) {
                    let resultadoFat = calculos.calcularFatorial(numeroFatInf)
                    let expressao    = formatacao.formatarExpressaoFatorial(numeroFatInf)

                    console.log(`\nFatorial de ${numeroFatInf} é ${expressao} = ${resultadoFat}`)
                    entradaDeDados.close()
                } else {
                    console.log('\nDigite apenas números válidos! (maior que 1 e inteiro)')
                    entradaDeDados.close()
                }
            })
        } else {
            // Entrada do número inicial para o cálculo de pares e ímpares
            entradaDeDados.question('\nDigite o Número Inicial (0 até 500): ', function (numeroInicial) {
                let numeroIniInf  = numeroInicial.trim()
                let numeroIniVal1 = validacao.validarEntradaDeNumber(numeroIniInf)
                let numeroIniVal2 = validacao.validarNumeroInteiro(numeroIniInf)
                let numeroIniVal3 = validacao.serMaior(numeroIniInf, -1)
                let numeroIniVal4 = validacao.serMenor(numeroIniInf, 501)

                // Validação do número inicial e entrada do número final para o cálculo de pares e ímpares
                if (numeroIniVal1 && numeroIniVal2 && numeroIniVal3 && numeroIniVal4) {
                    entradaDeDados.question('Digite o Número Final (100 até 1000): ', function (numeroFinal) {
                        let numeroFinInf  = numeroFinal.trim()
                        let numeroFinVal1 = validacao.validarEntradaDeNumber(numeroFinInf)
                        let numeroFinVal2 = validacao.validarNumeroInteiro(numeroFinInf)
                        let numeroFinVal3 = validacao.serMaior(numeroFinInf, 99)
                        let numeroFinVal4 = validacao.serMenor(numeroFinInf, 1001)

                        // Validação do número final e entrada do tipo de separação para o cálculo de pares e ímpares
                        if (numeroFinVal1 && numeroFinVal2 && numeroFinVal3 && numeroFinVal4) {
                            entradaDeDados.question('\nVocê deseja calcular (PARES, ÍMPARES ou AMBOS)? ', function (tipoSeparacao) {
                                let tipo    = tipoSeparacao.trim()
                                let tipoVal = validacao.validarEntradaDeString(tipo)

                                if (tipoVal) {
                                    let retornoPar   = calculos.calcularPares(numeroIniInf, numeroFinInf)
                                    let retornoImp   = calculos.calcularImpares(numeroIniInf, numeroFinInf)
                                    let textoPares   = formatacao.formatarListaParesImpares('Lista de números Pares', retornoPar)
                                    let textoImpares = formatacao.formatarListaParesImpares('Lista de números Ímpares', retornoImp)
                                    let textoFinal   = formatacao.formatarSaidaParImpar(tipo, textoPares, textoImpares)

                                    console.log(textoFinal)
                                } else {
                                    console.log('\nProibido números e/ou vazio!')
                                }
                                entradaDeDados.close()
                            })
                        } else {
                            console.log('\nNúmero final inválido! Verifique os intervalos e regras.')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('\nNúmero inicial inválido! Verifique os intervalos e regras.')
                    entradaDeDados.close()
                }
            })
        }
    } else {
        console.log('\nTipo de calculadora inexistente!')
        entradaDeDados.close()
    }
})