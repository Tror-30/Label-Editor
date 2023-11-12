


export function openLabelEditorSection() {
    document.getElementById('section-editor').style.display = 'block';
    document.getElementById('section-UserLay-editor').style.display = 'none';
    document.getElementById('section-add-logo-label').style.display = 'none';
    document.getElementById('button-section-editor').style.backgroundColor = '#176fd7';
    document.getElementById('button-section-user-editor').style.backgroundColor = 'rgb(172, 170, 170)';
    document.getElementById('button-section-logo-editor').style.backgroundColor = 'rgb(172, 170, 170)';
};
export function openUserSection() {
    document.getElementById('section-editor').style.display = 'none';
    document.getElementById('section-UserLay-editor').style.display = 'block';
    document.getElementById('section-add-logo-label').style.display = 'none';
    document.getElementById('button-section-editor').style.backgroundColor = 'rgb(172, 170, 170)';
    document.getElementById('button-section-user-editor').style.backgroundColor = '#176fd7';
    document.getElementById('button-section-logo-editor').style.backgroundColor = 'rgb(172, 170, 170)';
};
export function openLogoEditorSection() {
    document.getElementById('section-editor').style.display = 'none';
    document.getElementById('section-UserLay-editor').style.display = 'none';
    document.getElementById('section-add-logo-label').style.display = 'block';
    document.getElementById('button-section-editor').style.backgroundColor = 'rgb(172, 170, 170)';
    document.getElementById('button-section-user-editor').style.backgroundColor = 'rgb(172, 170, 170)';
    document.getElementById('button-section-logo-editor').style.backgroundColor = '#176fd7';
};
