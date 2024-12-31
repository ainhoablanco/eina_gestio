<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar sessió - AinTask</title>
    <link rel="stylesheet" href="/htdocs/style/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/htdocs/style/style.css">
</head>

<body class="body-formularis">
    <img id="imatge-logo" src="/htdocs/imatges/logoAinTask.png" alt="logo">
    <div class="pantalla-formulari">
        <div class="formulari-container login-formulari">
            <h2>Iniciar Sessió</h2>

            <form action="/htdocs/php/controller.php" method="POST">
                <div class="mb-3">
                    <label for="username" class="formulari-label">Nom d'usuari</label>
                    <input type="text" class="formulari-control" id="username" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="formulari-label">Contrasenya</label>
                    <input type="password" class="formulari-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn boto-loggin-pg" name="login">Inicia sessió</button>

                <?php if (isset($_GET['error']) && $_GET['error'] == 1): ?>
                    <div class="error-message">Nom d'usuari o contrasenya incorrectes</div>
                <?php endif; ?>
            </form>
        </div>
    </div>
</body>

</html>