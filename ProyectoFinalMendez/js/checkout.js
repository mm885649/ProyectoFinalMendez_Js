const tablaCheckout = document.querySelector('tbody')
const btnComprar = document.querySelector('button#btnComprar')

function retornarTablaHTML(prenda) {
    return `<tr>
                <td>${prenda.marca}</td>
                <td>${prenda.modeloDePrenda}</td>
                <td>$ ${prenda.precio.toLocaleString()}</td>
                <td><img src="images/quitar.png" width="30px"></td>
            </tr>`
}

function cargarPrendas() {
    if (carrito.length > 0) {
        tablaCheckout.innerHTML = ''
        carrito.forEach(prenda => {
            tablaCheckout.innerHTML += retornarTablaHTML(prenda)
        })
    }
}
cargarPrendas()

btnComprar.addEventListener('click', ()=> {
    Swal.fire({
        title: 'Compra finalizada',
        text: 'Muchas gracias por su compra!',
        confirmButtonText: 'Aceptar'
      })
      .then((result)=> {
        if (result.isConfirmed) {
            localStorage.removeItem('carritoPrendas')
            carrito.length = 0
            location.href = 'index.html'
        }
    })
})