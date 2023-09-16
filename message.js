// Función para agregar un mensaje a la lista de mensajes
function agregarMensaje(mensaje) {
    const mensajesDiv = document.querySelector('.mensajes');
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('mensaje');
    nuevoMensaje.textContent = mensaje;
    mensajesDiv.appendChild(nuevoMensaje);
}

// Función para enviar un mensaje
function enviarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const mensaje = mensajeInput.value;

    if (mensaje.trim() !== '') {
        // Agrega el mensaje a la lista de mensajes
        agregarMensaje(mensaje);

        // Limpia el campo de entrada
        mensajeInput.value = '';
    }
}

// Agrega un evento de clic al botón "Enviar"
const enviarBoton = document.getElementById('enviarMensaje');
enviarBoton.addEventListener('click', enviarMensaje);

// También puedes permitir el envío de mensajes al presionar Enter en el campo de entrada
const mensajeInput = document.getElementById('mensajeInput');
mensajeInput.addEventListener('keydown', function (event) {
    console.log('hola mundo');
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});
