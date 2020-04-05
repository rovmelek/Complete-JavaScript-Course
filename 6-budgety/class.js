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
        $('.budget__value').text(flag + ' ' + this.thousands_separators(Math.abs(availableBudget)));
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
