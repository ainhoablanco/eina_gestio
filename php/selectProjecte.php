<?php

require_once('connexioBD.php');
header('Content-Type: application/json');

$connexio = obrirBD();

$consulta = "select p.* from projecte as p join usuari_projecte_rol as upr on p.id_projecte = upr.id_projecte where upr.id_usuari = :usuari_actual";
$sentencia = $connexio->prepare($consulta);

$sentencia->bindParam(':usuari_actual', $_SESSION['id_usuari_actual']);
$sentencia->execute();

$resultat = $sentencia->fetchAll(PDO::FETCH_ASSOC);


$connexio = tancarBD($connexio);

echo json_encode($resultat)


?>