// main controller function to update number and UI
function appController()
{
    // console.log(event);
    // only "mouse click" and "enter" will trigger number and UI update
    if (
        (event.type === 'click' && event.composedPath()[1].className === 'add__btn') 
        || (event.type === 'keypress' && event.keyCode === 13))
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
    // not sure if parentsUntil is better or the composedPath. keep both for furture reference
    // else if (event.type === 'click' && event.composedPath()[4].className === 'item clearfix')
    else if (event.type === 'click' && event.target.className === 'ion-ios-close-outline')
    {
        // let parts = event.composedPath()[4].id.split('-');
        let parts = $(event.target).parentsUntil(
            `div:contains(\\"${DOMString.incList}\\"), div:contains(\\"${DOMString.expList}\\")`
        )[3].id.split('-');
        let type = (parts[0] === 'income') ? 'inc' : 'exp';
        let timestamp = parts[1];
        console.log(type);
        console.log(timestamp);

        // delete the item with the specific timestamp
        budgetController.deleteItem(timestamp);

        // refresh the numbers after changes
        uiController.refreshNumber(budgetController, type);
    }
    else if (event.type === 'change' && event.target.className.includes(`${DOMString.addType.substr(1)}`))
    {
        let type = event.target.value;
        uiController.changeInputStyle(type);
    }
    else 
    {
        console.log('Unknow event detected!');
        console.log(event);
    }
}

// main()
// initiate the environment
const DOMString = {
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
    budgetTitleMonth: '.budget__title--month',
    itemValue: '.item__value',
    itemPct: '.item__percentage'
}

let budgetController = new budgetControllerObj();
let uiController = new uiControllerObj(DOMString);

$(document).ready(function()
{
    uiController.updateMonth();
    uiController.resetNumber();
    uiController.changeInputStyle($(`${DOMString.addType}`).val());

    // listen to events and call the main controller function "appController()" to update number and UI
    $(DOMString.addBtn).on('click', appController);
    $(DOMString.addDesc + ', ' + DOMString.addValue).on('keypress', appController);
    $('div.container.clearfix').on('click', '[id^=income]', appController);
    $('div.container.clearfix').on('click', '[id^=expense]', appController);
    $('.add__type').change(appController);
});
