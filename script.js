
//elementos DOM
const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


//LOCALSTORAGE
const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"))
let transactions = localStorage.getItem("transactions")!== null? localStorageTransactions: []
 

//REMOVER TRANSAÇÃO
const removeTransaction = ID =>{
    transactions = transactions.filter(transaction => transaction.id !== ID)
    init()
    updateLocalStorage()
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
        const transactionAmounts = transactions.map( transaction => transaction.amount)
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
    transactions.forEach(addTransactionsIntoDOM)
    updateBalanceValues()
}

init()

//UPDATE NO LOCALSTORAGE

const updateLocalStorage = ()=> {
    localStorage.setItem("transactions", JSON.stringify(transactions))

}


//eventos

const generateId = () => transactions.length +1


const addToTransactionArray = (transactionName, transactionAmount)=>{    
    transactions.push({
        id: generateId(), 
        name: transactionName, 
        amount: Number(transactionAmount)
    })
}

const cleanInputs= ()=>{
    inputTransactionAmount.value= ''
    inputTransactionName.value = ''
}

const handleFormSubmit = event =>{
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isEmptySomeInput = transactionName === '' || transactionAmount ===''

    if(isEmptySomeInput){
        alert("preencha todos os campos!")
        return
    }    
    
    init()
    addToTransactionArray(transactionName, transactionAmount)
    updateLocalStorage()
    cleanInputs()
}


form.addEventListener('submit', handleFormSubmit )