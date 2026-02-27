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
let validacao = require('./modulo/validacao.js')
let calculos = require('./modulo/calculo.js')

// Import dos módulos de projetos
let imc = require('./modulo/projetos/imc.js')
let media = require('./modulo/projetos/media.js')
let tabuada = require('./modulo/projetos/tabuada.js')
let fatorial = require('./modulo/projetos/fatorial.js')
let par_impar = require('./modulo/projetos/par_impar.js')

// Entrada do tipo de calculadora que o usuário deseja utilizar
entradaDeDados.question('\nQual calculadora você deseja utilizar? (IMC, Média, Tabuada, Fatorial ou Par/Ímpar): ', function (tipoCalculadora) {
    let tipoCalculadoraInf = tipoCalculadora.trim().toUpperCase()
    let tipoCalculadoraVal = validacao.validarEntradaDeString(tipoCalculadoraInf)
    let tipoCalculadoraExistente = validacao.validarTipoDeCalculadora(tipoCalculadoraInf)

    if (tipoCalculadoraVal && tipoCalculadoraExistente) {
        switch (tipoCalculadoraInf) {
            case 'IMC':
                // Entrada do peso
                entradaDeDados.question('\nDigite o peso em kg: ', function (peso) {
                    let pesoInf = peso.replace(',', '.')
                    let pesoVal = validacao.validarEntradaDeNumber(pesoInf)

                    // Validação do peso e entrada da medição
                    if (pesoVal) {
                        entradaDeDados.question('Qual formato você deseja para a altura? (m ou cm): ', function (medicao) {
                            let medicaoInf = medicao.trim()
                            let medicaoVal1 = validacao.validarEntradaDeString(medicaoInf)
                            let medicaoVal2 = imc.validarMedicaoDeAltura(medicaoInf)

                            // Validação da medição e entrada da altura
                            if (medicaoVal1 && medicaoVal2) {
                                entradaDeDados.question(`Digite a altura em ${medicaoInf}: `, function (altura) {
                                    let alturaInf = altura.replace(',', '.')
                                    let alturaVal = validacao.validarEntradaDeNumber(alturaInf)

                                    // Validação da altura e cálculo do IMC
                                    if (alturaVal) {
                                        let resultadoIMC = imc.calcularIMC(pesoInf, alturaInf, medicaoInf)
                                        let classificacaoIMC = imc.classificarIMC(resultadoIMC)

                                        console.log(`\nO resultado do IMC é: ${resultadoIMC}`)
                                        console.log(`Classificação do IMC: ${classificacaoIMC}`)
                                    } else {
                                        console.log('Altura inválida!')
                                    }
                                    entradaDeDados.close()
                                })
                            } else {
                                console.log('Medição inválida!')
                            }
                            entradaDeDados.close()
                        })
                    } else {
                        console.log('Peso inválido!')
                    }
                    entradaDeDados.close()
                })
                break;
            case 'MÉDIA' || 'MEDIA':
                // Entrada do nome do professor
                entradaDeDados.question('\nDigite o nome do professor: ', function (nomeProfessor) {
                    let nomeProfInf = nomeProfessor.trim()
                    let nomeProfessorVal = validacao.validarEntradaDeString(nomeProfInf)

                    // Entrada do gênero do professor
                    if (nomeProfessorVal) {
                        entradaDeDados.question('Digite o gênero do professor (MASCULINO ou FEMININO): ', function (generoProfessor) {
                            let generoProfInf = generoProfessor.trim()
                            let generoProfessorVal = validacao.validarEntradaDeString(generoProfInf)
                            let sexoProfessor = media.definirGeneroAoProfessor(generoProfessor)

                            // Entrada do nome do aluno
                            if (generoProfessorVal && sexoProfessor) {
                                entradaDeDados.question('\nDigite o nome do aluno: ', function (nomeAluno) {
                                    let nomeAlunoInf = nomeAluno.trim()
                                    let nomeAlunoVal = validacao.validarEntradaDeString(nomeAlunoInf)

                                    // Entrada do gênero do aluno
                                    if (nomeAlunoVal) {
                                        entradaDeDados.question('Digite o gênero do aluno (MASCULINO ou FEMININO): ', function (generoAluno) {
                                            let generoAlunoInf = generoAluno.trim()
                                            let generoAlunoVal = validacao.validarEntradaDeString(generoAlunoInf)
                                            let sexoAluno = media.definirGeneroAoAluno(generoAluno)

                                            // Entrada do nome do curso
                                            if (generoAlunoVal && sexoAluno) {
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
                                                                    let nota1Inf = nota1.replace(',', '.')
                                                                    let nota1Val1 = validacao.validarEntradaDeNumber(nota1Inf)
                                                                    let nota1Val2 = media.validarTamanhoDaNota(nota1Inf)

                                                                    if (nota1Val1 && nota1Val2) {
                                                                        entradaDeDados.question('Digite a segunda nota: ', function (nota2) {
                                                                            let nota2Inf = nota2.replace(',', '.')
                                                                            let nota2Val1 = validacao.validarEntradaDeNumber(nota2Inf)
                                                                            let nota2Val2 = media.validarTamanhoDaNota(nota2Inf)

                                                                            if (nota2Val1 && nota2Val2) {
                                                                                entradaDeDados.question('Digite a terceira nota: ', function (nota3) {
                                                                                    let nota3Inf = nota3.replace(',', '.')
                                                                                    let nota3Val1 = validacao.validarEntradaDeNumber(nota3Inf)
                                                                                    let nota3Val2 = media.validarTamanhoDaNota(nota3Inf)

                                                                                    if (nota3Val1 && nota3Val2) {
                                                                                        entradaDeDados.question('Digite a quarta nota: ', function (nota4) {
                                                                                            let nota4Inf = nota4.replace(',', '.')
                                                                                            let nota4Val1 = validacao.validarEntradaDeNumber(nota4Inf)
                                                                                            let nota4Val2 = media.validarTamanhoDaNota(nota4Inf)

                                                                                            if (nota4Val1 && nota4Val2) {
                                                                                                let mediaFinal = calculos.calcularMedia(nota1Inf, nota2Inf, nota3Inf, nota4Inf)
                                                                                                let situacao = media.classificarMedia(mediaFinal)

                                                                                                if (situacao === 'aprovado' || situacao === 'reprovado') {
                                                                                                    console.log(`\nO ${sexoAluno} ${nomeAluno} foi ${situacao} na disciplina ${disciplina}.`)
                                                                                                    console.log(`Curso: ${nomeCurso}`)
                                                                                                    console.log(`${sexoProfessor}: ${nomeProfessor}`)
                                                                                                    console.log(`Notas: ${nota1Inf}, ${nota2Inf}, ${nota3Inf} e ${nota4Inf}.`)
                                                                                                    console.log(`Média final: ${mediaFinal}`)
                                                                                                    entradaDeDados.close()
                                                                                                } else {
                                                                                                    entradaDeDados.question('Digite a nota da recuperação: ', function (notaRecuperacao) {
                                                                                                        let notaRecuperacaoInf = notaRecuperacao.replace(',', '.')
                                                                                                        let notaRecuperacaoVal1 = validacao.validarEntradaDeNumber(notaRecuperacaoInf)
                                                                                                        let notaRecuperacaoVal2 = media.validarTamanhoDaNota(notaRecuperacaoInf)

                                                                                                        if (notaRecuperacaoVal1 && notaRecuperacaoVal2) {
                                                                                                            let mediaRecuperacao = calculos.calcularMediaRecuperativa(mediaFinal, notaRecuperacaoInf)
                                                                                                            let situacaoFinal = media.classificarMedia(mediaRecuperacao)

                                                                                                            console.log(`\nO ${sexoAluno} ${nomeAluno} foi ${situacaoFinal} na disciplina ${disciplina}.`)
                                                                                                            console.log(`Curso: ${nomeCurso}`)
                                                                                                            console.log(`${sexoProfessor}: ${nomeProfessor}`)
                                                                                                            console.log(`Notas: ${nota1Inf}, ${nota2Inf}, ${nota3Inf}, ${nota4Inf} e ${notaRecuperacaoInf}.`)
                                                                                                            console.log(`Média final: ${mediaFinal}`)
                                                                                                            console.log(`Média final do exame: ${mediaRecuperacao}`)
                                                                                                        } else {
                                                                                                            console.log('Nota de recuperação inválida!')
                                                                                                        }
                                                                                                        entradaDeDados.close()
                                                                                                    })
                                                                                                }
                                                                                                entradaDeDados.close()
                                                                                            } else {
                                                                                                console.log('Nota 4 inválida!')
                                                                                            }
                                                                                            entradaDeDados.close()
                                                                                        })
                                                                                    } else {
                                                                                        console.log('Nota 3 inválida!')
                                                                                    }
                                                                                    entradaDeDados.close()
                                                                                })
                                                                            } else {
                                                                                console.log('Nota 2 inválida!')
                                                                            }
                                                                            entradaDeDados.close()
                                                                        })
                                                                    } else {
                                                                        console.log('Nota 1 inválida!')
                                                                    }
                                                                    entradaDeDados.close()
                                                                })
                                                            } else {
                                                                console.log('Disciplina inválida!')
                                                            }
                                                            entradaDeDados.close()
                                                        })
                                                    } else {
                                                        console.log('Nome do curso inválido!')
                                                    }
                                                    entradaDeDados.close()
                                                })
                                            } else {
                                                console.log('Gênero do aluno inválido!')
                                            }
                                            entradaDeDados.close()
                                        })
                                    } else {
                                        console.log('Nome do aluno inválido!')
                                    }
                                    entradaDeDados.close()
                                })
                            } else {
                                console.log('Gênero do professor inválido!')
                            }
                            entradaDeDados.close()
                        })
                    } else {
                        console.log('Nome do professor inválido!')
                    }
                    entradaDeDados.close()
                })
                break;
            case 'TABUADA':
                // Entrada do número para a primeira tabuada
                entradaDeDados.question('\nDigite um número maior que 1 para ser a primeira tabuada: ', function (numero) {
                    let numeroInf = numero.trim()
                    let numeroVal = validacao.validarEntradaDeNumber(numeroInf)
                    let numeroMaiorQueUm = tabuada.validarNumeroParaTabuada(numeroInf)

                    if (numeroVal && numeroMaiorQueUm) {
                        entradaDeDados.question(`Digite um número maior que ${numeroInf} para ser sequenciado até a tabuada final: `, function (numero2) {
                            let numero2Inf = numero2.trim()
                            let numero2Val = validacao.validarEntradaDeNumber(numero2Inf)
                            let numero2MaiorQuePrimeiroNumero = tabuada.validarNumeroParaTabuada(numero2Inf)
                            let numero2MaiorQueNumero1 = validacao.serMaior(numero2Inf, numeroInf)

                            if (numero2Val && numero2MaiorQuePrimeiroNumero && numero2MaiorQueNumero1) {
                                entradaDeDados.question('Digite um número para ser o 1º contador da tabuada: ', function (multiplicador) {
                                    let contadorInf = multiplicador.trim()
                                    let contadorVal = validacao.validarEntradaDeNumber(contadorInf)
                                    let contadorMaiorOuIgualAZero = validacao.serMaior(contadorInf, -1)

                                    if (contadorVal && contadorMaiorOuIgualAZero) {
                                        entradaDeDados.question('Digite um número para ser o contador final da tabuada: ', function (contadorFinal) {
                                            let contadorFinalInf = contadorFinal.trim()
                                            let contadorFinalVal = validacao.validarEntradaDeNumber(contadorFinalInf)
                                            let contadorFinalMaiorQueMultiplicador = validacao.serMaior(contadorFinalInf, contadorInf)

                                            if (contadorFinalVal && contadorFinalMaiorQueMultiplicador) {
                                                let resultadoTabuada = tabuada.calcularTabuada(numeroInf, numero2Inf, contadorInf, contadorFinalInf)

                                                console.log(`\nTabuada de ${numeroInf} a ${numero2Inf} sequenciada de ${contadorInf} a ${contadorFinalInf}:`)
                                                console.log(resultadoTabuada)
                                            } else {
                                                console.log('\nNúmero inválido ou menor que o primeiro contador!')
                                            }

                                            entradaDeDados.close()
                                        })
                                    } else {
                                        console.log('\nNúmero inválido ou menor que zero!')
                                    }
                                    entradaDeDados.close()
                                })
                            } else {
                                console.log('\nNúmero inválido ou menor que o primeiro!')
                            }
                            entradaDeDados.close()
                        })
                    } else {
                        console.log('\nNúmero inválido!')
                    }
                    entradaDeDados.close()
                })
                break;
            case 'FATORIAL':
                // Entrada do número para o cálculo do fatorial
                entradaDeDados.question('\nDigite um número inteiro maior que 1 para calcular o fatorial: ', function (numeroFatorial) {
                    let numeroFatorialInf = numeroFatorial.trim().replace(/!/g, '')
                    let numeroFatorialVal = validacao.validarEntradaDeNumber(numeroFatorialInf)
                    let numeroFatorialInteiro = validacao.validarNumeroInteiro(numeroFatorialInf)
                    let numeroFatorialMaiorQueUm = validacao.serMaior(numeroFatorialInf, 1)

                    if (numeroFatorialVal && numeroFatorialInteiro && numeroFatorialMaiorQueUm) {
                        let resultadoFatorial = fatorial.calcularFatorial(numeroFatorialInf)
                        let expressao = fatorial.montarExpressaoFatorial(numeroFatorialInf)
                        console.log(`Fatorial de ${numeroFatorialInf} é ${expressao} = ${resultadoFatorial}`)
                    } else if (!numeroFatorialInteiro) {
                        console.log('\nO número precisa ser inteiro!')
                    } else if (!numeroFatorialMaiorQueUm) {
                        console.log('\nNão existe fatorial para 0 e 1. Digite um número maior que 1.')
                    } else {
                        console.log('\nDigite apenas números válidos!')
                    }
                    entradaDeDados.close()
                })
                break;
            default:
                console.log('Calculadora informada invalidamente!')
                entradaDeDados.close()
        }
    } else {
        console.log('Tipo de calculadora inexistente!')
        entradaDeDados.close()
    }
})