<?php

function obrirBD(){

    $servername = "localhost";
    $username = "admin";
    $pass = "admin";

    $connexio = new PDO("mysql:host=$servername;dbname=eina_gestio", $username, $pass);
    $connexio->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connexio->exec("SET NAMES 'utf8'");

    return $connexio;
}

function tancarBD($connexio) {
    $connexio = null;
    return $connexio;
}

function insertarBD($name, $email, $password) {
    $connexio = obrirBD();
    $password = password_hash($password, PASSWORD_DEFAULT);

    $insertarSentencia = "insert into usuari ( nom_usuari, email, contrasenya ) VALUES ( :name, :email, :password )";
    $sentencia = $connexio->prepare($insertarSentencia);

    $sentencia->bindParam(':name', $name);
    $sentencia->bindParam(':email', $email);
    $sentencia->bindParam(':password', $password);

    $sentencia->execute();

    $connexio = tancarBD($connexio);
}

function selectBD($name, $password){
    $connexio = obrirBD();

    $consulta = "select contrasenya from usuari where nom_usuari = :name";
    $sentencia = $connexio->prepare($consulta);
    
    $sentencia->bindParam(':name', $name);
    $sentencia->execute();

    // Verificar si el usuario existe y comparar la contraseña
    $resultat = $sentencia->fetch(PDO::FETCH_ASSOC);

    if ($resultat && password_verify($password, $resultat['contrasenya'])) {
        tancarBD($connexio);
        return true;  // Inicio de sesión exitoso
    } else {
        tancarBD($connexio);
        return false;  // Error de inicio de sesión
    }
}

?>