class budgetObj
{
    constructor(timestamp, type, description, amount)
    {
        this.timestamp = timestamp;
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
        this.items.push(new budgetObj(Date.now(), type, description, amount));
    }

    deleteItem(timestamp)
    {
        this.items = this.items.filter(item => item.timestamp !== parseInt(timestamp));
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
        let type = $('.add__type').val();
        let description = $('.add__description').val();
        let amount = $('.add__value').val();
        return {type, description, amount};
    }

    setFocus(className)
    {
        $(className).focus();
    }

    clearUserInput()
    {
        $('.add__type').prop('selectedIndex', 0);
        $('.add__description').val('');
        $('.add__value').val('');
        this.setFocus('.add__description');
    }

    updateItemList(budgetController, type)
    {
        let itemList = budgetController.getItemByType(type);

        if (itemList.length > 0)
        {
            // clear the income/expense item list first
            (type === 'inc') ? $('.income__list').text('') : $('.expenses__list').text('');

            // rebuild the income/expense item list
            for (let idx = 0; idx < itemList.length; idx++)
            {
                let typeString = (type === 'inc') ? 'income' : 'expense';
                let id = itemList[idx].timestamp;
                let desc = itemList[idx].description;
                let amount = this.thousands_separators(itemList[idx].amount.toFixed(2));
                let sign = (type === 'inc') ? '+' : '-';
                let itemDivBlock =  `
                    <div class="item clearfix" id="${typeString}-${id}">
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

    updateTotal(budgetController, type)
    {
        let total = budgetController.calculateTotal(type).toFixed(2);
        let target = (type === 'inc') ? '.budget__income--value' : '.budget__expenses--value';
        let sign = (type === 'inc') ? '+' : '-';
        $(target).text(sign + ' ' + this.thousands_separators(total));
    }

    updateAvailableBudget(budgetController)
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

    updateMonth()
    {
        let month = Intl.DateTimeFormat('en-us', { month: 'long' }).format(new Date(Date.now()));
        $('.budget__title--month').text(month);
    }
}

// main controller function to update number and UI
function appController()
{
    // only "mouse click" and "enter" will trigger number and UI update
    if ((event.type === 'click'  && event.composedPath()[1].className === 'add__btn') || (event.type === 'keypress' && event.keyCode === 13))
    {
        // get user input
        let {type, description, amount} = uiController.getUserInput();
        
        // update the budgets
        budgetController.addItem(type, description, parseFloat(amount));

        // call uiController() to update the total income or expense
        uiController.updateTotal(budgetController, type);
        uiController.updateItemList(budgetController, type);

        // clear the user inputs after updating the budgets
        uiController.clearUserInput();

        // update the available budget
        uiController.updateAvailableBudget(budgetController);
        // uiController.displayItem(budgetController);
    }
    else if (event.type === 'click' && event.composedPath()[4].className === 'item clearfix')
    {
        let parts = event.composedPath()[4].id.split('-');
        let type = (parts[0] === 'income') ? 'inc' : 'exp';
        let timestamp = parts[1];
        budgetController.deleteItem(timestamp);

        // call uiController() to update the total income or expense
        uiController.updateTotal(budgetController, type);
        uiController.updateItemList(budgetController, type);
        
        // update the available budget
        uiController.updateAvailableBudget(budgetController);
    }
    else 
    {
        console.log('Unknow event detected!');
        console.log(event);
    }
}

// main()
// initiate the environment
let budgetController = new budgetControllerObj();
let uiController = new uiControllerObj();

$(document).ready(function()
{
    uiController.updateMonth();
    uiController.resetNumber();

    // listen to events and call the main controller function "appController()" to update number and UI
    $('.add__btn').on('click', appController);
    $('.add__value').on('keypress', appController);
    $('div.container.clearfix').on('click', '[id^=income]', appController);
    $('div.container.clearfix').on('click', '[id^=expense]', appController);
});

/*
function debugController()
{
    console.log('Debug: event info');
    console.log(event);
    // console.log(event.data);
    // console.log(event.target);
    // console.log(event.path);
    // console.log(typeof event.composedPath()[4]);
    console.dir(event.composedPath()[1]);
    console.dir(event.composedPath()[4]);
    console.log(event.composedPath()[4].id);
    console.log(event.composedPath()[4].className);
    console.log(event.composedPath()[4].children[0].innerText);
    console.log(event.composedPath()[4].children[1].innerText);
    // console.log('hash: ' + event.composedPath()[4].children[0].innerText.hashCode())
    // console.log('timestamp: ' + Date.now());

}
*/
// jQuery tests
// $(document).on('click', '.add__btn', {extra: 'add'}, appController);
// $(document).on('keypress', '.add__value', {extra: 'add'}, appController);
// $('div.container.clearfix').on('click', '[id^=income]', debugController);
// $('div.income__list').on('click', debugController);
// $('div.container.clearfix').on('click', '[id^=income]', debugController);
// $('div.container.clearfix').on('click', '[id^=expense]', debugController);
// $('.add__btn').click({action: 'add'}, appController);
// $('.add__value').keypress({action: 'add'}, appController);
// $('div.container.clearfix').click('[id^=income]', debugController);
// $('div.container.clearfix').click('[id^=expense]', debugController);
// $('div.container.clearfix').on('click', '[id^=income]', {action: 'delete'}, debugController);
// $('div.container.clearfix').on('click', '[id^=expense]', {action: 'delete'}, appController);
