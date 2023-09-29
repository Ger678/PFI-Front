var usuario_id = '';
var servers = [];

window.addEventListener('load', function() {
    getProfile()
})

 function getProfile(){
    const url = "http://127.0.0.1:5000/auth/profile";
    
    fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode:"cors",
        credentials: 'same-origin',
    })
    .then(response => {
        if (response.status === 200) {

            console.log(response)
            return response.json().then(data => {

                document.getElementById("user-name").innerText = data.nombre_usuario;
                imagen = document.createElement('img');
                imagen.src = `assets/${data.imagen}`
                imagen.style.borderRadius = '50%';
                document.getElementById("user-image").appendChild(imagen);

                localStorage.setItem('usuario_id', data.usuario_id);
                usuario_id = data.usuario_id;
                localStorage.setItem('nombre_usuario', data.nombre_usuario);
                obtener_servers()
            });
        } else {
            return response.json().then(data => {
                console.log(data);
                console.log(response);
                // document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}


function obtener_servers() {
    
    fetch("http://127.0.0.1:5000/servidores/", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(res.status == 200) {
        return res.json().then((data) => {
         servers = data
         data.forEach(server=>{
           const serverImg = leftServers(server)
           serverImg.addEventListener('click',() => {
                console.log(server.servidor_id);
                canales(server.servidor_id)
           })
           const serverList = document.getElementById('lista')
           serverList.appendChild(serverImg)
         })
        })
      } else{
        console.log(res)
        return res.json().then((data) => {
          console.log(data)
        })
      }
      })
      .catch((err) => console.log("Error: " + err))
}

function leftServers(server){
    const img = document.createElement("img");
    img.src = `assets/${server.imagen}`

    return img
}

var usuarioID = localStorage.getItem('usuario_id');

function canales(id){    
    const canalContainer = document.createElement("div");
    const canalh3 = document.createElement('h3');
    const canalesTexto = document.getElementById('canales-texto')
    
    canalesTexto.innerHTML = '';

    fetch(`http://127.0.0.1:5000/servidores/${id}/canales`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((res) => {
        if(res.status == 200) {
          return res.json().then((data) => {
           
            

           data.forEach(canal=>{
                console.log(canal);
  
                canalContainer.className = "canal"
                canalh3.innerHTML = canal.nombre_canal;
                canalContainer.appendChild(canalh3);

                canalesTexto.appendChild(canalContainer);

                localStorage.setItem('canal', canal.canal_id);

                canalContainer.addEventListener('click', () => {
                    obtenerMensajes(canal.canal_id);
                });
           })
          })
        } else{
          console.log(res)
          return res.json().then((data) => {
            console.log(data)
          })
        }
        })
        .catch((err) => console.log("Error: " + err))
}

function obtenerMensajes(canal_id){
    const url = `http://127.0.0.1:5000/mensajes/${canal_id}/canal`
    const container = document.getElementById('mensajes-container')
    localStorage.setItem('canal_id', canal_id);

    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((res) => {
        if(res.status == 200) {
          return res.json().then((data) => {
            const mensajesContainer = document.getElementById('mensajes');
            mensajesContainer.innerHTML = '';
            data.forEach(mensajes=>{
                const mjs = mensajesCanal(mensajes);
                container.appendChild(mjs);
           })
          })
        } else{
          console.log(res)
          return res.json().then((data) => {
            console.log(data)
          })
        }
        })
        .catch((err) => console.log("Error: " + err))
}

function getUsuario(id){
    const url = `http://127.0.0.1:5000/usuario/${id}`

    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((res) => {
        if(res.status == 200) {
          return res.json().then((data) => {
            console.log(data)
          })
        } else{
            return res.json()
        }
        console.log(res)
        })
        .catch((err) => console.log("Error: " + err))
}

function getUsuarios(){
    const url = "http://127.0.0.1:5000/"

    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
    }).then((res) => {
        if(res.status == 200) {
          return res.json()
        } else{
            return res.json()
        }
        console.log(res)
        })
        .catch((err) => console.log("Error: " + err))
}

//const user_name = getUsuarios()

function mensajesCanal(mensajes) {
    const mensajesContainer = document.getElementById('mensajes');
    const mensaje = document.createElement('div');
    localStorage.getItem('usuario_id')

    if(mensajes.usuario_id == usuario_id){
        mensaje.classList = 'message-user';
    } else {
        mensaje.classList = 'message-received'
    }
    mensajesContainer.appendChild(mensaje);

    const hora = document.createElement('p');
    hora.classList = 'message-hour';
    hora.innerText = mensajes.fecha_envio;
    mensaje.appendChild(hora)

    const contenido = document.createElement('div')
    contenido.classList = 'mensaje-value'
    contenido.innerText = mensajes.contenido;
    mensaje.appendChild(contenido);

    const name = document.createElement('p');
    name.classList = 'message-emitter';    
    name.innerText = 'user_name'
    mensaje.appendChild(name);

    mensajesContainer.append(mensaje)

    return mensajesContainer
}

const exit = document.getElementById('exit')
exit.addEventListener("click", function () {
    const url = 'http://127.0.0.1:5000/auth/logout'

    fetch(url, {
        method: 'GET',
        credentials: 'include',
        mode:"cors",
        credentials: 'same-origin',
    })
    .then(response => {
        if (response.status === 200) {

            console.log(response)
            return response.json().then(data => {
                window.alert(data.message)
                usuario_id = '';
                window.location.href = 'inicio-sesion.html';
            });
        } else {
            return response.json().then(data => {
                window.alert(data.message)
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
    
});

