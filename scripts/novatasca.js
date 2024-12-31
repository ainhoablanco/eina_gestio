const tascaNova = document.getElementById('afegir-tasca');
const formTascaContainer = document.getElementById('form-tasca-container');

function afegirCampsTasca(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '', encarregat = '', estat = 'Pendent') {
    divTasca.innerHTML = '';

    const botoTancar = document.createElement('button');
    botoTancar.textContent = 'X';
    botoTancar.classList.add('btn-tancar-tasca');
    botoTancar.addEventListener('click', () => {
        divTasca.remove();
    });

    const form = document.createElement('form');
    form.action = '/htdocs/php/controller.php';
    form.method = 'POST';

    const nomTasca = document.createElement('input');
    nomTasca.type = 'text';
    nomTasca.name = 'nom';
    nomTasca.placeholder = 'Nom de la tasca';
    nomTasca.classList.add('nom-projecte');
    nomTasca.value = nom;

    const descripcioTasca = document.createElement('textarea');
    descripcioTasca.name = 'descripcio';
    descripcioTasca.placeholder = 'Descripció de la tasca';
    descripcioTasca.classList.add('descripcio-projecte');
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

    const seleccionarEncarregat = document.createElement('select');
    seleccionarEncarregat.name = 'encarregat_select';
    seleccionarEncarregat.classList.add('colaboradors');

    const encarregatSeleccionat = document.createElement('div');
    encarregatSeleccionat.classList.add('colaboradors-seleccionats');

    const encarregatOcult = document.createElement('input');
    encarregatOcult.type = 'hidden';
    encarregatOcult.name = 'encarregat';
    encarregatOcult.value = encarregat;

    function carregarEncarregats() {
        fetch('/htdocs/php/selectColaboradorsProjecte.php')
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
            encarregatSeleccionat.innerHTML = '';
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

    seleccionarEncarregat.addEventListener('change', actualitzarEncarregatSeleccionat);

    carregarEncarregats();

    const h3Encarregat = document.createElement('h3');
    h3Encarregat.textContent = 'Encarregat';

    const h3Estat = document.createElement('h3');
    h3Estat.textContent = 'Estat';

    const seleccionarEstat = document.createElement('select');
    seleccionarEstat.name = 'estat';
    seleccionarEstat.classList.add('estat-tasca');
    
    const opcionsEstat = ['Pendent', 'En Progres', 'Completada'];
    opcionsEstat.forEach((estado, index) => {
        const opcioEstat = document.createElement('option');
        opcioEstat.value = index + 1;
        opcioEstat.textContent = estado;
        if (estado === estat) {
            opcioEstat.selected = true;
        }
        seleccionarEstat.appendChild(opcioEstat);
    });    

    const guardarBoto = document.createElement('button');
    guardarBoto.type = 'submit';
    guardarBoto.textContent = 'Crear tasca';
    guardarBoto.classList.add('btn-guardar');
    guardarBoto.name = 'guardar_tasca';

    form.addEventListener('submit', (event) => {
        const nom = nomTasca.value.trim();
        const descripcio = descripcioTasca.value.trim();
        const dataInici = new Date(dataIniciTasca.value);
        const dataFi = new Date(dataFiTasca.value);

        if (!nom || !descripcio || !dataInici || !dataFi || !encarregatOcult.value) {
            event.preventDefault();
            alert('Hi ha algun camp incomplert');
            return;
        }

        if (dataFi < dataInici) { 
            event.preventDefault(); 
            alert('La data final no pot ser menor que la data inicial'); 
        }
    });

    form.appendChild(nomTasca);
    form.appendChild(descripcioTasca);
    form.appendChild(dataIniciTasca);
    form.appendChild(dataFiTasca);
    form.appendChild(h3Encarregat);
    form.appendChild(seleccionarEncarregat);
    form.appendChild(encarregatSeleccionat);
    form.appendChild(encarregatOcult);
    form.appendChild(h3Estat);
    form.appendChild(seleccionarEstat);
    form.appendChild(guardarBoto);

    divTasca.appendChild(botoTancar);
    divTasca.appendChild(form);
}

tascaNova.addEventListener('click', () => {
    const nouDivTasca = document.createElement('div');
    nouDivTasca.classList.add('nova-tasca');
    afegirCampsTasca(nouDivTasca);
    formTascaContainer.innerHTML = '';
    formTascaContainer.appendChild(nouDivTasca);
});