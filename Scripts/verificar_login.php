<?php
session_start();

$servername = "localhost";
$username = "calculadora_user";
$password = "P@ssw0rd_S3gur@_2025!";
$database = "calculadoraparkin";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos: " . $conn->connect_error);
}

if (isset($_POST['usuario']) && isset($_POST['contrasena'])) {
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    $sql = "SELECT nombre, passwd FROM usuarios WHERE nombre = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $contra_encriptada = $row['passwd'];
        $nombre_usuario = $row['nombre'];

        if (md5($contrasena) === $contra_encriptada) {
            $_SESSION['usuario_nombre'] = $nombre_usuario; 
            header("Location: ../HTML/diasFestivos.html");
            exit();
        } else {
            // header("Location: ../HTML/login.html?error=NoPasswd");
            echo "<p>Error: Contraseña o Usuario incorrecto</p>";
            exit();
        }
    } else {
        echo "<p>Error: Contraseña o Usuario incorrecto</p>";
        exit();
    }

    if (isset($stmt)) {
        $stmt->close();
    }
}

$conn->close();
?>