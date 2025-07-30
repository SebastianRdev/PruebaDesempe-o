const endpointCategorias = "http://localhost:3000/categories"
const endpointOperaciones = "http://localhost:3000/operaciones"
const operacionesTop = document.getElementById("operaciones-top")
const contenidoOperaciones = document.getElementById("contenido-operaciones")

const filtroTipo = document.getElementById("filtro-tipo-operacion")
const filtroCategoria = document.getElementById("filtro-categoria-operacion")

const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

const main = document.getElementById("main-operaciones")

document.addEventListener("DOMContentLoaded", function () {
    pintarOperaciones()
})

operacionesTop.addEventListener("click", async function(event) {
    event.preventDefault()

    if (event.target.classList.contains("btn-nueva-operacion")) {
        
        main.innerHTML = ""

        main.innerHTML += `
            <section id="seccion-nueva-operacion">
            <div class="contenedor-nueva-operacion">
                <h2>Agregar operación</h2>
                <form id="formulario-operacion" class="formulario-operacion">
                    <label>Descripción</label>
                    <input type="text" id="descripcion-operacion" class="input-operacion" name="descripcion" required>
                    <label>Monto</label>
                    <input type="number" id="monto-operacion" class="input-operacion" name="monto" min="1" required>
                    <label>Tipo</label>
                    <select id="tipo-operacion" class="input-operacion-opcion" name="tipo" required>
                        <option value="" disabled selected>--Selecciona--</option>
                        <option value="compra">Compra</option>
                        <option value="venta">Venta</option>
                    </select>
                    <label>Categoría</label>
                    <select id="categoria-operacion" class="input-operacion-opcion" name="category">
                        <option value="" selected>--Selecciona--</option>
                    </select>
                    <label>Fecha</label>
                    <input type="date" id="fecha-operacion" class="input-operacion" name="fecha" required>
                    <div class="botones-operaciones">
                        <a href="./operaciones.html">
                            <button id="btn-cancelar-operacion">Cancelar</button>
                        </a>
                        <a href="./operaciones.html">
                            <button type="submit" id="btn-guardar-operacion">Guardar</button>
                        </a>
                    </div>
                </form>
            </div>
        </section>
        `

        const form = document.getElementById("formulario-operacion")
        const inputDescripcion = document.getElementById("descripcion-operacion")
        const inputMonto = document.getElementById("monto-operacion")
        const inputTipo = document.getElementById("tipo-operacion")
        const inputCategoria = document.getElementById("categoria-operacion")
        const inputFecha = document.getElementById("fecha-operacion")

        let categ = await fetch(endpointCategorias)
        let data = await categ.json()

        if (data.length === 0) {
            inputCategoria.innerHTML += `
                <option disabled>Sin Categorías, por favor registre al menos una</option>
            `
        }

        for (let categoria of data) {
            inputCategoria.innerHTML += `
                <option value="${categoria.id}">${categoria.nombre}</option>
            `
        }

        form.addEventListener("submit", async function(event) {
            event.preventDefault()

            let nuevaOperacion = {
                descripcion: inputDescripcion.value,
                monto: parseFloat(inputMonto.value),
                tipo: inputTipo.value,
                categoryId: inputCategoria.value,
                fecha: inputFecha.value
            }

            crearOperacion(nuevaOperacion)
            form.reset()
            pintarTodo()
        })
        
    }
})

async function pintarTodo() {
    main.innerHTML = ""

    main.innerHTML += `
        <section id="hero-operaciones">
            <div class="grid-contenedor-operaciones">
                <article class="tarjeta-operaciones" id="tarjeta-balance">
                    <div class="balances">
                        <h2>Balance</h2>
                        <ul>
                            <li>
                                Ganancias <span id="ganancias">+$0</span>
                            </li>
                            <li>
                                Gastos <span id="gastos">-$0</span>
                            </li>
                            <li>
                                Total <span id="total-span">$0</span>
                            </li>
                        </ul>
                    </div>
                </article>
                <article class="tarjeta-operaciones" id="tarjeta-filtros">
                    <div class="filtros" id="filtros">
                        <h2>Filtros</h2>
                        <label>Tipo</label>
                        <select id="filtro-tipo-operacion" class="input-operacion-opcion input-tipo-filtro">
                            <option value="" selected>--Tipo--</option>
                            <option value="compra">Compra</option>
                            <option value="venta">Venta</option>
                        </select>
                        <label>Categoria</label>
                        <select id="filtro-categoria-operacion" class="input-operacion-opcion">
                            <option value="" selected>--Categoria--</option>
                        </select>
                        <label for="filtro-fecha-inicio">Desde:</label>
                        <input type="date" id="filtro-fecha-inicio" class="date_filtros" name="desde">
                        <label>Ordenar por</label>
                        <select id="filtro-tipo-operacion" class="input-operacion-opcion input-tipo-filtro">
                            <option value="" selected>--Ordenar--</option>
                            <option value="compra">Mas reciente</option>
                            <option value="venta">Mas antiguo</option>
                        </select>
                </article>
                <article class="tarjeta-operaciones-crear" id="tarjeta-crear-operacion">
                    <div class="operaciones-top" id="operaciones-top">
                        <h2>Operaciones</h2>
                        <button id="nueva-operacion" class="btn-nueva-operacion">+Nueva operación</button>
                    </div>
                    <div class="contenido-operaciones">
                        <img src="../../public/images/wallet.svg" alt="imagen sin resultados" id="imagen-sin-resultados">
                        <p><span>Sin resultados</span></p>
                        <p>Cambia los filtros o agrega operaciones</p>
                    </div>
                </article>
            </div>
        </section>
    `
}

async function crearOperacion(nuevaOperacion) {
    await fetch(endpointOperaciones, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaOperacion)
    })
}

async function pintarOperaciones() {
    let response = await fetch(`${endpointOperaciones}?_embed=category`)
    let data = await response.json()

    if(data.length === 0) {
        contenidoOperaciones.innerHTML = ""
        contenidoOperaciones.innerHTML += `
            <img src="../../public/images/wallet.svg" alt="imagen sin resultados" id="imagen-sin-resultados">
            <p><span>Sin resultados</span></p>
            <p>Cambia los filtros o agrega operaciones</p>
        `
    } else {
        contenidoOperaciones.innerHTML = ""

        for (let operacion of data) {
            contenidoOperaciones.innerHTML += `
                <div class="tabla-responsive-wrapper">
                    <table id="tabla-operaciones">
                        <thead>
                            <tr>
                                <th>Descripcion</th>
                                <th>Categoria</th>
                                <th>Fecha</th>
                                <th>Monto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tbody-operaciones">
                            <tr>
                                <td data-label="Descripción">${operacion.descripcion}</td>
                                <td data-label="Categoría">${operacion.category === undefined ? "La categoría fue eliminada" : operacion.category.nombre}</td>
                                <td data-label="Fecha">${operacion.fecha}</td>
                                <td data-label="Monto">${operacion.monto}</td>
                                <td data-label="Acciones">
                                    <button class="btn-editar-operacion" 
                                        data-id="${operacion.id}" 
                                        data-tipo="${operacion.tipo}" 
                                        data-descripcion="${operacion.descripcion}" 
                                        data-monto="${operacion.monto}" 
                                        data-fecha="${operacion.fecha}" 
                                        data-categoria="${operacion.category ? operacion.category.id : ''}">Editar</button>
                                    <button class="btn-eliminar-operacion" data-id="${operacion.id}">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
        }

        const tbody = document.getElementById("tbody-operaciones")
        tbody.addEventListener("click", async function(event) {
            event.preventDefault()

            if (event.target.classList.contains("btn-eliminar-operacion")) {
                const id = event.target.getAttribute("data-id");
                await fetch(`${endpointOperaciones}/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type":"application/json"},
                    body: JSON.stringify()
                })
            } else if (event.target.classList.contains("btn-editar-operacion")) {
                const id = event.target.getAttribute("data-id");
                const tipo = event.target.getAttribute("data-tipo");
                const descripcion = event.target.getAttribute("data-descripcion");
                const monto = event.target.getAttribute("data-monto");
                const fecha = event.target.getAttribute("data-fecha");
                const idCategoria = event.target.getAttribute("data-categoria");

                let idEditando = null

                main.innerHTML = ""

                main.innerHTML += `
                    <section id="seccion-editar-operacion">
                    <div class="contenedor-editar-operacion">
                        <h2>Editar operación</h2>
                        <form id="formulario-operacion-editar" class="formulario-operacion">
                            <label>Descripción</label>
                            <input type="text" id="descripcion-operacion-editar" class="input-operacion" name="descripcion" required>
                            <label>Monto</label>
                            <input type="number" id="monto-operacion-editar" class="input-operacion" name="monto" min="1" required>
                            <label>Tipo</label>
                            <select id="tipo-operacion-editar" class="input-operacion-opcion" name="tipo" required>
                                <option value="" disabled selected>--Selecciona--</option>
                                <option value="compra">Compra</option>
                                <option value="venta">Venta</option>
                            </select>
                            <label>Categoría</label>
                            <select id="categoria-operacion-editar" class="input-operacion-opcion" name="category">
                                <option value="" selected>--Selecciona--</option>
                            </select>
                            <label>Fecha</label>
                            <input type="date" id="fecha-operacion-editar" class="input-operacion" name="fecha" required>
                            <div class="botones-operaciones">
                                <a href="./operaciones.html">
                                    <button id="btn-cancelar-operacion-editar">Cancelar</button>
                                </a>
                                <a href="./operaciones.html">
                                    <button type="submit" id="btn-guardar-operacion-editar">Guardar</button>
                                </a>
                            </div>
                        </form>
                    </div>
                    </section>
                `
                
                const formEditar = document.getElementById("formulario-operacion-editar")
                const inputDescripcionEditar = document.getElementById("descripcion-operacion-editar")
                const inputMontoEditar = document.getElementById("monto-operacion-editar")
                const inputTipoEditar = document.getElementById("tipo-operacion-editar")
                const inputCategoriaEditar = document.getElementById("categoria-operacion-editar")
                const inputFechaEditar = document.getElementById("fecha-operacion-editar")

                let categ = await fetch(endpointCategorias)
                let data = await categ.json()

                if (data.length === 0) {
                    inputCategoriaEditar.innerHTML += `
                        <option disabled>Sin Categorías, por favor registre al menos una</option>
                    `
                }

                for (let categoria of data) {
                    inputCategoriaEditar.innerHTML += `
                        <option value="${categoria.id}">${categoria.nombre}</option>
                    `
                }

                inputTipoEditar.value = tipo
                inputDescripcionEditar.value = descripcion
                inputMontoEditar.value = monto
                inputFechaEditar.value = fecha
                inputCategoriaEditar.value = idCategoria

                idEditando = id

                formEditar.addEventListener("submit", async function(event) {
                    event.preventDefault()

                    let operacionEditada = {
                        descripcion: inputDescripcionEditar.value,
                        monto: parseFloat(inputMontoEditar.value),
                        tipo: inputTipoEditar.value,
                        categoryId: inputCategoriaEditar.value,
                        fecha: inputFechaEditar.value
                    }

                    if (idEditando) {
                        await fetch (`${endpointOperaciones}/${idEditando}`, {
                            method: "PUT",
                            headers: { "Content-Type":"application/json"},
                            body: JSON.stringify(operacionEditada)
                        })
                        idEditando = null
                        formEditar.reset()
                    }
                })
            }
        })
    }
}

iconoLogin.addEventListener("click", () => {
    menuLogin.style.display = menuLogin.style.display === "block" ? "none" : "block"
})

document.addEventListener("click", (e) => {
    if (!iconoLogin.contains(e.target) && !menuLogin.contains(e.target)) {
        menuLogin.style.display = "none"
    }
})

document.getElementById("cerrar-sesion-btn").addEventListener("click", () => {
    localStorage.clear()
    window.location.href = "./../../index.html"
})