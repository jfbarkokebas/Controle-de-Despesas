const dummyTransactions = [
    {id: 1, name: 'bolo de brigadeiro', amount: -20},
    {id: 2, name: 'salario', amount: 300},
    {id: 3, name: 'torta de frango', amount: -10},
    {id: 4, name: 'violão', amount: 150},
]

const addTransactionsIntoDOM = transaction =>{
    
    const operator = transaction.amount < 0? '-': '+'
    const CSSClass = transaction.amount< 0? "minus": "plus"
    const amountWithOutOperator = Math.abs(transaction.amount)

    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} <span>${operator} R$ ${amountWithOutOperator}</span><button class="delete-btn">x</button>
    `

    console.log(li)
}

addTransactionsIntoDOM(dummyTransactions[1])