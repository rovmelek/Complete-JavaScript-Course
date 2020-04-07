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
        console.log(this.items);
        console.log(timestamp);
        this.items = this.items.filter(item => item.timestamp !== parseInt(timestamp));
        console.log(this.items);
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
    constructor(DOMString)
    {
        this.DOMString = DOMString;
    }

    thousands_separators(num)
    {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

    getUserInput()
    {
        let type = $(this.DOMString.addType).val();
        let description = $(this.DOMString.addDesc).val();
        let amount = $(this.DOMString.addValue).val();
        return {type, description, amount};
    }

    setFocus(className)
    {
        $(className).focus();
    }

    clearUserInput()
    {
        $(this.DOMString.addType).prop('selectedIndex', 0);
        $(this.DOMString.addDesc).val('');
        $(this.DOMString.addValue).val('');
        // $(this.DOMString.addDesc + ', ' + this.DOMString.addValue).val('');
        this.setFocus(this.DOMString.addDesc);
    }

    updateItemList(budgetController, type)
    {
        let itemList = budgetController.getItemByType(type);

        // clear the income/expense item list first
        (type === 'inc') ? $(this.DOMString.incList).text('') : $(this.DOMString.expList).text('');

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
                </div>`;
            (type === 'inc') ? $(this.DOMString.incList).append(itemDivBlock) : $(this.DOMString.expList).append(itemDivBlock);
        }
    }

    updateTotal(budgetController, type)
    {
        let total = budgetController.calculateTotal(type).toFixed(2);
        let target = (type === 'inc') ? this.DOMString.budgetIncValue : this.DOMString.budgetExpValue;
        let sign = (type === 'inc') ? '+' : '-';
        $(target).text(sign + ' ' + this.thousands_separators(total));
    }

    updateAvailableBudget(budgetController)
    {
        let totalIncome = budgetController.calculateTotal('inc').toFixed(2);
        let totalExpense = budgetController.calculateTotal('exp').toFixed(2);
        let availableBudget = (totalIncome - totalExpense).toFixed(2);
        let expensePercentage = Math.round(totalExpense * 100 / totalIncome);
        expensePercentage = (isNaN(expensePercentage) || !isFinite(expensePercentage)) ? 0 : expensePercentage;
        let flag = (availableBudget >= 0) ? "+" : "-"
        $(this.DOMString.budgetValue).text(flag + ' ' + this.thousands_separators(Math.abs(availableBudget)));
        $(this.DOMString.budgetExpPct).text(expensePercentage + '%');
    }

    resetNumber()
    {
        $(this.DOMString.budgetValue).text('+ 0.00')
        $(this.DOMString.budgetIncValue).text('+ 0.00');
        $(this.DOMString.budgetExpValue).text('- 0.00');
        $(this.DOMString.budgetExpPct).text('0%');
    }

    refreshNumber(budgetController, type)
    {
        // call uiController() to update the total income or expense
        this.updateTotal(budgetController, type);
        this.updateItemList(budgetController, type);

        // update the available budget
        this.updateAvailableBudget(budgetController);
        // this.displayItem(budgetController);
    }

    updateMonth()
    {
        let month = Intl.DateTimeFormat('en-us', { month: 'long' }).format(new Date(Date.now()));
        $(this.DOMString.budgetTitleMonth).text(month);
    }

    validateInput(description, amount)
    {
        return (!isNaN(amount) && amount > 0 && description !== "" && description.trim().length > 0)
    }
}
