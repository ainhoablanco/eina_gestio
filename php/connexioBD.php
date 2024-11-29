<?php
session_start();

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

function register($name, $email, $password) {
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

function login($name, $password){
    $connexio = obrirBD();

    $consulta = "select id_usuari, contrasenya from usuari where nom_usuari = :name";
    $sentencia = $connexio->prepare($consulta);
    
    $sentencia->bindParam(':name', $name);
    $sentencia->execute();

    $resultat = $sentencia->fetch(PDO::FETCH_ASSOC);

    if ($resultat && password_verify($password, $resultat['contrasenya'])) {
        tancarBD($connexio);
        $_SESSION['id_usuari_actual'] = $resultat['id_usuari'];
        return true;
    } else {
        tancarBD($connexio);
        return false;
    }
}

function guardar_projecte($nom, $descripcio, $data_inici, $data_fi) {

    try {
    $connexio = obrirBD();

    // Obrir transacció
    $connexio->beginTransaction();

    $insertarSentencia = "insert into projecte (nom, descripcio, data_inici, data_fi) values (:nom, :descripcio, :data_inici, :data_fi)";
    $sentencia = $connexio->prepare($insertarSentencia);

    $sentencia->bindParam(':nom', $nom);
    $sentencia->bindParam(':descripcio', $descripcio);
    $sentencia->bindParam(':data_inici', $data_inici);
    $sentencia->bindParam(':data_fi', $data_fi);

    $sentencia->execute();

    //Obtindre el id del projecte.
    $id_projecte = $connexio->lastInsertId();
    //Fer el següent insrt
    if (isset($_SESSION['id_usuari_actual'])) {  // Verificar si la sesión está activa
        $insertarSentencia = "insert into usuari_projecte_rol (id_usuari, id_projecte, id_rol) values (:id_usuari, :id_projecte, 1)";
        $sentencia = $connexio->prepare($insertarSentencia);

        $sentencia->bindParam(':id_usuari', $_SESSION['id_usuari_actual']);
        $sentencia->bindParam(':id_projecte', $id_projecte);

        $sentencia->execute();
    } else {
        throw new Exception("No se encontró el ID de usuario en la sesión");
    }
    //COMMIT
    $connexio->commit();
    $connexio = tancarBD($connexio);
    } catch (PDOException $e) {
        //ROLLBACK
        $connexio->rollback();
        echo "Error: " . $e->getMessage();
    } finally {
        $connexio = tancarBD($connexio);
    }

}


?>