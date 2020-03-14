// This process is error prone therefore need not best solution if content updated
console.log(document.body.childNodes[7].childNodes[1].innerHTML);

// to overcome this we use getElementByTag
const titleElement = document.body.getElementsByTagName('h2')
console.log(titleElement[0].innerHTML);

// both codes do same work but later code works more efficiently

//  Get element by class name
const existingElement = Array.from(document.body.getElementsByClassName('exists'))

existingElement.forEach(element => {
    console.log(element.innerHTML);
})
