const URL = "js/prendas.json"

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("carritoPrendas")) || []
}

const carrito = recuperarCarrito()

const arrayProductos = []
