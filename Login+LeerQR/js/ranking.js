// Función para cargar el archivo JSON externo y procesar el ranking
async function loadRanking() {
    try {
        // Cargar el archivo JSON usando fetch
        const response = await fetch('../page/usuarios.json');
        const rankingData = await response.json();

        // Obtener el elemento de la lista en el modal
        const rankingList = document.getElementById("rankingList");

        // Llenar la lista con el JSON de ranking
        rankingData.forEach(player => {
            const listItem = document.createElement("li");
            listItem.textContent = `${player.position}. ${player.name} - ${player.score} puntos`;
            listItem.classList.add("top");
            rankingList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error cargando el archivo JSON:', error);
    }
}

// Controlar la apertura y cierre del modal
const modal = document.getElementById("modalRanking");
const btn = document.getElementById("openModal");
const span = document.getElementsByClassName("close")[0];

// Abrir el modal al hacer clic en el botón
btn.onclick = function() {
    loadRanking(); // Cargar el ranking antes de mostrar el modal
    modal.style.display = "block";
}

// Cerrar el modal al hacer clic en la 'x'
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera de la modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
