/* UTILITIES */

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
        categorieName: "Food"
    },
    {
        id: randomId(),
        categorieName: "Utilties"
    },
    {
        id: randomId(),
        categorieName: "Outings"
    },
    {
        id: randomId(),
        categorieName: "Education"
    },
    {
        id: randomId(),
        categorieName: "Transportation"
    },
    {
        id: randomId(),
        categorieName: "Job"
    }
    ]

const allOperations = getData("operations") || []
// const allCategories = getData("categories") || defaultCategories

/* RENDERS */
const renderOperations = (operations) => {
    cleanContainer("#operation-content")
    if (operations.length) {
        hideElement([".no-results"])
        showElement([".operation-content"])
        for (const operation of operations) {
            const categorieSelected = getData("categories").find(categorie => categorie.id === operation.categorie)
            $("#operation-content").innerHTML += `
                <div flex place-content-between>
                    <h4>${operation.description}</h4>
                    <h4>${operation.categorie}</h4>
                    <h4>${operation.date}</h4>
                    <h4>${operation.amount}</h4>
                    <h4>
                        <button class="btn bg-green-400" onclick="showFormEdit('${operation.id}')"> Edit </button>
                        <button type="button" class="btn bg-red-400"> Delete</button>
                    </h4>
                </tr>
            `
        }
    } else {
        // showElement([".no-results"])
        hideElement([".operation-content"])
    }
}

const saveOperation = (operation) => {
    return {
        id: 3,
        description: $("#description-input").value,
        categorie: $("#ategories-select").value,
        // date: $("#date-input").value,
        amount: $("#amount-input").value,
        balanceType: $("#type-select-operation").value
    }
}

const showFormEdit = (operationId) => {
    hideElement([".table","#add-operation-btn",".label-description"])
    showElement([".form", "#edit-operation-btn",".label-edit"])
    $("#edit-operation-btn").setAttribute("data-id", operationId)
    const operationSelected = getData("operations").find(operation => operation.id === operationId)
    $("#description-input").value = operationSelected.description
    $("#amount-input").value = operationSelected.amount
    $("#type-select-operation").value = operationSelected.balanceType
    $("#categories-select").value = operationSelected.categorie
    $("#date-input").value = operationSelected.date
}
// EVENTS
const initializeApp = () => {
    setData("operations", allOperations)
    renderOperations(allOperations)

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

    $("#add-operation-btn").addEventListener("click", (e) => {
        e.preventDefault()
        const currentData = getData("operations")
        currentData.push(saveOperation())
        setData("operations", currentData)
    })

    $("#edit-operation-btn").addEventListener("click", (e) => {
        e.preventDefault(e)
        const operationId = $("#edit-operation-btn").getAttribute("data-id")
        const currentData = getData("operations").map(operation => {
            if(operation.id === operationId) {
                return saveOperation()
            }
            return operation
        })
        setData("operations", currentData)
        window.location.reload()
    })
}

window.addEventListener("load", initializeApp)






// MIO
$("#hamburger-menu").classList.add("hidden")

// FILTER SECTION ACCORDION
// $(".hide-filters").addEventListener("click", () => {
//     $(".hide-filters").classList.toggle("hidden")
//     $(".show-filters").classList.toggle("hidden")
//     $("#filters").classList.toggle("hidden")
// })

// $(".show-filters").addEventListener("click", () => {
//     $(".hide-filters").classList.toggle("hidden")
//     $(".show-filters").classList.toggle("hidden")
//     $("#filters").classList.toggle("hidden")
// })

// NEW OPERATION

$(".new-operation-btn").addEventListener("click", () => {
    $(".balance-container").classList.add("hidden")
    $("#new-operation").classList.remove("hidden")
})

// CANCEL BUTTON NEW OPERATION

$("#cancel-operation-btn").addEventListener("click", (e) => {
    e.preventDefault()
    $(".balance-container").classList.remove("hidden")
    $("#new-operation").classList.add("hidden")
})

// BALANCE NAV BAR

$("#balance-nav").addEventListener("click", () => {
    $("#new-operation").classList.add("hidden")
    // $("#categories-section").classList.add("hidden")
    // $("#report-section").classList.add("hidden")
    $(".balance-container").classList.remove("hidden")
})