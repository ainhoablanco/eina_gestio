<?php

include('connexioBD.php');

if (isset($_POST['login'])) {
    if (login($_POST['name'], $_POST['password'])) {
        header('Location: ../htdocs/proyectos.html');
        exit();
    } else {
        echo "Nom d'usuari o contrasenya incorrectes";
    }
}
if (isset($_POST['register'])) {
    register($_POST['name'],$_POST['email'],$_POST['password']);
    
    header('Location: ../htdocs/proyectos.html');
    exit();
}

if (isset($_POST['guardar_projecte'])) {
    guardar_projecte($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi']);
    header('Location: ../htdocs/proyectos.html');
    exit();
}


?>