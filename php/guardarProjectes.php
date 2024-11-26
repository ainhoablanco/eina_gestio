<?php
include 'connexioBD.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'] ?? '';
    $descripcio = $_POST['descripcio'] ?? '';
    $dataInici = $_POST['data_inici'] ?? '';
    $dataFi = $_POST['data_fi'] ?? '';

    if (empty($nom) || empty($descripcio) || empty($dataInici) || empty($dataFi)) {
        echo json_encode(['success' => false, 'message' => 'Els camps nom, descripció, data inici i data fi són obligatoris.']);
        exit;
    }

    try {
        $connexio = obrirBD();

        $sql = "insert into projecte (nom, descripcio, data_inici, data_fi) values (:nom, :descripcio, :dataInici, :dataFi)";
        $stmt = $connexio->prepare($sql);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':descripcio', $descripcio);
        $stmt->bindParam(':dataInici', $dataInici);
        $stmt->bindParam(':dataFi', $dataFi);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Projecte afegit correctament.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
    } finally {
        tancarBD($connexio);
    }
}
?>