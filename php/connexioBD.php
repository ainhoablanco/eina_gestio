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
    try {
        $connexio = obrirBD();
        $password = password_hash($password, PASSWORD_DEFAULT);

        $insertarSentencia = "insert into usuari (nom_usuari, email, contrasenya) values (:name, :email, :password)";
        $sentencia = $connexio->prepare($insertarSentencia);

        $sentencia->bindParam(':name', $name);
        $sentencia->bindParam(':email', $email);
        $sentencia->bindParam(':password', $password);

        $sentencia->execute();

        $id_usuari = $connexio->lastInsertId();
        $_SESSION['id_usuari_actual'] = $id_usuari;

        $connexio = tancarBD($connexio);
        return true;
    } catch (PDOException $e) {
        echo "Error en el registro: " . $e->getMessage();
        return false;
    }
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

function usuari_existent($nom, $email){
    $connexio = obrirBD();

    $consulta = "select * from usuari where nom_usuari = :name or email = :email";
    $sentencia = $connexio->prepare($consulta);
    
    $sentencia->bindParam(':name', $nom);
    $sentencia->bindParam(':email', $email);
    $sentencia->execute();

    $resultat = $sentencia->fetch(PDO::FETCH_ASSOC);
    tancarBD($connexio);

    return $resultat ? true : false;

}

function guardar_projecte($nom, $descripcio, $data_inici, $data_fi, $colaboradors) {
    try {
        $connexio = obrirBD();

        // Iniciar transacción
        $connexio->beginTransaction();

        // Insertar el proyecto
        $insertarSentencia = "insert into projecte (nom, descripcio, data_inici, data_fi) values (:nom, :descripcio, :data_inici, :data_fi)";
        $sentencia = $connexio->prepare($insertarSentencia);

        $sentencia->bindParam(':nom', $nom);
        $sentencia->bindParam(':descripcio', $descripcio);
        $sentencia->bindParam(':data_inici', $data_inici);
        $sentencia->bindParam(':data_fi', $data_fi);

        $sentencia->execute();

        // Obtener el ID del proyecto
        $id_projecte = $connexio->lastInsertId();

        // Insertar el primer usuario (el usuario actual en sesión)
        if (isset($_SESSION['id_usuari_actual'])) {
            $insertarSentencia = "insert into usuari_projecte_rol (id_usuari, id_projecte, id_rol) 
                                  select :id_usuari, :id_projecte, 1
                                  where not exists (
                                    select 1 from usuari_projecte_rol where id_usuari = :id_usuari and id_projecte = :id_projecte
                                  )";
            $sentencia = $connexio->prepare($insertarSentencia);
            $id_usuari = $_SESSION['id_usuari_actual'];
            $sentencia->bindParam(':id_usuari', $id_usuari);
            $sentencia->bindParam(':id_projecte', $id_projecte);
            $sentencia->execute();
        } else {
            throw new Exception("El ID de usuario no está en la sesión");
        }

        // Insertar los colaboradores adicionales
        if ($colaboradors) {
            // Dividir los colaboradores
            $myArray = explode(',', $colaboradors);

            foreach ($myArray as $id_colaborador) {
                // Verificar si la relación ya existe
                $consulta = "select 1 from usuari_projecte_rol where id_usuari = :id_usuari and id_projecte = :id_projecte";
                $sentencia = $connexio->prepare($consulta);
                $sentencia->bindParam(':id_usuari', $id_colaborador);
                $sentencia->bindParam(':id_projecte', $id_projecte);
                $sentencia->execute();

                // Si no existe, insertar la relación
                if ($sentencia->rowCount() == 0) {
                    $insertarSentencia = "insert into usuari_projecte_rol (id_usuari, id_projecte, id_rol) 
                                          values (:id_usuari, :id_projecte, :id_rol)";
                    $sentencia = $connexio->prepare($insertarSentencia);
                    $sentencia->bindParam(':id_usuari', $id_colaborador);
                    $sentencia->bindParam(':id_projecte', $id_projecte);
                    $id_rol = 2;  // Rol de colaborador
                    $sentencia->bindParam(':id_rol', $id_rol);
                    $sentencia->execute();
                }
            }
        }

        // Commit de la transacción
        $connexio->commit();
        $connexio = tancarBD($connexio);

    } catch (PDOException $e) {
        // Rollback en caso de error
        if ($connexio) {
            $connexio->rollback();
        }
        echo "Error: " . $e->getMessage();
    } finally {
        if ($connexio) {
            $connexio = tancarBD($connexio);
        }
    }
}


function actualitzar_projecte($nom, $descripcio, $data_inici, $data_fi, $id_projecte) {
    try {
        $connexio = obrirBD();
        $insertarSentencia = "update projecte set nom = :nom, descripcio = :descripcio, data_inici = :data_inici, data_fi = :data_fi where id_projecte = :id_projecte";
        $sentencia = $connexio->prepare($insertarSentencia);
    
        $sentencia->bindParam(':nom', $nom);
        $sentencia->bindParam(':descripcio', $descripcio);
        $sentencia->bindParam(':data_inici', $data_inici);
        $sentencia->bindParam(':data_fi', $data_fi);
        $sentencia->bindParam(':id_projecte', $id_projecte);
    
        $sentencia->execute();

        $connexio = tancarBD($connexio);
    } catch (Exception $e) {
        echo "Error al actualizar el proyecto: " . $e->getMessage();
    }
}

?>