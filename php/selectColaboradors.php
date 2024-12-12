<?php 

include('connexioBD.php');
header('Content-Type: application/json');

$connexio = obrirBD();

try {
    $lletra = isset($_GET['lletra']) ? $_GET['lletra'] : '';

    $consulta = "select id_usuari, nom_usuari from usuari where nom_usuari like :lletra";
    $sentencia = $connexio->prepare($consulta);
    $sentencia->bindValue(':lletra', "%$lletra%", PDO::PARAM_STR);
    $sentencia->execute();

    $resultat = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($resultat);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error al cargar colaboradores: ' . $e->getMessage()]);
} finally {
    tancarBD($connexio);
}

?>