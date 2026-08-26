// 705.484.450-52 070.987.720-03
/*
7x  0x  5x  4x  8x  4x  4x  5x  0x
10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o primeiro dígito for maior que 9, consideramos 0.

7x  0x  5x  4x  8x  4x  4x  5x  0x  5x
11  10  9   8   7   6   5   4   3   2
77  0   45  32  56  24  20  20  0   10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o primeiro dígito for maior que 9, consideramos 0.
*/





function validarCPF(cpf) {
    let cpfLimpo = cpf.replace(/\D/g, '');

    if(cpfLimpo.length !== 11) {
        return false;
    }

    let cpfBaseArray = Array.from(cpfLimpo.slice(0, -2));

    let accu1 = 10;
    let result1 = cpfBaseArray.reduce((accu, v, k) => {
        accu = accu + accu1 * Number(v);
        accu1--;
        return accu;
    }, 0);

    function validaPrimeiroDigito(num) {
        let conta = 11 - (num % 11);
        if( conta > 9) {
            return 0;
        }
        return (conta > 9 ? 0 : conta);
    }


    let num11 = validaPrimeiroDigito(result1);
    let cpfBaseArrayAppended11 = [...cpfBaseArray, num11];

    let accu2 = 11;
    let result2 = cpfBaseArrayAppended11.reduce((accu, v, k) => {
        accu = accu + accu2 * v;
        accu2--;
        return accu;
    }, 0);

    let num12 = validaPrimeiroDigito(result2);
    let cpfBaseArrayAppended12 = [...cpfBaseArrayAppended11, num12];
    
    return cpfLimpo === cpfBaseArrayAppended12.join('');
}

let cpf = "070.987.720-03";
console.log(validarCPF(cpf));


