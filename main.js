//                                   DECLARACIONES

const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);
const randomId = () => self.crypto.randomUUID();

// Categorias Local Storage

const bringData = () => {
    return JSON.parse(localStorage.getItem('light'));
};

bringData('categoryTable');

const bringCategory = () => {
    return bringData()?.categoryTable;
};

let categoryTable = bringCategory() || [
    {
        id: randomId(),
        name: 'Comida',
    },
    {
        id: randomId(),
        name: 'Salidas',
    },
    {
        id: randomId(),
        name: 'Educacion',
    },
    {
        id: randomId(),
        name: 'Transporte',
    },
    {
        id: randomId(),
        name: 'Trabajo',
    },
    {
        id: randomId(),
        name: 'Servicio',
    },
];

console.log(categoryTable)

const renderCategory = (categorie) => {
    for ( const {id, name} of categorie ) {
        $('#categoryList').innerHTML += `<li class="flex flex-row  justify-between">
        <div class='space-x-2'>
        <p class="bg-slate-100 py-1 px-1 rounded">${name}</p>
        </div>
        <div class="">
        <button ('${id}') class="bttnEdit bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded">
        Editar
        </button>
        <button id="${id}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">
        Eliminar
        </button>
        </div>
        </li>`
    };
};

renderCategory(categoryTable);

// Editar Categorias

const userInfo = () => {
    return{
        id: randomId(),
        name: $('#inputName').value,
    }
}

const initializeApp = () => {  
    $('.bttnEdit').addEventListener('click', () => {
        $('#sectionEdit').classList.remove('hidden');
        $('#sectionCategory').classList.add('hidden');
    })
    
    $("#bttnConfirm").addEventListener('click', (e) => {
        e.preventDefault()
        const newDate = userInfo();
        categoryTable.push(newDate);
        console.log(categoryTable)
        
    })
};
window.addEventListener('load', initializeApp);