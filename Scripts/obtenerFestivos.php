<?php

$servername = "localhost"; 
$username = "calculadora_user";     
$password = "P@ssw0rd_S3gur@_2025!";        
$database = "calculadoraparkin";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

$sql = "SELECT fecha FROM diasfestivos";
$result = $conn->query($sql);

$diasFestivos = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $diasFestivos[] = $row["fecha"]; 
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($diasFestivos);
?>