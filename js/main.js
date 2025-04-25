function sumar(n1, n2) {
    return n1 + n2;
}

function restar(n1, n2) {
    return n1 - n2;
}

function dividir(n1, n2) {
    if (n2 === 0) throw new Error("División por cero");
    return n1 / n2;
}

function multiplicar(n1, n2) {
    return n1 * n2;
}

function modulo(n1, n2) {
    return n1 % n2;
}

export { sumar, restar, dividir, multiplicar, modulo };