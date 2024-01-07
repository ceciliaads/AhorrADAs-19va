/* UTILITIES */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

$("#hamburger-menu").classList.add("hidden")

// FILTER SECTION ACCORDION
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

// NEW OPERATION

$(".new-operation-btn").addEventListener("click", () => {
    $(".balance-container").classList.add("hidden")
    $("#new-operation").classList.remove("hidden")
})