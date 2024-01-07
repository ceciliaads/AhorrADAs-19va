//                                   DECLARACIONES

const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);
const randomId = () => self.crypto.randomUUID();

// Categorias y opeaciones Local Storage

const getData = (key) => JSON.parse(localStorage.getItem(key));
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

let add = getData('key') || [];

let category = [
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

const renderCategory = (categorie) => {
    for ( const {name, id} of categorie ) {
        $('#categoryList').innerHTML += `<li class="flex flex-row  justify-between">
        <div class='space-x-2'>
        <p class="bg-slate-100 py-1 px-1 rounded">${name}</p>
        </div>
        <div class="">
        <button onclick="bttnEdit('${id}')" class="bttnEdit bg-green-500 hover:bg-green-700 text-white font-bold m-1 py-1 px-1 rounded">
        Editar
        </button>
        <button onclick="bttnremove('${id}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 rounded">
        Eliminar
        </button>
        </div>
        </li>`
    };
};

// Editar Categorias
const userInfo = () => {
    return{
        id: randomId(),
        name: $('#inputName').value,
    }
}
const bttnEdit = (id) => {
    //cambio de pantalla categoria
    $('#sectionEdit').classList.remove('hidden');
    $('#sectionCategory').classList.add('hidden');
    const selecti = getData('pink').find(key => key.id === id);
    $('name').value.name
    console.log(value.name)
    };
    
$$('.bttnConfirmEdit').forEach((btn) => {
    btn.addEventListener('click', () => {
        $('#sectionCategory').classList.remove('hidden');
        $('#sectionEdit').classList.add('hidden');
    });
})

const initializeApp = () => {  
    setData ('pink', add);        
    renderCategory(category);
    
    
    $("#bttnConfirm").addEventListener('click', (e) => {
        e.preventDefault()
        const currentData = getData('pink');
        currentData.push(userInfo());
        setData('pink', currentData)
    })

};
window.addEventListener('load', initializeApp);





const renderReport = (reports) => {
    for (const report of reports){
        $('tableReports').innerHTML += `
        <div class="max-w-5xl mx-auto bg-white p-6 m-8 rounded-md h-1/2">
        <h3>Resumen</h3>
        <div>
            <p>Categoría con mayor ganancia</p>
            <p>Categoría con mayor gasto</p>
            <p>Categoría con mayor balance</p>
            <p>Mes con mayor ganancia</p>
            <p>Mes con mayor gasto</p>
        </div>
        <h3>Totales por Categorías</h3>
        <table>
            <thead>
                <tr>
                    <th>Categoria</th>
                    <th>Ganancia</th>
                    <th>Gastos</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Monto</td>
                    <td>Monto</td>
                    <td>Monto</td>
                </tr>
            </tbody>
        </table>
        <h3>Totales por mes</h3>
        <table>
            <thead>
                <tr>
                    <th>Mes</th>
                    <th>Ganancias</th>
                    <th>Gastos</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Categoría</th>
                    <th>Ganancia</th>
                    <th>Gastos</th>
                    <th>Balance</th>
                </tr>
            </tbody>
        </table>
        </div>`
    }
}
let operation = [];

const starOperations = (operations) => {
    $('#listOperaions').innerHTML = " ";
    let totalEarnings  = 0; //ganancias
    let totalExpenses = 0; //gastos
    for (let operation of operations){
        let result= "";
    };
}

getData('Operation')