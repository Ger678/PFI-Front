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
            // return response.json().then(data => {

            //     document.getElementById("username").innerText = data.username;
            //     document.getElementById("email").innerText = data.email;
            //     document.getElementById("first_name").innerText = data.first_name;
            //     document.getElementById("last_name").innerText = data.last_name;
            // });
        } else {
            return response.json().then(data => {
                console.log(response);
                // document.getElementById("message").innerHTML = data.message;
            });
        }
    })
    .catch(error => {
        document.getElementById("message").innerHTML = "An error occurred.";
    });
}


document.addEventListener("DOMContentLoaded", function () {

    const searchServers = document.getElementById('searchButton')
    const sawMessages = document.getElementsByTagName('option')
    const messages = document.getElementById('principal-body')
    const servers = document.getElementById('servers')



    function cargarContenido(archivo) {

        fetch(archivo)
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                document.getElementById("principal-body").innerHTML = html;
            })
            .catch(function (error) {
                console.error("Error al cargar el contenido:", error);
            });
    }

    // Ejemplo de cómo cargar contenido desde un archivo llamado "contenido.html"
    searchServers.addEventListener("click", function(){
        messages.style.display="none";
        servers.style.display="flex";
    });

    for (let i of sawMessages) {
        i.addEventListener("click", function(){
            messages.style.display="flex";
            servers.style.display="none";
        })
    }

    // sawMessages.addEventListener("click", function(){
    //     console.log("mensajes")
    //     messages.setAttribute("style","display:flex");
    //     servers.setAttribute("style","display:none");
    // });
});

