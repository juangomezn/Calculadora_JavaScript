import * as main from "./main.js";

const pantalla = document.getElementById('pantalla');
let n1 = null;
let operador = null;
let esperandoSegundoNumero = false;
let valorAnterior = '0';

function actualizarPantalla() {
    pantalla.textContent = valorAnterior;
}

document.querySelectorAll('#teclado > .tecla').forEach(tecla => {
    tecla.addEventListener('click', () => {
        const valor = tecla.textContent;

        if (valor === 'AC') {
            valorAnterior = '0';
            n1 = null;
            operador = null;
            esperandoSegundoNumero = false;
            actualizarPantalla();
            return;
        }

        if (valor === '←') {
            if (valorAnterior.length === 1) {
                valorAnterior = '0';
            } else {
                valorAnterior = valorAnterior.slice(0, -1);
            }
            actualizarPantalla();
            return;
        }

        if (['+', '-', '*', '/', '%'].includes(valor)) {
            if (operador !== null && !esperandoSegundoNumero) {
                calcular();
            }
            n1 = parseFloat(valorAnterior.replace(',', '.'));
            operador = valor;
            esperandoSegundoNumero = true;
            valorAnterior = '0';
            actualizarPantalla();
            return;
        }

        if (valor === '=') {
            if (operador === null) return;
            calcular();
            operador = null;
            return;
        }

        if (valor === ',') {
            if (valorAnterior.includes(',')) return;
            valorAnterior += valor;
        } else {
            if (valorAnterior === '0' || esperandoSegundoNumero) {
                valorAnterior = valor;
                esperandoSegundoNumero = false;
            } else {
                valorAnterior += valor;
            }
        }

        actualizarPantalla();
    });
});

function calcular() {
    if (operador === null) return;
    
    const n2 = parseFloat(valorAnterior.replace(',', '.'));
    let resultado;

    try {
        switch (operador) {
            case '+': resultado = main.sumar(n1, n2); break;
            case '-': resultado = main.restar(n1, n2); break;
            case '*': resultado = main.multiplicar(n1, n2); break;
            case '/': resultado = main.dividir(n1, n2); break;
            case '%': resultado = main.modulo(n1, n2); break;
        }

        valorAnterior = resultado.toString().replace('.', ',');
        n1 = resultado;
        esperandoSegundoNumero = true;
    } catch (error) {
        valorAnterior = 'Error';
        n1 = operador = null;
    }
    
    actualizarPantalla();
}