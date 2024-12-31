<?php

require_once('connexioBD.php');
header('Content-Type: application/json');

try {
    $connexio = obrirBD();

    $consulta = "
        select t.*, u.nom_usuari as encarregat_nom
        from tasca t
        join usuari u on t.id_encarregat = u.id_usuari
        where t.id_projecte = :id_projecte;
    ";

    $sentencia = $connexio->prepare($consulta);

    $sentencia->bindParam(':id_projecte', $_SESSION['id_projecte']);

    $sentencia->execute();

    $resultat = $sentencia->fetchAll(PDO::FETCH_ASSOC);

    $connexio = tancarBD($connexio);
    
    echo json_encode($resultat);
} catch (Exception $e) {
    echo json_encode(array('error' => 'Ha ocurrido un error: ' . $e->getMessage()));
}
?>