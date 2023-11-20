import { logoCodeRevers } from "./backendRequests.js";

const tagCode = {
    //* Функция формирования готового кода бирки
    constructorlabelCode: async function () {
        let head = await hade();                                                                //? Получение Шапки кода Бирки
        let logoCod = '';
        let center = '';
        let barcode = '';
        for (let child of document.getElementById('label-borders').children) {                  //? Получаем данные из каждого элемента массива дочерних элементов
            if (child.id.includes('logo')) {
                logoCod += await logoCodeNext(child);
            } else if (child.id.includes('string')) {
                center += stringCode(child);
            } else if (child.id.includes('divBar')) {
                barcode += barCode(child);                                                      //? Формируем штрихкод
            };
        };
        const xz = "^XZ" + '(NL)' + "^XA^PON^LT0^PW1200^LH0,0^XZ";                                //? Конечный код бирки
        let readyTagCode = head + logoCod + center + barcode + xz;                              //? Формируем готовый код бирки
        return (readyTagCode);
    },
    //* Функция формирования шапки кода бирки
    hade: async function () {
        const nl = '(NL)';                                                          //? nl обзац для бека
        const xa = "^XA";                                                           //? Часть кода бирки
        let pq1y = numberTags();                                                    //? Получаем количество бирок
        const pon = "^PON";                                                         //? Часть кода бирки
        const lt = "^LT0";                                                          //? Часть кода бирки
        const pw = "^PW1200";                                                       //? Часть кода бирки
        const lh = "^LH0,0";                                                        //? Часть кода бирки
        const fwr = "^FWR";                                                         //? Часть кода бирки
        const prc = "^PRC";                                                         //? Часть кода бирки
        const mmt = "^MMT";                                                         //? Часть кода бирки
        const fs = "^FS";                                                           //? Часть кода бирки
        const cwt = "^CWT,";                                                        //? Часть кода бирки
        const e = 'E:TT0003M_.FNT';                                                 //? Часть кода бирки
        const ci = '^CI28';                                                         //? Часть кода бирки
        const cft = "^CFT,0,0";                                                     //? Часть кода бирки
        return (xa + nl + pq1y + pon + lt + pw + lh + nl + fwr + prc + mmt + fs + cwt + e + ci + cft + nl);  //? Формируем шапку
    },
    //* Функция расчёта количества бирок из бека
    numberTagsBack: function (tag) {
        switch (tag) {
            case "^PQ1Y":
                document.getElementById('number-tags').value = "1";
                break;
            case "^PQ2Y":
                document.getElementById('number-tags').value = "2";
                break;
            case "^PQ3Y":
                document.getElementById('number-tags').value = "3";
                break;
            case "^PQ4Y":
                document.getElementById('number-tags').value = "4";
                break;
            case "^PQ5Y":
                document.getElementById('number-tags').value = "5";
                break;
            case "^PQ6Y":
                document.getElementById('number-tags').value = "6";
                break;
            default:
                break;
        }
    },
    //* Функция расчёта количества бирок в код бирки
    numberTags: function () {
        let numTag = document.getElementById('number-tags').value;
        let stringTag;
        switch (numTag) {
            case "1":
                stringTag = "^PQ1Y(NL)";
                break;
            case "2":
                stringTag = "^PQ2Y(NL)";
                break;
            case "3":
                stringTag = "^PQ3Y(NL)";
                break;
            case "4":
                stringTag = "^PQ4Y(NL)";
                break;
            case "5":
                stringTag = "^PQ5Y(NL)";
                break;
            case "6":
                stringTag = "^PQ6Y(NL)";
                break;
            default:
                break;
        }
        return (stringTag);
    },
    //* Функция формирования кода логотипа
    logoCodeNext: async function (child) {
        let position;
        let firstLogo = child.id;                                                   //? Получение имени логотипа
        let transform = child.style.transform;                                      //? Получаем свойство трансформ
        let left = Number(child.style.left.split('px').join(""));                   //? Левая позиция логотипа
        let top = Number(child.style.top.split('px').join(""));                     //? Правая позиция логотипа
        let width = Number(child.offsetWidth);                                      //? Получаем ширину логотипа
        let height = Number(child.offsetHeight);                                    //? Получаем высоту логотипа
        let logotip = await logoCodeRevers(firstLogo, transform);                   //? Получаем Код логотипа
        const fo = "^FO";                                                           //? Часть кода бирки
        const nl = '(NL)';
        if (transform === "rotate(90deg)" || transform === "rotate(270deg)") {
            let w = width / 2;
            left = w + left;
            left = left - 29;
            top = top + width + 25;
        } else { };
        let leftPos = String(left * 2);
        let topPos = String(2 * (550 - (top + height)));
        position = topPos + ',' + leftPos;
        return (fo + position + logotip + nl);
    },
    //* Функция формирования кода созданных строковых элементов
    stringCode: function (child) {
        let size = Number(child.style.fontSize.split('px').join(""));                               //? Получаем размер символов
        let transform = child.style.transform;                                                      //? Получаем значение поворота строки
        let sizeFatty = child.style.fontWeight;                                                     //? Получаем параметр жирности шрифта
        let stringSize = calculateSize(size);                                                       //? Расчёт размера символов
        let string = child.innerHTML;                                                               //? Получили строку
        if (string.includes('&lt')) {
            string = string.replace(/&lt;/g, '<');                                                  //? Замена символов &lt;
            string = string.replace(/&gt;/g, '>');                                                  //? Замена символов &gt;
        } else { };
        let height = Number(child.offsetHeight);                                                    //? Получаем высоту элемента
        let width = Number(child.offsetWidth);                                                      //? Получаем ширину элемента
        let leftWidth;
        const fo = "^FO";                                                                           //? Часть кода бирки
        let ar = rotetString(transform, sizeFatty);                                                 //? Вызов функции определения поворота строки
        const fd = "^FD";                                                                           //? Часть кода бирки
        const fx = "^FX";                                                                           //? Часть кода бирки
        const fs = "^FS(NL)";                                                                       //? Часть кода бирки
        let left = Number(child.style.left.split('px').join(""));                                   //? Получаем позицию left
        let top = Number(child.style.top.split('px').join(""));                                     //? Получаем позицию Top
        if (transform === "rotate(90deg)" || transform === "rotate(270deg)") {                      //? Проверка на поворот строки
            let w = width / 2;
            leftWidth = w + left;
            left = leftWidth;
            top = top + w;
        };
        let topPosition = String(2 * (550 - (top + height)));                                       //? Получаем позицию
        let code = fo + topPosition + ',' + String(2 * left) + ar + stringSize + fd + string + fs;  //? Формируем код строки
        return (code);
    },
    //* Функция формирования кода поворота строки
    rotetString: function (transform, sizeFatty) {
        let pos;
        let ar;
        if (sizeFatty === 'bolder') {                                                               //? Присваиваем параметр жирности шрифта в код
            ar = '^A0R,';
        } else {
            ar = '^A@R,';
        };
        if (transform === "rotate(0deg)") {
            if (ar === "^A@R,") {
                pos = '^A@R,';
            } else if (ar === '^A0R,') {
                pos = '^A0R,';
            };
        } else if (transform === "rotate(90deg)") {
            if (ar === "^A@R,") {
                pos = '^A@I,';
            } else if (ar === '^A0R,') {
                pos = '^A0I,';
            };
        } else if (transform === "rotate(180deg)") {
            if (ar === "^A@R,") {
                pos = '^A@B,';
            } else if (ar === '^A0R,') {
                pos = '^A0B,';
            };
        } else if (transform === "rotate(270deg)") {
            if (ar === "^A@R,") {
                pos = '^A@N,';
            } else if (ar === '^A0R,') {
                pos = '^A0N,';
            };
        } else {
            pos = "^A@R,";
        };
        return (pos);
    },
    //* Функция формирования Кода штрихкода
    barCode: function (child) {
        let rotation = child.style.transform;
        let bar = child;
        let fo = "^FO";
        let fs = '^FS(NL)';
        let fd = "^FD";
        let bc = transformBarCode(rotation);
        let fw = '^FW';
        let by = "^BY3,1,110";
        let leftPosBar = Number(bar.style.left.split('px').join(""));
        let heightBar = Number(bar.offsetHeight);
        let widthBar = Number(bar.offsetWidth);
        let topPosBar = Number(bar.style.top.split('px').join(""));
        if (rotation === "rotate(90deg)" || rotation === "rotate(270deg)") {                      //? Проверка на поворот строки
            let w = widthBar / 2;
            leftPosBar = w + leftPosBar;
            topPosBar = topPosBar + w;
        };
        let topPosition = String(2 * (550 - (topPosBar + heightBar)));
        let left = String(leftPosBar * 2);
        let product = "<<ProductType>>-";
        let heat = '<<HEAT>>-';
        let coil = '<<COIL_NO>>';
        let barcode = fo + topPosition + ',' + left + fw + by + bc + fd + product + heat + coil + fs;
        return (barcode);
    },
    //* Функция расчёта размера шрифта строки
    calculateSize: function (size) {
        if (size === 16) {
            return ('30,20,');
        } else if (size === 18) {
            return ('40,30,');
        } else if (size === 20) {
            return ('50,40,');
        } else if (size === 22) {
            return ('60,50,');
        };
    },
    //* Функция формирования кода поворота строки с бека
    transformStringBack: function (position) {
        let pos;
        if (position === "^A@R,") {
            pos = 'rotate(0deg)';
        } else if (position === '^A@I,') {
            pos = "rotate(90deg)";
        } else if (position === '^A@B,') {
            pos = "rotate(180deg)";
        } else if (position === '^A@N,') {
            pos = "rotate(270deg)";
        } else {
            pos = "^A@R,";
        };
        return (pos);
    },
    transformBarCode: function (rotation) {
        let position;
        if (rotation === 'rotate(270deg)') {
            position = '^BCN';
        } else if (rotation === 'rotate(0deg)') {
            position = '^BCR';
        } else if (rotation === 'rotate(90deg)') {
            position = '^BCI';
        } else if (rotation === 'rotate(180deg)') {
            position = '^BCB';
        };
        return (position);
    },
    transformBarCodeRevers: function (position) {
        let rotation;
        if (position === '^BCN') {
            rotation = 'rotate(270deg)';
        } else if (position === '^BCR' || position === '^BC') {
            rotation = 'rotate(0deg)';
        } else if (position === '^BCI') {
            rotation = 'rotate(90deg)';
        } else if (position === '^BCB') {
            rotation = 'rotate(180deg)';
        };
        return (rotation);
    },
};
export const calculateSize = tagCode.calculateSize;
export const transformStringBack = tagCode.transformStringBack;
export const constructorlabelCode = tagCode.constructorlabelCode;
export const hade = tagCode.hade;
export const numberTags = tagCode.numberTags;
export const logoCodeNext = tagCode.logoCodeNext;
export const stringCode = tagCode.stringCode;
export const rotetString = tagCode.rotetString;
export const barCode = tagCode.barCode;
export const transformBarCode = tagCode.transformBarCode;
export const transformBarCodeRevers = tagCode.transformBarCodeRevers;
export const numberTagsBack = tagCode.numberTagsBack;