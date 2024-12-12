const tascaNova = document.getElementById('afegir-tasca');
const tasques = document.querySelector('.tasques');

function afegirCamps(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '') {
    divTasca.innerHTML = '';

    const formulari = document.createElement('form');
    formulari.action = '../php/controller.php';
    formulari.method = 'POST';

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

    const guardarBoto = document.createElement('button');
    guardarBoto.type = 'submit';
    guardarBoto.textContent = 'Crear tasca';
    guardarBoto.classList.add('btn-guardar');
    guardarBoto.name = 'guardar_tasca';

    guardarBoto.addEventListener('click', (event) => {
        const nom = nomTasca.value.trim();
        const descripcio = descripcioTasca.value.trim();
        const dataInici = dataIniciTasca.value;
        const dataFi = dataFiTasca.value;
        const colaboradores = colaboradorsOcults.value.trim();
    
        if (!nom || !descripcio || !dataInici || !dataFi) {
            event.preventDefault();
            alert('Hi ha algun camp incomplert');
        }
    
    });
    

    formulari.appendChild(nomTasca);
    formulari.appendChild(descripcioTasca);
    formulari.appendChild(dataIniciTasca);
    formulari.appendChild(dataFiTasca);
    formulari.appendChild(guardarBoto);

    divTasca.appendChild(formulari);
}

tascaNova.addEventListener('click', () => {
    const nouDivTasca = document.createElement('div');
    nouDivTasca.classList.add('tasca');

    afegirCamps(nouDivTasca);
    tasques.appendChild(nouDivTasca);
});