const tascaNova = document.getElementById('afegir-tasca');
const tasques = document.querySelector('.tasques');

function afegirCamps(divTasca, nom = '', descripcio = '', dataInici = '', dataFi = '') {
    divTasca.innerHTML = '';

}


tascaNova.addEventListener('click', () => {
    const nouDivTasca = document.createElement('div');
    nouDivTasca.classList.add('projecte');

    afegirCamps(nouDivTasca);
    tasques.appendChild(nouDivTasca);
});