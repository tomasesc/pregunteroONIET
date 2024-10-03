document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    let dni = document.getElementById('dni').value;
    let contaseña = document.getElementById('password').value;
    let email = document.getElementById('email').value;

    // Validar que el email sea de Gmail o Hotmail
    if (email.endsWith("@gmail.com") || email.endsWith("@hotmail.com") || email.endsWith("@yahoo.com")){
        alert("¡Bienvenido, " + dni + " " + contaseña + "!");
        location.href= "./page/pregunta.html"
    } else {
        alert("Por favor, ingrese un correo de Gmail o Hotmail válido.");
    }
});