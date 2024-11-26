<?php

require_once('connexioBD.php');

if (isset($_POST['insert'])) {
    insertarBD($_POST['name'],$_POST['email'],$_POST['password']);
    
    header('Location: ../htdocs/proyectos.html');
    exit();
}

?>