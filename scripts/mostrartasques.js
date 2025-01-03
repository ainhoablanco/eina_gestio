window.addEventListener('load', () => {
    fetch('/htdocs/php/selectTasques.php')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(tasques => {
            mostrarTasques(tasques);
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


function mostrarTasques(tasques) {
    const containerPerFer = document.querySelector('.tasques-per-fer');
    const containerEnProces = document.querySelector('.tasques-en-proces');
    const containerFet = document.querySelector('.tasques-fetes');

    tasques.forEach(tasca => {
        const form = document.createElement('form');
        form.action = '/htdocs/php/controller.php';
        form.method = 'POST';

        const eliminarBoto = document.createElement('button');
        eliminarBoto.type = 'submit';
        eliminarBoto.textContent = 'x';
        eliminarBoto.classList.add('btn-eliminarTasca');
        eliminarBoto.name = 'eliminar_tasca';
        eliminarBoto.setAttribute('data-id', tasca.id_tasca);

        const idTasca = document.createElement('input');
        idTasca.type = 'hidden';
        idTasca.name = 'id_tasca';
        idTasca.value = tasca.id_tasca;

        const estatTasca = document.createElement('input');
        estatTasca.type = 'hidden';
        estatTasca.name = 'estat_tasca';
        estatTasca.value = tasca.id_estat;

        const divTasca = document.createElement('div');
        divTasca.classList.add('tasca');

        const nomTasca = document.createElement('h3');
        nomTasca.textContent = tasca.nom;
        nomTasca.classList.add('nom-tasca-guardat');

        const descripcioTasca = document.createElement('p');
        descripcioTasca.textContent = tasca.descripcio;
        descripcioTasca.classList.add('descripcio-tasca');

        const encarregatNom = document.createElement('p');
        encarregatNom.textContent = `Encarregat: ${tasca.encarregat_nom}`;
        encarregatNom.classList.add('nom-encarregat');

        const editarBoto = document.createElement('button');
        editarBoto.type = 'button';
        editarBoto.textContent = 'Editar tasca';
        editarBoto.classList.add('btn-editar');
        editarBoto.name = 'editar_tasca';

        editarBoto.addEventListener('click', () => {
            const nouDivTasca = document.createElement('div');
            nouDivTasca.classList.add('nova-tasca');
            actualitzarCamps(nouDivTasca, tasca.nom, tasca.descripcio, tasca.data_inici, tasca.data_fi, tasca.id_encarregat, tasca.id_estat, tasca.id_tasca);
        });

        form.appendChild(idTasca);
        form.appendChild(eliminarBoto);
        divTasca.appendChild(form);
        divTasca.appendChild(nomTasca);
        divTasca.appendChild(descripcioTasca);
        divTasca.appendChild(encarregatNom);
        divTasca.appendChild(editarBoto);

        if (tasca.id_estat === 1) {
            containerPerFer.appendChild(divTasca);
        } else if (tasca.id_estat === 2) {
            containerEnProces.appendChild(divTasca);
        } else if (tasca.id_estat === 3) {
            containerFet.appendChild(divTasca);
        }
    });
}

const tasquesContainer2 = document.getElementById('form-tasca-container');

function actualitzarCamps(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '', encarregat = '', estat = '', idTasca = '') {
    
    const formularioExistente = document.querySelector(`.nova-tasca-editar[data-id="${idTasca}"]`);
    if (formularioExistente) {
        return;
    }

    divTasca.innerHTML = '';
    divTasca.classList.add('nova-tasca-editar');
    divTasca.setAttribute('data-id', idTasca);

    const botoTancar = document.createElement('button');
    botoTancar.textContent = 'x';
    botoTancar.classList.add('btn-tancar-tasca');
    botoTancar.addEventListener('click', () => {
        divTasca.remove();
    });

    const form = document.createElement('form');
    form.action = '/htdocs/php/controller.php';
    form.method = 'POST';

    const pNomTasca = document.createElement('p');
    pNomTasca.textContent = 'Nom de la tasca:';
    pNomTasca.classList.add('p-nom-tasca');

    const nomTasca = document.createElement('input');
    nomTasca.type = 'text';
    nomTasca.name = 'nom';
    nomTasca.placeholder = 'Nom de la tasca';
    nomTasca.classList.add('nom-projecte');
    nomTasca.value = nom;

    const pDescripcioTasca = document.createElement('p');
    pDescripcioTasca.textContent = 'Descripció de la tasca:';
    pDescripcioTasca.classList.add('p-descripcio-tasca');

    const descripcioTasca = document.createElement('textarea');
    descripcioTasca.name = 'descripcio';
    descripcioTasca.placeholder = 'Descripció de la tasca';
    descripcioTasca.classList.add('descripcio-projecte');
    descripcioTasca.value = descripcio;

    const pDataInici = document.createElement('p');
    pDataInici.textContent = 'Data d\'inici:';
    pDataInici.classList.add('p-data-inici');

    const dataIniciTasca = document.createElement('input');
    dataIniciTasca.type = 'date';
    dataIniciTasca.name = 'data_inici';
    dataIniciTasca.classList.add('data-inici');
    dataIniciTasca.value = dataInici;

    const pDataFi = document.createElement('p');
    pDataFi.textContent = 'Data de fi:';
    pDataFi.classList.add('p-data-fi');

    const dataFiTasca = document.createElement('input');
    dataFiTasca.type = 'date';
    dataFiTasca.name = 'data_fi';
    dataFiTasca.classList.add('data-fi');
    dataFiTasca.value = dataFi;

    const pEncarregat = document.createElement('p');
    pEncarregat.textContent = 'Encarregat:';
    pEncarregat.classList.add('p-encarregat');

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
                encarregats.forEach(encarregatItem => {
                    const opcio = document.createElement('option');
                    opcio.value = encarregatItem.id_usuari;
                    opcio.textContent = encarregatItem.nom_usuari;

                    if (encarregatItem.id_usuari === encarregat) {
                        opcio.selected = true; // Seleccionar el encargado actual
                        encarregatOcult.value = encarregat;
                        const elementEncarregat = document.createElement('span');
                        elementEncarregat.textContent = encarregatItem.nom_usuari;
                        elementEncarregat.dataset.id = encarregatItem.id_usuari;
                        elementEncarregat.classList.add('encarregat-item');

                        const botoEliminar = document.createElement('button');
                        botoEliminar.textContent = 'x';
                        botoEliminar.classList.add('btn-eliminar');
                        botoEliminar.addEventListener('click', () => {
                            elementEncarregat.remove();
                            encarregatOcult.value = '';
                        });

                        elementEncarregat.appendChild(botoEliminar);
                        encarregatSeleccionat.appendChild(elementEncarregat);
                    }

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
            botoEliminar.textContent = 'x';
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

    const pEstat = document.createElement('p');
    pEstat.textContent = 'Estat:';
    pEstat.classList.add('p-estat');

    const seleccionarEstat = document.createElement('select');
    seleccionarEstat.name = 'estat';
    seleccionarEstat.classList.add('estat-tasca');

    const opcionsEstat = [
        { id: 1, text: 'Pendent' },
        { id: 2, text: 'En Progres' },
        { id: 3, text: 'Completada' },
    ];

    opcionsEstat.forEach(opcio => {
        const opcioEstat = document.createElement('option');
        opcioEstat.value = opcio.id;
        opcioEstat.textContent = opcio.text;

        if (opcio.id.toString() === estat.toString()) {
            opcioEstat.selected = true; // Seleccionar el estado actual
        }

        seleccionarEstat.appendChild(opcioEstat);
    });

    const actualitzarBoto = document.createElement('button');
    actualitzarBoto.type = 'submit';
    actualitzarBoto.textContent = 'Actualitzar tasca';
    actualitzarBoto.classList.add('btn-actualitzar');
    actualitzarBoto.name = 'actualitzar_tasca';

    const idTascaInput = document.createElement('input');
    idTascaInput.type = 'hidden';
    idTascaInput.name = 'id_tasca';
    idTascaInput.value = idTasca;

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

    form.appendChild(pNomTasca);
    form.appendChild(nomTasca);
    form.appendChild(pDescripcioTasca);
    form.appendChild(descripcioTasca);
    form.appendChild(pDataInici);
    form.appendChild(dataIniciTasca);
    form.appendChild(pDataFi);
    form.appendChild(dataFiTasca);
    form.appendChild(pEncarregat);
    form.appendChild(seleccionarEncarregat);
    form.appendChild(encarregatSeleccionat);
    form.appendChild(encarregatOcult);
    form.appendChild(pEstat);
    form.appendChild(seleccionarEstat);
    form.appendChild(idTascaInput);
    form.appendChild(actualitzarBoto);

    divTasca.appendChild(botoTancar);
    divTasca.appendChild(form);
    tasquesContainer2.appendChild(divTasca);
}   