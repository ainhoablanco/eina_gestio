const projecteNou = document.getElementById('afegir-projecte');
const projectes = document.querySelector('.projectes');

function afegirCamps(divProjecte, nom = '', descripcio = '', dataInici = '', dataFi = '', esEdicio = false) {
    divProjecte.innerHTML = '';

    const botoTancar = document.createElement('button');
    botoTancar.textContent = 'X';
    botoTancar.classList.add('btn-tancar');
    botoTancar.addEventListener('click', () => {
        divProjecte.remove();
    });

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

    const buscarColaboradors = document.createElement('input');
    buscarColaboradors.type = 'text';
    buscarColaboradors.placeholder = 'Buscar col·laborador';
    buscarColaboradors.classList.add('buscar-colaboradors');

    const seleccionarColaboradors = document.createElement('select');
    seleccionarColaboradors.name = 'colaboradors_select';
    seleccionarColaboradors.multiple = true;
    seleccionarColaboradors.classList.add('colaboradors');

    const colaboradorsSeleccionats = document.createElement('div');
    colaboradorsSeleccionats.classList.add('colaboradors-seleccionats');

    const colaboradorsOcults = document.createElement('input');
    colaboradorsOcults.type = 'hidden';
    colaboradorsOcults.name = 'colaboradors';
    colaboradorsOcults.value = '';

    function carregarColaboradors(cerca = '') {
        fetch(`../php/selectColaboradors.php?lletra=${cerca}`)
            .then(response => response.json())
            .then(colaboradors => {
                seleccionarColaboradors.innerHTML = '';
                colaboradors.forEach(colaborador => {
                    const opcio = document.createElement('option');
                    opcio.value = colaborador.id_usuari;
                    opcio.textContent = colaborador.nom_usuari;
 
                    seleccionarColaboradors.appendChild(opcio);
                });
            })
            .catch(error => console.error('Error en carregar col·laboradors:', error));
    }

    function actualitzarColaboradorsSeleccionats() {
        const opcionsSeleccionades = Array.from(seleccionarColaboradors.selectedOptions);
        opcionsSeleccionades.forEach(opcio => {
            if (!colaboradorsSeleccionats.querySelector(`[data-id="${opcio.value}"]`)) {
                const elementColaborador = document.createElement('span');
                elementColaborador.textContent = opcio.textContent;
                elementColaborador.dataset.id = opcio.value;
                elementColaborador.classList.add('colaborador-item');

                const botoEliminar = document.createElement('button');
                botoEliminar.textContent = '✖';
                botoEliminar.classList.add('btn-eliminar');
                botoEliminar.addEventListener('click', () => {
                    elementColaborador.remove();
                    actualitzarColaboradorsOcults();
                });

                elementColaborador.appendChild(botoEliminar);
                colaboradorsSeleccionats.appendChild(elementColaborador);
            }
        });
        actualitzarColaboradorsOcults();
    }

    function actualitzarColaboradorsOcults() {
        const ids = Array.from(colaboradorsSeleccionats.children).map(item => item.dataset.id);
        colaboradorsOcults.value = ids.join(',');
    }

    buscarColaboradors.addEventListener('input', (e) => {
        carregarColaboradors(e.target.value);
    });

    seleccionarColaboradors.addEventListener('change', actualitzarColaboradorsSeleccionats);

    carregarColaboradors();

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
    form.appendChild(buscarColaboradors);
    form.appendChild(seleccionarColaboradors);
    form.appendChild(colaboradorsSeleccionats);
    form.appendChild(colaboradorsOcults);
    form.appendChild(guardarBoto);

    divProjecte.appendChild(botoTancar)
    divProjecte.appendChild(form);
}


projecteNou.addEventListener('click', () => {
    const nouDivProjecte = document.createElement('div');
    nouDivProjecte.classList.add('projecte');

    afegirCamps(nouDivProjecte);
    projectes.appendChild(nouDivProjecte);
});