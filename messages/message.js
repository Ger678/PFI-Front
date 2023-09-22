const jsonURL = 'messages.json';

fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
        let contenido = element.contenido;
        let usuario = element.id_remitente;
        let hora = element.fecha_hora;

        agregarMensaje(contenido, usuario, hora);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

function agregarMensaje(contenido, usuario, hora) {
    const mensajesDiv = window.document.querySelector('.mensajes');
    const message = document.createElement('div');
    const nuevoMensaje = document.createElement('div');
    const spanHour = document.createElement('span');
    const hour = hora.toLocaleString('es-PY', { timeZone: 'UTC' });

    spanHour.classList.add('message-hour');
    spanHour.textContent = hour;

    nuevoMensaje.classList.add('message-value');
    nuevoMensaje.textContent = contenido;
    if(usuario == 1){
        message.classList.add('message-user')
    } else {
        message.classList.add('message-received')
    }
    message.appendChild(spanHour);
    message.appendChild(nuevoMensaje);
    // mensajesDiv.appendChild(nuevoMensaje);
    mensajesDiv.appendChild(message);
}

// Función para enviar un mensaje
function enviarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const contenido = mensajeInput.value;
    const usuario = 1;
    const hora = new Date();
    if (contenido.trim() !== '') {
        // Agrega el mensaje a la lista de mensajes
        agregarMensaje(contenido, usuario, hora);

        // Limpia el campo de entrada
        mensajeInput.value = '';
    }
}

// Enter
const mensajeInput = document.getElementById('mensajeInput');
mensajeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
});

const mensajeBoton = document.getElementById('enviarMensaje');
mensajeBoton.addEventListener('click', function (event) {
    enviarMensaje();
});

