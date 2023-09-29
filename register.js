const userName = document.getElementById('nombre');
const constrasenia = document.getElementById('contrasena');
const imagen = document.getElementById('insertar-imagen');
const form = document.getElementById('registro-form');
const submit = document.getElementsByTagName('button');
var fileName = '';

imagen.addEventListener('change', function (e) {
  const file = this.files[0]

  console.log('hola');
  if (file) {
    fileName = file.name;
    console.log('archivo' + fileName);
  }
})

form.addEventListener('submit', function (e) {
  e.preventDefault();
  create();
})

function create() {

  const form = JSON.stringify({
    nombre_usuario: userName.value,
    contrasenia: constrasenia.value,
    imagen: fileName,
  });

  fetch("http://127.0.0.1:5000/crear", {
    method: "POST",
    body: form,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if(res.status == 201) {
      console.log(res)
      return res.json().then((data) => {
        document.getElementById("message").innerHTML = data.message;
        document.getElementById("message-container").style.background = "green";
        document.getElementById("message-container").style.display = "flex";
      })
    } else{
      console.log(res)
      return res.json().then((data) => {
        document.getElementById("message").innerHTML = data.message;
        document.getElementById("message-container").style.background = "red";
        document.getElementById("message-container").style.display = "flex";
      })
    }
    })
    .catch((err) => console.log("Error: " + err))
    .then((response) => console.log("Success: " + response));
}

const logoImagen = document.getElementsByClassName('image-logo');
  logoImagen[0].addEventListener('click',()=>{
  imagen.click();
})

