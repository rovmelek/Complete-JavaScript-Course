class budgetObj
{
    constructor(type, description, amount)
    {
        this.type = type;
        this.description = description;
        this.amount = amount;
    }
}

class budgetControllerObj
{
    constructor()
    {
        this.items = [];
    }

    addItem(type, description, amount)
    {
        console.log('Add new item');
        this.items.push(new budgetObj(type, description, amount));
    }

    getItemByType(type)
    {
        // let incomeList = [for (income of this.items) if (income.type ==='inc') income];
        return this.items.filter(item => item.type === type);
    }

    calculateTotalIncome()
    {
        let incomeList = this.getItemByType('inc');
        let totalIncome = incomeList.reduce((a, item) => a + item.amount, 0);
        // console.log(typeof totalIncome);
        return Math.round((totalIncome + Number.EPSILON) * 100) / 100;
    }

    calculateTotalExpense()
    {
        let expenseList = this.getItemByType('exp');
        let totalExpense = expenseList.reduce((a, item) => a + item.amount, 0);
        return Math.round((totalExpense + Number.EPSILON) * 100) / 100;
    }
}

class uiControllerObj
{
    constructor()
    {
        // some code here
    }

    thousands_separators(num)
    {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

    getUserInput()
    {
        console.log('Get user input');
        let type = $('.add__type').val();
        let description = $('.add__description').val();
        let amount = $('.add__value').val();
        console.log(type, description, amount);
        return {type, description, amount};
    }

    setFocus(className)
    {
        $(className).focus();
    }

    clearUserInput()
    {
        console.log('Clear user input');
        $('.add__type').prop('selectedIndex', 0);
        $('.add__description').val('');
        $('.add__value').val('');
        this.setFocus('.add__description');
    }

    updateTotalIncome()
    {
        let totalIncome = budgetController.calculateTotalIncome().toFixed(2);
        // console.log(totalIncome)
        // console.log('Current total income: ' + this.thousands_separators(totalIncome));
        $('.budget__income--value').text('+ ' + this.thousands_separators(totalIncome));

    }

    updateTotalExpense()
    {
        let totalExpense = budgetController.calculateTotalExpense().toFixed(2);
        // console.log('Current total expense: ' + totalExpense);
        $('.budget__expenses--value').text('- ' + this.thousands_separators(totalExpense));
    }

    updateAvailableBudget()
    {
        let totalIncome = budgetController.calculateTotalIncome().toFixed(2);
        let totalExpense = budgetController.calculateTotalExpense().toFixed(2);
        let availableBudget = (totalIncome - totalExpense).toFixed(2);
        let flag = (availableBudget >= 0) ? "+" : "-"
        $('.budget__value').text(flag + ' ' + this.thousands_separators(availableBudget));
    }

    resetNumber()
    {
        $('.budget__value').text('+ 0.00')
        $('.budget__income--value').text('+ 0.00');
        $('.budget__expenses--value').text('- 0.00');
    }

    displayItem()
    {
        console.log('Display items');
        for (let i = 0; i < budgetController.items.length; i++)
        {
            console.log(budgetController.items[i]);
        }
        // console.log(budgetController.calculateTotalIncome());
        // console.log(budgetController.calculateTotalExpense());
    }
}

// main controller function to update number and UI
function appController()
{
    // only "mouse click" and "enter" will trigger number and UI update
    if (event.type === 'click' || (event.type === 'keypress' && event.keyCode === 13))
    {
        console.log(event);
        // get user input
        let {type, description, amount} = uiController.getUserInput();
        // console.log(type, description, amount);

        // update the budgets
        budgetController.addItem(type, description, parseFloat(amount));

        // call uiController() to update the total income or expense
        (type === 'inc') ? uiController.updateTotalIncome() : uiController.updateTotalExpense();

        // clear the user inputs after updating the budgets
        uiController.clearUserInput();

        // update the available budget
        uiController.updateAvailableBudget();
        uiController.displayItem();
    }
}

// main()

// initiate the environment
let budgetController = new budgetControllerObj();
let uiController = new uiControllerObj();
uiController.resetNumber();

// listen to the events and call the main controller function "appController()" to update number and UI
$('.add__btn').on('click', appController);
$('.add__value').on('keypress', appController);
