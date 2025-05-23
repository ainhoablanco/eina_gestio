window.addEventListener('load', () => {
    fetch('/htdocs/php/selectProjecte.php')
        .then(function(resposta) {
            return resposta.json();
        })
        .then(projectes => {
            mostrarProjectes(projectes);
        })
        .catch(error => {
            console.error('Hi ha hagut un error:', error);
        });

    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(cookie => {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });
            window.location.href = "/htdocs/index.html";
        });
    }
});

function mostrarProjectes(projectes) {
    const containerProjectes = document.querySelector('.projectes');

    projectes.forEach(projecte => {
        const form = document.createElement('form');
        form.action = '/htdocs/php/controller.php';
        form.method = 'POST';

        const eliminarBoto = document.createElement('button');
        eliminarBoto.type = 'submit';
        eliminarBoto.textContent = 'x';
        eliminarBoto.classList.add('btn-eliminarProjecte');
        eliminarBoto.name = 'eliminar_projecte';
        eliminarBoto.setAttribute('data-id', projecte.id_projecte);

        const idProjecte = document.createElement('input');
        idProjecte.type = 'hidden';
        idProjecte.name = 'id_projecte';
        idProjecte.value = projecte.id_projecte;

        const divProjecte = document.createElement('div');
        divProjecte.classList.add('projecte');

        const nomProjecte = document.createElement('h3');
        nomProjecte.textContent = projecte.nom;
        nomProjecte.classList.add('nom-projecte-guardat');

        const descripcioProjecte = document.createElement('p');
        descripcioProjecte.textContent = projecte.descripcio;
        descripcioProjecte.classList.add('descripcio-projecte');

        const editarBoto = document.createElement('button');
        editarBoto.type = 'button';
        editarBoto.textContent = 'Editar projecte';
        editarBoto.classList.add('btn-editar');
        editarBoto.name = 'editar_projecte';

        const entrarBoto = document.createElement('button');
        entrarBoto.type = 'button';
        entrarBoto.textContent = 'ENTRAR';
        entrarBoto.name = 'entrar';
        entrarBoto.value = projecte.id_projecte;
        entrarBoto.classList.add('btn-entrar');

        editarBoto.addEventListener('click', () => {
            const formulariObert = document.querySelector('.projecte .form-edicio');
            if (formulariObert) {
                formulariObert.parentElement.remove();
            }
            const nouDivProjecte = document.createElement('div');
            nouDivProjecte.classList.add('projecte');
            actualitzarCamps(nouDivProjecte, projecte.nom, projecte.descripcio, projecte.data_inici, projecte.data_fi, projecte.id_projecte);
        });

        entrarBoto.addEventListener('click', () => {
            const inputIdProjecte = document.getElementById('input-id-projecte');
            inputIdProjecte.value = projecte.id_projecte;
            document.getElementById('form-entrar').submit();
        });

        form.appendChild(idProjecte);
        form.appendChild(eliminarBoto);
        divProjecte.appendChild(form);
        divProjecte.appendChild(nomProjecte);
        divProjecte.appendChild(descripcioProjecte);
        divProjecte.appendChild(editarBoto);
        divProjecte.appendChild(entrarBoto);

        containerProjectes.appendChild(divProjecte);
    });
}

const projecteNou2 = document.getElementById('afegir-projecte');
const projectes2 = document.querySelector('.projectes');

function actualitzarCamps(divProjecte, nom = '', descripcio = '', dataInici = '', dataFi = '', idProjecte = '') {
    divProjecte.innerHTML = '';

    const form = document.createElement('form');
    form.classList.add('form-edicio');
    form.action = '/htdocs/php/controller.php';
    form.method = 'POST';

    const eliminarBoto = document.createElement('button');
    eliminarBoto.type = 'submit';
    eliminarBoto.textContent = 'x';
    eliminarBoto.classList.add('btn-eliminarProjecte');

    eliminarBoto.addEventListener('click', () => {
        divProjecte.remove();
    });

    const pNomProjecte = document.createElement('p');
    pNomProjecte.textContent = 'Nom del projecte:';
    pNomProjecte.classList.add('p-nom-projecte');

    const nomProjecte = document.createElement('input');
    nomProjecte.type = 'text';
    nomProjecte.name = 'nom';
    nomProjecte.placeholder = 'Nom del projecte';
    nomProjecte.classList.add('nom-projecte');
    nomProjecte.value = nom;

    const pDescripcioProjecte = document.createElement('p');
    pDescripcioProjecte.textContent = 'Descripció del projecte:';
    pDescripcioProjecte.classList.add('p-descripcio-projecte');

    const descripcioProjecte = document.createElement('textarea');
    descripcioProjecte.name = 'descripcio';
    descripcioProjecte.placeholder = 'Descripció del projecte';
    descripcioProjecte.classList.add('descripcio-projecte');
    descripcioProjecte.value = descripcio;

    const pDataInici = document.createElement('p');
    pDataInici.textContent = 'Data d\'inici:';
    pDataInici.classList.add('p-data-inici');

    const dataIniciProjecte = document.createElement('input');
    dataIniciProjecte.type = 'date';
    dataIniciProjecte.name = 'data_inici';
    dataIniciProjecte.classList.add('data-inici');
    dataIniciProjecte.value = dataInici;

    const pDataFi = document.createElement('p');
    pDataFi.textContent = 'Data de fi:';
    pDataFi.classList.add('p-data-fi');

    const dataFiProjecte = document.createElement('input');
    dataFiProjecte.type = 'date';
    dataFiProjecte.name = 'data_fi';
    dataFiProjecte.classList.add('data-fi');
    dataFiProjecte.value = dataFi;

    const idProjecteInput = document.createElement('input');
    idProjecteInput.type = 'hidden';
    idProjecteInput.name = 'id_projecte';
    idProjecteInput.value = idProjecte;

    const actualitzarBoto = document.createElement('button');
    actualitzarBoto.type = 'submit';
    actualitzarBoto.textContent = 'Actualitzar projecte';
    actualitzarBoto.classList.add('btn-actualitzar');
    actualitzarBoto.name = 'actualitzar_projecte';

    form.addEventListener('submit', (event) => {
        const nom = nomProjecte.value.trim();
        const descripcio = descripcioProjecte.value.trim();
        const dataInici = new Date(dataIniciProjecte.value);
        const dataFi = new Date(dataFiProjecte.value);

        if (!nom || !descripcio || !dataInici || !dataFi) {
            event.preventDefault();
            alert('Hi ha algun camp incomplert');
            return;
        }

        if (dataFi < dataInici) { 
            event.preventDefault(); 
            alert('La data final no pot ser menor que la data inicial'); 
        }
    });

    form.appendChild(eliminarBoto);
    form.appendChild(pNomProjecte);
    form.appendChild(nomProjecte);
    form.appendChild(pDescripcioProjecte);
    form.appendChild(descripcioProjecte);
    form.appendChild(pDataInici);
    form.appendChild(dataIniciProjecte);
    form.appendChild(pDataFi);
    form.appendChild(dataFiProjecte);
    form.appendChild(idProjecteInput);
    form.appendChild(actualitzarBoto);

    divProjecte.appendChild(form);
    projectes.appendChild(divProjecte);
}