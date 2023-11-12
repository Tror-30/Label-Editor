import { addString, insertBarCode } from "../label-cod.js";
import { boldFont } from "./backendRequests.js";
import { transformStringBack } from "./tagCodeConstructor.js";


//! Функции отвечающие за Парсинг
const parsing = {
    parsingLogo: function (stringCode) {
        stringCode = stringCode.split('^FO').join('');                                                     //? Удаляем параметр ^FO
        const top = Number(stringCode.match(/\d+/));                                                       //? Забираем значение отступа снизу
        stringCode = stringCode.replace(/\d+,/, '');                                                       //? Удаляем значение отступа снизу
        const left = Number(stringCode.match(/\d+/));                                                      //? Забираем второй параметр отступ слева
        stringCode = stringCode.replace(/.*?\^/, '^');                                                     //? Удаляем второй параметр отступа снизу
        let strCod = stringCode;
        return [strCod, top, left];
    },
    //* Функция разбор и добавление строк бирки из бека
    parsingString: function (stringCode) {
        stringCode = stringCode.split('^FO').join('');                              //? Отрезаем от строки ^FO
        let height = Number(stringCode.match(/\d+/));                               //? Забираем первое значение вертикального отступа
        stringCode = stringCode.replace(/\d+,/, '');                                //? Удаляем из общей строки вертикального отступа
        let width = Number(stringCode.match(/\d+/));                                //? Забираем второй параметр отступ слева
        stringCode = stringCode.replace(/\d+\^/, '^');                              //? Удаляем из общей строки отступ слева
        let position = String(stringCode.match(/.*?,/));                            //? Получаем параметр позиции элемента
        stringCode = stringCode.replace(/.*?,/, '');                                //? Удаляем из строки позиции элементов
        let size = String(stringCode.match(/(\d+),(\d+)/));                         //? Пулучаем размер шрифта
        let str = String(stringCode.replace(/.*?\^FD/, '').split('^FS').join(''));  //? Получаем содержимое строкового элемента
        if (str.includes('<<')) {
            str = str.replace(/</g, '&lt');                                         //? Экранирование символов <<
        } else { };
        let bold = boldFont(position);                                              //? Вычисляем жирность шрифта
        let posit = transformStringBack(position);                                  //? Вычисляем поворот строки
        addString(str, width, height, size, bold, posit);                           //? Вставляем в див
    },
    parsingBarcode: function (stringCode) {
        stringCode = stringCode.split('^FO').join('');                              //? Отрезаем от строки ^FO
        let height = Number(stringCode.match(/\d+/));                               //? Забираем первое значение вертикального отступа
        stringCode = stringCode.replace(/\d+,/, '');                                //? Удаляем из общей строки вертикального отступа
        let width = Number(stringCode.match(/\d+/));                                //? Забираем второй параметр отступ слева
        insertBarCode(width, height);
    }
};
export const parsingLogo = parsing.parsingLogo;
export const parsingString = parsing.parsingString;
export const parsingBarcode = parsing.parsingBarcode;