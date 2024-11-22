const projecteNou = document.getElementById('afegir-projecte');
const projectes = document.querySelector('.projectes');

function afegirCamps(divProjecte, nom = '', descripcio = '', esEdicio = false) {
    divProjecte.innerHTML = ''; // Limpia el contenido actual del div

    const nomProjecte = document.createElement('input');
    nomProjecte.type = 'text';
    nomProjecte.placeholder = 'Nom del projecte';
    nomProjecte.classList.add('nom-projecte');
    nomProjecte.value = nom;

    const descripcioProjecte = document.createElement('textarea');
    descripcioProjecte.placeholder = 'Descripció del projecte';
    descripcioProjecte.classList.add('descripcio-projecte');
    descripcioProjecte.value = descripcio;

    const guardarBoto = document.createElement('button');
    guardarBoto.textContent = 'Guardar';
    guardarBoto.classList.add('btn-guardar');

    guardarBoto.addEventListener('click', () => {
        const nom = nomProjecte.value.trim();
        const descripcio = descripcioProjecte.value.trim();

        if (!nom || !descripcio) {
            alert('Hi ha algun camp incomplert');
            return;
        }

        divProjecte.innerHTML = ''; // Limpia el div para mostrar el estado guardado

        const eliminarBoto = document.createElement('button');
        eliminarBoto.textContent = 'X';
        eliminarBoto.classList.add('btn-eliminar');
        eliminarBoto.style.position = 'absolute';
        eliminarBoto.style.top = '5px';
        eliminarBoto.style.right = '5px';

        eliminarBoto.addEventListener('click', () => {
            divProjecte.remove();
        });

        const nomText = document.createElement('p');
        nomText.textContent = nom;
        nomText.classList.add('nom-projecte-guardat');

        const editarBoto = document.createElement('button');
        editarBoto.textContent = 'Editar';
        editarBoto.classList.add('btn-editar');

        editarBoto.addEventListener('click', () => {
            afegirCamps(divProjecte, nom, descripcio, true);
        });

        divProjecte.style.position = 'relative';
        divProjecte.appendChild(eliminarBoto);
        divProjecte.appendChild(nomText);
        divProjecte.appendChild(editarBoto);
    });

    divProjecte.appendChild(nomProjecte);
    divProjecte.appendChild(descripcioProjecte);
    divProjecte.appendChild(guardarBoto);
}

projecteNou.addEventListener('click', () => {
    const nouDivProjecte = document.createElement('div');
    nouDivProjecte.classList.add('projecte');

    afegirCamps(nouDivProjecte);
    projectes.appendChild(nouDivProjecte);
});