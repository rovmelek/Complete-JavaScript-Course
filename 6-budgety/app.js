// main controller function to update number and UI
function appController()
{
    console.log(event);
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
