<?php
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

    $consulta = "select u.id_usuari, u.nom_usuari
    from usuari as u
    join usuari_projecte_rol as upr on u.id_usuari = upr.id_usuari
    where upr.id_projecte = :id_projecte
    and u.nom_usuari like :lletra";
    
    $sentencia = $connexio->prepare($consulta);
    $sentencia->bindValue(':id_projecte', $idProjecte, PDO::PARAM_INT);
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