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

    changeInputStyle (type)
    {
        if (type === 'exp')
        {
            $(`${this.DOMString.addType}, ${this.DOMString.addDesc}, ${this.DOMString.addValue}`).addClass("red-focus");
            $(`${this.DOMString.addBtn}`).addClass("red");
        }
        else if (type === 'inc')
        {
            $(`${this.DOMString.addType}, ${this.DOMString.addDesc}, ${this.DOMString.addValue}`).removeClass("red-focus");
            $(`${this.DOMString.addBtn}`).removeClass("red");
        }
        else
        {
            console.log(`Unknow type detected: ${type}`)
        }
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
        (type === 'inc') ? $(this.DOMString.incList).html('') : $(this.DOMString.expList).html('');

        // rebuild the income/expense item list if the itemList.length > 0
        if (itemList.length > 0)
        {
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
    }

    updateExpPctPerItem(budgetController)
    {
        // initiate local variable
        let totalIncome = budgetController.calculateTotal('inc');
        let itemList = budgetController.getItemByType('exp');
        let expPctString;

        // only update the expense percentage when there is any
        if (itemList.length > 0)
        {
            for (let idx = 0; idx < itemList.length; idx++)
            {
                // calculate the expense item percentage
                let expPct = Math.round(itemList[idx].amount.toFixed(2) * 100 / totalIncome);
                expPct = (!isNaN(expPct) && isFinite(expPct)) ? expPct : '--';

                // get the expense ID
                let timestamp = itemList[idx].timestamp;
                // generate the CSS ID
                let targetID = ['#expense', timestamp].join('-');

                // generate the target of CSS item__percentage under the target ID
                let targetPct =  `${targetID} ${this.DOMString.itemPct}`;

                if (typeof $(targetPct).html() !== 'undefined')
                {
                    $(targetPct).html(`${expPct}%`);
                }
                else
                {
                    // generate the target of CSS item__value under the target ID
                    let targetValue = `${targetID} ${this.DOMString.itemValue}`;
                    // generate the expense percentage HTML for insert
                    expPctString =  `<div class="item__percentage">${expPct}%</div>`;

                    console.log('Add PCT');
                    $(targetValue).after(expPctString);
                }
            }
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
        this.updateExpPctPerItem(budgetController);

        // update the available budget
        this.updateAvailableBudget(budgetController);
        // this.displayItem(budgetController);
    }

    updateMonth()
    {
        let month = Intl.DateTimeFormat('en-us', { month: 'long', year: 'numeric' }).format(new Date(Date.now()));
        $(this.DOMString.budgetTitleMonth).text(month);
    }

    validateInput(description, amount)
    {
        return (!isNaN(amount) && amount > 0 && description !== "" && description.trim().length > 0)
    }
}
