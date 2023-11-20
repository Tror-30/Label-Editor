import { fetchLabel, labelName } from "../backendRequests.js";
import { closeError } from "../../label-cod.js";
import { set, set2, ports } from "../../label-cod.js";
import { stanTarget } from "../backendRequests.js";
import { hade } from "../tagCodeConstructor.js";

export function listLabelCode(namelabel) {
    document.getElementById('select-label-name').innerHTML = '';
    let selectLabel = document.getElementById('select-label-name');
    selectLabel.append(new Option);
    for (let i = 0; i < namelabel.length; i++) {                                         //? Присвоим i каждое имя по очереди
        let name = namelabel[i].name;                                                    //? Берём параметр имени без номера
        name = name.replace('.ini', '');
        let newOption = new Option(name, name);                                          //? Создаём новый Option
        selectLabel.append(newOption);                                                   //? Вставляем в селект новый Option
    };
};

export async function addCodeLabel() {
    let namelabel = document.getElementById('select-label-name').value;
    let codeLabel = await fetchLabel(namelabel);
    let code = await parsingCodeLabel(codeLabel);
    document.getElementById('input-code-label').value = code;
};

export async function editorLabelCode() {
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    let labelCode = document.getElementById('input-code-label').value;
    let namelabel = document.getElementById('select-label-name').value + '.ini';
    let stan = stanTarget();
    try {
        await fetch(`http://10.23.${set[stan]}.${set2}:${ports[stan]}/label/Changelabel?labelName=${encodeURI(namelabel)}`,
            {
                method: 'post',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ body: labelCode })
            });
    } catch {
        errorText.innerText = 'Ошибка:\nНе удалось сохранить Шаблон!\nОбратитесь в Службу Поддержки по номеру: 1032.';
        errorText.style.display = 'block';
        error.style.display = 'block';
    };
    closeError();
    document.getElementById('select-label-name').value = '';
    document.getElementById('input-code-label').value = '';
    labelName();
};

export async function deleteLabel() {
    let selectLabel = document.getElementById('select-label-name').value;
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    selectLabel = selectLabel + '.ini';
    let stan = stanTarget();
    try {
        await fetch(`http://10.23.${set[stan]}.${set2}:${ports[stan]}/Label/LabelDelete?fileName=` + selectLabel, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-type": "application/json"
            },
        });
    } catch {
        errorText.innerText = 'Ошибка:\nНет связи с базой данных!\nОбратитесь в Службу Поддержки по номеру: 1032.';
        errorText.style.display = 'block';
        error.style.display = 'block';
        return;
    };
    closeError();
    document.getElementById('select-label-name').value = '';
    document.getElementById('input-code-label').value = '';
    labelName();
};

async function parsingCodeLabel(codelabel) {
    let code = '';
    let botton = "^XZ" + '\n' + "^XA^PON^LT0^PW1200^LH0,0^XZ";
    codelabel = codelabel.replace(/.*?\^FO/, '^FO');
    for (let i of codelabel) {
        if (!codelabel) {
            break;
        } else if (!codelabel.includes('^FO')) {
            break;
        } else {
            let stringCode = /\^FO\w+?.*?\^FS/m.exec(codelabel)[0];
            if (stringCode.includes('^GFA') || stringCode.includes('^A@R')) {
                code = code + '\n' + stringCode;
                codelabel = codelabel.replace(stringCode, '');
            } else if (stringCode.includes('^BY')) {
                code = code + '\n' + stringCode + '\n';
                codelabel = codelabel.replace(stringCode, '');
            };
        };
    };
    let header = await hade();
    for (let h of header) {
        if (header.includes('(NL)')) {
            header = header.replace('(NL)', '\n');
        } else {
            break;
        };
    };
    code = header + code + botton;
    return (code);
};

export async function getFile() {
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    let formData = new FormData();
    let file = document.querySelector('add-logo-img');
    formData.append(file.files[0]);
    try {
        await fetch(`http://10.23.${set[stan]}.${set2}:${ports[stan]}/...`, {
            method: 'PUT',
            body: formData,
        });
    } catch {
        errorText.innerText = 'Ошибка:\nЛоготип не загружен!\nОбратитесь в Службу Поддержки по номеру: 1032.';
        errorText.style.display = 'block';
        error.style.display = 'block';
        return;
    };
};

export async function postImgCodeLogo() {
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    let blockImg = document.getElementById('img-logo-block');
    let img = document.createElement('img');
    let objectPost;
    try {
        objectPost = await fetch(`http://10.23.${set[stan]}.${set2}:${ports[stan]}/...`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Content-type": "application/json"
            },
        })
    } catch {
        errorText.innerText = 'Ошибка:\nНет связи с базой данных!\nОбратитесь в Службу Поддержки по номеру: 1032.';
        errorText.style.display = 'block';
        error.style.display = 'block';
        return;
    };
    closeError();
};