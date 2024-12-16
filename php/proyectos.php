<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyectos</title>
    <link rel="stylesheet" href="../style/style.css">
</head>

<body id="body-proyectos">
    <img id="imatge-logo" src="../imatges/logoAinTask.png" alt="logo">
    <div class="pantalla-principal-proyectos"></div>
    <div id="titol-animat" class="contenidor-titol">
        <span class="letter" style="--x:1; --y:1; --delay:3">P</span>
        <span class="letter" style="--x:-1; --y:2; --delay:1">r</span>
        <span class="letter" style="--x:0.5; --y:-1.5; --delay:4">o</span>
        <span class="letter" style="--x:-1.5; --y:-1; --delay:2">j</span>
        <span class="letter" style="--x:1.5; --y:-2; --delay:5">e</span>
        <span class="letter" style="--x:-2; --y:0.5; --delay:3">c</span>
        <span class="letter" style="--x:1; --y:1.5; --delay:6">t</span>
        <span class="letter" style="--x:-0.5; --y:0.5; --delay:3">e</span>
        <span class="letter" style="--x:2; --y:1.5; --delay:6">s</span>
    </div>
    </div>
    <div class="projectes">
        <div class="projecte">
            <div class="nou-projecte">
                <button id="afegir-projecte">+</button>
            </div>
        </div>
    </div>

    <!-- Añadimos el formulario y el botón de enviar -->
    <form id="form-entrar" action="../php/controller.php" method="POST">
        <input type="hidden" name="id_projecte" id="input-id-projecte">
        <button type="submit" name="entrar" id="btn-entrar" style="display:none">ENTRAR</button>
    </form>

    <script src="../scripts/nouprojecte.js"></script>
    <script src="../scripts/mostrarProjecte.js"></script>
</body>

</html>