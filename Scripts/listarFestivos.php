<?php

$servername = "localhost";
$username = "calculadora_user";
$password = "P@ssw0rd_S3gur@_2025!";
$database = "calculadoraparkin";


$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    echo "<p class='error'>Error al conectar a la base de datos: " . $conn->connect_error . "</p>";
} else {
    
    $sql = "SELECT fecha FROM diasfestivos ORDER BY fecha ASC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<h2>Días Festivos Registrados:</h2>";
        echo "<ul>";
        while ($row = $result->fetch_assoc()) {
            $fecha = $row["fecha"];
            echo "<li>" . $fecha . " <button class='eliminar-festivo' data-fecha='" . $fecha . "'>Eliminar</button></li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No hay días festivos registrados.</p>";
    }

    
    $conn->close();
}

?>