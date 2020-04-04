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

    deleteItem()
    {
        // do something
    }

    getItemByType(type)
    {
        return this.items.filter(item => item.type === type);
    }

    calculateTotal(type)
    {
        let itemList = this.getItemByType(type);
        let totalNumber = itemList.reduce((a, item) => a + item.amount, 0);
        return Math.round((totalNumber + Number.EPSILON) * 100) / 100;
    }
}

class uiControllerObj
{
    constructor()
    {

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

    updateItemList(type)
    {
        let itemList = budgetController.getItemByType(type);
        console.log('Update income list');
        console.log(itemList);
        if (itemList.length > 0)
        {
            (type === 'inc') ? $('.income__list').text('') : $('.expenses__list').text('');
            for (let idx = 0; idx < itemList.length; idx++)
            {
                console.log('Processing item number: ' + idx)
                let typeString = (type === 'inc') ? 'income' : 'expense';
                let desc = itemList[idx].description;
                let amount = this.thousands_separators(itemList[idx].amount.toFixed(2));
                let sign = (type === 'inc') ? '+' : '-';
                let itemDivBlock =  `
                    <div class="item clearfix" id="${typeString}-${idx}">
                        <div class="item__description">${desc}</div>
                        <div class="right clearfix">
                            <div class="item__value">${sign} ${amount}</div>
                            <div class="item__delete">
                                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>
                    </div>
                `;
                (type === 'inc') ? $('.income__list').append(itemDivBlock) : $('.expenses__list').append(itemDivBlock);
            }
        }
    }

    updateTotal(type)
    {
        let total = budgetController.calculateTotal(type).toFixed(2);
        let target = (type === 'inc') ? '.budget__income--value' : '.budget__expenses--value';
        let sign = (type === 'inc') ? '+' : '-';
        $(target).text(sign + ' ' + this.thousands_separators(total));
    }

    updateAvailableBudget()
    {
        let totalIncome = budgetController.calculateTotal('inc').toFixed(2);
        let totalExpense = budgetController.calculateTotal('exp').toFixed(2);
        let availableBudget = (totalIncome - totalExpense).toFixed(2);
        let expensePercentage = Math.round(totalExpense * 100 / totalIncome);
        let flag = (availableBudget >= 0) ? "+" : "-"
        $('.budget__value').text(flag + ' ' + this.thousands_separators(availableBudget));
        $('.budget__expenses--percentage').text(expensePercentage + '%');
    }

    resetNumber()
    {
        $('.budget__value').text('+ 0.00')
        $('.budget__income--value').text('+ 0.00');
        $('.budget__expenses--value').text('- 0.00');
        $('.budget__expenses--percentage').text('0%');
    }

    displayItem()
    {
        console.log('Display items');
        for (let i = 0; i < budgetController.items.length; i++)
        {
            console.log(budgetController.items[i]);
        }
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
        uiController.updateTotal(type);

        uiController.updateItemList(type);

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
