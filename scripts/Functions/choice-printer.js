

export function targetPrinter1() {
    document.getElementById('choice-printer-1').className = 'red-pounter';
    document.getElementById('choice-printer-2').className = 'grey-pointer';
};

export function targetPrinter2() {
    document.getElementById('choice-printer-1').className = 'grey-pointer';
    document.getElementById('choice-printer-2').className = 'red-pounter';
};

export function choicePrinter() {
    let printer1 = document.getElementById('choice-printer-1').style.className;
    let printer2 = document.getElementById('choice-printer-2').style.className;
    if (printer1 === 'red-pounter') {
        return ('printer1');
    } else if (printer2 === 'red-pounter') {
        return ('printer2');
    };
};