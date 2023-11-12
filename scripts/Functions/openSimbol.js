//TODO: Функции для работы с меню символы!
const simbol = {
    //* Функция вызова меню Символы
    simbolOn: function () {
        let tableSimbol = document.getElementById('tableSimbol');                                  //? Получаем Таблицу символов
        tableSimbol.style.height = "535px";
    },
    //* Функция скрытия меню Символы
    simbolOff: function () {
        let tableSimbol = document.getElementById('tableSimbol');                                  //? Получаем Таблицу символов
        tableSimbol.style.height = "0px";
    }
};

export const simbolOn = simbol.simbolOn;
export const simbolOff = simbol.simbolOff;