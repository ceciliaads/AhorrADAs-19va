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

const allOperations = getData("operations") || []
// const allCategories = getData("categories") || defaultCategories

const operationsPlaceHolder = []

//-- -------------------------- RENDERS -------------------------- -->

const renderOperations = (operations) => {
    for (const operation of operations) {
        $("#table").innerHTML += `
        <tr> 
            <td>${operation.description}</td>
            <td>${operation.categorie}</td>
            <td>${operation.date}</td>
            <td>${operation.amount}</td>
            <td>
                <button class="btn text-blue-400" onclick="showFormEdit('${operation.id}')"> Edit </button>
                <button type="button" class="btn text-blue-400" onclick="openModalDelete('${operation.id}')"> Delete</button>
            </td>
        </tr>
        
        `
    }
}
console.log(operationsPlaceHolder)

// renderOperations(operationsPlaceHolder)

const saveNewOperation = () => {
    return {
        id: randomId(),
        description: $("#description-input").value,
        categorie: $("#categories-select").value,
        date: $("#date-input").value,
        amount: $("#amount-input").value,
    }
}
console.log(saveNewOperation())

const showFormEdit = (operationId) => {
    showElement(["#new-operation", "#edit-operation-btn", "#edit-operation-title"])
    hideElement([".table-operations", ".balance-container", "#add-operation-btn", "#new-operation-title"])
    $("#edit-operation-btn").setAttribute("data-id", operationId)
    const operationSelected = getData("operations").find(operation => operation.id === operationId)
    $("#description-input").value = operationSelected.description
    $("#categories-select").value = operationSelected.categorie
    $("#date-input").value = operationSelected.date
    $("#amount-input").value = operationSelected.amount
    // add type of balance
}

const openModalDelete = (operationId) => {
    $("#delete-btn").setAttribute("data-id", operationId)
    $("#delete-modal").classList.remove("hidden")
    $("#delete-btn").addEventListener("click", () => {
        const operationId = $("#delete-btn").getAttribute("data-id")
        deleteOperation(operationId)
        window.location.reload()
    })
}

const deleteOperation = (operationId) => {
    const currentData = getData("operations").filter(operation => operation.id != operationId)
    setData("operations", currentData)
}

//-- -------------------------- EVENTS -------------------------- -->

const initializeApp = () => {
    setData("operations", allOperations)
    renderOperations(allOperations)

    $("#new-operation-btn").addEventListener("click", () => {
        $("#new-operation").classList.remove("hidden")
        $(".balance-container").classList.add("hidden")
    })

    $("#add-operation-btn").addEventListener("click", (e) => {
        e.preventDefault()
        const currentData = getData("operations")
        currentData.push(saveNewOperation())
        setData("operations", currentData)
        $(".no-results-container").classList.add("hidden")
        $(".balance-container").classList.remove("hidden")
        $(".table-operations").classList.remove("hidden")
        $(".no-results-container").classList.add("hidden")
        $("#new-operation").classList.add("hidden")
    })

    $("#edit-operation-btn").addEventListener("click", (e) => {
        e.preventDefault()
        const operationId = $("#edit-operation-btn").getAttribute("data-id")
        const currentData = getData("operations").map(operation => {
            if(operation.id == operationId) {
                return saveNewOperation()
            }
            return operation
        })
        setData("operations", currentData)
        window.location.reload()
    })
}

window.addEventListener("load", initializeApp)





// // MIO
// $("#hamburger-menu").classList.add("hidden")

// // FILTER SECTION ACCORDION
// // $(".hide-filters").addEventListener("click", () => {
// //     $(".hide-filters").classList.toggle("hidden")
// //     $(".show-filters").classList.toggle("hidden")
// //     $("#filters").classList.toggle("hidden")
// // })

// // $(".show-filters").addEventListener("click", () => {
// //     $(".hide-filters").classList.toggle("hidden")
// //     $(".show-filters").classList.toggle("hidden")
// //     $("#filters").classList.toggle("hidden")
// // })

// // NEW OPERATION

// $(".new-operation-btn").addEventListener("click", () => {
//     $(".balance-container").classList.add("hidden")
//     $("#new-operation").classList.remove("hidden")
// })

// // CANCEL BUTTON NEW OPERATION

// $("#cancel-operation-btn").addEventListener("click", (e) => {
//     e.preventDefault()
//     $(".balance-container").classList.remove("hidden")
//     $("#new-operation").classList.add("hidden")
// })

// // BALANCE NAV BAR

// $("#balance-nav").addEventListener("click", () => {
//     $("#new-operation").classList.add("hidden")
//     // $("#categories-section").classList.add("hidden")
//     // $("#report-section").classList.add("hidden")
//     $(".balance-container").classList.remove("hidden")
// })