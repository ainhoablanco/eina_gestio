<?php
include('connexioBD.php');

if (isset($_POST['login'])) {
    if (login($_POST['name'], $_POST['password'])) {
        header('Location: /htdocs/php/proyectos.php');
        exit();
    } else {
        header('Location: /htdocs/php/login.php?error=1');
        exit();
    }
}

if (isset($_POST['register'])) {
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['password'])) {
        header('Location: /htdocs/php/register.php?error=empty_fields');
        exit();
    }
    if (usuari_existent($_POST['name'], $_POST['email'])) {
        header('Location: /htdocs/php/register.php?error=user_exists');
        exit();
    }
    if (register($_POST['name'], $_POST['email'], $_POST['password'])) {
        header('Location: /htdocs/php/proyectos.php');
        exit();
    } else {
        header('Location: /htdocs/php/register.php?error=unknown');
        exit();
    }
}

if (isset($_POST['guardar_projecte'])) {
    guardar_projecte($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi'], $_POST['colaboradors']);
    header('Location: /htdocs/php/proyectos.php');
    exit();
}

if (isset($_POST['actualitzar_projecte'])) {
    actualitzar_projecte($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi'], $_POST['id_projecte']);
    header('Location: /htdocs/php/proyectos.php');
    exit();
}

if (isset($_POST['eliminar_projecte'])) {
    eliminar_projecte($_POST['id_projecte']);
    header('Location: /htdocs/php/proyectos.php');
    exit();
}

if (isset($_POST['id_projecte'])) {
    $_SESSION['id_projecte'] = $_POST['id_projecte'];
    header('Location: /htdocs/php/tasques.php');
    exit();
}

if (isset($_POST['guardar_tasca'])) {
    guardar_tasca($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi'], $_POST['estat'], $_POST['encarregat']);
    header('Location: /htdocs/php/tasques.php');
    exit();
}

if (isset($_POST['actualitzar_tasca'])) {
    actualitzar_tasca($_POST['nom'], $_POST['descripcio'], $_POST['data_inici'], $_POST['data_fi'], $_POST['estat'], $_POST['encarregat'], $_POST['id_tasca']);
    header('Location: /htdocs/php/tasques.php');
    exit();
}

if (isset($_POST['eliminar_tasca'])) {
    eliminar_tasca($_POST['id_tasca']);
    header('Location: /htdocs/php/tasques.php');
    exit();
}

if (isset($_POST['actualitzar_estat_tasca'])) {
    actualitzar_estat_tasca($_POST['id_tasca'], $_POST['estat_tasca']);
    header('Location: /htdocs/php/tasques.php');
    exit();
}

?>