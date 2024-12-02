window.addEventListener('load', () => {
    fetch('../php/selectProjecte.php')
        .then (function (resposta) {
            return resposta.json();
        })
        .then(projectes => {
            mostrarProjectes(projectes);
        })
        .catch(error => {
            console.error('Hi ha hagut un error:', error);
        });
});

function mostrarProjectes(projectes) {
    const containerProjectes = document.querySelector('.projectes');

    projectes.forEach(projecte => {
        const divProjecte = document.createElement('div');
        divProjecte.classList.add('projecte');

        const nomProjecte = document.createElement('h3');
        nomProjecte.textContent = projecte.nom;
        nomProjecte.classList.add('nom-projecte-guardat');

        const descripcioProjecte = document.createElement('p');
        descripcioProjecte.textContent = projecte.descripcio;
        descripcioProjecte.classList.add('descripcio-projecte');

        const editarBoto = document.createElement('button');
        editarBoto.type = 'submit';
        editarBoto.textContent = 'Editar projecte';
        editarBoto.classList.add('btn-editar');
        editarBoto.name = 'editar_projecte';

        divProjecte.appendChild(nomProjecte);
        divProjecte.appendChild(descripcioProjecte);
        divProjecte.appendChild(editarBoto);

        containerProjectes.appendChild(divProjecte);
    });
}