<?php

require_once('connexioBD.php');
header('Content-Type: application/json');

// $id_projecte = isset($_GET['id_projecte']) ? $_GET['id_projecte'] : null;

try {
    $connexio = obrirBD();

    $consulta = "select * from tasca where id_usuari = :id_usuari and id_projecte = :id_projecte;";

    $sentencia = $connexio->prepare($consulta);

    $id_projecte = 55;
    $sentencia->bindParam(':id_usuari', $_SESSION['id_usuari_actual']);
    $sentencia->bindParam(':id_projecte', $id_projecte);

    $sentencia->execute();

    $resultat = $sentencia->fetchAll(PDO::FETCH_ASSOC);

    $connexio = tancarBD($connexio);
    
    echo json_encode($resultat);
} catch (Exception $e) {
    echo json_encode(array('error' => 'Ha ocurrido un error: ' . $e->getMessage()));
}
?>
