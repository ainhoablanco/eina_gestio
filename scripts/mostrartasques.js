window.addEventListener('load', () => {
    fetch('../php/selectTasques.php')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(tasques => {
            mostrarTasques(tasques);
        })
        .catch(error => {
            console.error('Hi ha hagut un error:', error);
        });
});

function mostrarTasques(tasques) {
    const containerTasques = document.querySelector('.tasques');

    tasques.forEach(tasca => {
        const form = document.createElement('form');
        form.action = '../php/controller.php';
        form.method = 'POST';

        const eliminarBoto = document.createElement('button');
        eliminarBoto.type = 'submit';
        eliminarBoto.textContent = 'X';
        eliminarBoto.classList.add('btn-eliminarTasca');
        eliminarBoto.name = 'eliminar_tasca';
        eliminarBoto.setAttribute('data-id', tasca.id_tasca);

        const idTasca = document.createElement('input');
        idTasca.type = 'hidden';
        idTasca.name = 'id_tasca';
        idTasca.value = tasca.id_tasca;

        // const idProjecte = sessionStorage.getItem('id_projecte');
        // idProjecte.name = 'id_projecte';

        const divTasca = document.createElement('div');
        divTasca.classList.add('tasca');

        const nomTasca = document.createElement('h3');
        nomTasca.textContent = tasca.nom;
        nomTasca.classList.add('nom-tasca-guardat');

        const descripcioTasca = document.createElement('p');
        descripcioTasca.textContent = tasca.descripcio;
        descripcioTasca.classList.add('descripcio-tasca');

        const editarBoto = document.createElement('button');
        editarBoto.type = 'button';
        editarBoto.textContent = 'Editar tasca';
        editarBoto.classList.add('btn-editar');
        editarBoto.name = 'editar_tasca';

        editarBoto.addEventListener('click', () => {
            const nouDivTasca = document.createElement('div');
            nouDivTasca.classList.add('tasca');
            actualitzarCamps(nouDivTasca, tasca.nom, tasca.descripcio, tasca.data_inici, tasca.data_fi, tasca.id_tasca);
        });
        
        form.appendChild(idTasca);
        form.appendChild(eliminarBoto);
        divTasca.appendChild(form);
        divTasca.appendChild(nomTasca);
        divTasca.appendChild(descripcioTasca);
        divTasca.appendChild(editarBoto);

        containerTasques.appendChild(divTasca);
    });
}

const tascaNova = document.getElementById('afegir-tasca');
const tasquesContainer = document.querySelector('.tasques');

function actualitzarCamps(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '', idTasca = '') {
    divTasca.innerHTML = '';

    const form = document.createElement('form');
    form.action = '../php/controller.php';
    form.method = 'POST';

    const nomTasca = document.createElement('input');
    nomTasca.type = 'text';
    nomTasca.name = 'nom';
    nomTasca.placeholder = 'Nom de la tasca';
    nomTasca.classList.add('nom-tasca');
    nomTasca.value = nom;

    const descripcioTasca = document.createElement('textarea');
    descripcioTasca.name = 'descripcio';
    descripcioTasca.placeholder = 'Descripció de la tasca';
    descripcioTasca.classList.add('descripcio-tasca');
    descripcioTasca.value = descripcio;

    const dataIniciTasca = document.createElement('input');
    dataIniciTasca.type = 'date';
    dataIniciTasca.name = 'data_inici';
    dataIniciTasca.classList.add('data-inici');
    dataIniciTasca.value = dataInici;

    const dataFiTasca = document.createElement('input');
    dataFiTasca.type = 'date';
    dataFiTasca.name = 'data_fi';
    dataFiTasca.classList.add('data-fi');
    dataFiTasca.value = dataFi;

    const idTascaInput = document.createElement('input');
    idTascaInput.type = 'hidden';
    idTascaInput.name = 'id_tasca';
    idTascaInput.value = idTasca;

    const actualitzarBoto = document.createElement('button');
    actualitzarBoto.type = 'submit';
    actualitzarBoto.textContent = 'Actualitzar tasca';
    actualitzarBoto.classList.add('btn-actualitzar');
    actualitzarBoto.name = 'actualitzar_tasca';

    form.addEventListener('submit', (event) => {
        const nom = nomTasca.value.trim();
        const descripcio = descripcioTasca.value.trim();
        const dataInici = dataIniciTasca.value;
        const dataFi = dataFiTasca.value;

        if (!nom || !descripcio || !dataInici || !dataFi) {
            event.preventDefault();
            alert('Hi ha algun camp incomplert');
        }
    });

    form.appendChild(nomTasca);
    form.appendChild(descripcioTasca);
    form.appendChild(dataIniciTasca);
    form.appendChild(dataFiTasca);
    form.appendChild(idTascaInput);
    form.appendChild(actualitzarBoto);

    divTasca.appendChild(form);
    tasquesContainer.appendChild(divTasca);
}