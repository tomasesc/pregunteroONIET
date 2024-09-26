<?php
// connection.php

// Configuración de la base de datos
$servername = "localhost"; // Cambia esto si el servidor no es localhost
$username = "root"; // Cambia esto si tu usuario de base de datos es diferente
$password = ""; // Cambia esto si tu base de datos tiene una contraseña
$dbname = "resolution_qrproyecto";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
} else {
    echo "Conexión exitosa a la base de datos.";
}

// Cerrar la conexión
$conn->close();
?>