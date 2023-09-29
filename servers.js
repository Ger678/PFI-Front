console.log("servers")
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
const serverContainer = document.getElementById('server-container')


searchButton.addEventListener('click', function(e) {
    searchBox.value = '';
    
});

function obtener_todos() {
    
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
            const card = createCard(server)
            serverContainer.appendChild(card);
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
      .then((response) => console.log("Success: " + response));
}



function createCard(server) {
    // Crear elementos HTML
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('image');
    img.src = `assets/${server.imagen}`;

    const bottom = document.createElement('div');
    bottom.classList.add('bottom');

    const titulo = document.createElement('div');
    titulo.classList.add('titulo');
    const h2 = document.createElement('h2');
    h2.textContent = server.nombre_servidor;
    titulo.appendChild(h2);

    const texto = document.createElement('div');
    texto.classList.add('texto');
    const p = document.createElement('p');
    p.textContent = server.descripcion;
    texto.appendChild(p);

    const miembros = document.createElement('div');
    miembros.classList.add('miembros');
    const miembrosText = document.createElement('p');
    miembrosText.textContent = `${server.numero_miembros} miembros`;
    miembros.appendChild(miembrosText);

    card.appendChild(img);
    card.appendChild(bottom);
    bottom.appendChild(titulo);
    bottom.appendChild(texto);
    bottom.appendChild(miembros);

    return card;
}

searchBox.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        console.log(searchBox.value)
    }

    searchBox.value = '';
})
console.log(Document.location);
