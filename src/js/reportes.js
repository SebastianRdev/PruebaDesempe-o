// --- Definición de Endpoints y referencias a elementos del DOM ---
// Endpoints para acceder a la API de operaciones y categorías
const endpointOperaciones = "http://localhost:3000/operaciones"
const endpointCategorias = "http://localhost:3000/categories"

// Elementos donde se mostrarán los reportes individuales
const reportes = document.getElementById("grid-reportes")
const categMasVendida = document.getElementById("categoria-mas-vendida")
const categMasComprado = document.getElementById("categoria-mas-compras")
const prodMasVendido = document.getElementById("producto-mas-vendido")
const prodMasComprado = document.getElementById("producto-mas-comprado")
const mesVentas = document.getElementById("mes-ventas")
const mesCompras = document.getElementById("mes-compras")

// Elementos para mostrar las tablas de agrupación por mes y por categoría
const totalMes = document.getElementById("tabla-mes")
const totalCategoria = document.getElementById("tabla-categorias")

// Elementos del menú de usuario/login
const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

// --- Inicialización al cargar la página ---
// Al cargar la página se ejecutan todas las funciones de reporte
document.addEventListener("DOMContentLoaded", function () {
    categoriaVentas()
    categoriaCompras()
    productoVentas()
    productoCompras()
    mesVenta()
    mesCompra()
    totalMesAgrupado()
    totalCategoriaAgrupado()
})

/**
 * Calcula cuál es la categoría con más ventas (más operaciones de tipo venta)
 * y la muestra en el reporte correspondiente.
 */
async function categoriaVentas() {
    const response = await fetch(`${endpointOperaciones}?tipo=venta&_embed=category`)
    const data = await response.json()

    const conteoCategoriaVentas = {}

    // Cuenta cuántas ventas hay por cada categoría
    data.forEach(rep => {
        if (conteoCategoriaVentas[rep.category.nombre]) {
            conteoCategoriaVentas[rep.category.nombre] += 1
        } else {
            conteoCategoriaVentas[rep.category.nombre] = 1
        }
    })

    // Busca la categoría con mayor cantidad de ventas
    let categoriaMayorVenta = ""
    let mayorVenta = 0
    for (let categoria in conteoCategoriaVentas) {
        if (conteoCategoriaVentas[categoria] > mayorVenta) {
            mayorVenta = conteoCategoriaVentas[categoria]
            categoriaMayorVenta = categoria
        }
    }

    pintarReportes(categMasVendida, categoriaMayorVenta)
}

/**
 * Calcula cuál es la categoría con más compras (más operaciones de tipo compra)
 * y la muestra en el reporte correspondiente.
 */
async function categoriaCompras() {
    const response = await fetch(`${endpointOperaciones}?tipo=compra&_embed=category`)
    const data = await response.json()

    const conteoCategoriaCompra = {}

    // Cuenta cuántas compras hay por cada categoría
    data.forEach(rep => {
        if (conteoCategoriaCompra[rep.category.nombre]) {
            conteoCategoriaCompra[rep.category.nombre] += 1
        } else {
            conteoCategoriaCompra[rep.category.nombre] = 1
        }
    })

    // Busca la categoría con mayor cantidad de compras
    let categoriaMayorCompra = ""
    let mayorCompra = 0
    for (let categoria in conteoCategoriaCompra) {
        if (conteoCategoriaCompra[categoria] > mayorCompra) {
            mayorCompra = conteoCategoriaCompra[categoria]
            categoriaMayorCompra = categoria
        }
    }

    pintarReportes(categMasComprado, categoriaMayorCompra)
}

/**
 * Calcula el producto más vendido (descripción con más ventas)
 * y lo muestra en el reporte correspondiente.
 */
async function productoVentas() {
    const response = await fetch(`${endpointOperaciones}?tipo=venta&_embed=category`)
    const data = await response.json()

    const conteoProductoVentas = {}

    // Cuenta cuántas ventas hay por cada producto (descripción)
    data.forEach(rep => {
        if (conteoProductoVentas[rep.descripcion]) {
            conteoProductoVentas[rep.descripcion] += 1
        } else {
            conteoProductoVentas[rep.descripcion] = 1
        }
    })

    let productoMayorVenta = ""
    let mayorVenta = 0
    for (let producto in conteoProductoVentas) {
        if (conteoProductoVentas[producto] > mayorVenta) {
            mayorVenta = conteoProductoVentas[producto]
            productoMayorVenta = producto
        }
    }

    pintarReportes(prodMasVendido, productoMayorVenta)
}

/**
 * Calcula el producto más comprado (descripción con más compras)
 * y lo muestra en el reporte correspondiente.
 */
async function productoCompras() {
    const response = await fetch(`${endpointOperaciones}?tipo=compra&_embed=category`)
    const data = await response.json()

    const conteoProductoCompra = {}

    // Cuenta cuántas compras hay por cada producto (descripción)
    data.forEach(rep => {
        if (conteoProductoCompra[rep.descripcion]) {
            conteoProductoCompra[rep.descripcion] += 1
        } else {
            conteoProductoCompra[rep.descripcion] = 1
        }
    })

    let productoMayorCompra = ""
    let mayorCompra = 0
    for (let producto in conteoProductoCompra) {
        if (conteoProductoCompra[producto] > mayorCompra) {
            mayorCompra = conteoProductoCompra[producto]
            productoMayorCompra = producto
        }
    }

    pintarReportes(prodMasComprado, productoMayorCompra)
}

/**
 * Calcula el mes con más ventas y lo muestra en el reporte correspondiente.
 * Agrupa los Operaciones de tipo venta por mes y cuenta cuántos hay por cada mes.
 */
async function mesVenta() {
    const response = await fetch(`${endpointOperaciones}?tipo=venta`)
    const data = await response.json()

    const conteoPorMes = {}

    // Agrupa ventas por mes (usando los primeros 7 caracteres de la fecha: "YYYY-MM")
    data.forEach(rep => {
        const mes = rep.fecha.slice(0, 7)
        conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1
    })

    let mesMayor = ""
    let maxVentas = 0
    for (let mes in conteoPorMes) {
        if (conteoPorMes[mes] > maxVentas) {
            maxVentas = conteoPorMes[mes]
            mesMayor = mes
        }
    }

    pintarMesVentas(`${mesMayor} (${maxVentas} ventas)`)
}

/**
 * Calcula el mes con más compras y lo muestra en el reporte correspondiente.
 * Agrupa los operaciones de tipo compra por mes y cuenta cuántos hay por cada mes.
 */
async function mesCompra() {
    const response = await fetch(`${endpointOperaciones}?tipo=compra`)
    const data = await response.json()

    const conteoPorMes = {}

    data.forEach(rep => {
        const mes = rep.fecha.slice(0, 7)
        conteoPorMes[mes] = (conteoPorMes[mes] || 0) + 1
    })

    let mesMayor = ""
    let maxCompras = 0
    for (let mes in conteoPorMes) {
        if (conteoPorMes[mes] > maxCompras) {
            maxCompras = conteoPorMes[mes]
            mesMayor = mes
        }
    }

    pintarMesCompras(`${mesMayor} (${maxCompras} compras)`)
}

/**
 * Agrupa y suma el total de compras y ventas por mes.
 * Muestra los resultados en una tabla dinámica.
 */
async function totalMesAgrupado() {
    const response = await fetch(`${endpointOperaciones}?_embed=category`);
    const data = await response.json();

    const totales = {};

    // Agrupa los importes de compras y ventas por mes
    data.forEach(mov => {
        const mes = mov.fecha.slice(0, 7);
        const tipo = mov.tipo;
        if (!totales[mes]) {
            totales[mes] = { ventas: 0, compras: 0 };
        }
        if (tipo === "venta") {
            totales[mes].ventas += mov.importe;
        } else if (tipo === "compra") {
            totales[mes].compras += mov.importe;
        }

    });

    const tbody = document.getElementById("tabla-mes");
    tbody.innerHTML = "";
    Object.entries(totales).forEach(([mes, valores]) => {
        tbody.innerHTML += `
            <tr>
                <td>${mes}</td>
                <td>$${valores.compras.toLocaleString()}</td>
                <td>$${valores.ventas.toLocaleString()}</td>
            </tr>
        `;
    });
}

/**
 * Agrupa y suma el total de compras y ventas por categoría.
 * Muestra los resultados en una tabla dinámica.
 */
async function totalCategoriaAgrupado() {
    const response = await fetch(`${endpointOperaciones}?_embed=category`);
    const data = await response.json();

    const totales = {};

    // Agrupa los importes de compras y ventas por categoría
    data.forEach(mov => {
        const categoria = mov.category?.nombre || "Sin categoría";
        const tipo = mov.tipo;
        if (!totales[categoria]) {
            totales[categoria] = { ventas: 0, compras: 0 };
        }
        if (tipo === "venta") {
            totales[categoria].ventas += mov.importe;
        } else if (tipo === "compra") {
            totales[categoria].compras += mov.importe;
        }
    });

    const tbody = document.getElementById("tabla-categorias");
    tbody.innerHTML = "";
    Object.entries(totales).forEach(([categoria, valores]) => {
        tbody.innerHTML += `
            <tr>
                <td>${categoria}</td>
                <td>$${valores.compras.toLocaleString()}</td>
                <td>$${valores.ventas.toLocaleString()}</td>
            </tr>
        `;
    });
}

/**
 * Inserta el valor info dentro del elemento padre (usado para mostrar el resultado principal de los reportes individuales)
 */
async function pintarReportes(padre, info) {
    padre.innerHTML = ""
    padre.innerHTML += `<p>${info}</p>`
}

// --- Renderizado de resultados de meses en el DOM ---
async function pintarMesVentas(tipo) {
    mesVentas.innerHTML = ""
    mesVentas.innerHTML += `<p>${tipo}</p>`
}

async function pintarMesCompras(tipo) {
    mesCompras.innerHTML = ""
    mesCompras.innerHTML += `<p>${tipo}</p>`
}

// --- Menú de usuario/Login y cierre de sesión ---
// Abre/cierra el menú flotante de usuario
iconoLogin.addEventListener("click", () => {
    menuLogin.style.display = menuLogin.style.display === "block" ? "none" : "block"
})

// Cierra el menú si haces clic fuera del icono o del menú
document.addEventListener("click", (e) => {
    if (!iconoLogin.contains(e.target) && !menuLogin.contains(e.target)) {
        menuLogin.style.display = "none"
    }
})

// Acción del botón cerrar sesión: limpia todo el localStorage y redirige a la página principal
document.getElementById("cerrar-sesion-btn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "./../../index.html"
})