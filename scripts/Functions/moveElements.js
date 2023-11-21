import { calculationOfIndents, modifietOn } from '../label-cod.js';


const moveElements = {
    //* Функция Сдвинуть вверх
    moveUp() {
        let id = elementBorder();                                                               //? Получаем  выделенный Элемент
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        if (!id) return;                                                                        //? Условие если нет элемента выйти из функции
        let idWidth = Number(id.offsetWidth);                                                   //? Получаем длину выделенного блока
        let idTrans = id.style.transform;                                                       //? Получаем значение трашсформ выделенного блока
        let px = Number(document.getElementById('inpud-pixel').value);                          //? Преобразование указанного значения пикселей из строки в номер
        if (px === 0) {                                                                         //? Присваиваем переменной значение 1 при нуле
            px = 1;
        } else { };
        let positionNumber = Number(id.style.top.split('px').join(""));                         //? Удаляем рх из полученой строки и преобразовываем в номер
        let topNumber = positionNumber - px;                                                    //? Вычитаем из преобразованного значения указанное кол-во пикселей
        if (idTrans === "rotate(0deg)" || idTrans === "rotate(180deg)") {                       //? Сравниваем полученный Трансформ
            if (topNumber >= 0) {
                let topString = String(topNumber);                                              //? Полученное значение прообразовываем в строку
                let top = topString + "px";                                                     //? К строке добовляем рх
                id.style.top = top;                                                             //? Возвращаем получившееся значение Элементу
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        } else if (idTrans === "rotate(90deg)" || idTrans === "rotate(270deg)") {
            if (topNumber >= 0 + idWidth / 2) {
                let topString = String(topNumber);                                              //? Полученное значение прообразовываем в строку
                let top = topString + "px";                                                     //? К строке добовляем рх
                id.style.top = top;                                                             //? Возвращаем получившееся значение Элементу
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        };
        modifietOn();
        calculationOfIndents(id);
    },
    //* Функция Сдвинуть вниз
    moveDown() {
        let id = elementBorder();                                                       //? Получаем выделенный Элемент
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        if (!id) return;                                                                //? Условие если нет элемента выйти из функции
        let rowBlock = document.getElementById("label-background");                        //? Получаем родительский блок
        let topRowHeidth = Number(rowBlock.clientHeight);                               //? Получаем внутреннюю высоту родительского элемента
        let idTrans = id.style.transform;                                               //? Получаем значение трашсформ выделенного блока
        let idHeidth = Number(id.offsetHeight);                                         //? Получаем наружную высоту выделенного блока
        let idWidth = Number(id.offsetWidth);                                           //? Получаем длину выделенного блока
        let px = Number(document.getElementById('inpud-pixel').value);                  //? Преобразование указанного значения пикселей из строки в номер
        if (px === 0) {                                                                 //? Присваиваем переменной значение 1 при нуле
            px = 1;
        };
        let positionNumber = Number(id.style.top.split('px').join(""));                 //? Удаляем рх из полученой строки и преобразовываем в номер
        let topNumber = positionNumber + px;                                            //? Вычитаем из преобразованного значения указанное кол-во пикселей
        if (idTrans === "rotate(0deg)" || idTrans === "rotate(180deg)") {               //? Сравниваем полученный Трансформ
            if (topNumber + idHeidth <= topRowHeidth) {                                 //? Позиция элемента плюс его высота должна быть не более или равна внутренней высоте родительского элемента
                let topString = String(topNumber);                                      //? Полученное значение приобразовываем в строку
                let top = topString + "px";                                             //? К строке добовляем рх
                id.style.top = top;                                                     //? Возвращаем получившееся значение Элементу
                error.style.display = 'none';
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        } else if (idTrans === "rotate(90deg)" || idTrans === "rotate(270deg)") {       //? Сравниваем полученный Трансформ
            if (topNumber + idHeidth <= topRowHeidth - idWidth / 2) {                   //? Позиция элемента плюс его высота должна быть не более или равна внутренней высоте родительского элемента
                let topString = String(topNumber);                                      //? Полученное значение приобразовываем в строку
                let top = topString + "px";                                             //? К строке добовляем рх
                id.style.top = top;                                                     //? Возвращаем получившееся значение Элементу
                error.style.display = 'none';
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        };
        modifietOn();
        calculationOfIndents(id);
    },
    //* Функция Сдвинуть влево
    moveLeft() {
        let id = elementBorder();                                                       //? Получаем  выделенный Элемент
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        if (!id) return;                                                                //? Условие если нет элемента выйти из функции
        let idWidth = Number(id.offsetWidth);                                           //? Получаем длину выделенного блока
        let idHeidth = Number(id.offsetHeight);                                         //? Получаем наружную высоту выделенного блока
        let idTrans = id.style.transform;                                               //? Получаем значение трашсформ выделенного блока
        let px = Number(document.getElementById('inpud-pixel').value);                  //? Преобразование указанного значения пикселей из строки в номер
        if (px === 0) {                                                                 //? Присваиваем переменной значение 1 при нуле
            px = 1;
        };
        let positionNumber = Number(id.style.left.split('px').join(""));                //? Удаляем рх из полученой строки и приобразовываем в номер
        let leftNumber = positionNumber - px;                                           //? Вычитаем из приобразованного значения указанное кол-во пикселей
        if (idTrans === "rotate(0deg)" || idTrans === "rotate(180deg)") {                           //? Сравниваем полученный Трансформ
            if (leftNumber >= 0) {
                let leftString = String(leftNumber);                                    //? Полученное значение приобразовываем в строку
                let left = leftString + "px";                                           //? К строке добовляем рх
                id.style.left = left;                                                   //? Возвращаем получившееся значение Элементу
                error.style.display = 'none';
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        } else if (idTrans === "rotate(90deg)" || idTrans === "rotate(270deg)") {       //? Сравниваем полученный Трансформ
            if (leftNumber >= 0 - idWidth / 2 + idHeidth / 2) {
                let leftString = String(leftNumber);                                    //? Полученное значение приобразовываем в строку
                let left = leftString + "px";                                           //? К строке добовляем рх
                id.style.left = left;                                                   //? Возвращаем получившееся значение Элементу
                error.style.display = 'none';
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        };
        modifietOn();
        calculationOfIndents(id);
    },
    //* Функция Сдвинуть вправо
    moveRight() {
        let id = elementBorder();                                                                       //? Получаем  выделенный Элемент
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        if (!id) return;                                                                                //? Условие если нет элемента выйти из функции
        let rowBlock = document.getElementById("label-background");                                        //? Получаем родительский блок
        let topRowWidth = Number(rowBlock.clientWidth);                                                 //? Получаем внутреннюю ширину родительского элемента
        let idWidth = Number(id.offsetWidth);                                                           //? Получаем наружную ширину выделенного блока
        let idTrans = id.style.transform;                                                               //? Получаем значение трашсформ выделенного блока
        let idHeidth = Number(id.offsetHeight);                                                         //? Получаем наружную высоту выделенного блока
        let px = Number(document.getElementById('inpud-pixel').value);                                  //? Получение значения Пиксилей для перемещения
        if (px === 0) {                                                                                 //? Присваиваем переменной значение 1 при нуле
            px = 1;
        };
        let positionLeft = id.style.left;                                                               //? Получаем значение стиля выделенного элемента
        let positionNumber = Number(positionLeft.split('px').join(""));                                 //? Удаляем рх из полученой строки и приобразовываем в номер
        let leftNumber = positionNumber + px;                                                           //? Прибавляем приобразованному значению указанное кол-во пикселей
        if (idTrans === "rotate(0deg)" || idTrans === "rotate(180deg)") {                                           //? Сравниваем полученный Трансформ
            if (leftNumber + idWidth <= topRowWidth) {                                                  //? 
                let leftString = String(leftNumber);                                                    //? Полученное значение приобразовываем в строку
                let left = leftString + "px";                                                           //? К строке добовляем рх
                id.style.left = left;                                                                   //? Возвращаем получившееся значение Элементу
                error.style.display = 'none';
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        } else if (idTrans === "rotate(90deg)" || idTrans === "rotate(270deg)") {                       //? Сравниваем полученный Трансформ
            if ((leftNumber + idWidth) <= topRowWidth + ((idWidth / 2) - (idHeidth / 2))) {
                let leftString = String(leftNumber);                                                    //? Полученное значение приобразовываем в строку
                let left = leftString + "px";                                                           //? К строке добовляем рх
                id.style.left = left;                                                                   //? Возвращаем получившееся значение Элементу
                error.style.display = 'none';
            } else {
                errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
                errorText.style.display = 'block';
                error.style.display = 'block';
                setTimeout(closeError, 5000);
            };
        };
        modifietOn();
        calculationOfIndents(id);
    },
    //* Функция Повернуть Вправо
    turnRight() {
        let id = elementBorder();                                                       //? Получили выделенный Элемент
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        if (!id) return;                                                                //? Условие если нет элемента выйти из функции
        let rowBlock = document.getElementById("label-background");                        //? Получаем родительский блок
        let topRowHeidth = Number(rowBlock.clientHeight);                               //? Получаем внутреннюю высоту родительского элемента
        let topRowWidth = Number(rowBlock.clientWidth);                                 //? Получаем внутреннюю ширину родительского элемента
        let idHeight = Number(id.offsetHeight);                                         //? Получаем наружную высоту выделенного блока
        let idWidth = Number(id.offsetWidth);                                           //? Получаем длину выделенного блока
        let idStyleTop = Number(id.style.top.split('px').join(""));
        let idStyleLeft = Number(id.style.left.split('px').join(""));
        let trans = id.style.transform;
        modifietOn();
        if ((idStyleLeft > 0 && idStyleLeft < topRowWidth - idWidth - idHeight) && (idStyleTop > idWidth / 2 && idStyleTop < topRowHeidth - idWidth / 2 - idHeight / 2)) {
            if (trans === "rotate(0deg)") {
                id.style.transform = 'rotate(90deg)';
            } else if (trans === 'rotate(90deg)') {
                id.style.transform = 'rotate(180deg)';
            } else if (trans === 'rotate(180deg)') {
                id.style.transform = 'rotate(270deg)';
            } else if (trans === 'rotate(270deg)') {
                id.style.transform = 'rotate(0deg)';
            } else {
                id.style.transform = 'rotate(0deg)';
            };
            error.style.display = 'none';
        } else {
            errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
            errorText.style.display = 'block';
            error.style.display = 'block';
            setTimeout(closeError, 5000);
        };
    },
    //* Функция Повернуть Влево
    turnLeft() {
        let id = elementBorder();                                                       //? Получили выделенный Элемент
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        if (!id) return;                                                                //? Условие если нет элемента выйти из функции
        let rowBlock = document.getElementById("label-background");                        //? Получаем родительский блок
        let topRowHeidth = Number(rowBlock.clientHeight);                               //? Получаем внутреннюю высоту родительского элемента
        let topRowWidth = Number(rowBlock.clientWidth);                                 //? Получаем внутреннюю ширину родительского элемента
        let idHeight = Number(id.offsetHeight);                                         //? Получаем наружную высоту выделенного блока
        let idWidth = Number(id.offsetWidth);                                           //? Получаем длину выделенного блока
        let idStyleTop = Number(id.style.top.split('px').join(""));
        let idStyleLeft = Number(id.style.left.split('px').join(""));
        let trans = id.style.transform;
        modifietOn();
        if ((idStyleLeft > 0 && idStyleLeft < topRowWidth - idWidth - idHeight) && (idStyleTop > idWidth / 2 && idStyleTop < topRowHeidth - idWidth / 2 - idHeight / 2)) {
            if (trans === "rotate(0deg)") {
                id.style.transform = 'rotate(270deg)';
            } else if (trans === 'rotate(270deg)') {
                id.style.transform = 'rotate(180deg)';
            } else if (trans === 'rotate(180deg)') {
                id.style.transform = 'rotate(90deg)';
            } else if (trans === 'rotate(90deg)') {
                id.style.transform = 'rotate(0deg)';
            } else {
                id.style.transform = 'rotate(0deg)';
            };
            error.style.display = 'none';
        } else {
            errorText.innerText = 'Ошибка:\nВы выходите за граници Бирки';
            errorText.style.display = 'block';
            error.style.display = 'block';
            setTimeout(closeError, 5000);
        };
    },
    //* Функция получения выделеного элемента
    elementBorder() {
        let rowDivBlock = document.getElementById('label-background').children;                                //? Получаем МАССИВ дочерних элементов дива
        let borderedItem;
        for (let id of rowDivBlock) {
            if (id.style.border === "1px solid black") {                                                    //? Проверка элементов на наличие стиля бордер
                borderedItem = id;
            } else {

            };
        };
        return (borderedItem);
    },
    //* Функция сброса выделения
    resetSelection() {
        let rowDivBlock = document.getElementById('label-background');                     //? Получение родительского блока
        //? Снимем выделение со всех элементов
        if (rowDivBlock.hasChildNodes()) {
            let children = rowDivBlock.children;
            for (let i = 0; i < children.length; ++i) {
                children[i].style.border = '0px';
                document.getElementById('editor-text-string').value = '';
                document.getElementById('add-string').innerText = "Добавить";
            };
        };
        document.getElementById('input-padding-bottom').value = '';
        document.getElementById('input-padding-left').value = '';
    },
};
export const resetSelection = moveElements.resetSelection;
export const elementBorder = moveElements.elementBorder;
export const moveUp = moveElements.moveUp;
export const moveDown = moveElements.moveDown;
export const moveLeft = moveElements.moveLeft;
export const moveRight = moveElements.moveRight;
export const turnRight = moveElements.turnRight;
export const turnLeft = moveElements.turnLeft;