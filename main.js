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

    totalExpense(){
        let total = 400;
        return total;
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
    })

    expenseList.addEventListener('click', function(){

    })

}




document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})