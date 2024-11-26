const projecteNou = document.getElementById('afegir-projecte');
const projectes = document.querySelector('.projectes');

function afegirCamps(divProjecte, nom = '', descripcio = '', dataInici = '', dataFi = '', esEdicio = false) {
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

    const dataIniciProjecte = document.createElement('input');
    dataIniciProjecte.type = 'date';
    dataIniciProjecte.classList.add('data-inici');
    dataIniciProjecte.value = dataInici;

    const dataFiProjecte = document.createElement('input');
    dataFiProjecte.type = 'date';
    dataFiProjecte.classList.add('data-fi');
    dataFiProjecte.value = dataFi;

    const guardarBoto = document.createElement('button');
    guardarBoto.textContent = 'Guardar';
    guardarBoto.classList.add('btn-guardar');

    guardarBoto.addEventListener('click', () => {
        const nom = nomProjecte.value.trim();
        const descripcio = descripcioProjecte.value.trim();
        const dataInici = dataIniciProjecte.value;
        const dataFi = dataFiProjecte.value;
    
        if (!nom || !descripcio || !dataInici || !dataFi) {
            alert('Hi ha algun camp incomplert');
            return;
        }
    
        fetch('guardarProjectes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                nom: nom,
                descripcio: descripcio,
                data_inici: dataInici,
                data_fi: dataFi
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Imprime la respuesta del servidor para depurar
            if (data.success) {
                alert(data.message);
                divProjecte.innerHTML = '';
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
    
                const datesText = document.createElement('p');
                datesText.textContent = `Inici: ${dataInici} - Fi: ${dataFi}`;
                datesText.classList.add('dates-projecte');
    
                const editarBoto = document.createElement('button');
                editarBoto.textContent = 'Editar';
                editarBoto.classList.add('btn-editar');
    
                editarBoto.addEventListener('click', () => {
                    afegirCamps(divProjecte, nom, descripcio, dataInici, dataFi, true);
                });
    
                divProjecte.style.position = 'relative';
                divProjecte.appendChild(eliminarBoto);
                divProjecte.appendChild(nomText);
                divProjecte.appendChild(datesText);
                divProjecte.appendChild(editarBoto);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hi ha hagut un error al guardar el projecte.');
        });
    });    

    divProjecte.appendChild(nomProjecte);
    divProjecte.appendChild(descripcioProjecte);
    divProjecte.appendChild(dataIniciProjecte);
    divProjecte.appendChild(dataFiProjecte);
    divProjecte.appendChild(guardarBoto);
}

projecteNou.addEventListener('click', () => {
    const nouDivProjecte = document.createElement('div');
    nouDivProjecte.classList.add('projecte');

    afegirCamps(nouDivProjecte);
    projectes.appendChild(nouDivProjecte);
});