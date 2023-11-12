
import { parsingLogo, parsingString, parsingBarcode } from "./parsingCode.js";
import { logoChoice, сleanTheTag, insertBarCode, addLogoName, closeError, modifietOff } from "../label-cod.js";
import { constructorlabelCode, numberTagsBack } from "./tagCodeConstructor.js";
import { set, ports, set2 } from "../label-cod.js";
import { controlGetAutoPrint } from "./function-management/management-user.js";
import { listLabelCode } from './function-management/management-content.js'

//! Функции отвечающие за работу с Бекендом
const requests = {
    //* 
    definition: async function (codelabel) {
        let top;
        let left;
        let strCod;
        let xName;
        let xPosition;
        let stringCode = /\^FO\w+?.*?\^FS/m.exec(codelabel)[0];                                      //? Вырезаем строку
        if (stringCode.includes('^GFA')) {                                                           //? Проверяем на наличие ^GFA в строке
            //* Распарсим позицию логотипа
            [strCod, top, left] = parsingLogo(stringCode);
            let objectNameRotation = await fetchNameLogo(strCod);
            xName = objectNameRotation.name;                                                        //? Имя логотипа
            xPosition = objectNameRotation.rotation;                                                //? Позиция поворота логотипа
            if (xPosition === '0') {                                                                //? Определяем поворот логотипа
                xPosition = 'rotate(0deg)';
            } else if (xPosition === '90') {
                xPosition = 'rotate(90deg)';
            } else if (xPosition === '180') {
                xPosition = 'rotate(180deg)';
            } else if (xPosition === '270') {
                xPosition = 'rotate(270deg)';
            } else {
                xPosition = 'rotate(0deg)';
            };
            let logoType = await logoNameBak();                                                     //? Получаем весь список имён имеющихся логотипов
            for (let j = 0; j < logoType.length; j++) {                                             //? Берём каждое имя логотипа
                let name = logoType[j].name;                                                        //? Берём параметр имени без номера
                if (xName === name) {                                                               //? Сравниваем имена
                    await logoChoice(xName, xPosition, top, left);                                  //? Вызов вставки логотипа
                    break;
                };
            };
            codelabel = codelabel.replace(stringCode, '');                                          //? Удаляем строку из бирки
        } else if (stringCode.includes('^A@R')) {
            parsingString(stringCode);                                                              //? Вызываем функцию разбора строки
            codelabel = codelabel.replace(stringCode, '');                                          //? Удаляем строку из бирки
        } else if (stringCode.includes('^BY')) {
            parsingBarcode(stringCode);                                                             //? Вставим штрихкод
            codelabel = codelabel.replace(stringCode, '');                                          //? Удаляем строку из бирки
        } else {
            codelabel = codelabel.replace(stringCode, '');                                          //? Удаляем строку из бирки
        };
        modifietOff();
        return (codelabel);
    },
    //* Функция определения логотипа в бирке
    fetchNameLogo: async function (strCod) {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        let stan = stanTarget();
        let lnr;
        try {
            strCod = strCod.substr(1, 90);
            lnr = await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/LogoFromCode`,
                {
                    method: 'post',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ body: strCod })
                });
            lnr = await lnr.json();
        } catch (ex) {
            errorText.innerText = 'Ошибка:\nНе удалось определить логотип!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
            return;
        };
        closeError();
        return (lnr);
    },
    //* Получение кода бирки
    fetchLabel: async function (text) {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        let x;
        let y;
        let stan = stanTarget();
        text = text + '.ini';
        try {
            text = encodeURI(text);
            x = await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/labelZebraCode?fileName=` + text, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                }
            });
            y = await x.text();
        } catch {
            errorText.innerText = 'Ошибка:\nВы не получаете код Бирки!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
            return;
        };
        closeError();
        return (y);
    },
    //* Функция запроса и получения кода бирки из бека
    labelCode: async function (text) {
        let codelabel = await fetchLabel(text);
        сleanTheTag();                                                                                      //? Очищаем бирку
        codelabel = codelabel.replace(/.*?\^PQ/, '^PQ');
        let numberOfTags = /\^PQ\w+?.*?\Y/m.exec(codelabel)[0];
        numberTagsBack(numberOfTags);
        codelabel = codelabel.replace(/.*?\^FO/, '^FO');                                                    //? Удаляем всё до логотипа
        for (let i of codelabel) {                                                                          //? Цикл вырезки строк
            if (!codelabel) {                                                                               //? Проверка на отсутствие данных и выход из цикла
                break;
            } else if (!codelabel.includes('^FO')) {
                break;
            };
            codelabel = await definition(codelabel);
        };
    },
    //* Функция получения из бека имён логотипов
    logoNameBak: async function () {
        let nameLogo;
        let stan = stanTarget();
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        try {                                                                                                       //? Проверка на Критическую ошибку
            nameLogo = await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/LogosOptions`, {                       //? Получаем с бека объект имён логотипов
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                },
            });
            nameLogo = await nameLogo.json();
            addLogoName(nameLogo);
        } catch (err) {
            errorText.innerText = 'Ошибка:\nВы не получаете данные о списке логотипов!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
        };
        closeError();
        return (nameLogo);
    },
    //* Функция запроса и получения кода логотипа из бека
    logoCodeRevers: async function (firstLogo, transform) {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        let number = '0';
        let logoCodeString;
        if (transform === '' & transform === 'rotate(0deg)') {
            number = "0";
        } else if (transform === 'rotate(90deg)') {
            number = "90";
        } else if (transform === 'rotate(180deg)') {
            number = "180";
        } else if (transform === 'rotate(270deg)') {
            number = "270";
        };
        firstLogo = firstLogo.split('logo_').join('');
        let stan = stanTarget();
        try {
            let y = await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/LogoZebraCode?fileName=` + firstLogo + '&rotation=' + number, {
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                },
            });
            logoCodeString = await y.text();
        } catch {
            errorText.innerText = 'Вы не получаете данные (Код логотипа)!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
        };
        closeError();
        return (logoCodeString);
    },
    //* Функция определения жирности шрифта строки с бека
    boldFont: function (position) {
        let bold;
        if (position === '^A0R,' && position === '^A0I,' && position === '^A0B,' && position === '^A0N,') {
            bold = 'bolder';
        } else {
            bold = 'normal';
        };
        return (bold);
    },
    //* Функция определения Шрифта из бека
    sizeString: function (size) {
        if (size === '30,20') {
            return ("16px");
        } else if (size === '40,30') {
            return ('18px');
        } else if (size === '50,40') {
            return ('20px');
        } else if (size === '60,50') {
            return ('22px');
        } else {
            return ('20px');
        };
    },
    //* Функция Определения стана при загрузке(Default)
    defaultLabelNameStan: async function () {
        document.getElementById('350-Stan').style.background = 'red';
        let stan = '350-Stan';
        await labelName(stan);
        await logoNameBak(stan);
    },
    //* Функция получения имён бирок из Бека
    labelName: async function () {
        let namelabel;
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        let stan = stanTarget();
        try {                                                                                              //? Проверка на Критическую ошибку
            document.querySelector('.option-history').innerHTML = '';
            namelabel = await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/labelsOptions`, {    //? Получаем с бека список имён
                method: 'get',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                },
            });
        } catch {
            errorText.innerText = 'Ошибка:\nВы не получаете данные о списке Бирок!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
            return;
        };
        closeError();
        let label = await namelabel.json();
        listLabelCode(label);
        for (let i = 0; i < label.length; i++) {                                            //? Присвоим i каждое имя по очереди
            let labelname = label[i].name;                                                  //? Берём параметр имени без номера
            labelname = labelname.replace('.ini', '');
            addlabelNameSelection(labelname);                                               //? Передаём в селект
        };
    },
    //* Функция добавления имён Бирок в селек истории
    addlabelNameSelection: function (labelname) {
        let stan = stanTarget();
        let ul = document.querySelector('.option-history');     //? Получаем блок списка
        let li = document.createElement('li');                  //? Создаём новый элемент списка
        li.className = stan;
        li.appendChild(document.createTextNode(labelname));     //? Привсаиваем ему значение
        ul.appendChild(li);                                     //? Вставляем в блок списка
    },
    alertAutoHandPrint: function () {
        let stan = stanTarget();
        let alertBlock = document.getElementById('alert-printAuto');
        alertBlock.style.display = 'block';
        if (stan === '350-Stan') {
            document.getElementById('text-alert-printAuto').innerText = 'Отправить в автоматическую печать на 350-Стан?';
        } else if (stan === '210-Stan') {
            document.getElementById('text-alert-printAuto').innerText = 'Отправить в автоматическую печать на 210-Стан?';
        } else if (stan === '212-Stan') {
            document.getElementById('text-alert-printAuto').innerText = 'Отправить в автоматическую печать на 212-Стан?';
        };
    },
    //* Функция Подтверждения отправки на печать ручную печать
    alertHandPrint: function () {
        let stan = stanTarget();
        let alertBlock = document.getElementById('alert-print');
        alertBlock.style.display = 'block';
        if (stan === '350-Stan') {
            document.getElementById('text-alert-print').innerText = 'Отправить в ручную печать на 350-Стан?';
        } else if (stan === '210-Stan') {
            document.getElementById('text-alert-print').innerText = 'Отправить в ручную печать на 210-Стан?';
        } else if (stan === '212-Stan') {
            document.getElementById('text-alert-print').innerText = 'Отправить в ручную печать на 212-Стан?';
        };
    },
    //* Функция Авто Печати
    autoHandPrint: async function () {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        let namelabel = document.getElementById('name-history-label').value;
        let labelCode = await constructorlabelCode();
        let stan = stanTarget();
        try {
            await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/ChangePattern?OnSKS=true`, {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ body: labelCode }),
            });
        } catch {
            document.getElementById('text-error').innerText = 'Ошибка:\nНе удалось отправить на печать!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
        };
        let dataTime = new Date();
        let controlDate = dataTime.getDate + dataTime.getMonth() + dataTime.getFullYear();
        let controlTime = dataTime.getHours() + dataTime.getMinutes() + dataTime.getSeconds();
        let controlAutoPrintLabel = {
            Stan: stan,
            NameLabel: namelabel,
            Date: dataTime.toISOString(),
            CodeLabel: labelCode,
        };
        closeError();
        controlGetAutoPrint(stan, controlDate, controlTime, namelabel);
    },
    //* Функция Ручная печать
    handPrint: async function () {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        let labelCode = await constructorlabelCode();
        let stan = stanTarget();
        try {
            await fetch(`http://10.23.${set[stan]}.${set2}:${ports}/Label/ChangePattern?OnSKS=false`, {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ body: labelCode }),
            });
        } catch {
            errorText.innerText = 'Ошибка:\nНе удалось отправить на печать!\nОбратитесь в Службу Поддержки по номеру: 1032.';
            errorText.style.display = 'block';
            error.style.display = 'block';
        };
        closeError();
    },
    //* Функция Определения стана
    stanTarget: function () {
        let idStan;
        let blockChild = document.querySelector('#Stans').children;                 //? Получим массив дочерних элементов
        for (let h = 0; h < blockChild.length; h++) {
            let divBlock = blockChild[h];                                           //? Возьмём один из дочерних элементов
            if (divBlock.style.background === 'red') {
                idStan = divBlock.id;
            };
        };
        return (idStan);
    },
};

export const alertAutoHandPrint = requests.alertAutoHandPrint;
export const alertHandPrint = requests.alertHandPrint;
export const definition = requests.definition;
export const fetchLabel = requests.fetchLabel;
export const fetchNameLogo = requests.fetchNameLogo;
export const stanTarget = requests.stanTarget;
export const defaultLabelNameStan = requests.defaultLabelNameStan;
export const autoHandPrint = requests.autoHandPrint;
export const handPrint = requests.handPrint;
export const labelName = requests.labelName;
export const labelCode = requests.labelCode;
export const logoNameBak = requests.logoNameBak;
export const logoCodeRevers = requests.logoCodeRevers;
export const boldFont = requests.boldFont;
export const sizeString = requests.sizeString;
export const addlabelNameSelection = requests.addlabelNameSelection;