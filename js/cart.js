
//SE DEFINEN LAS VARIABLES A TRABAJAR...
let CART_URL = "https://japceibal.github.io/emercado-api/user_cart/" + 25801 + EXT_TYPE;

//Celdas carrito
const costo = document.getElementById("costo");
const cantidad = document.getElementById("cantidad");
const nombre = document.getElementById("nombre");
const imagen = document.getElementById("foto");
const subTotal = document.getElementById("subTotal");
const cantInput = document.getElementById("cant");  //Input de cantidad
const sub = document.getElementById("sub"); //subtotal/span
//costos
const costSubt = document.getElementById("costSubt");
const costEnv = document.getElementById("costEnv");
const costTot = document.getElementById("costTot");
//envios
const premiumEnvio = document.getElementById("premiumEnvio")
const expresEnvio = document.getElementById("expresEnvio")
const standarEnvio = document.getElementById("standarEnvio")
//direccion
const street = document.getElementById("validationCustom01");
const numHouse = document.getElementById("validationCustom02");
const corn = document.getElementById("validationCustom03");
const alertDiv = document.getElementById("alertDiv");

//SE REALIZA LA PETICION A LA URL
fetch(CART_URL)
    .then(response => response.json())
    .then(data => {
        verCarrito(data.articles);
    })

function verCarrito(data) {
    console.log(data)
    data.forEach(articles => {
        const { count, currency, name, unitCost, image } = articles;    //se desestructura
        imagen.innerHTML += `  
    <img width="100" src="${image}" /> `   //traemos la foto del producto

        //se muestra el nombre del articulo
        nombre.innerText = `
    ${name}`


        //se muestra el costo del producto
         costoArt = parseInt(`${unitCost}`);  //parseamos el precio unitario del articulo, de object a number
        costo.innerText = `${currency}` + ' ' + costoArt;  // modificamos 


        //se crea y cambia el valor al atributo del input cantidad
        cantInput.setAttribute('value', `${count}`);


        subTotal.innerHTML = `USD <span id="Sub">${(count) * (unitCost)}</span>`;
        costSubt.innerText = `${unitCost}`


    })
}
//se crea una funcion para pasarla por oninput
function cantDinamic(value) {
    cantInput.innerHTML += value;   //accedemos al input,modificamos le sumamos y asignamos(+=) el valor cursado
    let costoPorArt = costoArt * value;  //variable que multiplica el costo del articulo x el valor ingresado al input
    subTotal.innerHTML = `USD<span id="sub">${costoPorArt}</span>`
    let costoPorArtNum = parseInt(costoPorArt);
    costSubt.innerText = `${costoPorArtNum}`;
    calcEnvio();

    //CALCULO PARA EL TOTAL
    let total1 = parseFloat(costSubt.innerText);
    let total2 = parseFloat(costEnv.innerText);
    let total3 = document.getElementById("costTot");
    console.log(typeof total1)
    total3.innerText = total1 + total2;
}

const calcEnvio = () => {
    let porcEnvio = parseInt(
        standarEnvio.checked ?
            standarEnvio.value :
            expresEnvio.checked ?
                expresEnvio.value :
                premiumEnvio.value
    );

    let costSubtNum = parseFloat(costSubt.innerText);
    costEnv.innerText = costSubtNum * (porcEnvio / 100);
};

//VALIDACIONES

//Modal...
const numTarget = document.getElementById("numTarget");
const vencimiento = document.getElementById("vencimiento");
const codSeg = document.getElementById("codSeg");
const numCount = document.getElementById("numCount");
const formaPago = document.getElementById("formaPago");

const checkTarjetaCredito = document.getElementById("tarjetaCredito");
const checkTransfBancaria = document.getElementById("transfBancaria");

//checkbox para tarjeta de credito
checkTarjetaCredito.addEventListener("click", function (e) {
    numTarget.disabled = false;
    vencimiento.disabled = false;
    codSeg.disabled = false;
    numCount.disabled = true;
    formaPago.innerText = "Tarjeta de credito";
})
//checkbox para cuenta de banco
checkTransfBancaria.addEventListener("click", function (e) {
    numTarget.disabled = true;
    vencimiento.disabled = true;
    codSeg.disabled = true;
    numCount.disabled = false;
    formaPago.innerText = "Transferencia bancaria";
    if (checkTransfBancaria.checked) {
    }
})

//boton final
const finCount = document.getElementById("finCount");

document.addEventListener('DOMContentLoaded', (event) => {
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
});

document.addEventListener('submit', (e) => {
    if (street.checkValidity() && numHouse.checkValidity() && corn.checkValidity()) {
        alertDiv.classList.remove("d-none");
        alertDiv.innerHTML = `
        <div class="alert alert-success alert-dismissible" role="alert" id="alert">
            Registrado correctamente.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
    }
})







function alerta(){
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

const alertTrigger = document.getElementById('finCount')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('Nice, you triggered this alert message!', 'success')
  })
}
}
