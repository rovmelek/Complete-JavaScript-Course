class facilityObj
{
    constructor(name, buildYear)
    {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class parkObj extends facilityObj
{
    constructor(name, buildYear, numberOfTree, size)
    {
        super(name, buildYear);
        this.numberOfTree = numberOfTree;
        this.size = size;
    }
}

class streetObj extends facilityObj
{
    constructor(name, buildYear, length, size)
    {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
}

class facilityContainer
{
    constructor()
    {
        this.parkList = [];
        this.streetList = []
    }

    addFacility(type, properties)
    {
        if (type === 'park')
        {
            console.log(properties);
            this.parkList.push(new parkObj(
                        properties.name,
                        properties.buildYear,
                        properties.numberOfTree,
                        properties.size
                    )
                )
        }
        else if (type === 'street')
        {
            console.log(properties);
            this.streetList.push(new streetObj(
                properties.name,
                properties.buildYear,
                properties.length,
                properties.size
            )
        )
        }
        else
        {
            console.log(`Unknown type detected: ${type}`);
        }
    }

    viewList()
    {
        console.log(this.parkList);
        console.log(this.streetList);
    }
}
