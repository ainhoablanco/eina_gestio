<?php

include('connexioBD.php');

if (isset($_POST['login'])) {
    if (login($_POST['name'], $_POST['password'])) {
        header('Location: ../htdocs/proyectos.html');
        exit();
    } else {
        header('Location: ../php/login.php?error=1');
        exit();
    }
}

if (isset($_POST['register'])) {
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['password'])) {
        header('Location: ../php/register.php?error=empty_fields');
        exit();
    }
    if (usuari_existent($_POST['name'], $_POST['email'])) {
        header('Location: ../php/register.php?error=user_exists');
        exit();
    }
    if (register($_POST['name'], $_POST['email'], $_POST['password'])) {
        header('Location: ../htdocs/proyectos.html');
        exit();
    } else {
        header('Location: ../php/register.php?error=unknown');
        exit();
    }
}


if (isset($_POST['guardar_projecte'])) {
    guardar_projecte($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi']);
    header('Location: ../htdocs/proyectos.html');
    exit();
}

if (isset($_POST['actualitzar_projecte'])) {
    actualitzar_projecte($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi'], $_POST['id_projecte']);
    header('Location: ../htdocs/proyectos.html');
    exit();
}

?>