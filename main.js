class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;
    }
    //submit budget method
    submitBudgetForm(){
        //get value from budget input
        const value = this.budgetInput.value;
        if(value === '' || value < 0){
            //add class list to show message
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `
            <p>Value cannot be empty or negative</p>
            `;
            //grabbing value of this thats pointing back to the class
            const self = this;
            //hide message after set time i.e. 40000 seconds
            setTimeout(function(){
                //remove clas list to hide message
                self.budgetFeedback.classList.remove('showItem');
            }, 4000);
        } else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }
    
    showBalance(){
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if(total < 0){
            this.balance.style.color = 'red';
        } else if (total > 0) {
            this.balance.style.color = 'green';
        } else if (total === 0) {
            this.balance.style.color = 'black'
        }
    }

    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;

        if(expenseValue === '' || amountValue === '' || amountValue < 0){
            this.expenseFeedback.classList.add('showItem');
            this.expenseFeedback.innerHTML = `
            <p>Values cannot be empty or negative</p>
            `;
            const self = this;
            setTimeout(function(){
                self.expenseFeedback.classList.remove('showItem');
            }, 4000)
        } else {
            let amount = parseInt(amountValue);
            this.expenseInput.value = '';
            this.amountInput.value = '';

            let expense = {
                id: this.itemID,
                title: expenseValue,
                amount: amount
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
    }

    addExpense(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class="expense-item d-flex justify-content-between align-items-baseline">
        <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
        <div class="expense-icons list-item">
         <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
          <button class="edit">Edit</button>
         </a>
         <a href="#" class="delete-icon" data-id="${expense.id}">
         <button class="delete">Delete</button>
         </a>
        </div>
       </div>
       `;
       this.expenseList.appendChild(div);
    }

    totalExpense(){
        let total = 0;
        if(this.itemList.length > 0){
            total = this.itemList.reduce(function(acc,curr){
                acc += curr.amount
                return acc
            }, 0);
        }
        this.expenseAmount.textContent = total;
        return total;
    }

    editExpense(element){
        let id = parseInt(element.dataset.id)
        //Traverse up DOM to find entire expense element
        let parent = element.parentElement.parentElement.parentElement
        //Remove from DOM
        this.expenseList.removeChild(parent);
        //Remove from array, created line 15
            //Grab item with the ID we recieved
            //filter returns new array
        //Expense variable is an array that holds 1 element
        let expense = this.itemList.filter(function(item){
            //iterating through whole array
            //if item im going through's id matches what I'm getting back, then return it & make it the expense var
            return item.id === id
        })
        //show value in expense input form to edit
        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;
        //Remove from list
        let tempList = this.itemList.filter(function(item){
            //return items that don't have that id
            return item.id !== id
        })
        //reassign itemList to updated list without id
        this.itemList = tempList;
        //everytime we update, we want to show the new balance
        this.showBalance();
    }

    deleteExpense(element){
        let id = parseInt(element.dataset.id)
        //Traverse up DOM to find entire expense element
        let parent = element.parentElement.parentElement.parentElement
        //Remove from DOM
        this.expenseList.removeChild(parent);
        //Remove from the list
        let tempList = this.itemList.filter(function(item){
            return item.id !== id
        })
        this.itemList = tempList;
        this.showBalance();
    }
}

function eventListeners(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    //new instance of UI class
    const ui = new UI()

    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitBudgetForm();
    })

    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpenseForm();
    })

    expenseList.addEventListener('click', function(event){
        //if the parent element has a class that contains 'edit icon'
        if(event.target.parentElement.classList.contains('edit-icon')){
            ui.editExpense(event.target.parentElement)
        } else if (event.target.parentElement.classList.contains('delete-icon')){
            ui.deleteExpense(event.target.parentElement)
        }
    })

}


document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})