//TODO: Функции для работы с меню символы!

//* Функция вызова меню Символы
export function simbolOn() {
    let tableSimbol = document.getElementById('tableSimbol');                                  //? Получаем Таблицу символов
    tableSimbol.style.height = "535px";
};

//* Функция скрытия меню Символы
export function simbolOff() {
    let tableSimbol = document.getElementById('tableSimbol');                                  //? Получаем Таблицу символов
    tableSimbol.style.height = "0px";
};
