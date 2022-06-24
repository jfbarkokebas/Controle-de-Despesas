
//elementos DOM
const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

//  mock...
let dummyTransactions = [
    {id: 1, name: 'bolo de brigadeiro', amount: -20},
    {id: 2, name: 'salario', amount: 300},
    {id: 3, name: 'torta de frango', amount: -10},
    {id: 4, name: 'violão', amount: 150},
]

//REMOVER TRANSAÇÃO
const removeTransaction = ID =>{
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    console.log(dummyTransactions)
}

//ADD LISTA DE TRASAÇÕES
const addTransactionsIntoDOM = transaction =>{
    
    const operator = transaction.amount < 0? '-': '+'
    const CSSClass = transaction.amount< 0? "minus": "plus"
    const amountWithOutOperator = Math.abs(transaction.amount)

    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML = `
        ${transaction.name} 
        <span>${operator}R$ ${amountWithOutOperator}</span>
        <button class="delete-btn" onClick= "removeTransaction(${transaction.id})">
        x
        </button>
    `

    transactionUl.append(li)
}

//BALANÇO DOS VALORES

    
    const updateBalanceValues = ()=>{
        const sum = (accumulator, transaction) => accumulator + transaction
        //todos os valores:
        const transactionAmounts = dummyTransactions.map( transaction => transaction.amount)
        //saldo
        const total = transactionAmounts.reduce(sum, 0).toFixed(2)
        
        //entradas
        const income = transactionAmounts.filter(value => value > 0).reduce(sum, 0).toFixed(2)
        
        //saidas
        const expense = Math.abs(transactionAmounts
            .filter(value => value <0)
            .reduce(sum,0))
            .toFixed(2)
        

        //setando no display

        balanceDisplay.textContent = `R$ ${total}`
        incomeDisplay.textContent = `R$ ${income}`
        expenseDisplay.textContent = `R$ ${expense}`
    }


//renderizando a tela

const init = () => {
    transactionUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

//eventos

const generateId = () => dummyTransactions.length +1


form.addEventListener('submit', event =>{
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if(transactionName === '' || transactionAmount ===''){
        alert("preencha todos os campos!")
        return
    }

    const transaction = {
        id: generateId(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    }
    
    dummyTransactions.push(transaction)

    console.log(dummyTransactions)
    
    init()

    inputTransactionAmount.value= ''
    inputTransactionName.value = ''
})