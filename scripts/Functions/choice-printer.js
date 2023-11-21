

export function targetPrinterManual1() {
    document.getElementById('choice-printer-1-manual').className = 'red-pounter';
    document.getElementById('choice-printer-2-manual').className = 'grey-pointer';
};

export function targetPrinterManual2() {
    document.getElementById('choice-printer-1-manual').className = 'grey-pointer';
    document.getElementById('choice-printer-2-manual').className = 'red-pounter';
};

export function targetPrinterAuto1() {
    document.getElementById('choice-printer-1-auto').className = 'red-pounter';
    document.getElementById('choice-printer-2-auto').className = 'grey-pointer';
};

export function targetPrinterAuto2() {
    document.getElementById('choice-printer-1-auto').className = 'grey-pointer';
    document.getElementById('choice-printer-2-auto').className = 'red-pounter';
};

export function choicePrinterManual() {
    let printer1 = document.getElementById('choice-printer-1-manual').style.className;
    let printer2 = document.getElementById('choice-printer-2-manual').style.className;
    if (printer1 === 'red-pounter') {
        return ('printer1');
    } else if (printer2 === 'red-pounter') {
        return ('printer2');
    };
};

export function choicePrinterAuto() {
    let printer1 = document.getElementById('choice-printer-1-auto').style.className;
    let printer2 = document.getElementById('choice-printer-2-auto').style.className;
    if (printer1 === 'red-pounter') {
        return ('printer1');
    } else if (printer2 === 'red-pounter') {
        return ('printer2');
    };
};