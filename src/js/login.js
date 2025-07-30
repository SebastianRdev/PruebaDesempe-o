const formLogin = document.getElementById("form-login")

formLogin.addEventListener("submit", function(event) {
    
    const inputUsername = formLogin.username.value
    const inputPassword = formLogin.password.value
    login(inputUsername, inputPassword)

    event.preventDefault()
})

async function login(inputUsername, inputPassword) {
    let response = await fetch(`http://localhost:3000/users?username=${inputUsername}`)
    let data = await response.json()

    if(data.length === 0) {
        mostrarMensaje("Usuario no encontrado", "error");
    } else {

        const userFound = data[0]
        
        if (userFound.password === inputPassword) {

            localStorage.setItem("currentUser",JSON.stringify(userFound))
            window.location.href = "../views/operaciones.html"

            mostrarMensaje(`Bienvenido, ${user.name}`, "exito");

        } else {

            mostrarMensaje("Contraseña incorrecta", "error");

        }
    }
    
}

//  Función para mostrar un mensaje en pantalla
function mostrarMensaje(texto, tipo) {
    // Selecciona el elemento donde se mostrará el mensaje
    const mensaje = document.getElementById("mensaje-login");

    // Establece el texto del mensaje
    mensaje.textContent = texto;

    // Asigna una clase CSS según el tipo de mensaje ("error" o "exito")
    mensaje.className = tipo === "error" ? "mensaje-error" : "mensaje-exito";

    // Muestra el mensaje
    mensaje.style.display = "block";

    // Reinicia la animación del mensaje
    mensaje.style.animation = "none";
    mensaje.offsetHeight;
    mensaje.style.animation = "";

    // Oculta el mensaje después de 2 segundos
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 2000);
}