document.addEventListener("DOMContentLoaded", function() {
    const barsMenu = document.querySelector(".bars__menu");
    const containerMenu = document.querySelector(".container__menu");
    const modal = document.getElementById("modal");
    const modalEstrategias = document.getElementById("modalEstrategias");
    const modalSobreNosotros = document.getElementById("modalSobreNosotros");
    const modalRanking = document.getElementById("modalRanking");
    const closeModalButtons = document.querySelectorAll(".close");

    const comoJugarBtn = document.getElementById("comoJugarBtn");
    const estrategiasBtn = document.getElementById("estrategiasBtn");
    const sobreNosotrosBtn = document.getElementById("sobreNosotrosBtn");
    const rankingBtn = document.getElementById("rankingBtn");
    const nextQuestionBtn = document.getElementById("nextQuestionBtn");

    const timerContainer = document.querySelector(".timer-container");
    const timerProgress = document.querySelector(".timer-progress");
    const timerText = document.querySelector(".timer-text");
    let timeLeft = 30;
    let timerInterval;

    function startTimer() {
        timerContainer.classList.add("timer-running");
        timerProgress.style.stroke = "#4caf50";  // Verde inicial
        timerProgress.style.strokeDashoffset = 0; // Asegúrate de que empiece desde 0
        updateTimerText();
    
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerText();
    
            // Cambiar gradualmente de verde a rojo
            const redIntensity = Math.min(255, (30 - timeLeft) * 8.5); // Se vuelve rojo gradualmente
            timerProgress.style.stroke = `rgb(${redIntensity}, ${255 - redIntensity}, 0)`;
    
            if (timeLeft <= 5 && timeLeft > 0) {
                timerContainer.classList.add("timer-warning");
            }
    
            if (timeLeft === 0) {
                clearInterval(timerInterval);
                timerContainer.classList.remove("timer-running");
                timerContainer.classList.remove("timer-warning");
                timerText.textContent = "0s"; // Muestra 0s al finalizar
                timerText.classList.add("time-up");
                document.getElementById("time-up-text").style.display = "block"; // Muestra el texto
                disableOptions();
            }
            
        }, 1000); // Inicia el temporizador real
    }
    

    function updateTimerText() {
        timerText.textContent = `${timeLeft}s`;
    }
    

    function disableOptions() {
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correctAnswer) {
                button.style.backgroundColor = "green";
            } else {
                button.style.backgroundColor = "red";
            }
        });
    }

    startTimer();

    barsMenu.addEventListener("click", function() {
        animateBars();
        containerMenu.classList.toggle("menu__active");
        document.body.classList.toggle("menu__active");
    });

    function animateBars() {
        const Line1__bars = document.querySelector(".line1__bars-menu");
        const Line2__bars = document.querySelector(".line2__bars-menu");
        const Line3__bars = document.querySelector(".line3__bars-menu");

        Line1__bars.classList.toggle("activeline1__bars-menu");
        Line2__bars.classList.toggle("activeline2__bars-menu");
        Line3__bars.classList.toggle("activeline3__bars-menu");
    }

    comoJugarBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "block";
    });

    estrategiasBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modalEstrategias.style.display = "block";
    });

    sobreNosotrosBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modalSobreNosotros.style.display = "block";
    });

    rankingBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modalRanking.style.display = "block";
    });

    closeModalButtons.forEach(closeBtn => {
        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
            modalEstrategias.style.display = "none";
            modalSobreNosotros.style.display = "none";
            modalRanking.style.display = "none";
        });
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        } else if (event.target === modalEstrategias) {
            modalEstrategias.style.display = "none";
        } else if (event.target === modalSobreNosotros) {
            modalSobreNosotros.style.display = "none";
        } else if (event.target === modalRanking) {
            modalRanking.style.display = "none";
        }
    });

    const correctAnswer = "París";
    const buttons = document.querySelectorAll(".option");


buttons.forEach(button => {
    button.addEventListener("click", function() {
        clearInterval(timerInterval); // Detener el temporizador al seleccionar una opción
        timerContainer.classList.remove("timer-running"); // Detener la animación de la barra de progreso

        // Congelar el color actual de la barra de progreso
        const currentStrokeColor = timerProgress.style.stroke;
        timerProgress.style.stroke = currentStrokeColor; // Mantener el color actual

        // Mantener el valor de strokeDashoffset
        const offset = (timeLeft / 30) * 282.6; // Ajusta según el tiempo restante
        timerProgress.style.strokeDashoffset = 282.6 - offset; // Rellenar hasta el punto actual

        buttons.forEach(btn => btn.style.backgroundColor = "#f0f0f0");
        if (this.textContent === correctAnswer) {
            this.style.backgroundColor = "green";
        } else {
            this.style.backgroundColor = "red";
        }
        disableOptions();
    }); 
});
    
    
    

    nextQuestionBtn.addEventListener("click", function() {
        window.location.href = "pregunta2.html";
    });
});
