window.addEventListener('load', () => {
    fetch('../php/selectProjecte.php')
        .then (function (resposta) {
            return resposta.json();
        })
        .then(projectes => {
            mostrarProjectes(projectes);
        })
        .catch(error => {
            console.error('Hi ha hagut un error:', error);
        });
});

function mostrarProjectes(projectes) {
    const containerProjectes = document.querySelector('.projectes');

    projectes.forEach(projecte => {
        const form = document.createElement('form');
        form.action = '../php/controller.php';
        form.method = 'POST';

        const eliminarBoto = document.createElement('button');
        eliminarBoto.type = 'submit';
        eliminarBoto.textContent = 'X';
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
        entrarBoto.classList.add('btn-entrar');

        editarBoto.addEventListener('click', () => {
            const nouDivProjecte = document.createElement('div');
            nouDivProjecte.classList.add('projecte');
            actualitzarCamps(nouDivProjecte, projecte.nom, projecte.descripcio, projecte.data_inici, projecte.data_fi, projecte.id_projecte);
        });

        entrarBoto.addEventListener('click', () => {
            window.location.href = '../htdocs/tasques.html';
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
    form.action = '../php/controller.php';
    form.method = 'POST';

    const nomProjecte = document.createElement('input');
    nomProjecte.type = 'text';
    nomProjecte.name = 'nom';
    nomProjecte.placeholder = 'Nom del projecte';
    nomProjecte.classList.add('nom-projecte');
    nomProjecte.value = nom;

    const descripcioProjecte = document.createElement('textarea');
    descripcioProjecte.name = 'descripcio';
    descripcioProjecte.placeholder = 'Descripció del projecte';
    descripcioProjecte.classList.add('descripcio-projecte');
    descripcioProjecte.value = descripcio;

    const dataIniciProjecte = document.createElement('input');
    dataIniciProjecte.type = 'date';
    dataIniciProjecte.name = 'data_inici';
    dataIniciProjecte.classList.add('data-inici');
    dataIniciProjecte.value = dataInici;

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
        const dataInici = dataIniciProjecte.value;
        const dataFi = dataFiProjecte.value;

        if (!nom || !descripcio || !dataInici || !dataFi) {
            event.preventDefault();
            alert('Hi ha algun camp incomplert');
        }
    });

    form.appendChild(nomProjecte);
    form.appendChild(descripcioProjecte);
    form.appendChild(dataIniciProjecte);
    form.appendChild(dataFiProjecte);
    form.appendChild(idProjecteInput);
    form.appendChild(actualitzarBoto);

    divProjecte.appendChild(form);
    projectes.appendChild(divProjecte);
}
