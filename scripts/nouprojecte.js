const projecteNou = document.getElementById('afegir-projecte');
const projectes = document.querySelector('.projectes');

function afegirCamps(divProjecte, nom = '', descripcio = '', dataInici = '', dataFi = '', esEdicio = false) {
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

    const guardarBoto = document.createElement('button');
    guardarBoto.type = 'submit';
    guardarBoto.textContent = 'Crear projecte';
    guardarBoto.classList.add('btn-guardar');
    guardarBoto.name = 'guardar_projecte';

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
    form.appendChild(guardarBoto);

    divProjecte.appendChild(form);
}


projecteNou.addEventListener('click', () => {
    const nouDivProjecte = document.createElement('div');
    nouDivProjecte.classList.add('projecte');

    afegirCamps(nouDivProjecte);
    projectes.appendChild(nouDivProjecte);
});