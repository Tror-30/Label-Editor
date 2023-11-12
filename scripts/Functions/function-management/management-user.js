import { portDB, closeError } from "../../label-cod.js";

export async function getLoginsUser() {
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    let listLogin;
    try {
        listLogin = await fetch(`http://${portDB}/api/spc/common/labels/get-users`, {
            method: 'get',
            headers: {
                'accept': 'application/json; charset=utf-8'
            },
        });
        listLogin = await listLogin.json();
    } catch {
        errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
        errorText.style.display = 'block';
        error.style.display = 'block';
        setTimeout(closeError, 5000);
        return;
    };
    addLoginUser(listLogin);
};

export function addLoginUser(listLogin) {
    let select = document.getElementById('select-login');                               //? Получаем Селект Логинов
    select.append(new Option);
    for (let i = 0; i < listLogin.length; i++) {                                        //? Присвоим i каждое имя по очереди
        let name = listLogin[i];                                                        //? Берём параметр имени без номера
        let newOption = new Option(name);                                               //? Создаём новый Option
        select.append(newOption);                                                       //? Вставляем в селект новый Option
    };
};

export async function getDataUser() {
    let login = document.getElementById('select-login').value;
    let dataUser;
    try {
        dataUser = await fetch(`http://${portDB}/api/spc/common/labels/get-user?userLogin=` + login, {
            method: 'get',
            headers: {
                'accept': 'application/json; charset=utf-8'
            },
        });
        dataUser = await dataUser.json();
    } catch {
        let error = document.getElementById('errors');
        let errorText = document.getElementById('text-error');
        errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
        errorText.style.display = 'block';
        error.style.display = 'block';
        setTimeout(closeError, 5000);
        return;
    };
    addDataUser(dataUser);
};

export function addDataUser(dataUser) {
    document.getElementById('input-login-user').value = dataUser.userLogin;
    document.getElementById('input-login-user').setAttribute('disabled', true);
    document.getElementById('input-password-user').value = dataUser.userPassword;
    document.getElementById('select-role-user').value = dataUser.userRole;
    document.getElementById('select-stan-user').value = dataUser.mill;
    document.getElementById('input-name-user').value = dataUser.userName;
};

export async function editorDataUser() {
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    let login = document.getElementById('input-login-user').value;
    let password = document.getElementById('input-password-user').value;
    let role = document.getElementById('select-role-user').value;
    let stan = document.getElementById('select-stan-user').value;
    let user = document.getElementById('input-name-user').value;
    try {
        await fetch(`http://${portDB}/api/spc/common/labels/change-user-data?userLogin=` + login, {
            method: 'POST',
            headers: {
                'accept': 'application/json; charset=utf-8',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "userLogin": login,
                "userPassword": password,
                "userName": user,
                "userRole": role,
                "mill": stan
            })
        });
        document.getElementById('select-login').value = '';
        document.getElementById('input-login-user').value = '';
        document.getElementById('input-login-user').removeAttribute('disabled');
        document.getElementById('input-password-user').value = '';
        document.getElementById('select-role-user').value = '';
        document.getElementById('select-stan-user').value = '';
        document.getElementById('input-name-user').value = '';
        errorText.innerText = 'Пользователь Сохранён';
        errorText.style.display = 'block';
        error.style.display = 'block';
        error.style.backgroundColor = 'rgb(24, 173, 19)';
    } catch {
        errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
        errorText.style.display = 'block';
        error.style.display = 'block';
    };
    setTimeout(closeError, 4000);
    return;
};

export async function addNewUser() {
    let error = document.getElementById('errors');
    let errorText = document.getElementById('text-error');
    let login = document.getElementById('input-login-user').value;
    let password = document.getElementById('input-password-user').value;
    let role = document.getElementById('select-role-user').value;
    let stan = document.getElementById('select-stan-user').value;
    let user = document.getElementById('input-name-user').value;
    let listLogin;
    try {
        listLogin = await fetch(`http://${portDB}/api/spc/common/labels/add-user`, {
            method: 'POST',
            headers: {
                'accept': 'application/json; charset=utf-8',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "userLogin": login,
                "userPassword": password,
                "userName": user,
                "userRole": role,
                "mill": stan
            })
        });
        listLogin = await listLogin.json();
        document.getElementById('select-login').value = '';
        document.getElementById('select-login').innerHTML = '';
        addLoginUser(listLogin);
        document.getElementById('select-login').value = '';
        document.getElementById('input-login-user').value = '';
        document.getElementById('input-login-user').removeAttribute('disabled');
        document.getElementById('input-password-user').value = '';
        document.getElementById('select-role-user').value = '';
        document.getElementById('select-stan-user').value = '';
        document.getElementById('input-name-user').value = '';
        errorText.innerText = 'Пользователь Добавлен';
        errorText.style.display = 'block';
        error.style.display = 'block';
        error.style.backgroundColor = 'rgb(24, 173, 19)';
    } catch {
        errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
        errorText.style.display = 'block';
        error.style.display = 'block';
    };
    setTimeout(closeError, 4000);
    return;
};

export function clearDataUser() {
    document.getElementById('select-login').value = '';
    document.getElementById('input-login-user').value = '';
    document.getElementById('input-login-user').removeAttribute('disabled');
    document.getElementById('input-password-user').value = '';
    document.getElementById('select-role-user').value = '';
    document.getElementById('select-stan-user').value = '';
    document.getElementById('input-name-user').value = '';
};

export async function deleteUser() {
    document.getElementById('input-login-user').removeAttribute('disabled');
    let login = document.getElementById('input-login-user').value;
    let listLogin;
    try {
        listLogin = await fetch(`http://${portDB}/api/spc/common/labels/remove-user`, {
            method: 'POST',
            headers: {
                'accept': 'application/json; charset=utf-8',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "userLogin": login,
            })
        });
        listLogin = await listLogin.json();
        document.getElementById('select-login').value = '';
        document.getElementById('select-login').innerHTML = '';
        addLoginUser(listLogin);
        document.getElementById('input-login-user').value = '';
        document.getElementById('input-password-user').value = '';
        document.getElementById('select-role-user').value = '';
        document.getElementById('select-stan-user').value = '';
        document.getElementById('input-name-user').value = '';
        errorText.innerText = 'Пользователь Удалён';
        errorText.style.display = 'block';
        error.style.display = 'block';
        error.style.backgroundColor = 'rgb(24, 173, 19)';
    } catch {
        errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
        errorText.style.display = 'block';
        error.style.display = 'block';
    };
    setTimeout(closeError, 4000);
    return;
};

export async function controlGetAutoPrint() {
    // let listControl;
    // try {
    //     listControl = await fetch(``, {
    //         method: 'POST',
    //         headers: {
    //             'accept': 'application/json; charset=utf-8',
    //             "Content-type": "application/json",
    //         },
    //     });
    //     listControl = await listLogin.json();
    //     return(listControl);
    // } catch {
    //     errorText.innerText = 'Нет связи! Обратитесь в службу поддержки по номеру: 1032';
    //     errorText.style.display = 'block';
    //     error.style.display = 'block';
    // };
    // setTimeout(closeError, 4000);
    return;
};

export async function controlHistoryAutoPrint() {

};

export function addHistoryAutoPrint() {
    let blockDiv = document.createElement('div');
    block.className = 'block-add-div-control';
    //block.inerrText = ;
    document.getElementById('history-get-auto-print').appendChild(blockDiv);
};
