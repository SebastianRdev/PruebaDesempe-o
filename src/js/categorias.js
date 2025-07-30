const form = document.getElementById("formulario-categorias")

const endpointOperaciones = "http://localhost:3000/operaciones"
const endpointCategorias = "http://localhost:3000/categories"

const inputNombre = document.getElementById("nombre-categoria")
let listaCategorias = document.getElementById("tarjetas-categorias")

// Elementos del menú de usuario/login
const iconoLogin = document.getElementById("icono-login")
const menuLogin = document.getElementById("menu-login")

let isEditando = null


// --- Inicialización al cargar la página (pintar las categorías) ---
document.addEventListener("DOMContentLoaded", pintarCategorias);


// --- Obtener y mostrar categorías desde la API ---
async function pintarCategorias() {
    listaCategorias.innerHTML = ""

    try {
        let response = await fetch(endpointCategorias)
        let data = await response.json()

        // --- Guarda en localstorage
        localStorage.setItem("categorias", JSON.stringify(data))

        for (let category of data) {
            listaCategorias.innerHTML += `
            <div class="tarjeta">
                <h3>${category.nombre}</h3>
                <button class="btn-eliminar-categoria" data-id="${category.id}">Eliminar</button>
                <button class="btn-editar-categoria" data-id="${category.id}" data-nombre="${category.nombre}">Editar</button>
            </div>
            `
        }
    } catch (error) {
        alert("Error al cargar las categorias")
    }
}


// --- Manejar el submit del formulario para agregar o actualizar una categoría ---
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nombre = inputNombre.value.trim() // Estoy declarando el input

    // Actualización de una categoría existente
    if (isEditando) {
        await fetch(`${endpointCategorias}/${isEditando}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });
        isEditando = null;
        form.reset()
        pintarCategorias()
    // Agregar nueva categoría
    } else {
        event.target.classList.contains("btn-guardar-categoria")
        agregarCategoria()
    }
});



// --- Manejar clicks en la lista de categorías (eliminar o editar) ---
listaCategorias.addEventListener("click", function(event) {
    event.preventDefault();

    // Eliminar categoría
    if (event.target.classList.contains("btn-eliminar-categoria")) {
        const id = event.target.getAttribute("data-id");
        eliminarCategoria(id);

    // Preparar edición de categoría
    } else if (event.target.classList.contains("btn-editar-categoria")) {
        const id = event.target.getAttribute("data-id"); // Tambien existe esta forma: event.target.dataset.id;
        const nombre = event.target.getAttribute("data-nombre");
        actualizarCategoria(id,nombre);
    }
})



// --- CRUD de categorías (crear, actualizar, eliminar) ---
async function agregarCategoria() {
    const nombre = inputNombre.value.trim()
    await fetch(endpointCategorias, {
        method: "POST",
        headers: { "Content-Type":"application/json"},
        body: JSON.stringify({nombre})
    });

    pintarCategorias()
    form.reset()
}



async function actualizarCategoria(id,nombre) {
    inputNombre.value = nombre
    isEditando = id
}



async function eliminarCategoria(id) {
    // 1. Elimina la categoría
    await fetch(`${endpointCategorias}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify()
    });

    // 2. Busca y elimina todos los operaciones con esa categoría
    // Trae todos los operaciones que tengan categoryId igual al id eliminado
    const response = await fetch(`${endpointOperaciones}?categoryId=${id}`);
    const operaciones = await response.json();

    // 3. Elimina cada operacion asociada
    for (let operacion of operaciones) {
        await fetch(`${endpointOperaciones}/${operacion.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
    }

    await pintarCategorias();
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