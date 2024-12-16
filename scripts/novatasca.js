const tascaNova = document.getElementById('afegir-tasca');
const tasques = document.querySelector('.tasques');

function afegirCampsTasca(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '', encarregat = '') {
    divTasca.innerHTML = '';

    const botoTancar = document.createElement('button');
    botoTancar.textContent = 'X';
    botoTancar.classList.add('btn-tancar');
    botoTancar.addEventListener('click', () => {
        divTasca.remove();
    });

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

    const buscarEncarregat = document.createElement('input');
    buscarEncarregat.type = 'text';
    buscarEncarregat.placeholder = 'Buscar encarregat';
    buscarEncarregat.classList.add('buscar-encarregat');

    const seleccionarEncarregat = document.createElement('select');
    seleccionarEncarregat.name = 'encarregat_select';
    seleccionarEncarregat.classList.add('encarregat');

    const encarregatSeleccionat = document.createElement('div');
    encarregatSeleccionat.classList.add('encarregat-seleccionat');

    const encarregatOcult = document.createElement('input');
    encarregatOcult.type = 'hidden';
    encarregatOcult.name = 'encarregat';
    encarregatOcult.value = '';

    function carregarEncarregats(cerca = '') {
        fetch(`../php/selectColaboradors.php?lletra=${cerca}`)
            .then(response => response.json())
            .then(encarregats => {
                seleccionarEncarregat.innerHTML = '';
                encarregats.forEach(encarregat => {
                    const opcio = document.createElement('option');
                    opcio.value = encarregat.id_usuari;
                    opcio.textContent = encarregat.nom_usuari;

                    seleccionarEncarregat.appendChild(opcio);
                });
            })
            .catch(error => console.error('Error en carregar encarregats:', error));
    }

    function actualitzarEncarregatSeleccionat() {
        const opcioSeleccionada = seleccionarEncarregat.selectedOptions[0];
        if (opcioSeleccionada && !encarregatSeleccionat.querySelector(`[data-id="${opcioSeleccionada.value}"]`)) {
            encarregatSeleccionat.innerHTML = ''; // Limpiar selección previa
            const elementEncarregat = document.createElement('span');
            elementEncarregat.textContent = opcioSeleccionada.textContent;
            elementEncarregat.dataset.id = opcioSeleccionada.value;
            elementEncarregat.classList.add('encarregat-item');

            const botoEliminar = document.createElement('button');
            botoEliminar.textContent = '✖';
            botoEliminar.classList.add('btn-eliminar');
            botoEliminar.addEventListener('click', () => {
                elementEncarregat.remove();
                encarregatOcult.value = '';
            });

            elementEncarregat.appendChild(botoEliminar);
            encarregatSeleccionat.appendChild(elementEncarregat);
            encarregatOcult.value = opcioSeleccionada.value;
        }
    }

    buscarEncarregat.addEventListener('input', (e) => {
        carregarEncarregats(e.target.value);
    });

    seleccionarEncarregat.addEventListener('change', actualitzarEncarregatSeleccionat);

    carregarEncarregats();

    const guardarBoto = document.createElement('button');
    guardarBoto.type = 'submit';
    guardarBoto.textContent = 'Crear tasca';
    guardarBoto.classList.add('btn-guardar');
    guardarBoto.name = 'guardar_tasca';

    form.addEventListener('submit', (event) => {
        const nom = nomTasca.value.trim();
        const descripcio = descripcioTasca.value.trim();
        const dataInici = dataIniciTasca.value;
        const dataFi = dataFiTasca.value;

        if (!nom || !descripcio || !dataInici || !dataFi || !encarregatOcult.value) {
            event.preventDefault();
            alert('Hi ha algun camp incomplert');
        }
    });

    form.appendChild(nomTasca);
    form.appendChild(descripcioTasca);
    form.appendChild(dataIniciTasca);
    form.appendChild(dataFiTasca);
    form.appendChild(buscarEncarregat);
    form.appendChild(seleccionarEncarregat);
    form.appendChild(encarregatSeleccionat);
    form.appendChild(encarregatOcult);
    form.appendChild(guardarBoto);

    divTasca.appendChild(botoTancar);
    divTasca.appendChild(form);
}

tascaNova.addEventListener('click', () => {
    const nouDivTasca = document.createElement('div');
    nouDivTasca.classList.add('tasca');

    afegirCampsTasca(nouDivTasca);
    tasques.appendChild(nouDivTasca);
});