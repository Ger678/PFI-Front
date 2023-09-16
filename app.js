// JavaScript para cargar contenido dinámicamente en el div con id "principal"
document.addEventListener("DOMContentLoaded", function () {
    // Manejador de eventos que se ejecutará cuando se cargue la página

    // Función para cargar contenido en el div principal
    function cargarContenido(archivo) {
        // Utiliza AJAX o Fetch para cargar el contenido desde otro archivo HTML
        fetch(archivo)
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                // Inserta el contenido en el div principal
                document.getElementById("principal-body").innerHTML = html;
            })
            .catch(function (error) {
                console.error("Error al cargar el contenido:", error);
            });
    }

    // Ejemplo de cómo cargar contenido desde un archivo llamado "contenido.html"
    document.getElementById("cargarContenido").addEventListener("click", function(){
        cargarContenido("message.html");
    });
});



