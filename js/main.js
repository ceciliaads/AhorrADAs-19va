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
    if (operations.length) {
        hideElement([".no-results-container"])
        showElement([".table-operations"])
        for (const operation of operations) {
            $("#table").innerHTML += `
            <tr class="table-auto"> 
                <td>${operation.description}</td>
                <td>${operation.categorie}</td>
                <td>${operation.date}</td>
                <td class="amount-table">${operation.amount}</td>
                <td>
                    <button class="btn text-blue-500" onclick="showFormEdit('${operation.id}')"> Edit </button>
                    <button type="button" class="btn text-blue-500" onclick="openModalDelete('${operation.id}','${operation.categorie} ')"> Delete</button>
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
console.log(operationsPlaceHolder)

// renderOperations(operationsPlaceHolder)

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

console.log(saveNewOperation())

const showFormEdit = (operationId) => {
    showElement(["#new-operation", "#edit-operation-btn", "#edit-operation-title"])
    hideElement([".table-operations", ".balance-container", "#add-operation-btn", "#new-operation-title", "#cancel-operation-btn"])
    $("#edit-operation-btn").setAttribute("data-id", operationId)
    const operationSelected = getData("operations").find(operation => operation.id === operationId)
    $("#description-input").value = operationSelected.description
    $("#categories-select").value = operationSelected.categorie
    $("#date-input").value = operationSelected.date
    $("#amount-input").value = operationSelected.amount
    // add type of balance
}

const openModalDelete = (operationId, operationCategorie) => {
    $("#delete-btn").setAttribute("data-id", operationId)
    showElement(["#delete-modal"])
    $(".operation-name").innerText = `${operationCategorie}`
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
    const currentData = getData("operations");
    let earningsTotal = 0;
    let expensesTotal = 0;

    for (const operation of currentData) {
        if (operation.type === "earning") {
            earningsTotal += operation.amount;
        } else {
            expensesTotal += operation.amount;
        }
    }

    $(".earnings-sum").innerHTML = earningsTotal;
    $(".expenses-sub").innerHTML = expensesTotal;

    const netBalance = earningsTotal - expensesTotal;
    $(".totalOnWallet").innerHTML = netBalance;

    if (netBalance < 0) {
        $(".total-on-wallet").classList.add("text-red-500")
    } else if (netBalance > 0){
        $(".total-on-wallet").classList.add("text-green-500")
    }

    return netBalance;
};

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
    renderOperations(allOperations)
    calculateBalance()
    $("#new-operation-btn").addEventListener("click", () => {
        showElement(["#new-operation"])
        hideElement([".balance-container"])
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

    $("#filter-categories").addEventListener("input", () => {
        const categoriesId = e.target.value
        const currentData = getData("operations")
        const filteredOperations = currentData.filter(operation => operation.id === categorieId)
    })

    $("#description-input").addEventListener("blur", () => validateForm("description"))
    $("#amount-input").addEventListener("blur", () => validateForm("amount"))
}

window.addEventListener("load", initializeApp)


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