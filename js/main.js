//-- -------------------------- UTILITIES -------------------------- -->

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID()

const showElement = (selectors) => {
    for (const selector of selectors) {
        $(selector).classList.remove("hidden")
    }
}
const hideElement = (selectors) => {
    for (const selector of selectors) {
        $(selector).classList.add("hidden")
    }
}

const cleanContainer = (selector) => $(selector).innerHTML = ""

const getData = (key) => JSON.parse(localStorage.getItem(key))
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const defaultCategories = [
    {
        id: randomId(),
        name: 'Food',
    },
    {
        id: randomId(),
        name: 'Utilities',
    },
    {
        id: randomId(),
        name: 'Outings',
    },
    {
        id: randomId(),
        name: 'Education',
    },
    {
        id: randomId(),
        name: 'Transportation',
    },
    {
        id: randomId(),
        name: 'Job',
    },
];


const allOperations = getData("operations") || []
const allCategories = getData("categories") || defaultCategories

//-- -------------------------- RENDERS -------------------------- -->

const renderOperations = (operations) => {
    cleanContainer("#table")
    if (operations.length) {
        hideElement([".no-results-container"])
        showElement([".table-operations"])
        for (const operation of operations) {
            const categorieSelected = getData("categories").find(categorie => categorie.id === operation.categorie)
            $("#table").innerHTML += `
            <tr class="flex place-content-between mb-3 text-sm"> 
                <td class="font-semibold">${operation.description}</td>
                <td class="bg-green-100 text-green-400 rounded-md w-20 text-center ">${categorieSelected.name}</td>
                <td class="">${operation.date}</td>
                <td class="amount-operation text-left font-semibold">${operation.amount}</td>
                <td>
                    <button class="btn text-blue-500" onclick="showFormEdit('${operation.id}')"> Edit </button>
                    <button type="button" class="btn text-blue-500" onclick="openModalDelete('${operation.id}','${operation.description} ')"> Delete</button>
                </td>
            </tr>
            
            `
        }
    }
    else {
        showElement([".no-results-container"])
        hideElement([".table-operations"])
    }

}

const renderCategoriesTable = (categories) => {
    for ( const {name, id} of categories ) {
        $('#categoryList').innerHTML += `
        <li class="flex flex-row  justify-between">
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

const renderCategoriesOptions = (categories) => {
    for (const categorie of categories) {
        $("#categories-select").innerHTML += `
            <option value="${categorie.id}">${categorie.name}
        `
        $("#filter-categories").innerHTML += `
        <option value="${categorie.id}">${categorie.name}
    `
    }
}

//-- -------------------------- DATA HANDLERS -------------------------- -->

const setMinimumDate = () => {

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    console.log(formattedToday)

    $("#filter-date").value = formattedToday;
    $("#date-input").value = formattedToday;
}

const saveNewOperation = (operationId) => {
    return {
        id: operationId ? operationId : randomId(),
        description: $("#description-input").value,
        categorie: $("#categories-select").value,
        date: $("#date-input").value,
        type:$("#type-select-operation").value,
        amount: $("#amount-input").valueAsNumber
    }
}

const showFormEdit = (operationId) => {
    showElement(["#new-operation", "#edit-operation-btn", "#edit-operation-title"])
    hideElement([".table-operations", ".balance-container", "#add-operation-btn", "#new-operation-title", "#cancel-operation-btn"])
    $("#edit-operation-btn").setAttribute("data-id", operationId)
    const operationSelected = getData("operations").find(operation => operation.id === operationId)
    $("#description-input").value = operationSelected.description
    $("#categories-select").value = operationSelected.categorie
    $("#date-input").value = operationSelected.date
    $("#amount-input").value = operationSelected.amount
}

const openModalDelete = (operationId, operationDescription) => {
    $("#delete-btn").setAttribute("data-id", operationId)
    showElement(["#delete-modal"])
    $(".operation-name").innerText = `${operationDescription}`
    $("#delete-btn").addEventListener("click", () => {
        const operationId = $("#delete-btn").getAttribute("data-id")
        deleteOperation(operationId)
        window.location.reload()
    })
    $("#cancel-dltModal-btn").addEventListener("click", () => {
        hideElement(["#delete-modal"])
        showElement([".balance-container", ".table-operations"])
        window.location.reload()
    })
}

const deleteOperation = (operationId) => {
    const currentData = getData("operations").filter(operation => operation.id != operationId)
    setData("operations", currentData)
}

const addOperation = () => {
    const currentData = getData("operations")
    currentData.push(saveNewOperation())
    setData("operations", currentData)
    hideElement([".no-results-container", ".no-results-container", "#new-operation"])
    showElement([".balance-container", ".table-operations"])
}

const editOperation = () => {
    const operationId = $("#edit-operation-btn").getAttribute("data-id")
    const currentData = getData("operations").map(operation => {
        if(operation.id == operationId) {
            return saveNewOperation()
        }
        return operation
    })
    setData("operations", currentData)
}

//-- -------------------------- BALANCE CALCULATIONS -------------------------- -->

const calculateBalance = () => {
    const currentData = getData("operations")
    let earningsTotal = 0
    let expensesTotal = 0

    for (const operation of currentData) {
        if (operation.type === "earning") {
            earningsTotal += operation.amount
        } else {
            expensesTotal += operation.amount
        }
    }

    $(".earnings-sum").innerHTML = earningsTotal
    $(".expenses-sub").innerHTML = expensesTotal

    const netBalance = earningsTotal - expensesTotal
    $(".totalOnWallet").innerHTML = netBalance;

    if (netBalance < 0) {
        $(".total-on-wallet").classList.add("text-red-500")
    } else if (netBalance > 0){
        $(".total-on-wallet").classList.add("text-green-500")
    }

    return netBalance
}

//-- -------------------------- VALIDATIONS -------------------------- -->

const validateForm = (field) => {
    const description = $("#description-input").value.trim()
    const amount = $("#amount-input").valueAsNumber
    const validationPassed = description !== "" && amount

    switch (field) {
        case "description":
            if (description === "") {
                showElement([".description-error"])
                $("#description-input").classList.add("border-red-500")
            } else {
                hideElement([".description-error"])
                $("#description-input").classList.remove("border-red-500")
            }
            break
        case "amount":
            if (!amount) {
                showElement([".amount-error"])
                $("#amount-input").classList.add("border-red-500")
            } else {
                hideElement([".amount-error"])
                $("#amount-input").classList.remove("border-red-500")
            }
            break
        default:
            console.log("Error")
    }

    if (validationPassed) {
        $("#add-operation-btn").removeAttribute("disabled")
        $("#add-operation-btn").classList.add("hover:bg-green-600")
        $("#edit-operation-btn").removeAttribute("disabled")
        $("#edit-operation-btn").classList.add("hover:bg-green-600")
    } else {
        $("#add-operation-btn").setAttribute("disabled", true)
        $("#add-operation-btn").classList.remove("hover:bg-green-600")
        $("#edit-operation-btn").setAttribute("disabled", true)
        $("#edit-operation-btn").classList.remove("hover:bg-green-600")
    }
}


//-- -------------------------- EVENTS -------------------------- -->

const initializeApp = () => {
    setData("operations", allOperations)
    setData("categories", allCategories)
    renderOperations(allOperations)
    renderCategoriesTable(allCategories)
    renderCategoriesOptions(allCategories)
    setMinimumDate()
    calculateBalance()

    $("#new-operation-btn").addEventListener("click", () => {
        showElement(["#new-operation"])
        hideElement([".balance-container","#sectionCategory"])
    })

    $("#add-operation-btn").addEventListener("click", (e) => {
        e.preventDefault()
        addOperation()
        window.location.reload()
    })

    $("#edit-operation-btn").addEventListener("click", (e) => {
        e.preventDefault()
        editOperation()
        window.location.reload()
    })

    $("#cancel-operation-btn").addEventListener("click", (e) => {
        e.preventDefault()
        showElement([".balance-container"])
        hideElement(["#new-operation"])
    })

    $(".hide-filters").addEventListener("click", () => {
        $(".hide-filters").classList.toggle("hidden")
        $(".show-filters").classList.toggle("hidden")
        $("#filters").classList.toggle("hidden")
    })
    
    $(".show-filters").addEventListener("click", () => {
        $(".hide-filters").classList.toggle("hidden")
        $(".show-filters").classList.toggle("hidden")
        $("#filters").classList.toggle("hidden")
    })

    $("#filter-categories").addEventListener("input", (e) => {
        const categorieId = e.target.value
        const currentData = getData("operations")
        const filteredOperations = currentData.filter(operation => operation.categorie === categorieId)
        renderOperations(filteredOperations)
    })

    $("#description-input").addEventListener("blur", () => validateForm("description"))
    $("#amount-input").addEventListener("blur", () => validateForm("amount"))

    $("#balance-nav").addEventListener("click", (e) => {
        showElement([".balance-container"])
        hideElement(["#sectionCategory", "#new-operation"])
    })

    $("#categories-nav").addEventListener("click", () => {
        showElement(["#sectionCategory"])
        hideElement([".balance-container", "#new-operation"])
    })

}

window.addEventListener("load", initializeApp)

