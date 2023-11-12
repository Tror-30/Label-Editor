import { closeError } from "../label-cod.js";
import { portDB } from "../label-cod.js";

export async function authorizationBack(login, password) {
    let person;
    try {
        person = await fetch(`http://${portDB}/api/spc/common/labels/user-authenticate`, {
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "userLogin": login,
                "userPassword": password
            })
        });
        if (person.status == 204) {
            return;
        } else if (person.status == 403) {
            let error = document.getElementById('errors');
            let errorText = document.getElementById('text-error');
            errorText.innerText = 'Не верный логин или пароль';
            errorText.style.display = 'block';
            error.style.display = 'block';
        } else if (person.status == 200) {
            person = await person.json();
            return (person);
        };
    } catch {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
        errorText.style.display = 'block';
        error.style.display = 'block';
    };
    setTimeout(closeError, 4000);
    return;
};



