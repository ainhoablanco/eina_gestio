<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyectos</title>
    <link rel="stylesheet" href="/htdocs/style/style.css">
</head>

<body>
    <div id="header">
        <button id="logout-button">Tancar sessió</button>
    </div>
    
    <div id="body-tasques">
        <img id="imatge-logo" src="/htdocs/imatges/logoAinTask.png" alt="logo">

        <div id="titol-animat" class="contenidor-titol">
            <span class="letter" style="--x:1; --y:1; --delay:3">T</span>
            <span class="letter" style="--x:-1; --y:2; --delay:1">a</span>
            <span class="letter" style="--x:0.5; --y:-1.5; --delay:4">s</span>
            <span class="letter" style="--x:-1.5; --y:-1; --delay:2">q</span>
            <span class="letter" style="--x:1.5; --y:-2; --delay:5">u</span>
            <span class="letter" style="--x:-2; --y:0.5; --delay:3">e</span>
            <span class="letter" style="--x:1; --y:1.5; --delay:6">s</span>
        </div>

        <div class="tasques">
            <div class="nova-tasca">
                <button id="afegir-tasca">+</button>
            </div>

            <div id="form-tasca-container"></div>

            <div class="columnes-tasques">
                <div class="columna" id="per-fer">
                    <h2 class="titol-columna">Per fer</h2>
                    <div class="tasques-per-fer">
                    </div>
                </div>
                <div class="columna" id="en-proces">
                    <h2 class="titol-columna">En procés</h2>
                    <div class="tasques-en-proces">
                    </div>
                </div>
                <div class="columna" id="fet">
                    <h2 class="titol-columna">Fet</h2>
                    <div class="tasques-fetes">
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script src="/htdocs/scripts/novatasca.js"></script>
    <script src="/htdocs/scripts/mostrarTasques.js"></script>
</body>

</html>