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

    // $servername = "sql206.byethost31.com";
    // $username = "b31_37391808";
    // $pass = "t3d8hjw6";

    // $connexio = new PDO("mysql:host=$servername;dbname=b31_37391808_einagestio", $username, $pass);
    // $connexio->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // $connexio->exec("SET NAMES 'utf8'");

    // return $connexio;
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
    // $_SESSION['id_usuaris'] = lastInsertId();

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

        $connexio->beginTransaction();

        $insertarSentencia = "insert into projecte (nom, descripcio, data_inici, data_fi) values (:nom, :descripcio, :data_inici, :data_fi)";
        $sentencia = $connexio->prepare($insertarSentencia);

        $sentencia->bindParam(':nom', $nom);
        $sentencia->bindParam(':descripcio', $descripcio);
        $sentencia->bindParam(':data_inici', $data_inici);
        $sentencia->bindParam(':data_fi', $data_fi);

        $sentencia->execute();

        $id_projecte = $connexio->lastInsertId();

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

        if ($colaboradors) {
            $myArray = explode(',', $colaboradors);

            foreach ($myArray as $id_colaborador) {
                $consulta = "select 1 from usuari_projecte_rol where id_usuari = :id_usuari and id_projecte = :id_projecte";
                $sentencia = $connexio->prepare($consulta);
                $sentencia->bindParam(':id_usuari', $id_colaborador);
                $sentencia->bindParam(':id_projecte', $id_projecte);
                $sentencia->execute();

                if ($sentencia->rowCount() == 0) {
                    $insertarSentencia = "insert into usuari_projecte_rol (id_usuari, id_projecte, id_rol) 
                                          values (:id_usuari, :id_projecte, :id_rol)";
                    $sentencia = $connexio->prepare($insertarSentencia);
                    $sentencia->bindParam(':id_usuari', $id_colaborador);
                    $sentencia->bindParam(':id_projecte', $id_projecte);
                    $id_rol = 2;
                    $sentencia->bindParam(':id_rol', $id_rol);
                    $sentencia->execute();
                }
            }
        }

        $connexio->commit();
        $connexio = tancarBD($connexio);

    } catch (PDOException $e) {
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

function eliminar_projecte($idProjecte) {
    $connexio = null;
    try {
        $connexio = obrirBD();

        $connexio->beginTransaction();

        $eliminarUsuariProjecteRol = "delete from usuari_projecte_rol where id_projecte = :id_projecte";
        $sentenciaUsuariProjecteRol = $connexio->prepare($eliminarUsuariProjecteRol);
        $sentenciaUsuariProjecteRol->bindParam(':id_projecte', $idProjecte);
        $sentenciaUsuariProjecteRol->execute();

        $eliminarProjecte = "delete from projecte where id_projecte = :id_projecte";
        $sentenciaProjecte = $connexio->prepare($eliminarProjecte);
        $sentenciaProjecte->bindParam(':id_projecte', $idProjecte);
        $sentenciaProjecte->execute();

        $connexio->commit();

    } catch (PDOException $e) {
        if ($connexio) {
            $connexio->rollback();
        }
        echo "Error en la base de datos: " . $e->getMessage();
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    } finally {
        if ($connexio) {
            tancarBD($connexio);
        }
    }
}

function guardar_tasca($nom, $descripcio, $data_inici, $data_fi, $estat, $encarregat) {
    try {
        $connexio = obrirBD();

        $connexio->beginTransaction();

        $insertarSentencia = "insert into tasca (nom, descripcio, data_inici, data_fi, id_projecte, id_estat, id_usuari, id_encarregat) values (:nom, :descripcio, :data_inici, :data_fi, :id_projecte, :id_estat, :id_usuari, :id_encarregat)";
        $sentencia = $connexio->prepare($insertarSentencia);

        $sentencia->bindParam(':nom', $nom);
        $sentencia->bindParam(':descripcio', $descripcio);
        $sentencia->bindParam(':data_inici', $data_inici);
        $sentencia->bindParam(':data_fi', $data_fi);
        $sentencia->bindParam(':id_projecte', $_SESSION['id_projecte']);
        $sentencia->bindParam(':id_estat', $estat);
        $sentencia->bindParam(':id_usuari', $_SESSION['id_usuari_actual']);
        $sentencia->bindParam(':id_encarregat', $encarregat);

        $sentencia->execute();

        $connexio->commit();
        $connexio = tancarBD($connexio);

    } catch (PDOException $e) {
        $connexio->rollBack();
        echo "Error: " . $e->getMessage();
    }
}

function actualitzar_tasca($nom, $descripcio, $data_inici, $data_fi, $estat, $encarregat, $id_tasca) {
    try {
        $connexio = obrirBD();

        $connexio->beginTransaction();

        $insertarSentencia = "update tasca 
                                 set nom = :nom, 
                                     descripcio = :descripcio, 
                                     data_inici = :data_inici, 
                                     data_fi = :data_fi, 
                                     id_estat = :id_estat, 
                                     id_encarregat = :id_encarregat 
                                 where id_tasca = :id_tasca";
        $sentencia = $connexio->prepare($insertarSentencia);

        $sentencia->bindParam(':nom', $nom);
        $sentencia->bindParam(':descripcio', $descripcio);
        $sentencia->bindParam(':data_inici', $data_inici);
        $sentencia->bindParam(':data_fi', $data_fi);
        $sentencia->bindParam(':id_estat', $estat);
        $sentencia->bindParam(':id_encarregat', $encarregat);
        $sentencia->bindParam(':id_tasca', $id_tasca);

        $sentencia->execute();

        $connexio->commit();
        $connexio = tancarBD($connexio);

    } catch (PDOException $e) {
        $connexio->rollBack();
        echo "Error: " . $e->getMessage();
    }
}

function eliminar_tasca($id_tasca) {
    $connexio = null;
    try {
        $connexio = obrirBD();
        $connexio->beginTransaction();

        $eliminarTasca = "delete from tasca where id_tasca = :id_tasca";
        $sentenciaTasca = $connexio->prepare($eliminarTasca);

        $sentenciaTasca->bindParam(':id_tasca', $id_tasca);
        $sentenciaTasca->execute();

        $connexio->commit();

    } catch (PDOException $e) {
        if ($connexio) {
            $connexio->rollBack();
        }
        echo "Error en la eliminación de la tarea: " . $e->getMessage();
    } finally {
        if ($connexio) {
            tancarBD($connexio);
        }
    }
}

function actualitzar_estat_tasca($id_tasca, $estat_tasca) {
    try {
        $connexio = obrirBD();
        $insertarSentencia = "update tasca set id_estat = :estat where id_tasca = :id_tasca";
        $sentencia = $connexio->prepare($insertarSentencia);
    
        $sentencia->bindParam(':estat', $estat_tasca);
        $sentencia->bindParam(':id_tasca', $id_tasca);
    
        $sentencia->execute();

        $connexio = tancarBD($connexio);
    } catch (Exception $e) {
        echo "Error al actualizar el proyecto: " . $e->getMessage();
    }
}


?>