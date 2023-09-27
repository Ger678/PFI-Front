const userName = document.getElementById('nombre');
const constrasenia = document.getElementById('contrasena');
const imagen = document.getElementById('insertar-imagen');
const submit = document.getElementsByTagName('button');

console.log("holas")
submit[0].addEventListener('click', function () {

    const form = {
        "nombre_usuario" : userName.value,
        "contrasenia" : constrasenia.value,
        "imagen" : imagen.value
    }
    var formulario = JSON.stringify(form);
    console.log(form);

    fetch('http://127.0.0.1:5000/crear', {
      method: 'POST',
      body: formulario,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json())
    .catch((err) => console.log('Error: ' + err))
    .then((response) => console.log('Success: ' + response));
})

const logoImagen = document.getElementsByClassName('image-logo');
console.log(logoImagen)
logoImagen[0].addEventListener('click',()=>{
  imagen.click();
})