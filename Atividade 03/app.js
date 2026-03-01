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
let calculos = require('./modulo/calculo.js')
let formatacao = require('./modulo/formatacao.js')
let validacao = require('./modulo/validacao.js')

// Entrada do tipo de calculadora que o usuário deseja utilizar
entradaDeDados.question('\nQual calculadora você deseja utilizar? (IMC, Média, Tabuada, Fatorial ou Par/Ímpar): ', function (tipoCalculadora) {
    let tipoCalculadoraInf = tipoCalculadora.trim().toUpperCase()
    let tipoCalculadoraVal = validacao.validarEntradaDeString(tipoCalculadoraInf)
    let tipoCalculadoraExistente = validacao.validarTipoDeCalculadora(tipoCalculadoraInf)

    if (tipoCalculadoraVal && tipoCalculadoraExistente) {
        let calculadora = formatacao.formatarTipoDeCalculadora(tipoCalculadoraInf)
        if (calculadora === 'IMC') {
            // Entrada do peso
            entradaDeDados.question('\nDigite o peso em kg: ', function (peso) {
                let pesoInf = peso.replace(',', '.')
                let pesoVal = validacao.validarEntradaDeNumber(pesoInf)

                // Validação do peso e entrada da medição
                if (pesoVal) {
                    entradaDeDados.question('Qual formato você deseja para a altura? (metros ou centímetros): ', function (medicao) {
                        let medicaoInf = medicao.trim().toUpperCase()
                        let medicaoVal1 = validacao.validarEntradaDeString(medicaoInf)
                        let medicaoVal2 = validacao.validarMedicaoDeAltura(medicaoInf)

                        // Validação da medição e entrada da altura
                        if (medicaoVal1 && medicaoVal2) {
                            entradaDeDados.question(`Digite a altura em ${medicaoInf}: `, function (altura) {
                                let alturaInf = altura.replace(',', '.')
                                let alturaVal = validacao.validarEntradaDeNumber(alturaInf)

                                // Validação da altura e cálculo do IMC
                                if (alturaVal) {
                                    let resultadoIMC = calculos.calcularIMC(pesoInf, alturaInf, medicaoInf)
                                    let classificacaoIMC = formatacao.formatarClassificacaoImc(resultadoIMC)

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
        } else if (calculadora === 'MÉDIA') {
            // Entrada do nome do professor
            entradaDeDados.question('\nDigite o nome do professor: ', function (nomeProfessor) {
                let nomeProfInf = nomeProfessor.trim()
                let nomeProfessorVal = validacao.validarEntradaDeString(nomeProfInf)

                // Entrada do gênero do professor
                if (nomeProfessorVal) {
                    entradaDeDados.question('Digite o gênero do professor (MASCULINO ou FEMININO): ', function (generoProfessor) {
                        let generoProfInf = generoProfessor.trim()
                        let generoProfessorVal = validacao.validarEntradaDeString(generoProfInf)
                        let sexoProfessor = formatacao.formatarGeneroProfessor(generoProfessor)

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
                                        let sexoAluno = formatacao.formatarGeneroAluno(generoAluno)

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
                                                                let nota1Val2 = validacao.validarTamanhoDaNota(nota1Inf)

                                                                if (nota1Val1 && nota1Val2) {
                                                                    entradaDeDados.question('Digite a segunda nota: ', function (nota2) {
                                                                        let nota2Inf = nota2.replace(',', '.')
                                                                        let nota2Val1 = validacao.validarEntradaDeNumber(nota2Inf)
                                                                        let nota2Val2 = validacao.validarTamanhoDaNota(nota2Inf)

                                                                        if (nota2Val1 && nota2Val2) {
                                                                            entradaDeDados.question('Digite a terceira nota: ', function (nota3) {
                                                                                let nota3Inf = nota3.replace(',', '.')
                                                                                let nota3Val1 = validacao.validarEntradaDeNumber(nota3Inf)
                                                                                let nota3Val2 = validacao.validarTamanhoDaNota(nota3Inf)

                                                                                if (nota3Val1 && nota3Val2) {
                                                                                    entradaDeDados.question('Digite a quarta nota: ', function (nota4) {
                                                                                        let nota4Inf = nota4.replace(',', '.')
                                                                                        let nota4Val1 = validacao.validarEntradaDeNumber(nota4Inf)
                                                                                        let nota4Val2 = validacao.validarTamanhoDaNota(nota4Inf)

                                                                                        if (nota4Val1 && nota4Val2) {
                                                                                            let mediaFinal = calculos.calcularMedia(nota1Inf, nota2Inf, nota3Inf, nota4Inf)
                                                                                            let situacao = formatacao.formatarMediaFinal(mediaFinal)

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
                                                                                                    let notaRecuperacaoVal2 = validacao.validarTamanhoDaNota(notaRecuperacaoInf)

                                                                                                    if (notaRecuperacaoVal1 && notaRecuperacaoVal2) {
                                                                                                        let mediaRecuperacao = calculos.calcularMediaRecuperativa(mediaFinal, notaRecuperacaoInf)
                                                                                                        let situacaoFinal = formatacao.formatarMediaFinal(mediaRecuperacao)

                                                                                                        console.log(`\nO ${sexoAluno} ${nomeAluno} foi ${situacaoFinal} na disciplina ${disciplina}.`)
                                                                                                        console.log(`Curso: ${nomeCurso}`)
                                                                                                        console.log(`${sexoProfessor}: ${nomeProfessor}`)
                                                                                                        console.log(`Notas: ${nota1Inf}, ${nota2Inf}, ${nota3Inf}, ${nota4Inf} e ${notaRecuperacaoInf}.`)
                                                                                                        console.log(`Média final: ${mediaFinal}`)
                                                                                                        console.log(`Média final do exame: ${mediaRecuperacao}`)
                                                                                                        entradaDeDados.close()
                                                                                                    } else {
                                                                                                        console.log('Nota de recuperação inválida!')
                                                                                                        entradaDeDados.close()
                                                                                                    }
                                                                                                })
                                                                                                entradaDeDados.close()
                                                                                            }
                                                                                        } else {
                                                                                            console.log('Nota 4 inválida!')
                                                                                            entradaDeDados.close()
                                                                                        }
                                                                                    })
                                                                                } else {
                                                                                    console.log('Nota 3 inválida!')
                                                                                    entradaDeDados.close()
                                                                                }
                                                                            })
                                                                        } else {
                                                                            console.log('Nota 2 inválida!')
                                                                            entradaDeDados.close()
                                                                        }
                                                                    })
                                                                } else {
                                                                    console.log('Nota 1 inválida!')
                                                                    entradaDeDados.close()
                                                                }
                                                            })
                                                        } else {
                                                            console.log('Disciplina inválida!')
                                                            entradaDeDados.close()
                                                        }
                                                    })
                                                } else {
                                                    console.log('Nome do curso inválido!')
                                                    entradaDeDados.close()
                                                }
                                            })
                                        } else {
                                            console.log('Gênero do aluno inválido!')
                                            entradaDeDados.close()
                                        }
                                    })
                                } else {
                                    console.log('Nome do aluno inválido!')
                                    entradaDeDados.close()
                                }
                            })
                        } else {
                            console.log('Gênero do professor inválido!')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('Nome do professor inválido!')
                    entradaDeDados.close()
                }
            })
        } else if (calculadora === 'TABUADA') {
            // Entrada do número para a primeira tabuada
            entradaDeDados.question('\nDigite um número maior que 1 para ser a primeira tabuada: ', function (numero) {
                let numeroInf = numero.trim()
                let numeroVal = validacao.validarEntradaDeNumber(numeroInf)
                let numeroMaiorQueUm = validacao.validarNumeroParaTabuada(numeroInf)

                // Validação do número e entrada do segundo número para a tabuada
                if (numeroVal && numeroMaiorQueUm) {
                    entradaDeDados.question(`Digite um número maior que ${numeroInf} para ser sequenciado até a tabuada final: `, function (numero2) {
                        let numero2Inf = numero2.trim()
                        let numero2Val = validacao.validarEntradaDeNumber(numero2Inf)
                        let numero2MaiorQuePrimeiroNumero = validacao.validarNumeroParaTabuada(numero2Inf)
                        let numero2MaiorQueNumero1 = validacao.serMaior(numero2Inf, numeroInf)

                        // Validação do segundo número e entrada do contador para a tabuada
                        if (numero2Val && numero2MaiorQuePrimeiroNumero && numero2MaiorQueNumero1) {
                            entradaDeDados.question('Digite um número para ser o 1º contador da tabuada: ', function (multiplicador) {
                                let contadorInf = multiplicador.trim()
                                let contadorVal = validacao.validarEntradaDeNumber(contadorInf)
                                let contadorMaiorOuIgualAZero = validacao.serMaior(contadorInf, -1)

                                // Validação do contador e entrada do contador final para a tabuada
                                if (contadorVal && contadorMaiorOuIgualAZero) {
                                    entradaDeDados.question('Digite um número para ser o contador final da tabuada: ', function (contadorFinal) {
                                        let contadorFinalInf = contadorFinal.trim()
                                        let contadorFinalVal = validacao.validarEntradaDeNumber(contadorFinalInf)
                                        let contadorFinalMaiorQueMultiplicador = validacao.serMaior(contadorFinalInf, contadorInf)

                                        // Validação do contador final e cálculo da tabuada
                                        if (contadorFinalVal && contadorFinalMaiorQueMultiplicador) {
                                            let resultadoTabuada = calculos.calcularTabuada(numeroInf, numero2Inf, contadorInf, contadorFinalInf)

                                            console.log(`\nTabuada de ${numeroInf} a ${numero2Inf} sequenciada de ${contadorInf} a ${contadorFinalInf}:`)
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
                let numeroFatorialInf = numeroFatorial.trim().replace(/!/g, '')
                let numeroFatorialVal = validacao.validarEntradaDeNumber(numeroFatorialInf)
                let numeroFatorialInteiro = validacao.validarNumeroInteiro(numeroFatorialInf)
                let numeroFatorialMaiorQueUm = validacao.serMaior(numeroFatorialInf, 1)

                // Validação do número para o cálculo do fatorial
                if (numeroFatorialVal && numeroFatorialInteiro && numeroFatorialMaiorQueUm) {
                    let resultadoFatorial = calculos.calcularFatorial(numeroFatorialInf)
                    let expressao = formatacao.formatarExpressaoFatorial(numeroFatorialInf)

                    console.log(`Fatorial de ${numeroFatorialInf} é ${expressao} = ${resultadoFatorial}`)
                    entradaDeDados.close()
                } else {
                    console.log('\nDigite apenas números válidos! (maior que 1 e inteiro)')
                    entradaDeDados.close()
                }
            })
        } else if (calculadora === 'PAR/ÍMPAR') {
            // Entrada do número inicial para o cálculo de pares e ímpares
            entradaDeDados.question('\nDigite o Número Inicial (0 até 500): ', function (numeroInicial) {
                let numeroInicialInf = numeroInicial.trim()
                let numeroInicialVal = validacao.validarEntradaDeNumber(numeroInicialInf)
                let numeroInicialInt = validacao.validarNumeroInteiro(numeroInicialInf)
                let numeroInicialMaiorOuIgualAZero = validacao.serMaior(numeroInicialInf, -1)
                let numeroInicialMenorOuIgualAQuinhentos = validacao.serMenor(numeroInicialInf, 501)

                // Validação do número inicial e entrada do número final para o cálculo de pares e ímpares
                if (numeroInicialVal && numeroInicialInt && numeroInicialMaiorOuIgualAZero && numeroInicialMenorOuIgualAQuinhentos) {
                    entradaDeDados.question('Digite o Número Final (100 até 1000): ', function (numeroFinal) {
                        let numeroFinalInf = numeroFinal.trim()
                        let numeroFinalVal = validacao.validarEntradaDeNumber(numeroFinalInf)
                        let numeroFinalInt = validacao.validarNumeroInteiro(numeroFinalInf)
                        let numeroFinalMaiorOuIgualACem = validacao.serMaior(numeroFinalInf, 99)
                        let numeroFinalMenorOuIgualAMil = validacao.serMenor(numeroFinalInf, 1001)

                        // Validação do número final e entrada do tipo de separação para o cálculo de pares e ímpares
                        if (numeroFinalVal && numeroFinalInt && numeroFinalMaiorOuIgualACem && numeroFinalMenorOuIgualAMil) {
                            entradaDeDados.question('\nVocê deseja calcular (PARES, ÍMPARES ou AMBOS)? ', function (tipoSeparacao) {
                                let tipo = tipoSeparacao.trim().toUpperCase()

                                let retornoPares = calculos.calcularPares(numeroInicialInf, numeroFinalInf)
                                let retornoImpares = calculos.calcularImpares(numeroInicialInf, numeroFinalInf)
                                let textoPares = formatacao.formatarListaParesImpares('Lista de números Pares', retornoPares)
                                let textoImpares = formatacao.formatarListaParesImpares('Lista de números Ímpares', retornoImpares)

                                if (tipo === 'PARES') {
                                    console.log(textoPares)
                                } else if (tipo === 'ÍMPARES' || tipo === 'IMPARES') {
                                    console.log(textoImpares)
                                } else if (tipo === 'AMBOS') {
                                    console.log(textoPares)
                                    console.log(textoImpares)
                                } else {
                                    console.log('\nOpção inválida!')
                                }
                                entradaDeDados.close()
                            })
                        } else {
                            console.log('\nValores inválidos! Verifique os intervalos e regras.')
                            entradaDeDados.close()
                        }
                    })
                } else {
                    console.log('\nNúmero inicial inválido! Verifique os intervalos e regras.')
                    entradaDeDados.close()
                }
            })
        } else {
            console.log('\nCalculadora informada invalidamente!')
            entradaDeDados.close()
        }
    } else {
        console.log('Tipo de calculadora inexistente!')
        entradaDeDados.close()
    }
})