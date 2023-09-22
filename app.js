document.addEventListener("DOMContentLoaded", function () {

    const searchServers = document.getElementById('searchButton')
    const sawMessages = document.getElementById('cargarContenido')
    const messages = document.getElementById('mensajes')

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
        console.log("Hola")
        messages.setAttribute("hidden","");
    });


    document.getElementById('canales-texto').addEventListener("click", function(){
        cargarContenido("app.html");
        cargarContenido("app.js");
    })
});

