document.addEventListener("DOMContentLoaded", function () {

    const searchServers = document.getElementById('searchButton')
    const sawMessages = document.getElementsByTagName('option')
    const messages = document.getElementById('principal-body')
    const servers = document.getElementById('servers')

    console.log(sawMessages)


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

    // let options = [];

    // for(let i=0; i < sawMessages.length; i++){
    //     options.push(sawMessages[i])
    //     console.log(options)
    // }

    // sawMessages.forEach(element =>{
    //     options.append(element);
    // })

    // options.forEach(element => {
    //     console.log("mensajes")

    //     element.addEventListener("click", function(){
    //         messages.setAttribute("style","display:flex");
    //         servers.setAttribute("style","display:none");
    //     });
    // });
    // sawMessages.forEach(element => {
    //     console.log(element)
    // });

    for (let i of sawMessages) {
        console.log(i);
        i.addEventListener("click", function(){
            console.log("mensajes")
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

