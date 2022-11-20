//inmput de email y password ingresados por el usuario

const email = document.getElementById("email");
const password = document.getElementById("password1");

//boton submit que nos envia el email y password

const buttonSubmit = document.getElementById("regBtn");

//variable con ID del campo usuario

let usuario = document.getElementById("dropdownMenu2");

//funcion que nos crea en el localstorange los valores de email y password

function crear() {
    regImail = localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    localStorage.getItem("email");
    usuario.innerHTML + `${regImail}`

}



//almacenamos los datos en localStorage mediante el boton con un evento de tipo "click"

buttonSubmit.addEventListener("click", crear);

