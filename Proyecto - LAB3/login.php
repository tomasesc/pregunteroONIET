<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";  // Usuario por defecto de XAMPP
$password = "";  // Contraseña vacía por defecto en XAMPP
$dbname = "resolution_qrproyecto";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombre = $_POST['nombre'];
$dni = $_POST['dni'];

// Verificar si los campos no están vacíos
if (!empty($nombre) && !empty($dni)) {
    // Preparar la consulta SQL
    $sql = "SELECT * FROM USUARIOS WHERE usuario = ? AND dni = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nombre, $dni);

    // Ejecutar la consulta
    $stmt->execute();
    $result = $stmt->get_result();

    // Verificar si se encontró un usuario
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $usuarioNombre = $row['nombre'];
        echo "Inicio de sesión exitoso.<br>¡Bienvenido, $usuarioNombre!<br>";
    } else {
        echo "Usuario o DNI incorrecto.";
    }

    // Cerrar la declaración y la conexión
    $stmt->close();
    $conn->close();
} else {
    echo "Por favor, complete todos los campos.";
}
?>
