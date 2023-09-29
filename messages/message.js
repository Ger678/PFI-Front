const jsonURL = 'messages.json';

const canal_div = document.getElementsByClassName('canal')

// const usuarioID = localStorage.getItem('usuario_id');



fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    data.forEach(element => {
        let contenido = element.contenido;
        let usuario = element.id_remitente;
        let hora = element.fecha_hora;

        //agregarMensaje(contenido, usuario, hora);
    });
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

function agregarMensaje(contenido, hora) {
    const mensajesDiv = document.getElementById('mensajes');
    const message = document.createElement('div');
    const nuevoMensaje = document.createElement('div');
    const spanHour = document.createElement('span');
    const hour = hora.toLocaleString('es-PY', { timeZone: 'UTC' });

    spanHour.classList.add('message-hour');
    spanHour.textContent = hour;

    nuevoMensaje.classList.add('message-value');
    nuevoMensaje.textContent = contenido;
    message.classList.add('message-user')

    message.appendChild(spanHour);
    message.appendChild(nuevoMensaje);
    // mensajesDiv.appendChild(nuevoMensaje);
    mensajesDiv.appendChild(message);
    return mensajesDiv;
}

// Función para enviar un mensaje
function enviarMensaje() {
    const mensajeInput = document.getElementById('mensajeInput');
    const contenido = mensajeInput.value;
    const usuario = 1;
    const hora = new Date();
    if (contenido.trim() !== '') {
        // Agrega el mensaje a la lista de mensajes
        agregarMensaje(contenido, hora);
        crearMensaje(contenido)

        // Limpia el campo de entrada
        mensajeInput.value = '';
    }
}

function crearMensaje(contenido){
    const usuarioID = localStorage.getItem('usuario_id');
    const canalID = localStorage.getItem('canal_id');
    const url = `http://127.0.0.1:5000/mensajes/${canalID}`
    const form = JSON.stringify({
        contenido: contenido,
        usuario_id: usuarioID,
        canal_id: canalID
      });
    
      fetch(url, {
        method: "POST",
        body: form,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(form);
        if(res.status == 201) {
          return res.json().then((data) => {
            console.log(data);
          })
        } else{
          console.log(res)
          return res.json().then((data) => {
            console.log(data);
          })
        }
        })
        .catch((err) => console.log("Error: " + err))
        .then((response) => console.log("Success: " + response));
}

// Enter
const mensajeInput = document.getElementById('mensajeInput');
mensajeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        console.log('Enter')
        enviarMensaje();

        
    }
});

const mensajeBoton = document.getElementById('enviarMensaje');
mensajeBoton.addEventListener('click', function (event) {
    enviarMensaje();
});

