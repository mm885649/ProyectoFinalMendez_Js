const productosEnCarrito = document.getElementById("productosEnCarrito")
const container = document.querySelector('div.container#container')
const imgLogo = document.querySelector("img#logo.logo")


imgLogo.addEventListener('click', ()=> { 
    if (carrito.length > 0) {
        location.href = 'checkout.html'
    }
})

function retornoCardsHTML({imagen, modeloDePrenda, precio, ITEM}) {
    return `<div class="div-card">
                <div class="imagen"><img src="${imagen}"></div>
                <div class="prenda"><p>${modeloDePrenda}</p></div>
                <div class="importe"><p>$ ${precio}</p></div>
                <div class="comprar"><button class="button-addToCart" id="${ITEM}">Agregar</button></div>
            </div>`
}

function retornoCardError() {
    return `<div class="card-error">
                <h2>🔎</h2>
                <h2>Producto no encontrado</h2>
                <h3>Intenta de nuevo en unos instantes....</h3>
            </div>`
}

function agregarAlCarrito(prenda) {
    carrito.push(prenda)
    localStorage.setItem('carritoPrendas', JSON.stringify(carrito))
    Toastify({
                text: `'${prenda.modeloDePrenda}' se agregó a tu carrito.`,
                duration: 1500,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: { background: "darkcyan", }
      }).showToast()
}

function agregarClickEnBotones() {
    const botonesAdd = document.querySelectorAll('button.button-addToCart')
        botonesAdd.forEach((boton)=> {
            boton.addEventListener('click', ()=> {
                let prenda = arrayProductos.find(producto=> producto.codigo ===  boton.ITEM)
                prenda ? agregarAlCarrito(prenda) : console.warn('No se encontró la prenda.')
            })
        })
}

function cargarProductos() {
    arrayProductos.forEach((producto) => {
        container.innerHTML += retornoCardsHTML(producto)
        agregarClickEnBotones()
    })
}

// ASYNC AWAIT = azúcar sintáctico
async function solicitarPrendas() {
    const response = await fetch(URL)
    const data = await response.json()
    arrayProductos.push(...data)
    arrayProductos.length > 0 ? cargarProductos() : container.innerHTML = retornoCardError()
}

solicitarPrendas()