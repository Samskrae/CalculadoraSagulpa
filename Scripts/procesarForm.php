<?php

$servername = "localhost";
$username = "calculadora_user";
$password = "P@ssw0rd_S3gur@_2025!";
$database = "calculadoraparkin";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $dia_festivo = $_POST["dia"];

    $sql = "INSERT INTO diasfestivos (fecha) VALUES (?)";

    $stmt = $conn->prepare($sql);

    $stmt->bind_param("s", $dia_festivo);


    if ($stmt->execute()) {
        // echo "Día festivo guardado correctamente.";
    } else {

        if ($conn->errno === 1062) {
            echo "El día festivo ya existe en la base de datos.";
        } else {
            echo "Error al guardar el día festivo: " . $stmt->error;
        }
    }

    $stmt->close();
}

$conn->close();

?>