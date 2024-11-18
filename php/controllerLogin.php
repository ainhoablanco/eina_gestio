<?php

require_once('connexioBD.php');

if (isset($_POST['select'])) {
    if (selectBD($_POST['name'], $_POST['password'])) {
        header('Location: ../htdocs/tasks.html');
        exit();
    } else {
        echo "Nom d'usuari o contrasenya incorrectes";
    }
}

?>