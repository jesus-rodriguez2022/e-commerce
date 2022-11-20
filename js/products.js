let catID = localStorage.getItem("catID")
//creamos una VARIABLE para almacenar la url que contiene el json 
let productos = "https://japceibal.github.io/emercado-api/cats_products/" + catID + EXT_TYPE;
//const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/"


//se realiza el fetch para traer la informacion de la api
fetch(productos)  //peticion a la API donde se le pasa la URL brindada
    .then(response => response.json())   //la respuesta que se nos da son los archivos en json    
    .then(data => mostrarData(data.products))    //como data guardamos la parte de products  

//se crea una constante donde con un forEach recorremos el array brindado por la API

let mostrarData = (data) => {
    data.forEach(data => {
        let element = document.getElementById("cont");
        element.innerHTML +=
            `<div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
    <div class="col-3">
    <img class='img-thumbnail' id="${data.id}" onclick="productosID(${data.id})" src='${data.image}'/>
    </div>
    <div class="col">
    <h5 class="mb-1 " >${data.name}-usd${data.cost}</h5>
     <div class="d-flex w-100 justify-content-between">
    <div    >${data.description} </div>
    <div><small class="text-muted">${data.soldCount} vendidos</small><div/>
    
    </div>
    </div>
    </div>
    </div>`
        //console.log(data)

    })
}

function productosID(id) {
    localStorage.setItem("productId", id);
    window.location.href = "product-info.html";  //redirecciona
}

