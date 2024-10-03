const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const btnStartScan = document.getElementById('btn-start-scan');
const btnStopScan = document.getElementById('btn-stop-scan');
const errorMsg = document.getElementById('error-msg');

const correctQRCode = "2"; // Valor correcto del QR que debe ser escaneado
let stream = null;

function scanQRCode() {
    const context = canvas.getContext('2d');
    
    function scan() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: "dontInvert",
            });
            if (code) {
                //alert("QR Code encontrado: " + code.data);
                
                // Comparar el valor escaneado con el valor correcto
                if (code.data === correctQRCode) {
                    // Redirigir a Facebook
                    window.location.href = "../page/pregunta.html";
                } else {
                    // Mostrar mensaje de error y detener el escaneo
                    errorMsg.style.display = "block";
                    stopCamera(); // Llamar a la función para detener la cámara
                }
            }
        }
        requestAnimationFrame(scan);
    }
    scan();
}

function stopCamera() {
    if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Detener todas las pistas del stream
    }
    video.style.display = "none"; // Ocultar el video
    btnStopScan.style.display = "none"; // Ocultar el botón de detener escaneo
}

btnStartScan.addEventListener('click', function() {
    // errorMsg.style.display = "none"; // Ocultar mensaje de error si se intenta nuevamente
    btnStartScan.style.display = "none"; // Ocultar mensaje
    video.style.display = "block"; // Mostrar el video para iniciar el escaneo
    btnStopScan.style.display = "inline"; // Mostrar botón para detener el escaneo

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(userMediaStream) {
            stream = userMediaStream; // Guardar la referencia al stream
            video.srcObject = stream;
            video.play(); // Asegúrate de que el video se reproduzca
            scanQRCode(); // Inicia el escaneo una vez que la cámara esté lista
        })
        .catch(function(err) {
            console.error("Error al acceder a la cámara: " + err);
            alert("No se pudo acceder a la cámara. Por favor, verifica los permisos.");
        });
});

btnStopScan.addEventListener('click', function() {
    stopCamera(); // Detener la cámara cuando se haga clic en el botón de detener
    video.style.display = 'none ,block';

    btnStartScan.style.display ='inline';
});