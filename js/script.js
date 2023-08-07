
alert("Esta página va a poder calcular el precio total de los productos seleccionados por el usuario (como un carrito de compras), por ahora lo unico que puede hacer es agregar los productos y los precios de forma manual.");

const lista_productos = {
  'Mesa': 1000,
  'Silla': 2000,
  'Caja': 3000
};

function getPrecio(prod) {
  return lista_productos[prod]
}

let productos = []
let total = 0

function carrito(){
  alert("Mesa $1000 \nSilla $2000 \nCaja $3000") 
  let cant = parseInt(prompt("Ingrese la cantidad de productos que quiera agregar: "))
  while(cant !== 0){
    cant -= 1
    let prod = prompt("Ingrese el producto que quiere (Mesa, Silla, Caja): ")
    productos.push(prod)
    total += getPrecio(prod)
  }
  alert("Los productos cargados son: " + productos + "\nEl total de la compra es de: " + total)
  let res = prompt("Desea eliminar algun producto? (S/n)");
  if (res == "S"){
    eliminar()
  }
}

function eliminar(){
  let prod = prompt("Escriba el nombre del producto que desea borrar\n" + productos)
  productos = productos.filter(elemento => elemento !== prod);
  total -= getPrecio(prod)
  alert("Ahora los productos cargados son: " + productos + "\nEl total de la compra es de: " + total)
}

carrito()
