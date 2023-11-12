//? Константы

const urlLabel = {
    'white': 'white',
    'blue': 'blue',
    'deepskyblue': 'deepskyblue',
    'red': 'red',
    'coral': 'coral',
    'saddlebrown': 'saddlebrown',
    'hotpink': 'hotpink',
    'violet': 'violet',
    'orang': 'orang',
    'yellow': 'yellow',
    'limegreen': 'limegreen',
    'dimgray': 'dimgray'
};

//TODO: Функция переключения темы и цвета бирок
const theme = {
    //* Функция смены темы на Тёмную
    themeOn: function () {
        let valueSelect = document.getElementById('select-label-backgraund').value;
        let buttonTheme = document.getElementById('hidcheck');
        if (buttonTheme.checked) {
            document.getElementById("row").style.backgroundColor = '#293133';
            document.getElementById("section-UserLay-editor").style.backgroundColor = '#293133';
            document.getElementById("section-add-logo-label").style.backgroundColor = '#293133';
            document.getElementById('content-left').style.backgroundColor = '#293133';
            document.getElementById('container-right').style.backgroundColor = '#293133';
            document.getElementById('label-background').style.backgroundImage = `url("/SVG/label-color/label-${urlLabel[valueSelect]}-2.svg")`;
            document.cookie = 'theme=dark';
        } else {
            document.getElementById("row").style.backgroundColor = '#176fd7';
            document.getElementById("section-UserLay-editor").style.backgroundColor = '#176fd7';
            document.getElementById("section-add-logo-label").style.backgroundColor = '#176fd7';
            document.getElementById('content-left').style.backgroundColor = '#176fd7';
            document.getElementById('container-right').style.backgroundColor = '#176fd7';
            document.getElementById('label-background').style.backgroundImage = `url("/SVG/label-color/label-${urlLabel[valueSelect]}.svg")`;
            document.cookie = 'theme=light';
        };
    },
    //* Функция установки темы из куки при загрузке страницы
    themeCookie: function () {
        if(!document.cookie){return};
        let theme = document.cookie.match(/theme=(\w+)/)[1];
        if (theme === 'dark') {
            document.getElementById("row").style.backgroundColor = '#293133';
            document.getElementById("section-UserLay-editor").style.backgroundColor = '#293133';
            document.getElementById("section-add-logo-label").style.backgroundColor = '#293133';
            document.getElementById('content-left').style.backgroundColor = '#293133';
            document.getElementById('container-right').style.backgroundColor = '#293133';
            document.getElementById('label-background').style.backgroundImage = `url("/SVG/label-color/label-white-2.svg")`;
            document.getElementById('hidcheck').checked = true;
        } else if (theme === 'light') {
            document.getElementById("row").style.backgroundColor = '#176fd7';
            document.getElementById("section-UserLay-editor").style.backgroundColor = '#176fd7';
            document.getElementById("section-add-logo-label").style.backgroundColor = '#176fd7';
            document.getElementById('content-left').style.backgroundColor = '#176fd7';
            document.getElementById('container-right').style.backgroundColor = '#176fd7';
            document.getElementById('label-background').style.backgroundImage = `url("/SVG/label-color/label-white.svg")`;
            document.getElementById('hidcheck').checked = false;
        } else {
            return;
        }
    },
    //* Функция выбора цвета бирки
    tagColor: function () {
        let valueSelect = document.getElementById('select-label-backgraund').value;
        let right = document.getElementById('container-right');
        if (right.style.backgroundColor === 'rgb(23, 111, 215)') {
            document.getElementById('label-background').style.backgroundImage = `url("/SVG/label-color/label-${urlLabel[valueSelect]}.svg")`;
        } else {
            document.getElementById('label-background').style.backgroundImage = `url("/SVG/label-color/label-${urlLabel[valueSelect]}-2.svg")`;
        };
    },
};

export const tagColor = theme.tagColor;
export const themeOn = theme.themeOn;
export const themeCookie = theme.themeCookie;