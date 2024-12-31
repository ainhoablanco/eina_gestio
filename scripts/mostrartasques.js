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
        eliminarBoto.textContent = 'X';
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
            nouDivTasca.classList.add('tasca');
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

function actualitzarCamps(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '', encarregat = '', estat = 'Pendent', idTasca = '') {
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
    form.appendChild(idTascaInput);
    form.appendChild(actualitzarBoto);
    
    divTasca.appendChild(botoTancar);
    divTasca.appendChild(form);
    tasquesContainer2.appendChild(divTasca);
}
    