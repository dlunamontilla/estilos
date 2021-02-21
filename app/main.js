console.clear();

const aCarrito = [
    {
        id: 1,
        imagen: "/ruta/de/imagen.jpeg",
        nombre: "Nombre del producto",
        categoria: "Categoría",
        precio: "30.12 USD",
        cantidad: 30,
    },

    {
        id: 2,
        imagen: "/ruta/de/imagen-02.jpeg",
        nombre: "Nombre del producto | 02",
        categoria: "Categoría",
        precio: "12.15 USD",
        cantidad: 25,
    },

    {
        id: 3,
        imagen: "/ruta/de/imagen-03.jpeg",
        nombre: "Nombre del producto | 03",
        categoria: "Categoría",
        precio: "100.00 USD",
        cantidad: 3,
    },
];

const pintarProductos = (productosHTML, selector) => {
    const [producto, titulo, texto] = [
        document.createElement("div"),
        document.createElement("h2"),
        document.createElement("p")
    ];

    const contenedor = document.querySelector(selector);

    producto.classList.add("productos__item");
    titulo.classList.add("productos__titulo");
    texto.classList.add("productos__texto");

    const productos = [];

    if (contenedor !== null)
        contenedor.textContent = "";

    for (let productoHTML of productosHTML) {
        let [_producto, _titulo, _texto] = [
            producto.cloneNode(false),
            titulo.cloneNode(false),
            texto.cloneNode(false)
        ];

        _producto.setAttribute("data-id", productoHTML.id);
        _titulo.textContent = productoHTML.precio;
        _texto.textContent = productoHTML.nombre;
        _producto.append(_titulo, _texto);
        _producto.setAttribute("tabindex", "-1");

        if (contenedor !== null) {
            contenedor.appendChild(_producto);
        }

        // Formar un array de elementos HTML
        productos.push({
            id: productoHTML.id,
            producto: _producto
        });
    }

    return productos;
};

const productos = pintarProductos(aCarrito, "#productos-contenedor");


const eliminarProducto = (array, id) => {
    let indice = Number(array.findIndex(producto => {
        return producto.id === Number(id)
    }));

    console.log(indice, typeof indice);
    if (indice === -1) return [];
    return array.splice(indice, 1);
};

const seleccionar = (objeto, fn) => {
    if (typeof objeto.dataset.id === "undefined")
        return;

    fn();
}
// Obtener el botón eliminar:
const eliminar = document.querySelector("#eliminar");

// Obtenemos el contenedor:
const contenedor = document.querySelector("#productos-contenedor");

if (contenedor !== null)
    contenedor.onclick = (e) => {
        seleccionar(e.target, function () {
            eliminar.setAttribute("data-id", e.target.dataset.id);
            console.log(e.target.dataset.id);
        });
    }
// Verificar si ha sido capturado:
if (eliminar !== null) {
    eliminar.onclick = () => {
        let id = eliminar.dataset.id;

        let eliminado = eliminarProducto(aCarrito, id);
        pintarProductos(aCarrito, "#productos-contenedor");
        // console.log("Se ha eliminado", eliminado);

        console.log(aCarrito)
    }
}
