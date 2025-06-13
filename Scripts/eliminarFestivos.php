<?php

$servername = "localhost";
$username = "calculadora_user";
$password = "P@ssw0rd_S3gur@_2025!";
$database = "calculadoraparkin";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    echo "Error al conectar a la base de datos: " . $conn->connect_error;
} else {
    if (isset($_POST['fecha'])) {
        $fecha_eliminar = $_POST['fecha'];

        $sql = "DELETE FROM diasfestivos WHERE fecha = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $fecha_eliminar);

        if ($stmt->execute()) {
            echo "Día festivo eliminado correctamente.";
        } else {
            echo "Error al eliminar el día festivo: " . $stmt->error;
        }

        $stmt->close();
    }

    $conn->close();
}

?>