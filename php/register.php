<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar-se - AinTask</title>
    <link rel="stylesheet" href="/htdocs/style/bootstrap-5.3.3-dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/htdocs/style/style.css">
</head>

<body>
    <img id="imatge-logo" src="/htdocs/imatges/logoAinTask.png" alt="logo">
    <div class="pantalla-formulari">
        <div class="formulari-container register-formulari">
            <h2>Registrar-se</h2>

            <form action="../php/controller.php" method="POST">
                <div class="mb-3">
                    <label for="username" class="formulari-label">Nom d'usuari</label>
                    <input type="text" class="formulari-control" id="username" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="formulari-label">Correu electrònic</label>
                    <input type="email" class="formulari-control" id="email" name="email" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="formulari-label">Contrasenya</label>
                    <input type="password" class="formulari-control" id="password" name="password" required>
                </div>
                <button type="submit" class="btn boto-register-pg" name="register">Registra't</button>

                <?php if (isset($_GET['error'])): ?>
                    <div class="error-message">
                        <?php
                        switch ($_GET['error']) {
                            case 'empty_fields':
                                echo "Tots els camps són obligatoris.";
                                break;
                            case 'user_exists':
                                echo "L'usuari o l'email ja estan registrats.";
                                break;
                            case 'unknown':
                                echo "Hi ha hagut un problema amb el registre. Torna-ho a intentar.";
                                break;
                        }
                        ?>
                    </div>
                <?php endif; ?>
            </form>

        </div>
    </div>
</body>

</html>