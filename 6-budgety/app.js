// main controller function to update number and UI
function appController()
{
    console.log(event);
    // only "mouse click" and "enter" will trigger number and UI update
    if ((event.type === 'click'  && event.composedPath()[1].className === 'add__btn') || (event.type === 'keypress' && event.keyCode === 13))
    {
        // get user input
        let {type, description, amount} = uiController.getUserInput();
        
        if (uiController.validateInput(description, amount))
        {
            // update the budgets
            budgetController.addItem(type, description, parseFloat(amount));

            // clear the user inputs after updating the budgets
            uiController.clearUserInput();

            // refresh the numbers after changes
            uiController.refreshNumber(budgetController, type);
        }
    }
    else if (event.type === 'click' && event.composedPath()[4].className === 'item clearfix')
    {
        let parts = event.composedPath()[4].id.split('-');
        let type = (parts[0] === 'income') ? 'inc' : 'exp';
        let timestamp = parts[1];

        // delete the item with the specific timestamp
        budgetController.deleteItem(timestamp);

        // refresh the numbers after changes
        uiController.refreshNumber(budgetController, type);
    }
    else 
    {
        console.log('Unknow event detected!');
        console.log(event);
    }
}

// main()
// initiate the environment
let DOMString = {
    addType: '.add__type',
    addDesc: '.add__description',
    addValue: '.add__value',
    addBtn: '.add__btn',
    incList: '.income__list',
    expList: '.expenses__list',
    budgetIncValue: '.budget__income--value',
    budgetExpValue: '.budget__expenses--value',
    budgetValue: '.budget__value',
    budgetExpPct: '.budget__expenses--percentage',
    budgetTitleMonth: '.budget__title--month'
}

let budgetController = new budgetControllerObj();
let uiController = new uiControllerObj(DOMString);

$(document).ready(function()
{
    uiController.updateMonth();
    uiController.resetNumber();

    // listen to events and call the main controller function "appController()" to update number and UI
    $(DOMString.addBtn).on('click', appController);
    $(DOMString.addDesc + ', ' + DOMString.addValue).on('keypress', appController);
    $('div.container.clearfix').on('click', '[id^=income]', appController);
    $('div.container.clearfix').on('click', '[id^=expense]', appController);
});
