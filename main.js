//                                   DECLARACIONES

const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);
const randomId = () => self.crypto.randomUUID();

//                            Categorias Local Storage

let categoryTable = [
    {
        id: 1,
        name: 'Comida',
    },
    {
        id: 2,
        name: 'Salidas',
    },
    {
        id: 3,
        name: 'Educacion',
    },
    {
        id: 4,
        name: 'Transporte',
    },
    {
        id: 5,
        name: 'Trabajo',
    },
    {
        id: 6,
        name: 'Servicio',
    },
];


const renderCategory = (users) => {
    for ( const user of users ) {
        $('#categoryList').innerHTML += `
        <li class="flex flex-row">
            <span class="py-1 px-1">${user.id}</span>
            <span  class="py-1 px-1">${user.name}</span>
        <div class="">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded">
                Editar
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">
                Eliminar
            </button>
        </div>
        `
        
    }
};
renderCategory(categoryTable);

