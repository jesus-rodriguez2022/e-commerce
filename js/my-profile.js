//si el usuario no esta logeado se lo redirige a la pagina de login
let userRegistered = localStorage.getItem("email");
if (userRegistered === null) {
    window.location.href = "index.html";
}

//FUNCION PARA VALIDAR LOS DATOS...

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


//FUNCION PARA MOSTRAR EMAIL PREDETERMINADO...

let inputEmail = document.getElementById("validationCustom05");
let emailLogin = localStorage.getItem("email");

function usuarioReg() {
    inputEmail.setAttribute("value", `${emailLogin}`);
}
usuarioReg();

//GUARDAR DATOS DEL USUARIO...

//inputs
const imputNombre = document.getElementById("validationCustom011");
const imputSegundoNombre = document.getElementById("validationCustom02");
const inputApellido = document.getElementById("validationCustom03");
const inputSegundoApellido = document.getElementById("validationCustom04");
//let inputEmail = document.getElementById("validationCustom05");
const inputNumeroTelefono = document.getElementById("validationCustom06");
const btnGuardar = document.getElementById("btnGuardar");

btnGuardar.addEventListener("click", function () {
    let data = {
        Nombre: imputNombre.value,
        SegundoNombre: imputSegundoNombre.value,
        Apellido: inputApellido.value,
        segundoApellido: inputSegundoApellido.value,
        Email: inputEmail.value,
        Telefono: inputNumeroTelefono.value,
    };
    localStorage.setItem("User", JSON.stringify(data)); //Toma un objeto javascript como parametro y nos devuelve la cadena JSON (objeto a string)
});

//parseamos la info que tenemos en el localstorage con la key de "User"
let userDat = JSON.parse(localStorage.getItem("User")); //toma como parametro un objeto JSON y nos devuelve un objeto javascript(string a objeto)
if (userDat) {
    imputNombre.value = userDat.Nombre;
    imputSegundoNombre.value = userDat.SegundoNombre;
    inputApellido.value = userDat.Apellido;
    inputSegundoApellido.value = userDat.segundoApellido;
    inputEmail.value = userDat.Email;
    inputNumeroTelefono.value = userDat.Telefono;
}

//alerta una vez presionado el boton
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

if (btnGuardar) {
    btnGuardar.addEventListener('click', () => {
        alert('Sus datos han sido guardados!', 'success')
    })
}