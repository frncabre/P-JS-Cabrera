const lista_productos = {};

let productos = []
let total = 0

async function cargarProductosDesdeJSON() {
  try {
    const response = await fetch('/js/productos.json');
    const data = await response.json();

    data.forEach(producto => {
      lista_productos[producto.nombre] = producto.precio;
    });

    actualizarProductosEnCarrito();
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}


function getPrecio(nombreProd) {
  return lista_productos[nombreProd] || 0;
}

function borrarProducto(evento) {
  const productoABorrar = evento.target.getAttribute("data-producto");
  const valorProducto = getPrecio(productoABorrar);
  const indiceProducto = productos.indexOf(productoABorrar);

  if (indiceProducto !== -1) {
    total -= valorProducto;
    productos.splice(indiceProducto, 1);
    localStorage.removeItem(productoABorrar);
    actualizarTotal();
    actualizarProductosEnCarrito();
  }
}

function eliminar(){
  localStorage.clear();
  total = 0;
  productos.length = 0;
  actualizarTotal();
  actualizarProductosEnCarrito();
}

function actualizarTotal() {
  const totalElement = document.getElementById("total");
  totalElement.textContent = "Total: $" + total.toFixed(2);
}

function actualizarProductosEnCarrito() {
  const listaProductos = document.getElementById("productos-en-carrito");
  listaProductos.innerHTML = productos.map(prod => `
    <li>${prod} - $${getPrecio(prod).toFixed(2)} 
    <button class="borrar" data-producto="${prod}">Borrar</button></li>
  `).join("");

  const botonesBorrar = document.querySelectorAll(".borrar");
  botonesBorrar.forEach(boton => {
    boton.addEventListener("click", borrarProducto);
  });
}


function agregarCarrito(){
  const cuandoSeHaceClick = function (evento) {
    if (evento.target.classList.contains("botones")) {
      const prod = evento.target.name;
      const valor = getPrecio(prod);
      localStorage.setItem(prod, valor);
      total += valor;
      productos.push(prod);
      actualizarTotal();
      actualizarProductosEnCarrito();
    }
  };

  document.getElementById("botones-container").addEventListener("click", cuandoSeHaceClick);
}


document.addEventListener("DOMContentLoaded", () => {
  cargarProductosDesdeJSON();
  agregarCarrito();
  actualizarTotal();
  actualizarProductosEnCarrito();
  
  document.getElementById("eliminar").addEventListener("click", eliminar);
});

