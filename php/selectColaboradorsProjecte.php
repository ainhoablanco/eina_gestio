<?php
session_start(); // Iniciar la sesión
include('connexioBD.php');
header('Content-Type: application/json');

$connexio = obrirBD();

try {
    if (!isset($_SESSION['id_usuari_actual']) || !isset($_SESSION['id_projecte'])) {
        throw new Exception('Las variables de sesión no están configuradas.');
    }

    $idUsuari = $_SESSION['id_usuari_actual'];
    $idProjecte = $_SESSION['id_projecte'];
    $lletra = isset($_GET['lletra']) ? $_GET['lletra'] : '';

    $consulta = "select u.id_usuari, u.nom_usuari from usuari as u
                 join projecte_usuari pu ON u.id_usuari = pu.id_usuari
                 where pu.id_projecte = :id_projecte 
                 and u.nom_usuari like :lletra
                 and pu.id_usuari = :id_usuari";

    $sentencia = $connexio->prepare($consulta);
    $sentencia->bindValue(':id_projecte', $idProjecte, PDO::PARAM_INT);
    $sentencia->bindValue(':id_usuari', $idUsuari, PDO::PARAM_INT);
    $sentencia->bindValue(':lletra', "%$lletra%", PDO::PARAM_STR);
    $sentencia->execute();

    $resultat = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($resultat);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al cargar colaboradores: ' . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
} finally {
    tancarBD($connexio);
}
?>