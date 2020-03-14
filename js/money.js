const form = document.querySelector('form')
const list = document.querySelector('ul')
const balance = document.getElementById("myBalance")


const addItem = (amount, moneyType) => {
    const newLI = document.createElement('li')
    newLI.className = "list-group-item"
    const amountElement = document.createElement("p")
    amountElement.appendChild(document.createTextNode(amount))
    newLI.appendChild(amountElement)
    if (moneyType == 1) {
        const category = document.createElement("p")
        category.className = "category-expense"
        category.appendChild(document.createTextNode("Expense"))
        newLI.appendChild(category)
        balance.textContent = Number(balance.textContent) - amount
    } 
    else if (moneyType == 2) {
        const category = document.createElement("p")
        category.className = "category-add"
        category.appendChild(document.createTextNode("Added"))
        newLI.appendChild(category)
        balance.textContent = Number(balance.textContent) + amount

    }
    return list.appendChild(newLI)
}

form.addEventListener("submit", e => {
    e.preventDefault()
    const amount = Number(e.target.elements.amount.value);
    const addOption = e.target.elements.addOption.value;
    addItem(amount,addOption)
    e.target.elements.amount.value = 0
})
