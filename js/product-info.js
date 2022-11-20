//acceder al localstorage
let productId = localStorage.getItem("productId")
let productosInfo = "https://japceibal.github.io/emercado-api/products/" + productId + EXT_TYPE;
//peticion a la API
fetch(productosInfo)
        .then(resp => resp.json())
        .then(data => {
                console.log(data)
                //mostrar info de productos
                let contenedor = document.getElementById("info")
                const { name, description, currency, cost, category, soldCount, relatedProducts } = data  //desestructuramaos
                let imgs = data.images.map(function (elemento) { return `<img src="${elemento}" class='img-thumbnail' />` })  //metodo .map 
                contenedor.innerHTML +=
                        `<div class="container">
        <div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
    <div class="col-3">
        <h2>${name}</h2>
        <hr>
<p class="negrita">Precio:</p>${currency} ${cost}
<br/>
<p class="negrita">Categoría:</p> ${category}
<br/>
<p class="negrita">Descripción:</p>${description}
<br/>
<p class="negrita">Cantidad de vendidos:</p> ${soldCount}
<br/>
<p class="negrita">Imagenes Ilustrativas:</p>${imgs}
</div>
</div>
</div>
<h4>Comentarios y productos relacionados:</h4>
`

                relatedProducts.forEach(product => {
                        let contenedor = document.getElementById("info");
                        contenedor.innerHTML += `<div class="container" id="${product.id}" onclick="productosID(${product.id})">
                <div class="list-group-item list-group-item-action cursor-active">
    <div class="row">
    <div class="col-3">
                <br>
                <img class="img-thumbnail" src="${product.image}" />
                </div>
                </div>
                </div>
                `
                })
                console.log(data);
        })
function productosID(id) {
        localStorage.setItem("productId", id);
        window.location.href = "product-info.html";  //redirecciona
}

//mostrar comentarios

fetch(PRODUCT_INFO_COMMENTS_URL + productId + EXT_TYPE)
        .then(resp => resp.json())
        .then(data => {
                mostrarComments(data);
        })

function mostrarComments(data) {
        console.log(data);

        data.forEach(comentario => {
                const { user, dateTime, score, description } = comentario;   //destructuramos
                let contenedor = document.getElementById("info")
                contenedor.innerHTML += `<div class="container">
                <div class="list-group-item list-group-item-action cursor-active">
        <br/>
        <hp> Usuario: ${user}</p>
        <p>Fecha:${dateTime}</p>
        <div id="stars"> Puntuacion: ${score}</div>
        <br/>
        <p> ${description}</p>
        </div>
        </div>
        `




                //ESTRELLAS EN PUNTUACION

                function imprimirPantalla(data) {           //no se llama funcion???
                        let claseStars = document.getElementById("stars");
                        let stars = `<div class="d-flex justify-content-between align-items-center">
                   <div class="ratings"> `;
                        let enableStars = `<i class="fa fa-star rating-color"></i>`;
                        let disableStars = `<i class="fa fa-star "></i>`;

                        for (i = 0; i < data.length; i++) {
                                let score = data[i].score;
                                let scoreRedondeado = Math.round(score / 2);
                                for (j = 1; j <= scoreRedondeado; j++) {
                                        stars += enableStars;
                                }
                                for (k = scoreRedondeado; k < 5; k++) {
                                        stars += disableStars;
                                }
                        }
                        stars.innerHTML += `<div> ${score}</div>`

                }
        }
        )
}


