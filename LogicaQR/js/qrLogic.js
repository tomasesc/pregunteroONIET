// Definir el orden de los códigos QR
const ordenQR = ['qr1', 'qr2', 'qr3', 'qr4', 'qr5', 'qr6', 'qr7', 'qr8', 'qr9', 'qr10'];

// Iniciar la sesión o progreso
let progreso = parseInt(localStorage.getItem('progreso')) || 0;
document.getElementById('startScan').addEventListener('click', iniciarEscaneo);

function iniciarEscaneo() {
    // Simular escaneo de QR para este ejemplo
    let qrEscaneado = prompt('Simular QR escaneado: ingresa el código del QR (qr1, qr2, etc.)');
    
    verificarQR(qrEscaneado);
}

// Verificar si el QR escaneado es el correcto en el orden
function verificarQR(qrData) {
    if (qrData === ordenQR[progreso]) {
        progreso++;
        localStorage.setItem('progreso', progreso);
        mostrarPregunta();
        document.getElementById('error-message').style.display = 'none';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

// Mostrar la pregunta generada por OpenAI
function mostrarPregunta() {
    document.getElementById('scanner-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    // Llamada a la API de OpenAI (simulación de pregunta para este ejemplo)
    let pregunta = "¿Cuál es la capital de Francia?";
    let opciones = ["Madrid", "Roma", "París", "Berlín"];
    
    document.getElementById('question-text').innerText = pregunta;
    let answerOptions = document.getElementById('answer-options');
    answerOptions.innerHTML = ''; // Limpiar las opciones anteriores
    
    opciones.forEach((opcion, index) => {
        let li = document.createElement('li');
        li.innerText = opcion;
        li.addEventListener('click', () => verificarRespuesta(index, 2)); // Asume que la respuesta correcta es la 3ra opción (índice 2)
        answerOptions.appendChild(li);
    });
}

// Verificar si la respuesta es correcta
function verificarRespuesta(indiceRespuesta, respuestaCorrecta) {
    if (indiceRespuesta === respuestaCorrecta) {
        alert('¡Respuesta correcta!');
        reiniciarEscaneo();
    } else {
        alert('Respuesta incorrecta. Inténtalo de nuevo.');
        reiniciarEscaneo();
    }
}

function reiniciarEscaneo() {
    document.getElementById('scanner-container').style.display = 'block';
    document.getElementById('question-container').style.display = 'none';
}
